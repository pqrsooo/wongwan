const config = require('./config');
const app = require('./app');
const db = require('./db');
const ioServer = require('socket.io');
const http = require('http');

const appServer = http.Server(app);

const chatRoomSchema = require('./chatroom/chatroom.model');
const userSchema = require('./user/user.model');
const messageSchema = require('./message/message.model');

db.setUpDatabase().then(() => {
  appServer.listen(config.express.port, config.express.ip, (err) => {
    if (err) {
      console.error('Unable to listen for connections', err);
      process.exit(10);
    }
    console.info(`API server is listening on ${config.express.ip}:${config.express.port}`);
  });
}).catch((err) => {
  console.error('Unable to connect to database', err);
  process.exit(10);
});

const io = ioServer(appServer, { serveClient:false });
const chat = io.of('/chat');

let clientListNames = [];
let numUsers = 0;

io.on('connection', (socket) => {
  let addedUser = false;
  // emit 'new message' when user type in
  socket.on('new message', (data) => {
    const message = {
      username: socket.username,
      content: data,
      id: Date.now().toString() // TODO: Change to Mongo's _id
    };

    // We use setTimeout to simulate latency and use randomness to simulate out-of-order.
    setTimeout(() => {
      socket.broadcast.emit('new message', message)
    }, Math.round(Math.random() * 3000));

    setTimeout(() => {
      socket.emit('new message ack', {
        success: true,
        message: message
      });
    }, Math.round(Math.random() * 500) + 200);
  })

  socket.on('add user', (username) => {
    if(addedUser) return;

    socket.username = username;
    ++numUsers;
    addedUser = true;

    socket.emit('login', {
      numUsers: numUsers
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    })
  })

  socket.on('disconnect', () => {
    if(addedUser) {
      --numUsers;

      socket.broadcast.emit('user left',{
        username: socket.username,
        numUsers
      });
    }
  });

});