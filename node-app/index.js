const express = require('express');
const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server)

// https://socket.io/get-started/chat#Emitting-events

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });    
});


app.get('/', (request, response) => {
  // response.send('<h1>Hello world</h1>');
  response.sendFile(__dirname + '/index.html')
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});