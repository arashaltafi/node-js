// npm i apollo-server-express
// npm i graphql-tools
// https://www.apollographql.com/docs/apollo-server/

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const PORT = process.env.PORT || 4000;

// Define your schema
const typeDefs = gql`
    type User {
        _id: ID
        name: String!
        family: String
        age: Int
    }

    type AAA {
        name: String
    }

    type Query {
        arash: AAA
        users: [User]
        user(id: Int!): User
    }

    type Mutation {
        createUser(name: String!, family: String, age: Int): User
    }
`;

// Define your resolvers
const resolvers = {
    Query: {
        arash: async () => {
            return {
                name: 'arash123'
            }
        },
        users: async () => {
            return [
                {
                    _id: '1',
                    name: 'name1',
                    family: 'family1',
                    age: 1
                }, {
                    _id: '2',
                    name: 'name2',
                    family: 'family2',
                    age: 2
                }, {
                    _id: '3',
                    name: 'name3',
                    family: 'family3',
                    age: 3
                }
            ]
        },
        user: async (obj, args, context) => {
            console.log('obj:', obj)
            console.log('args:', args)
            console.log('token:', context.token)
            console.log('theme:', context.theme)
            console.log('-------------------')
            return {
                _id: args.id,
                name: 'name1',
                family: 'family1',
                age: 1
            }
        },
    },
    Mutation: {
        createUser: async (obj, args, context) => {
            return {
                _id: 1,
                name: args.name,
                family: args.family,
                age: args.age
            }
        }
    }
};

// Create an instance of ApolloServer
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // return req
        return {
            token: req.headers.token,
            theme: req.headers.theme,
        };
    }
});
// Initialize an Express application
const app = express();

app.get('/document', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(
        `<html>
         <head>
           <title>GraphiQL</title>
           <link rel="stylesheet" href="https://unpkg.com/graphiql/graphiql.css" />
           <script src="https://unpkg.com/react/umd/react.development.js" crossorigin></script>
           <script src="https://unpkg.com/react-dom/umd/react-dom.development.js" crossorigin></script>
           <script src="https://unpkg.com/graphiql/graphiql.min.js"></script>
         </head>
         <body>
           <div id="graphiql" style="height: 100vh;"></div>
           <script>
             const fetcher = GraphiQL.createFetcher({ url: http://localhost/:${PORT}/graphql });
             ReactDOM.render(
               React.createElement(GraphiQL, { fetcher }),
               document.getElementById('graphiql')
             );
           </script>
         </body>
       </html>`
    );
})

// Apply the Apollo GraphQL middleware and set the path to /graphql
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });

    // Start the server
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});