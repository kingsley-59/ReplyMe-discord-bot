

const interactionCreate = async (interaction) => {

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) return;

    try {
        await command.execute(interaction)
    } catch (error) {
        console.log(error?.message ?? error)
        await interaction.reply({ content: 'Something broke!' })
    }
}

module.exports = interactionCreate