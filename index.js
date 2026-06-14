require('dotenv').config();
// Package
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');


// Import Obj
const { TOKEN, CLIENT_ID } = process.env;


// Client Intents
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();

// Load Commands
const loadCommands = require('./src/handlers/commandHandler');
const loadEvents = require("./src/handlers/eventHandler");

(async () => {
    await loadCommands(client);
    await loadEvents(client);
    await client.login(TOKEN);
})();