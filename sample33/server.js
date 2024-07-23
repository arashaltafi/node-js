// npm i apollo-server-express
// npm i graphql-tools
// https://www.apollographql.com/docs/apollo-server/

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Define your schema
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Define your resolvers
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Initialize an Express application
const app = express();

// Apply the Apollo GraphQL middleware and set the path to /graphql
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });

    // Define the port
    const PORT = process.env.PORT || 4000;

    // Start the server
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});