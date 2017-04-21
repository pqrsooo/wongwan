const crypto = require('crypto');

exports.randomToken = (size) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) return reject(err);
      return resolve(buf);
    });
  });
};

exports.uniqueArray = (arr) => {
  const uset = new Set(arr);
  return [...uset];
};

exports.getUserInterfaceKey = (arr) => {
  const users = [];
  for (let i = 0; i < arr.length; i++) {
    const {username, firstName, lastName} = arr[i];
    users.push({username, firstName, lastName});
  }
  return users;
};
