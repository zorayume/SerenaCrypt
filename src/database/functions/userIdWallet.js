const hexChars = "0123456789abcdef";

// generate randomized hex with specific length
const makeHex = (length) => Array.from(
    { length },
    () => hexChars[Math.floor(Math.random() * 16)]
).join("");

module.exports = function userIdWallet() {
    return "0x" + makeHex(40);
}