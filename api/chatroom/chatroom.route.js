const express = require('express');
const mongoose = require('mongoose');
const config = require('../config');
const Chatroom = require('./chatroom.model');
const chatRoomQuery = require('./chatroom.query');
const userQuery = require('../user/user.query');
const utils = require('./utilities');
const redisClient = require('../db/redis.cache');

const router = express.Router();

// TODO - Add unauthorized middleware
// for creating new room 
// parameter roomName , array of username
router.post('/create-room', (req, res) => {
  const session = req.session;
  const user = session.user;
  const joinUsers = req.body.joinUsers;
  joinUsers.push(user.username);
  const uniqueJoins = utils.uniqueArray(joinUsers);
  // will seach for objectID from username array
  // join Users should be array of User object
  userQuery.getAllUserIDFromUsernames(uniqueJoins).then((users) => {
    utils.randomToken(48).then((buf) => {
      const chatRoom = new Chatroom({
        roomName: req.body.roomName,
        roomToken: buf.toString('hex'),
      });
      chatRoom.save().then((room) => {
        userQuery.addChatRoom(users, room).then((data) => {
          redisClient.setValue(room.roomToken, room.id, 60 * 60).then(() => {
            res.status(200).json({
              success: true,
              message: 'Successfully create Chatroom',
              roomToken: room.roomToken,
            });
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
  userQuery.getUserFromUsername(session.user.username).then((user) => {

    res.status(200).json({
      chatRooms: user.chatRooms,
    });
  }).catch((err) => {
    res.status(400).json({
      success: false,
      message: 'Cannot get ChatRooms',
      err,
    });
  });
});
// for getting all the users in the specify room
router.get('/get-users', (req, res) => {
  if (!req.body.roomToken) {
    res.send(400).json({
      success: false,
      message: 'Fail to get chatroom',
    });
  }
  chatRoomQuery.getChatroomID(req.body.roomToken).then((roomID) => {
    userQuery.getUserFromChatRoom(roomID).then((users) => {
      const usrs = utils.getUserInterfaceKey(users);
      res.status(200).json({
        usrs,
      });
    }).catch((err) => {

    });
  }).catch((err) => {
    console.error(err);
    res.status(400).json({
      success: false,
      message: 'Cannot get users',
    });
  });
});

module.exports = router;