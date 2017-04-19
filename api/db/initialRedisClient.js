const Promise = require('bluebird');
const redis = require('redis');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient('6379', 'redis');

client.on('error', (err) => {
  console.error('Error ', err);
});

module.exports = client;
