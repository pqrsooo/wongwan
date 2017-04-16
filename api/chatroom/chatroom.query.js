const mongoose = require('mongoose');
const ChatRoom = require('./chatroom.model');

// TODO: Function will be added soon
exports.getChatroomID = (roomToken) => {
  const promise = ChatRoom.findOne({
    roomToken,
  });
  return promise;
};
