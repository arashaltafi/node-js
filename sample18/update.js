const connectToMongo = require('./connection');

const updateSample = async () => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('users');
        const result = await collection.updateOne({
            age: 32
        }, {
            $set: {
                name: "updatedName",
                family: "updated family"
            }
        });
        console.log('Query result:', result);
    } catch (error) {
        // Handle errors
        console.error('Error in someFunction:', error.message);
    }
}

updateSample();