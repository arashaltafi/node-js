const { faker } = require('@faker-js/faker');

const connectToMongo = require('../connection_server');

let counter = 100;
let myId = 1;
const users = [];
while (counter >= 1) {
    users.push({
        id: myId,
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        sex: faker.person.sexType(),
        subscriptionTier: faker.helpers.arrayElement(['free', 'basic', 'business']),
        registeredAt: faker.date.past(),
    })
    counter--;
    myId++;
}


const insertSample = async () => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('faker');
        const result = await collection.insertMany(users);
        console.log('Query result:', result);
    } catch (error) {
        // Handle errors
        console.error('Error in someFunction:', error.message);
    }
}

insertSample();