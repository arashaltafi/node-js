const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Function to send a message
    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Send a message every 10 seconds
    const intervalId = setInterval(() => {
      const eventData = { message: 'Hello, SSE!', timestamp: new Date().toISOString() };
      sendEvent(eventData);
    }, 10000);

    // Cleanup on client disconnect
    req.on('close', () => {
      clearInterval(intervalId);
      res.end();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
