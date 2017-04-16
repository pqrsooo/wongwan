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

  userQuery.getAllUserID(req.body.joinUsers).then((users) => {
    utils.randomToken(48).then((buf) => {
      console.log(buf);
      const chatRoom = new Chatroom({
        roomName: req.body.roomName,
        roomToken: buf.toString('hex'),
      });
      chatRoom.save().then((room) => {
        userQuery.addChatRoom(users, room.roomToken).then((data) => {
          res.status(200).json({
            success: true,
            message: 'Successfully create Chatroom',
            roomToken: room.roomToken,
          });
        }).catch((err) => {
          console.error('Fail to addChatroom with error', err);
          res.status(400).json({
            success: false,
            message: 'Fail to create Chatroom',
          });
        });
      }).catch((err) => {
        console.error('Fail to createChatroom', err);
        res.status(400).json({
          success: false,
          message: 'Fail to create Chatroom',
        });
      });
    });
  }).catch((err) => {
    if (err.code === 11000) {
      res.status(400).send({
        success: false,
        message: 'RoomToken Already used, Please try again',
      });
    } else {
      res.status(400).send({
        success: false,
        message: 'Cannot create new Chatroom',
      });
    }
  });
});

// for getting all the room for particular user
router.get('/get-chatroom', (req, res) => {
  const session = req.session;
  const user = session.user;
  res.status(200).json({
    message: "This will soon return chatroom",
  })
});

module.exports = router;
