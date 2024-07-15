// npm i fastify
const Fastify = require('fastify')

const fastify = Fastify({
  logger: true
})

let items = [];

// GET method
fastify.get('/get', async (request, reply) => {
  reply.status(200).send({
    message: 'get method',
    statusCode: 200,
    data: items
  });
});

// GET method Query
fastify.get('/getQuery', async (request, reply) => {
  const query = request.query
  reply.status(200).send({
    message: 'get method with query',
    statusCode: 200,
    query: query
  });
});

// GET method Params
fastify.get('/getParams/:id', async (request, reply) => {
  const params = request.params
  reply.status(200).send({
    message: 'get method with params',
    statusCode: 200,
    params: params
  });
});

// POST method
fastify.post('/post', async (request, reply) => {
  const item = request.body;
  items.push(item);
  reply.status(201).send({
    message: 'post method',
    statusCode: 201,
    data: item
  });
});

// DELETE method
fastify.delete('/delete/:id', async (request, reply) => {
  const { id } = request.params;
  items = items.filter(item => item.id !== id);
  reply.status(200).send({
    message: 'delete method',
    statusCode: 200,
    data: items
  });
});

// PATCH method
fastify.patch('/patch', async (request, reply) => {
  const { id } = request.query;
  const updates = request.body;
  let item = items.find(item => item.id === id);

  if (item) {
    item = { ...item, ...updates };
    items = items.map(i => (i.id === id ? item : i));
    reply.status(200).send({
      message: 'delete method',
      statusCode: 200,
      data: item
    });
  } else {
    reply.status(404).send({
      message: 'delete method',
      statusCode: 404,
      data: 'Item not found'
    });
  }
});

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})