require('dotenv').config();

// Required Package
const { Client, Collection, GatewayIntentBits } = require('discord.js');

// Import Object
const { TOKEN, PREFIX } = process.env;

// Client Intents
const client = new Client({ intents:
        [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers]
});

// Sequelize init
const sequelize = require('./src/database/database');

client.prefixCommands = new Collection(); // Prefix
client.slashCommands = new Collection(); // Slash
client.menus = new Collection(); // Menu handler
client.buttons = new Collection(); // Button handler
client.PREFIX = process.env.PREFIX;

// Load Commands
const loadCommands = require('./src/handlers/commandHandler');
const loadEvents = require("./src/handlers/eventHandler");
const loadMenus = require("./src/handlers/components/menu/menuHandler");
const loadButtons = require("./src/handlers/components/button/buttonHandler");

// Initialize
(async () => {
    await loadCommands(client);
    console.log("================");
    await loadEvents(client);
    console.log("================");
    await loadMenus(client);
    console.log("================");
    await loadButtons(client);
    console.log("================");
    await sequelize.sync({ alter: true });
    await client.login(TOKEN);
})();