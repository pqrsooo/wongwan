const crypto = require('crypto');

exports.randomToken = (size) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) return reject(err);
      return resolve(buf);
    });
  });
};
