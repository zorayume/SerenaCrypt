const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Shows all commands',

    async execute(message) {
        const commands = message.client.prefixCommands;

        const embed = new EmbedBuilder()
            .setTitle('📚 Help Menu')
            .setDescription('Here are all available commands:')
            .setColor('#61a349');

        commands.forEach(prefixCommands => {
            embed.addFields({
                name: prefixCommands.name,
                value: prefixCommands.description || 'No description provided.',
                inline: true,
            });
        });

        await message.reply({ embeds: [embed] });
    },
};