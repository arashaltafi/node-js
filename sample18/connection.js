const { MongoClient } = require('mongodb');

const connectToMongo = async () => {
    const client = new MongoClient("mongodb://127.0.0.1:27017/shop");

    try {
        await client.connect();
        console.log('MongoDB connected successfully!!!');
        return client.db();
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB', error.message);
        throw error;
    }
};

module.exports = connectToMongo;