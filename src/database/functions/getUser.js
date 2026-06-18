const Users = require('../models/users');
const userIdWallet = require('./userIdWallet');

module.exports = async (userId) => {

    let user = await Users.findOne({
        where: { userId }
    })

    if (!user) {
        user = await Users.create({
            userId, userWallet: userIdWallet()
        });
    }

    if (!user.userWallet) {
        user.userWallet = userIdWallet();
        await user.save();
    }

    return user;
};