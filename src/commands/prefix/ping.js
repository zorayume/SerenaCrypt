module.exports = {
    name: 'ping',
    description: 'Checks the current client ping',

    async execute(message, args) {
        const sentMessage = await message.reply('Pinging...');

        const latency = sentMessage.createdTimestamp - message.createdTimestamp;
        const apiPing = Math.round(message.client.ws.ping);

        await sentMessage.edit(`🏓 **Pong!**\n• **Bot Latency:** ${latency}ms\n• **API Ping:** ${apiPing}ms`);
    },
}