// User defined function 
exports.randomToken = (size) => {
  const crypto = require('crypto');
  crypto.randomBytes(size, (err, buf) => {
    return buf.toString('hex');
  })
};