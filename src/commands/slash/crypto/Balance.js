const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const getUser = require('../../../database/functions/getUser');
const { getPercentage, getLevelBar } = require("../../../functions/balanceFunc");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance').setDescription('Checks your current balance.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription("User you want to check.")
                .setRequired(false)
        ),

    async execute(interaction) {
        try {
            const target = interaction.options.getUser('user') ?? interaction.user;

            if (target.bot) return interaction.reply({content: "Bots data are disabled", ephemeral: true})

            const user = await getUser(target.id);
            const walletShorten = user.userWallet.slice(0, 14) + "..." + user.userWallet.slice(-7);

            const expReq = Math.floor((user.userLevel ** 2) * 100);
            const bar = getLevelBar(user.userExp, expReq);
            const progressPercentage = getPercentage(user.userExp, expReq).toFixed(2);

            const embed = new EmbedBuilder()
                .setTitle(`${target.username}'s Balance`)
                .setDescription(`${target.displayName} have \` ${user.userBalance} \` test token`)
                .addFields({
                    name: `EVM Address`,
                    value: `\`\`\` ${walletShorten} \`\`\``,
                })
                .addFields({
                    name: `Level ${user.userLevel} - ${user.userExp} / ${expReq}・x${user.userMultiplier}`,
                    value: `${bar} (${progressPercentage}%)`,
                })
                .setColor("#ff0303")
                .setTimestamp()

            const sendButton = new ButtonBuilder().setLabel('Send Another Wallet').setStyle(ButtonStyle.Secondary).setCustomId(`buttonSendWallet:${target.id}`);
            const toggleButton = new ButtonBuilder().setLabel('Toggle Address Visibility').setStyle(ButtonStyle.Secondary).setCustomId('buttonToggleAddressVisibility');

            const buttonRow = new ActionRowBuilder().addComponents(sendButton, toggleButton);
            await interaction.reply({
                embeds: [embed],
                components: [buttonRow]
            })
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setDescription(`Failed to retrieve balance.`)
                .setColor("#ff0303")

            await interaction.reply({
                embeds: [errorEmbed],
            });
        }
    },
}