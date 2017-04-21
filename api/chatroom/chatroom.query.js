const mongoose = require('mongoose');
const ChatRoom = require('./chatroom.model');
const messageQuery = require('../message/message.query');
const chatRoomQuery = require('../chatroom/chatroom.query');

// TODO: Function will be added soon
exports.getChatroomID = (roomToken) => {
  const promise = ChatRoom.findOne({
    roomToken,
  }).select({
    _id: 1,
  });
  return promise;
};

exports.getChatroom = (roomToken) => {
  const promise = ChatRoom.findOne({
    roomToken,
  });
  return promise;
};

exports.getChatroomForSidebar = (userChatrooms) => {
  const chatRoomPromise = userChatrooms.map((chatRoom) => {
    // This will be chatRoom field from UserModel -- {roomID, lastSeenMessage}
    // We need to find latest message , chatRoom Token and is read
    const chatRoomWithData = {
      roomToken: null,
      roomName: null,
      latestMessage: {
        message: null,
        sender: {
          firstName: null,
          lastName: null,
          ts: null,
          seen: false,
        },
      },
    };
    let latestMessage = null;
    return messageQuery.getLatestMessageInRoom(chatRoom.roomID).then((latestMsg) => {
      latestMessage = latestMsg;   
      return chatRoomQuery.getRoomTokenFromID(chatRoom.roomID);
    }).then((roomToken) => {
      chatRoomWithData.roomToken = roomToken;
      if (latestMessage) {
        chatRoomWithData.latestMessage.message = latestMessage.message;
        chatRoomWithData.latestMessage.sender.firstName = latestMessage.sender.firstName;
        chatRoomWithData.latestMessage.sender.lastName = latestMessage.sender.lastName;
        chatRoomWithData.latestMessage.timeStamp = latestMessage.createAt;
        chatRoomWithData.latestMessage.seen = chatRoom.roomID.equals(latestMessage._id);
      } else {
        chatRoomWithData.latestMessage.seen = true;
      }
      return Promise.resolve(chatRoomWithData);
    });
  });
  const results = Promise.all(chatRoomPromise);
  return results;
};

exports.getRoomTokenFromID = (roomID) => {
  const chatRoomPromise = ChatRoom.findOne({
    _id: roomID,
  }).select({
    _id: 0,
    roomToken: 1,
  });
  return chatRoomPromise.then(chatRoom => chatRoom.roomToken);
}

