const express = require('express');
const Chatroom = require('../chatroom/chatroom.model');
const chatRoomQuery = require('../chatroom/chatroom.query');
const userQuery = require('../user/user.query');
const messageQuery = require('./message.query');

const router = express.Router();

router.get('/get-messages', (req, res) => {
  const session = req.session;
  const user = session.user;
  const roomToken = req.body.roomToken;
  chatRoomQuery.getChatroomID(roomToken).then((roomID) => {
    messageQuery.getMessageFromRoom(roomID).then((messages) => {

    }).catch((err) => {
      console.error(err);
      res.status(400).json({
        success: false,
        message: 'Cannot Get Messages',
      });
    });
  }).catch((err) => {
    console.error(err);
    res.status(400).json({
      success: false,
      message: 'Cannot Get Chatrooms',
    })
  });

});


module.exports = router;
