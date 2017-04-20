const mongoose = require('mongoose');
const Message = require('./message.model');
const User = require('../user/user.model');
const queryChatroom = require('../chatroom/chatroom.query');
const redisClient = require('../db/redis.cache');
const Promise = require('bluebird');
const ObjectId = mongoose.Schema.Types.ObjectId;

function saveMsgToDB(userID, roomID, message) {
  const msg = new Message({
    message,
    userID,
    roomID,
  });
  const promise = msg.save().then((data) => {
    console.log('Successfully Save Message : ', data.message);
    return data.message;
  }).catch((err) => {
    console.error('Error while save roomID ', err);
  });
  return promise;
}

function saveMessage(user, roomToken, message) {
  redisClient.getValue(roomToken).then((response) => {
    if (!response) {
      queryChatroom.getChatroomID(roomToken).then((roomID) => {
        return saveMsgToDB(user.userID, roomID, message);
      }).catch((err) => {
        return console.error('Error while get roomID ', err);
      });
    } else {
      return saveMsgToDB(user.userID, ObjectId(response), message);
    }
    
  });
}

module.exports = {
  saveMessage,
};