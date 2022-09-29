const fs = require('node:fs')
const path = require('node:path')
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const express = require('express')
const mongoose = require('mongoose')
const { token, mongodbConnString } = require('./config/config')

const client  = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]})

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    client.commands.set(command.data.name, command)
}

client.once('ready', async (client) => {
    console.log('Ready!');
})

client.on('messageCreate', async message => {
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

    
    if (message.mentions.everyone){
        await message.reply('You mentioned everyone')
    } else {
        let count = message.mentions.users.size
        let mentions = Array.from(message.mentions.users.values())
        await message.reply(`You mentioned ${count} users. ${mentions.join(', ')}`)
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return;

    try {
        await command.execute(interaction)
    } catch (error) {
        console.log(error?.message ?? error)
        await interaction.reply({ content: 'Something broke!' })
    }
})


const app = express()
const PORT = process.env.PORT || 5000;

mongoose.connect(mongodbConnString).then(() => {
    app.listen(PORT, (err) => {
        if (err) {
            console.log({message: err?.message, err})
            return;
        }
        console.log(`Server is running on port ${PORT}`)
        client.login(token)
    })
}).catch(error => console.log(error?.message ?? error))