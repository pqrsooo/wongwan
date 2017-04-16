const mongoose = require('mongoose');
const ChatRoom = require('./chatroom.model');

exports.saveChatRoom = (chatRoom) => {
  chatRoom.save().then(room => {
    console.log('Successfully create ChatRoom')
    res.send(200).json({
      success : true,
      roomName: ChatRoom.roomName,
      roomToekn: ChatRoom.roomToken,
    })
  }).catch(err => {
    console.log('Fail to create ChatRoom');
    res.send(400).json({
      success: false,
      message: 'Cannot Create ChatRoom'
    });
  });
};

