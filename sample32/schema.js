const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const usersData = require('./usersData');

const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        family: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
    },
})

const rootQuery = new GraphQLObjectType({
    name: 'Root',
    fields: {
        users: {
            type: new GraphQLList(userType),
            resolve: () => {
                return usersData
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: rootQuery
});

module.exports = {
    schema
}