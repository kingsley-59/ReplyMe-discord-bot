const mongoose = require('mongoose');
const Messages = require('../models/messages')
const Tags = require('../models/tags')


const messageCreate = async (message) => {

    // if message is from a bot or targeted to everyone, return;
    if (message.author.bot || message.mentions.everyone) return;
    // console.log(message)

    // message details
    const author = message.author.id
    const messageId = message.id
    const content = message.content
    const createdAt = message?.createdAt || new Date()
    let mentions = []
    if (message.mentions.users.size > 0) {
        let users = Array.from(message.mentions.users.values())
        users.map(user => {
            if (!user.bot && user.id !== message.mentions.repliedUser?.id) mentions.push(user.id)
        })
    }

    // issuer (who was replied to) details
    let issueAuthor, issueId, issueContent, issueCreatedAt;
    issueAuthor = issueId = issueContent = issueCreatedAt = null;
    let issueMentions = []
    if (message.reference !== null) {
        let issue = await message.fetchReference(message.reference)
        if (issue.author.bot) return;
        issueAuthor = issue.author.id
        issueId = issue.id
        issueContent = issue.content
        issueCreatedAt = issue?.createdAt || new Date()
        if (issue.mentions.users.size > 0) {
            Array.from(issue.mentions.users.values()).map(user => {
                if (!user.bot) issueMentions.push(user.id)
            })
        }
    }

    if (!issueAuthor && mentions.length == 0) return;

    message.channel.send('Noted!')

    try {
        // save if message has mentions
        if (mentions.length > 0) {
            let taggedUsers = mentions.map(user => {
                return {
                    _id: new mongoose.Types.ObjectId(),
                    messageId,
                    author,
                    tagged: user
                }
            })
            console.log(taggedUsers)
            let tags = await Tags.insertMany(taggedUsers)
            console.log(`Added ${tags.length} tags to the db.`)
        }

        // save if message is a reply
        if (!issueAuthor) return;
        
        // look up tags db for tag with messageId
        const tagReplied = await Tags.findOne({messageId: issueId, tagged: author }).exec()
        if (tagReplied) {
            tagReplied.hasReplied = true
            let tagUpdate = await tagReplied.save()
            console.log(`Updated tag entry with messageId - ${tagUpdate.messageId}`)
        }
        
        const message = new Messages({
            _id: new mongoose.Types.ObjectId(),
            author, messageId, content, createdAt, mentions,
            issueAuthor, issueId, issueContent, issueCreatedAt, issueMentions
        })
        const result = await message.save()
        if (result) { console.log('Reply saved!') }

    } catch (error) {
        console.error(error)
    }

}

module.exports = messageCreate