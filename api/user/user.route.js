const express = require('express');
const User = require('./user.model');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const config = require('../config');

const router = express.Router();

router.post('/signup', (req, res) => {

  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      error: 'No username or password defined'
    });
  }

  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
    const newUser = new User({
      username: req.body.username,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    })
    newUser.save().then((user) => {
      console.log('Successfully create new user')
      res.status(200).send({
        message: 'success',
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      });
    }).catch((err) => {
      if (err.code === 11000) {
        res.status(400).send({
          error: 'This username already exists'
        });
      } else {
        res.status(400).send({
          error: 'Cannot create new user'
        })
      }
    });
  });
});

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      error: 'No username or password defined'
    });
  };
  User.findOne({
    username: req.body.username
  }).then((user) => {
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if(result) {
        res.status(200).json({
          message : 'Success',
          user : user
        });
      } else {
        res.status(400).json({
          error: 'Invalid Password'
        })
      }
    }).catch(err=>{
      console.error(err);
      res.status(500).send({
        error: 'Internal Error'
      })
    })
  }).catch((err) => {
    console.error(err);
    res.status(400).send({
      error: 'Could not find user'
    })
  });
});

router.get('/validateUsername', (req, res) => {
  const findingUsername = req.body.username;
  User.count({
    username: findingUsername
  }).then((count) => {
    if (count > 0) {
      //TODO - Make it more general when we have more information
      res.status(200).json({
        available: false,
        username: findingUsername
      });
    } else {
      res.status(200).json({
        available: true
      });
    }
  }).catch((err) => {
    console.error(err);
    res.status(500).send({
      error: 'Internal Error'
    });
  });
});



module.exports = router;