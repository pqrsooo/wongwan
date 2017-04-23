const crypto = require('crypto');

exports.randomToken = size => new Promise((resolve, reject) => {
  crypto.randomBytes(size, (err, buf) => {
    if (err) return reject(err);
    return resolve(buf);
  });
});

exports.uniqueArray = (arr) => {
  const uset = new Set(arr);
  return [...uset];
};
