const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        console.log(`\nReady! Logged in as ${client.user.tag}`);
        console.log(
            "\nLoaded Prefix:\n", [...client.prefixCommands.keys()], "\nLoaded Slash:\n", [...client.slashCommands.keys()]
        );
        client.user.setActivity(`Watching  ${client.guilds.cache.size} server(s)!`);
    }
}