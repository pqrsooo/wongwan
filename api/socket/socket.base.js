const ioServer = require('socket.io');
const Message = require('../message/message.model');
const userQuery = require('../user/user.query');
const chatRoomQuery = require('../chatroom/chatroom.query');
const messageQuery = require('../message/message.query');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

function createSocketServer(appServer) {
  const io = ioServer(appServer, {
    serveClient: false,
  });
  // force socket to only user 'websocket'
  io.set('transports', ['websocket']);

  // TODO: Uncomment this and  Use Redis as an Adapter for Clustering reason
  // Using Redis
  // const port = `${config.redis.port}`;
  // const host = `${config.redis.host}`;
  // const password = config.redis.password;
  // const pubClient = redis(port, host, { auth_pass: password });
  // const subClient = redis(port, host, { auth_pass: password, return_buffers: true, });
  // io.adapter(adapter({ pubClient, subClient }));

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