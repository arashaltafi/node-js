const connectToMongo = require('./connection');


const insertSample = async () => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('users');
        const result = await collection.insertOne({
            name: "jafar",
            family: "jafari",
            age: 32,
            filed: "developer"
        });
        console.log('Query result:', result);
    } catch (error) {
        // Handle errors
        console.error('Error in someFunction:', error.message);
    }
}

insertSample();