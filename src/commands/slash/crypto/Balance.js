const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Checks your current balance.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription("User you want to check")
                .setRequired(false)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;

        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s Balance`)
            .setDescription("Checks your current balance.")
            .setColor("#ff0303")
            .setTimestamp()

        await interaction.reply ({
            embeds: [embed]
        })
    },
}