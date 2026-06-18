const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const getUser = require("../../../database/functions/getUser");

module.exports = {
    data: new SlashCommandBuilder().setName('daily').setDescription('Claims your daily reward'),

    async execute(interaction) {
        try {
            const user = await getUser(interaction.user.id);
            const cooldown = 24 * 60 * 60 * 1000; // 24 hours
            const rewards = Math.floor(Math.random() * 90) + 10;

            if (user.lastDaily) {
                const expires = user.lastDaily.getTime() + cooldown;

                const remaining = expires - Date.now();
                const hours = Math.floor(remaining / 1000 / 60 / 60)
                const minutes = Math.floor(remaining / 1000 / 60) % 60;

                if (Date.now() < expires) {
                    return interaction.reply({
                        content: `You have claimed today! Come back in \`${hours}h ${minutes}m\`!`,
                    })
                }
            }

            user.balance = (
                BigInt(user.balance) + BigInt(rewards)
            ).toString();

            user.lastDaily = new Date();

            await user.save();

            interaction.reply({
                content: `You have claimed ${rewards} test tokens!`
            });
        } catch (error) {
            interaction.reply({
                content: `${error}`,
            })
        }
    }
}