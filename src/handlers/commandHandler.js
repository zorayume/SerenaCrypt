const fs = require("fs");
const path = require("path");
const foldersPath = path.join(__dirname, '../commands');

// Get all .js extensions
function getAllJSFiles(dir) {
    let results = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const fullPath = path.join(dir, item.name);

        if (item.isDirectory()) {
            results.push(...getAllJSFiles(fullPath));
        } else if (item.isFile() && item.name.endsWith('.js')) {
            results.push(fullPath);
        }
    }
    return results;
}

module.exports = (client) => {
    const commandFiles = getAllJSFiles(foldersPath);

    for (const filePath of commandFiles) {
        const command = require(filePath);

        // Slash commands
        if ('data' in command && 'execute' in command) {
            client.slashCommands.set(command.data.name, command);
            console.log(`\x1b[33m[SLASH] - Loaded command: ${command.data.name}\x1b[0m`);
        }

        // Prefix commands
        else if ('name' in command && 'execute' in command) {
            client.prefixCommands.set(command.name, command);
            console.log(`\x1b[36m[PREFIX] - Loaded command ${command.name}\x1b[0m`);
        }

        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}