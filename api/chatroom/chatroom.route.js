const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const Chatroom = require('./chatroom.model');
const router = express.Router();

//TODO - Add unauthorized middleware

// for creating new room
router.post('/create-room', (req, res) => {
  const session = req.session;
  const user = session.user;
  const users = req.body.users;

  const chatRoom = new Chatroom({
    room:,
    token:,
    users: users
  });

});

// for getting all the room for particular user
router.get('/get-chatroom', (req, res) => {
  const session = req.session;
  const user = session.user;



});


module.exports = router;