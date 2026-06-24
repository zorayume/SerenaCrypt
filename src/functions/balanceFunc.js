function getPercentage(currentExp, requiredExp) {
    if (requiredExp === 0 || requiredExp <= 0) { return 0; }
    return (currentExp / requiredExp) * 100;
}

function getLevelBar(currentExp, requiredExp) {
    const totalBar = 15;

    if (!requiredExp || requiredExp <= 0) { return "⬛".repeat(totalBar) }

    const progress = Math.min(1, currentExp / requiredExp);
    const filledBar = Math.round(totalBar * progress);
    const emptyBar = totalBar - filledBar;

    const filledChar = "▰";
    const emptyChar = "▱";

    return filledChar.repeat(filledBar) + emptyChar.repeat(emptyBar);
}

module.exports = { getPercentage, getLevelBar };