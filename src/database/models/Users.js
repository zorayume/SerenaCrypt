const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const userIdWallet = require('../functions/userIdWallet');

const Users = sequelize.define('users', {
    // User ID Data
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },

    userWallet: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },

    // User Balance Data

    userBalance: {
        type: DataTypes.BIGINT,
        defaultValue: 0
    },

    userLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    userExp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: true
    },

    // Boosting data

    userMultiplier: {
        type: DataTypes.INTEGER,
        defaultValue: 1.00
    },

    // Statistics Data
    userMineCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },

    // Cooldown Data

    userLastDaily: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    userLastEarn: {
        type: DataTypes.DATE,
        allowNull: true,
    },

}, {
    hooks: {
        beforeValidate: (user) => {
            if (!user.userWallet) {
                user.userWallet = userIdWallet();
            }
        }
    }
});

module.exports = Users;