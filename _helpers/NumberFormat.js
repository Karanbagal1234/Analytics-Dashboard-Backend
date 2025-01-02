function formatStatusNumber(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(1) + 'b'; // Billion
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(1) + 'm'; // Million
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(1) + 'k'; // Thousand
    }
    return number.toString(); // No format needed
}

export default formatStatusNumber;