const mongoose = require('mongoose');
const ChatRoom = require('../chatroom/chatroom.model');
const User = require('../user/user.model');

const getUser = (username) => {
  const userPromise = User.findOne({
    username: username
  })
  return userPromise;
};


exports.getAllUserID = (users) => {
  const userIDArr = users.map((user) => {
    return getUser(username);
  });
  const results = Promise.all(userIDArr);
  return results;
};

// This return Promise
const updateUserChatRoom = (username, roomID) => {
  const userPromise = User.findOneAndUpdate(
    {username: username}, 
    { $push: { chatRoom: { roomID: roomID, lastSeenMessage: null}}}
  )
  return userPromise;
}

exports.addChatRoom = (users, roomID) => {
  const updatedUsers = users.map(user => {
    return updateUserChatRoom(user.username, roomID)
  });
  const results = Promise.all(updatedUsers);
  return results;
};