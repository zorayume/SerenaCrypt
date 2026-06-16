const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const menuPath = path.join(
        __dirname, "../../../interactions/menu"
    );

    const menuFiles = fs.readdirSync(menuPath).filter(file => file.endsWith(".js"));

    for (const file of menuFiles) {
        const menu = require(path.join(menuPath, file));

        client.menus.set (
            menu.name,
            menu
        );

        console.log(`[MENUS] - Loaded ${menu.name}`);
    }
};