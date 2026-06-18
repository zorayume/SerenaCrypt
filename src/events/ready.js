const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        console.log(`\nReady! Logged in as ${client.user.tag}`);
        console.log(
            `\nLoaded Prefix:\n\x1b[32m${[...client.prefixCommands.keys()].map(commands => `!${commands}`).join(", ")}\x1b[0m
            \nLoaded Slash:\n\x1b[32m${[...client.slashCommands.keys()].map(slashCommands => `/${slashCommands}`).join(", ")}\x1b[0m`
        );
        client.user.setActivity(`Watching  ${client.guilds.cache.size} server(s)!`);
    }
}