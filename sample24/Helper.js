const generateRandomNumber = () => {
    const min = 1000000000; // Minimum 10-digit number
    const max = 9999999999; // Maximum 10-digit number

    // Generate a random number within the specified range
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    generateRandomNumber
}