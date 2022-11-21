const fs = require('node:fs')
const path = require('node:path')
const { createServer } = require('http')
const { Server } = require('socket.io')
const { Client, Collection } = require('discord.js')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const appRoutes = require('./router/routes')
const { token, mongodbConnString, intents } = require('./config/config')
const messageCreate = require('./handlers/messageCreate')
const interactionCreate = require('./handlers/interactionCreate')
const memberController = require('./controllers/memberController')

const app = express()
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
})
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const client = new Client({ intents })

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    client.commands.set(command.data.name, command)
}

client.once('ready', async (client) => {
    const Guilds = client.guilds.cache.map(guild => guild)
    console.log(`Bot is ready!! ${client.commands.size} commands available.`);
    let members = []
    for (let guild of Guilds) {
        console.log('fetching users...')
        const guildMembers = await guild.members.fetch()
        const memberArr = guildMembers.map(member => member.user)
        members = [...members, ...memberArr]
    }
    for (let member of members) {
        await memberController.confirmAndSaveUser(member)
    }
})

client.on('messageCreate', messageCreate)

// io.on('connection', socket => {
//     console.log('Socket connected.')
//     socket.broadcast.emit('test', 'confirmed!')
//     client.on('messageCreate', async message => {
//         await messageCreate(message, socket)
//     })  
// })

client.on('interactionCreate', interactionCreate)


app.use('/api/v1', appRoutes)

app.use((err, req, res, next) => {
    if (!err) return;

    console.log(`Error: ${err?.message ?? err}`)
    res.status(500).json({ message: 'Something broke' })
})

mongoose.connect(mongodbConnString).then(() => {
    server.listen(PORT)
    console.log(`Server is running on port ${PORT}`)
    client.login(token)
}).catch(error => console.log(error?.message ?? error))