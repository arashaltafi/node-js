//SSE Server

const express = require('express');
const app = express();
const PORT = 5000;

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Function to send a message
    const sendEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Send a message every 5 seconds
    const intervalId = setInterval(() => {
        const eventData = { message: 'Hello, SSE!', timestamp: new Date().toISOString() };
        sendEvent(eventData);
    }, 1000);

    // Cleanup on client disconnect
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
