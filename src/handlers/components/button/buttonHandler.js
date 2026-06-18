const fs = require('fs');
const path = require('path');

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
    const buttonPath = path.join(__dirname, '../../../interactions/button');

    const buttonFiles = getAllJSFiles(buttonPath);

    for (const filePath of buttonFiles) {
        const button = require(filePath);

        client.buttons.set (
            button.name,
            button
        );

        console.log(`[BUTTONS] - Loaded ${button.name}`);
    }
}