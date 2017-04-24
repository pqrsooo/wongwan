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

exports.getChatroomForSidebar = (user) => {
  const chatRoomPromise = user.chatRooms.map((chatRoom) => {
    // This will be chatRoom field from UserModel -- {roomID, lastSeenMessage}
    // We need to find latest message , chatRoom Token and is read
    const currentUserID = user._id;
    const chatRoomWithData = {
      roomName: null,
      latestMessage: null,
      roomToken: null,
    };
    let latestMessage = null;
    return messageQuery.getLatestMessageInRoom(chatRoom.roomID).then((latestMsg) => {
      latestMessage = latestMsg;
      return chatRoomQuery.getRoomTokenAndNameFromID(chatRoom.roomID);
    }).then((room) => {
      chatRoomWithData.roomToken = room.roomToken;
      chatRoomWithData.roomName = room.roomName;
      if (latestMessage) {
        chatRoomWithData.latestMessage = {
          sender: currentUserID.equals(latestMessage.sender.id) ? 'You' : latestMessage.sender.firstName,
          content: latestMessage.content,
          ts: latestMessage.createdAt,
          seen: chatRoom.lastSeenMessage ? chatRoom.lastSeenMessage.equals(latestMessage._id) : false,
        }
      }
      return Promise.resolve(chatRoomWithData);
    });
  });
  const results = Promise.all(chatRoomPromise);
  return results;
};

exports.getRoomTokenAndNameFromID = (roomID) => {
  const chatRoomPromise = ChatRoom.findOne({
    _id: roomID,
  }).select({
    _id: 0,
    roomToken: 1,
    roomName: 1,
  });
  return chatRoomPromise.then(chatRoom => chatRoom);
};

exports.getRoom = (roomID) => {

}

