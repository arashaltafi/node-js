const connectToMongo = require('./connection');

const findSample = async () => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('sample');
        const result = await collection.find({ price: { $gt: 2000 } }, { name: 1 }).toArray();
        console.log('Query result:', result.map((res) => ({
            name: res.name,
            price: res.price
        })));
    } catch (error) {
        // Handle errors
        console.error('Error in someFunction:', error.message);
    }
}

findSample();