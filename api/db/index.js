const Promise = require('bluebird');
const mongoose = require('mongoose');
const config = require('../config');

let isDatabaseSetUp = false;

function setUpDatabase() {
  if (isDatabaseSetUp) {
    return Promise.resolve();
  }

  isDatabaseSetUp = true;
  mongoose.Promise = Promise;

  const mongoURI = `${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;
  console.info('Connecting to MongoDB server', { connectionString: mongoURI });
  return mongoose.connect(mongoURI);
}

module.exports = {
  setUpDatabase,
};
