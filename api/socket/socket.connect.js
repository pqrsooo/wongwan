const Message = require('../message/message.model');
const userQuery = require('../user/user.query');
const chatRoomQuery = require('../chatroom/chatroom.query');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

function onConnect(socket) {
  /**
   * 'subscribe event' let the server join the client
   *  to the rooms(Tokens) sent from the client
   *
   *  @param {Array} rooms
   */
  socket.on('subscribe', (rooms) => {
    rooms.forEach((room) => {
      console.log(`subscribe client ${socket.id} to ${room}`);
      socket.join(room);
    });
  });
  /**
   * 'unsubscribe event' let the server disconnect the client from
   *  specific rooms when user leave the room
   */
  socket.on('unsubscribe', (rooms) => {
    rooms.forEach((room) => {
      console.log(`unsubscribe client ${socket.id} from ${room}`);
      socket.leave(room);
    });
  });
  /**
   *  The 'send' notify the server to save the message and then
   *  broadcast to all user in the same room with event 'new message'
   *  and send acknowledge with event 'new message ack'
   *  back to the client(sender) as well
   */
  socket.on('send', (data) => {
    const messagePrefab = {
      sender: {},
    }; // message object must follow the Message Schema
    messagePrefab.content = data.content;
    userQuery.getUserFromUsername(data.username).then((user) => {
      messagePrefab.sender.id = user.id;
      messagePrefab.sender.firstName = user.firstName;
      messagePrefab.sender.lastName = user.lastName;
      messagePrefab.sender.username = user.username;
      return chatRoomQuery.getChatroomID(data.room);
    }).then((roomID) => {
      messagePrefab.roomID = roomID;
      const message = new Message(messagePrefab);
      return message.save();
    }).then((msg) => {
      socket.in(data.room).emit('new message', {
        content: msg.content,
        createdTime: msg.createdAt,
        messageID: msg.id,
        room: data.room,
        sender: msg.sender.firstName,
        username: msg.sender.username,
      });
      socket.emit('new message ack', {
        success: true,
        message: {
          content: msg.content,
          createdTime: msg.createdAt,
          messageID: msg.id,
          room: data.room,
          sender: msg.sender.firstName,
          username: msg.sender.username,
        }
      });
    })
      .catch((err) => {
        console.error('Cannot Save Message ', err);
        socket.emit('new message ack', {
          success: false,
          message: data.message,
          room: data.room,
        });
      });
  });

  /**
   *  The 'typing event' tell the server to
   *  broadcast to other clients that they are typing
   *
   *  @param {Object} data {roomToken, sender}
   */
  socket.on('typing', (data) => {
    socket.to(data.roomToken).emit('typing', {
      sender: data.sender,
    });
  });

  /**
   *  The 'stop typing event' tell the server to
   *  broadcast to other clients that the user has already
   *  stop typing
   *
   *  @param {Object} data {roomToken, sender}
   */
  socket.on('stop typing', (data) => {
    socket.to(data.roomToken).emit('typing', {
      sender: data.sender,
    });
  });
  /**
   *  The 'read' tell the server that all the messages
   *  of a specific user in the room has been read
   *  the server will then update the user lastSeenMessage
   *
   *  @param {Object} data {roomToken, user}
   */
  socket.on('read', (data) => {
    let roomID = null;
    const roomToken = data.roomToken;
    const seenMsg = ObjectId(data.messageID);
    chatRoomQuery.getChatroomID(roomToken).then((room) => {
      roomID = room._id;
      return userQuery.updateLastSeenMessageInRoom(data.user, roomID, seenMsg);
    }).then((updatedUser) => {
      socket.emit('read ack', {
        success: true,
        seenTimestamp: updatedUser.updatedAt,
        seenMessageID: data.messageID,
        room: data.room,
      });
      socket.to(data.roomToken).emit('seen', {
        success: true,
        seenTimestamp: updatedUser.updatedAt,
        seenMessageID: seenMsg.id,
        seenUsername: updatedUser.username,
        seenUser: updatedUser.firstName,
        room: data.room,
      });
    }).catch((err) => {
      console.error('Cannot Set Read status ', err);
      socket.emit('read ack', {
        success: false,
      });
    });
  });
  /**
   *  The 'join room' event tell the server to
   *  broadcast to other clients that the user has already
   *  joined the group
   *
   *  @param {Object} data {roomToken, sender}
   */
  socket.on('join room', (data) => {
    const username = data.sender;
    const roomToken = data.roomToken;
    chatRoomQuery.getChatroom(roomToken).then((room) => {
      return userQuery.joinChatRoom(username, room._id);
    }).then((updatedUser) => {
      socket.to(roomToken).emit('new user join', {
        success: true,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        ts: updatedUser.updatedAt,
      });
      socket.emit('join room ack', {
        success: true,
        ts: updatedUser.updatedAt,
      });
      socket.join(roomToken);
    }).catch((err) => {
      console.error('Cannot join room', err);
      socket.emit('join room ack', {
        success: false,
      });
    });
    socket.to(data.roomToken).emit('typing', {
      sender: data.sender,
    });
  });
}

module.exports = {
  onConnect,
};
