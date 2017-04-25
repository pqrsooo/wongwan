const config = require('./config');
const appServer = require('./app').appServer;
const appSession = require('./app').appSession;
const db = require('./db');
const createSocketServer = require('./socket/socket.base');
const onConnect = require('./socket/socket.connect').onConnect;

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

io.set('authorization', (handshake, accept) => {
  appSession(handshake, {}, (err) => {
    if (err) return accept(err);
    const session = handshake.session;
    // check the session is valid
    // accept(null, session.userid != null);
    accept(null, true);
  });
});

io.on('connection', onConnect);

