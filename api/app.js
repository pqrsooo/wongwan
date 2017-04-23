const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const config = require('./config');
const unauthorizedFunc = require('./middleware/unauthorized');
const http = require('http');

const app = express();
const appServer = http.Server(app);
const client = redis.createClient('6379', 'redis');

// Use redis store as the store of express-session
// TODO - move secret to config
app.use(session({
  store: new RedisStore({
    host: `${config.redis.host}`,
    port: `${config.redis.port}`,
    client,
    ttl: 60 * 60 * 24,
  }),
  secret: 'wongwanSecret',
  cookie: { path: '/', httpOnly: true, secure: false, maxAge: null },
}));

// Add bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.get('/api/restricted', unauthorizedFunc.restrict, (req, res) => {
  res.status(200).json({
    isLogin: true,
    message: 'Already logged in',
    user: req.session.user,
  });
});

app.use('/api/user', require('./user/user.route'));
app.use('/api/chatroom', require('./chatroom/chatroom.route'));

module.exports = {
  app,
  appServer,
};

