

const messageCreate = async (message) => {

    // if message is from a bot or targeted to everyone, return;
    if (message.author.bot || message.mentions.everyone) return;

    const author = message.author.id
    const messageId = message.id
    const content = message.content
    const createdAt = message?.createdAt || new Date()
    let mentions = []
    if (message.mentions.users.size > 0) {
        let users = Array.from(message.mentions.users.values())
        users.map(user => {
            if (!user.bot) mentions.push(user.id)
        })
    }
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
    
    console.log({
        author, messageId, content, createdAt, mentions, 
        issueAuthor, issueId, issueContent, issueCreatedAt, issueMentions
    })

}

module.exports = messageCreate