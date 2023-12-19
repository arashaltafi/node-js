const connectToMongo = require('./connection');


const deleteSample = async () => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('users');
        const result = await collection.deleteOne({
            age: 32
        });
        console.log('Query result:', result);
    } catch (error) {
        // Handle errors
        console.error('Error in someFunction:', error.message);
    }
}

deleteSample();