const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection } = require('discord.js')
const express = require('express')
const mongoose = require('mongoose')
const { token, mongodbConnString, intents } = require('./config/config')
const messageCreate = require('./handlers/messageCreate')
const interactionCreate = require('./handlers/interactionCreate')

const client  = new Client({ intents })

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    client.commands.set(command.data.name, command)
}

client.once('ready', async (client) => {
    console.log('Bot is ready!!');
})

client.on('messageCreate', messageCreate)

client.on('interactionCreate', interactionCreate)


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