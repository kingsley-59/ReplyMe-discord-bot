const { SlashCommandBuilder } = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-messages')
        .setDescription('Deletes the last 99 messages!'),
    async execute(interaction) {
        try {
            const fetched = await interaction.channel.messages.fetch()
            console.log(`Fetched ${fetched.size} messages`)
            const deleted = await interaction.channel.bulkDelete(fetched)
            await interaction.reply(`Fetched ${fetched.size} messages and deleted ${deleted.size} messages`)
        } catch (error) {
            console.error(error?.message ?? error)
        }
    }
}