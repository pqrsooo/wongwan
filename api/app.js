const express = require('express');

const app = express();

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

module.exports = app;
