const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://arashaltafinahad:4Mh13KEjsAj4Yjhh@cluster0.dxai2re.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

const connectToMongo = async () => {
    try {
        await client.connect();
        client.db("test");
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB', error.message);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = connectToMongo;
