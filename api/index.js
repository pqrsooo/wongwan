const config = require('./config');
const app = require('./app');
const db = require('./db');
const ioServer = require('socket.io');

db.setUpDatabase().then(() => {
  app.listen(config.express.port, config.express.ip, (err) => {
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

const io = ioServer(app.server);
const chat = io.of('/chat');

let clientListNames = [];
let numUsers = 0;

io.on('connection', (socket) => {
  let addedUser = false;

  socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    })
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