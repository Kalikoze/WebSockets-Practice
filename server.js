const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  io.emit('logged in', 'A new user signed on.')

  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    io.emit('logged out', 'A user logged out.')
  })

  socket.on('typing', msg => {
    io.emit('is typing', msg)
  })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
