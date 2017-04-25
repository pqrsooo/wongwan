const ioServer = require('socket.io');
const config = require('../config');
const redis = require('socket.io-redis');

function createSocketServer(appServer) {
  const io = ioServer(appServer, {
    serveClient: false,
  });
  // force socket to only user 'websocket'
  // io.set('transports', ['websocket']);

  // TODO: Uncomment this and  Use Redis as an Adapter for Clustering reason
  // Using Redis
  const port = `${config.redis.port}`;
  const host = `${config.redis.host}`;
  io.adapter(redis({ host: 'redis', port: '6379' }));
  // const pubClient = redis(port, host);
  // const subClient = redis(port, host);
  // io.adapter(redis({ pubClient, subClient }));

  return io;
}

module.exports = createSocketServer;
