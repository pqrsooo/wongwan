const Message = require('./message.model');
const userQuery = require('../user/user.query');
const chatRoomQuery = require('../chatroom/chatroom.query');

// sender must be user type
function saveMessage(sender, message, roomToken) {
  const username = sender.username;
  userQuery.getUserFromUsername(username).then((user) => {
    chatRoomQuery.getChatroomID(roomToken).then((roomID) => {
      const msg = new Message({
        content: message,
        sender: {
          id: user._id,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        roomID,
      });
      msg.save().then((savedMsg) => {
        return Promise.resolve(savedMsg);
      }).catch((err) => {
        console.error('Cannot Save Message', err);
        return Promise.reject(err);
      });
    }).catch((err) => {
      console.error('Cannot Get RoomID', err);
      return Promise.reject(err);
    });
  }).catch((err) => {
    console.error('Cannot Get UserID', err);
    return Promise.reject(err);
  });
}

function getMessageFromRoom(roomID) {
  return Message.find({
    roomID,
  }).sort({
    createdAt: 'ascending',
  }).select({
    content: 1,
    sender: 1,
    createdAt: 1,
    _id: 1,
    username: 1,
  });
}

function getLatestMessageInRoom(roomID) {
  const promise = Message.findOne({
    roomID,
  }).sort({
    createdAt: -1,
  }).select({
    content: 1,
    sender: 1,
    createdAt: 1,
    _id: 1,
    username: 1,
  });
  return promise;
}

module.exports = {
  saveMessage,
  getMessageFromRoom,
  getLatestMessageInRoom,
};


