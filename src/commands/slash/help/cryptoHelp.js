const { SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('help').setDescription('A help command that utilize users to know more.'),

    async execute(interaction) {
        await interaction.reply('This is a help command')
    }
}