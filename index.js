require('dotenv').config();

// Required Package
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Import Object
const { TOKEN } = process.env;

// Client Intents
const client = new Client({ intents:
        [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

client.commands = new Collection();
client.menus = new Collection();

// Load Commands
const loadCommands = require('./src/handlers/commandHandler');
const loadEvents = require("./src/handlers/eventHandler");
const loadMenus = require("./src/handlers/components/menu/menuHandler");

// Initialize
(async () => {
    await loadCommands(client);
    await loadEvents(client);
    await loadMenus(client);
    await client.login(TOKEN);
})();