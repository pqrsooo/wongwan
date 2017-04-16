const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const Chatroom = require('./chatroom.model');
const chatRoomQuery = require('./chatroom.query');
const userQuery = require('../user/user.query');
const utils = require('./utilities');
const router = express.Router();

//TODO - Add unauthorized middleware

// for creating new room
router.post('/create-room', (req, res) => {
  const session = req.session;
  const user = session.user;
  // will seach for objectID from username array
  // join Users should be array of User object

  const users = query.getAllUserID(req.body.joinUsers);
  const roomToken = utils.randomToken(48);
  const chatRoom = new Chatroom({
    roomName: req.body.roomName,
    roomToken: roomToken,
  });
  chatRoomQuery.saveChatRoom(chatRoom).then(data => {
    userQuery.addChatRoom(users, chatRoom).then(data => {
      res.status(200).json({
        success: true,
        message: 'Successfully create Chatroom',
        roomToken: chatRoom.roomToken,
      });
    }).catch(err => {
      console.error('Fail to addChatroom with error', err);
      res.status(400).json({
        success: false,
        message: 'Fail to create Chatroom',
      });
    });
  }).catch(err => {
    console.error('Fail to createChatroom', err);
    res.status(400).json({
      success: false,
      message: 'Fail to create Chatroom',
    });
  });
});

// for getting all the room for particular user
router.get('/get-chatroom', (req, res) => {
  const session = req.session;
  const user = session.user;


});

module.exports = router;