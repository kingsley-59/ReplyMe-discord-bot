require('dotenv').config()


module.exports = {
    clientId: process.env.DISCORD_APP_ID,
    token: process.env.DISCORD_BOT_TOKEN,
    guildId: process.env.DISCORD_GUILD_ID,
    mongodbConnString: `mongodb+srv://dantown-discord-bot:${process.env.MONGODB_PASSWORD}@cluster0.lfl1c90.mongodb.net/?retryWrites=true&w=majority`
}