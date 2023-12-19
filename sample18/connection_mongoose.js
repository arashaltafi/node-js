const mongoose = require('mongoose');

const connectToMongoose = async () => {
    const url = 'mongodb://127.0.0.1:27017/shop';

    try {
        await mongoose.connect(url);
        console.log('MongoDB connected successfully!!!');
        return mongoose.connection;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB', error.message);
        throw error;
    }
};

module.exports = connectToMongoose;
