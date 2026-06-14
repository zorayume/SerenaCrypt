const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,

    async execute(member) {
        const channel = member.guild.channels.cache.get('1310056453310251018');

        if (!channel) return;

        const welcomeMessages = [
            `Welcome ${member.user} (${member.user.username}) to the server!`,
            `Heya ${member.user} (${member.user.username})! We hope you are having fun here!`,
            `A wild ${member.user} (${member.user.username}) is here! Let's develop!`,
            `Another cool member, like ${member.user} (${member.user.username}), has spawned!`,
            `${member.user} (${member.user.username}) has joined the server!`
        ];

        const randomMessage =
            welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setDescription(randomMessage)
            .setTimestamp();

        await channel.send({ embeds: [embed] });
    }
};