const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const getUser = require('../../../database/functions/getUser');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance').setDescription('Checks your current balance.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription("User you want to check.")
                .setRequired(false)
        ),

    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;

        if (target.bot) return interaction.reply({ content: "Bots data are disabled", ephemeral: true })

        const user = await getUser(target.id);
        const walletShorten = user.userWallet.slice(0, 14) + "..." + user.userWallet.slice(-7);

        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s Balance`)
            .setDescription(`${target.displayName} have \` ${user.balance} \` test token`)
            .addFields({
                name: `EVM Address`,
                value: `\`\`\` ${walletShorten} \`\`\``,
            })
            .setColor("#ff0303")
            .setTimestamp()

        const sendButton = new ButtonBuilder().setLabel('Send Another Wallet').setStyle(ButtonStyle.Secondary).setCustomId(`buttonSendWallet:${target.id}`);
        const toggleButton = new ButtonBuilder().setLabel('Toggle Address Visibility').setStyle(ButtonStyle.Secondary).setCustomId('buttonToggleAddressVisibility');

        const buttonRow = new ActionRowBuilder().addComponents(sendButton, toggleButton);
        await interaction.reply ({
            embeds: [embed],
            components: [buttonRow]
        })
    },
}