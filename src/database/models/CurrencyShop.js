const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CurrencyShop = sequelize.define('cryptocurrency_shop', {
    itemName: {
        type: DataTypes.STRING,
        unique: true,
    },
    itemCost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    itemDescription: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    itemUsage: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    timestamps: false,
})

module.exports = CurrencyShop;