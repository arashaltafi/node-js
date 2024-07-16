const mongoose = require('mongoose');

const startMongoDB = async () => {
    const url = 'mongodb://127.0.0.1/graphql'
    
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(url);
        }
        return mongoose.connection;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB', error.message);
        throw error;
    }
}

module.exports = startMongoDB;