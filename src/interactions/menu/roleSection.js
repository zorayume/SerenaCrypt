module.exports = {
    name: "roleSection",

    async execute(interaction) {
        const roleMap = {
            "gaming": "1516448828436386032",
            "interest": "1516448864339755139",
            "collection": "1516448911269695598"
        }

        const member = interaction.member;

        // Searching the roleId specified in the roleMap and checks if the user has the role and if so it will be removed
        for (const roleId of Object.values(roleMap)) {
            if (member.roles.cache.has(roleId) && !interaction.values.some(value => roleMap[value] === roleId)) {
                await member.roles.remove(roleId);
            }
        }

        // Loops the selected value of the menu and checks if the user isnt have the selected role.
        for (const selected of interaction.values) {
            const roleId = roleMap[selected];

            if (roleId && !member.roles.cache.has(roleId)) {
                await member.roles.add(roleId);
            }
        }

        await interaction.reply({
            content: "Roles have been updated!",
            ephemeral: true,
        })
    }
}