const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription(`A help command that utilize users to know more.`),
    category: "General",

    async execute(interaction) {
        const slashCommand = [...interaction.client.slashCommands.values()]
        const embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription(`This is a help command`)

        slashCommand.forEach(commandList => {
            embed.addFields({
                name: `${commandList.data.name}`,
                value: commandList.data.description || 'No Description available',
                inline: true
            });
        })

        await interaction.reply({
            embeds: [embed],
        })
    }
}