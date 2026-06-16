const { Events, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,

    // Slash interactions
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);

                const embed = new EmbedBuilder()
                    .setTitle("An error occurred")
                    .setDescription(error)
                    .setColor("#61a349")

                const replyError = {
                    content: 'There was an error while executing this command!',
                    embeds: [embed],
                    flags: MessageFlags.Ephemeral,
                }

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(replyError);
                } else {
                    await interaction.reply(replyError);
                }
            }
        }

        // Menu interactions
        if (interaction.isStringSelectMenu()) {
            const menu = interaction.client.menus.get(interaction.customId);
            console.log("[DEBUG] - Menu selected:", interaction.customId, !!menu);

            if (!menu) return;

            await menu.execute(interaction);
        }
    },
};