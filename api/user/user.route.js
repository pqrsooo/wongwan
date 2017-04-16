const express = require('express');
const User = require('./user.model');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      success: false,
      message: 'No username or password defined',
    });
  }

  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    const newUser = new User({
      username: req.body.username,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      chatRooms: [],
    });
    newUser.save().then((user) => {
      console.log('Successfully create new user')
      req.session.user = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      res.status(200).send({
        success: true,
        message: 'Successfully register user.',
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }).catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({
          success: false,
          message: 'This username already exists',
        });
      } else {
        res.status(400).send({
          success: false,
          message: 'Cannot create new user',
        });
      }
    });
  });
});

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      success: false,
      message: 'No username or password defined'
    });
  };
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (result) {
        const {
          username,
          firstName,
          lastName,
        } = user;
        req.session.user = {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        res.status(200).json({
          success: true,
          user: {
            username,
            firstName,
            lastName,
          },
        });
      } else {
        res.status(400).json({
          success: false,
          message: 'Invalid Password',
        });
      }
    }).catch((err) => {
      console.error(err);
      res.status(500).send({
        success: false,
        message: 'Internal Error',
      });
    });
  }).catch((err) => {
    console.error(err);
    res.status(400).send({
      success: false,
      message: 'Could not find user',
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({
    success: true,
    message: 'Successfully Log Out',
  });
});

router.get('/validate-username', (req, res) => {
  const findingUsername = req.query.username;
  User.count({
    username: findingUsername,
  }).then((count) => {
    if (count > 0) {
      // TODO: Make it more general when we have more information
      res.status(200).json({
        available: false,
        username: findingUsername,
      });
    } else {
      res.status(200).json({
        available: true,
      });
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send({
      error: 'Internal Error',
    });
  });
});



module.exports = router;
