const config = require('./config');
const app = require('./app');
const db = require('./db');

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
