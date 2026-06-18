const { Events } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    once: false,

    async execute(message) {
        const client = message.client;

        if (!message.content || message.author.bot || !message.content.startsWith(client.PREFIX)) {
            return;
        }

        const args = message.content.slice(client.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const command = client.prefixCommands.get(commandName);

        if (!command || typeof command.execute !== 'function') {
            return;
        }

        try {
            await command.execute(message, args);
        } catch (error) {
            console.error(`Error executing "${commandName}":`, error);

            await message.reply({
                content: 'Something went wrong! Please try again later.'
            });
        }
    }
};