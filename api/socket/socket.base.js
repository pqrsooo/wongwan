const ioServer = require('socket.io');

io.on('connection', (socket) => {
  let addedUser = false;
  // emit 'new message' when user type in
  socket.on('new message', (data) => {
    const message = {
      username: socket.username,
      content: data,
      id: Date.now().toString(), // TODO: Change to Mongo's _id
    };

    // We use setTimeout to simulate latency and use randomness to simulate out-of-order.
    setTimeout(() => {
      socket.broadcast.emit('new message', message);
    }, Math.round(Math.random() * 3000));

    setTimeout(() => {
      socket.emit('new message ack', {
        success: true,
        message,
      });
    }, Math.round(Math.random() * 500) + 200);
  });

  socket.on('add user', (username) => {
    if (addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;

    socket.emit('login', {
      numUsers,
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers,
    });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username,
    });
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username,
    });
  });

  socket.on('disconnect', () => {
    if (addedUser) {
      numUsers--;
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers,
      });
    }
  });
});