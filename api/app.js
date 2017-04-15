const express = require('express');

const app = express();

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.use('/api/user', require('./user/user.route'))

module.exports = app;
