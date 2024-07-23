const { buildSchema } = require('graphql');

const schemaSDL = buildSchema(`
    type User {
        _id: ID
        name: String!
        family: String
        age: Int
    }
    
    type RootQuery {
        users: [User]!
        user(id: Int!): User
    }

    type RootMutation {
        createUser(name: String!, family: String, age: Int): User
    }

    schema { 
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = {
    schemaSDL
}