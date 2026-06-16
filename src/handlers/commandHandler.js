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
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`[COMMANDS] - Loaded command: ${command.data.name}`);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}