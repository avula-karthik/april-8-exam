const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = 3001;
const index = require('./routes/index');
const app = express();

app.use(index);
const server = http.createServer(app);
server.listen(port, () => console.log(`Activated port ${port}`));

const io = socketIo(server, { cors: { origin: '*' } });
let interval, interval2;
io.on('connection', (socket) => {
    console.log('New Socket client connected');
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1500);
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
    interval2 = setInterval(() => getApiandEmit2(socket), 2000);
    socket.on('disconect', () => {
        console.log('client Disconnected');
        clearInterval(interval2);
    });
});

const getApiAndEmit = (socket) => {
    function myRandom() {
        var randomGenerated = Math.floor(Math.random() * (100 - 1) + 1);
        return randomGenerated;
    }
    const response = myRandom();
    socket.emit('GetRandom', response);
};
const getApiandEmit2 = (socket) => {
    function myRandomQuotes() {
        var randomQuotes = [
            'work hard today, relax tomorrow',
            'Patience is the key',
            'All glitters are not gold',
            'slow and steady wins the race',
            'every dog has its day',
        ];
        var randomGenerated1 = Math.floor(Math.random() * (5 - 1) + 1);
        var randomGenerated2 = Math.floor(Math.random() * (5 - 1) + 1);
        let quotes = `
           Quote 1:  ${randomQuotes[randomGenerated1]},
           Quote 2: ${randomQuotes[randomGenerated2]}
        `;
        return quotes;
    }
    const responseQuotes = myRandomQuotes();
    socket.emit('GetQuotes', responseQuotes);
    console.log(responseQuotes);
};
