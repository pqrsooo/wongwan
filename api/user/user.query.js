const mongoose = require('mongoose');
const ChatRoom = require('../chatroom/chatroom.model');
const User = require('../user/user.model');

const getUser = (username) => {
  const userPromise = User.findOne({
    username,
  });
  return userPromise;
};

exports.getUserFromUsername = (username) => {
  return getUser(username);
};
// users shoud be type array
exports.getAllUserID = (users) => {
  const userIDArr = users.map((user) => {
    return getUser(user.username);
  });
  const results = Promise.all(userIDArr);
  return results;
};
// usernames should be array of usernames
exports.getAllUserIDFromUsernames = (usernames) => {
  const userIDArr = usernames.map((username) => {
    return getUser(username);
  });
  const results = Promise.all(userIDArr);
  return results;
};

// This return Promise
const updateUserChatRoom = (username, roomID) => {
  const userPromise = User.findOneAndUpdate({
    username,
  }, {
    $push: {
      chatRooms: {
        roomID,
        lastSeenMessage: null,
      },
    },
  });
  return userPromise;
};

exports.addChatRoom = (users, room) => {
  const updatedUsers = users.map((user) => {
    return updateUserChatRoom(user.username, room._id);
  });
  const results = Promise.all(updatedUsers);
  return results;
};

exports.getUserFromChatRoom = (roomID) => {
  const promise = User.find({
    chatRooms: {
      $elemMatch: {
        roomID,
      },
    },
  });
  return promise;
};
