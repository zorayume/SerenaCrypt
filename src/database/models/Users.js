const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const userIdWallet = require('../functions/userIdWallet');

const Users = sequelize.define('users', {
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

    balance: {
        type: DataTypes.BIGINT,
        defaultValue: 0
    },

    userMultiplier: {
        type: DataTypes.INTEGER,
        defaultValue: 1.00
    },

    lastDaily: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    lastEarn: {
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