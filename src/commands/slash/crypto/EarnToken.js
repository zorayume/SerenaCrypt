const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const getUser = require("../../../database/functions/getUser");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("earn-token")
        .setDescription("Earn your token per day"),

    async execute(interaction) {
        try {
            const user = await getUser(interaction.user.id);
            const cooldown = 60 * 60 * 1000; // 1 hour
            const rewards = Math.floor(Math.random() * 91) + 10;

            if (user.lastEarn) {
                const expires = user.lastEarn.getTime() + cooldown;
                const remaining = expires - Date.now();
                const hours = Math.floor(remaining / 1000 / 60 / 60)
                const minutes = Math.floor(remaining / 1000 / 60) % 60;

                if (Date.now() < expires) {
                    return interaction.reply({ content: `You have earned tokens today! Come back in \`${hours}h ${minutes}m\`!` })
                }
            }

            user.balance = (
                BigInt(user.balance) + BigInt(rewards)
            ).toString();
            user.lastEarn = new Date();

            await user.save();

            const embed = new EmbedBuilder()
                .setTitle("Earning Token...")
                .setDescription(`Horray! you got ${rewards} test tokens!`)
                .setColor("#70ff44")
                .setTimestamp();

            interaction.reply({ embeds: [embed] })
        } catch (error) {
            let errorEmbed = new EmbedBuilder()
                .setTitle("Well.. That was bad")
                .setDescription(`${error}`)
                .setColor("#ff0000")
                .setTimestamp();

            interaction.reply({embeds: [errorEmbed] });
        }
    }
}