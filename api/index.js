const config = require('./config');
const appServer = require('./app').appServer;
const db = require('./db');
const createSocketServer = require('./socket/socket.base');
const onConnect = require('./socket/socket.connect');

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

const io = createSocketServer(appServer);
io.on('connection', onConnect);

