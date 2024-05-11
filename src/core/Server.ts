import WebSocket, { Data } from 'ws';
import express from 'express';

const app = express();
app.use(express.static('public'));

const server = app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');

    ws.on('message', (message: Data) => {
        console.log(`Received message: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
