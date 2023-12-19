const mongoose = require('mongoose');
const { MONGO_DBNAME, MONGO_PORT, MONGO_HOST } = process.env;

const startMongoDB = async () => {
    const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
    const url2 = "mongodb://root:gy1tIo4FOinBwnFDNqfTDb3K@robin.iran.liara.ir:32179/my-app?authSource=admin"

    try {
        await mongoose.connect(url2);
        console.log('MongoDB connected successfully ...');
        return mongoose.connection;
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB', error.message);
        throw error;
    }
};

module.exports = startMongoDB