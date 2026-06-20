const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Sequelize authenticated successfully to Supabase.');
    } catch(error) {
        console.error("Database connection error:", error);
    }
})();

module.exports = sequelize;