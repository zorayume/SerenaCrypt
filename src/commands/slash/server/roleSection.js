const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rolesetup")
        .setDescription("Set the role section for the server"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("Select Menu for Roles")
            .setDescription("Select the existing menu to get your role.")

        const RolesSection = new StringSelectMenuBuilder()
            .setCustomId("roleSection")
            .setPlaceholder("Select the role section for the server")
            .setMinValues(0)
            .setMaxValues(3)
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Role 1")
                    .setDescription("Gaming")
                    .setValue('gaming'),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Role 2")
                    .setDescription("Interest")
                    .setValue('interest'),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Role 3")
                    .setDescription("Collection")
                    .setValue('collection'),
            )

        const row = new ActionRowBuilder().addComponents(RolesSection);

        interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
}