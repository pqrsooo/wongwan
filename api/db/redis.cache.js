const client = require('./initialRedisClient');
const mongoose = require('mongoose');

function setValue(key, value, lifetime) {
  const promise = client.setAsync(key, value).then((res) => {
    console.log('Redis Setkey: ', res);
    client.expireAsync(key, lifetime).then((res) => {
      console.log('Redis Set Expire ', res);
    }).catch((err) => {
      console.error('Cannot Set Key', err);
    });
  }).catch((err) => {
    console.error('Cannot Set lifetime', err);
  });
  return promise;
}

function getValue(key) {
  const promise = client.getAsync(key).then((res) => {
    return res;
  }).catch((err) => {
    console.error(err);
  });
  return promise;
}

module.exports = {
  setValue,
  getValue,
};
