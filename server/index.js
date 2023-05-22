const http = require('http');

const server = http.createServer();

const usersData = {};

const io = require('socket.io')(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('Se conectó un cliente');

  socket.on('chat_message', (data) => {
    io.emit('chat_message', data);
  });
});

server.listen(3001);
