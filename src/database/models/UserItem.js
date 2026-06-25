const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserItems = sequelize.define('user_items', {
    user_id: DataTypes.STRING,
    item_id: DataTypes.INTEGER,
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
    },
}, {
    timestamps: false,
})

module.exports = UserItems;