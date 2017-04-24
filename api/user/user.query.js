const User = require('../user/user.model');

const getUser = (username) => {
  const userPromise = User.findOne({
    username,
  });
  return userPromise;
};

const getUserFromUsername = username => getUser(username);
// users shoud be type array
const getAllUserID = (users) => {
  const userIDArr = users.map(user => getUser(user.username));
  const results = Promise.all(userIDArr);
  return results;
};
// usernames should be array of usernames
const getAllUserIDFromUsernames = (usernames) => {
  const userIDArr = usernames.map(username => getUser(username));
  const results = Promise.all(userIDArr);
  return results;
};

// This return Promise
// Let user join the room
const joinChatRoom = (username, roomID) => {
  const userPromise = User.findOneAndUpdate({
    username,
  }, {
    $push: {
      chatRooms: {
        roomID,
        lastSeenMessage: null,
        isJoin: true,
        join: [].push(Date.now()),
        leave: [],
      },
    },
  }, { new: true });
  return userPromise;
};

const leaveChatRoom = (username, roomID) => {
  const userPromise = User.findOneAndUpdate({
    username,
  }, {
    $pull: {
      chatRooms: {
        roomID,
      },
    },
  }, { new: true });
  return userPromise;
};

const addChatRoom = (users, room) => {
  const updatedUsers = users.map(user => joinChatRoom(user.username, room._id));
  const results = Promise.all(updatedUsers);
  return results;
};

const getUserFromChatRoom = (roomID) => {
  const promise = User.find({
    chatRooms: {
      $elemMatch: {
        roomID,
      },
    },
  }).select({
    username: 1,
    firstName: 1,
    lastName: 1,
  });
  return promise;
};

const updateLastSeenMessageInRoom = (username, roomID, lastSeenMsgId) => {
  const promise = User.findOneAndUpdate({
    username,
    'chatRooms.roomID': roomID,
  }, {
    $set: {
      'chatRooms.lastSeenMessage': lastSeenMsgId,
    },
  }, { new: true });
  return promise;
};

module.exports = {
  getUserFromUsername,
  getAllUserID,
  getAllUserIDFromUsernames,
  joinChatRoom,
  leaveChatRoom,
  addChatRoom,
  getUserFromChatRoom,
  updateLastSeenMessageInRoom,
};


