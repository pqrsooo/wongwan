const ioServer = require('socket.io');

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

  return io;
}

module.exports = createSocketServer;
