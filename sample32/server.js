// GraphQl
// npm i graphql graphql-http

const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const { schema } = require('./schema');
const { schemaSDL } = require('./schema-sdl');
const connectToMongo = require('./config/mongo')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

connectToMongo();

const PORT = 5000;

app.get('/', (req, res) => {
    return res.status(200).send({
        message: 'wellcome to graphql api'
    })
})

app.use('/graphql-sdl', createHandler({
    schema: schemaSDL,
    rootValue: {
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
        user: async (args) => {
            return {
                _id: args.id,
                name: 'name1',
                family: 'family1',
                age: 1  
            }
        },
        createUser: async (args) => {
            return {
                _id: 1,
                name: args.name,
                family: args.family,
                age: args.age
            }
        }
    },
    context: (req) => {
        // return req
        return {
            token: req.headers.token,
            theme: req.headers.theme,
        }
    }
}))

app.use('/graphql', createHandler({
    schema, context: (req) => {
        // return req
        return {
            token: req.headers.token,
            theme: req.headers.theme,
        }
    }
}))

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

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});