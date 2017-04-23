const express = require('express');
const chatRoomQuery = require('../chatroom/chatroom.query');
const messageQuery = require('./message.query');

const router = express.Router();

router.get('/get-messages', (req, res) => {
  const session = req.session;
  const user = session.user;
  const roomToken = req.query.roomToken;
  chatRoomQuery.getChatroom(roomToken).then((room) => {
    messageQuery.getMessageFromRoom(room._id).then((messages) => {
      res.status(200).json({
        success: true,
        messages,
        lastSeenMessage: room.lastSeenMessage,
      });
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
    });
  });
});


module.exports = router;
