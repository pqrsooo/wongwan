const ioServer = require('socket.io');
const Message = require('../message/message.model');
const userQuery = require('../user/user.query');
const chatRoomQuery = require('../chatroom/chatroom.query');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

function createSocketServer(appServer) {
  const io = ioServer(appServer, {
    serveClient: false,
  });
  // force socket to only user 'websocket'
  io.set('transports', ['websocket']);

  // TODO: Uncomment this and  Use Redis as an Adapter for Clustering reason
  // Using Redis
  // const port = `${config.redis.port}`;
  // const host = `${config.redis.host}`;
  // const password = config.redis.password;
  // const pubClient = redis(port, host, { auth_pass: password });
  // const subClient = redis(port, host, { auth_pass: password, return_buffers: true, });
  // io.adapter(adapter({ pubClient, subClient }));

  io.on('connection', (socket) => {
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
      const messagePrefab = {}; // message object must follow the Message Schema
      messagePrefab.content = data.content;
      userQuery.getUserFromUsername(data.username).then((user) => {
        messagePrefab.sender.id = user.id;
        messagePrefab.sender.firstName = user.firstName;
        messagePrefab.sender.lastName = user.lastName;
        return chatRoomQuery.getChatroomID(data.room);
      }).then((roomID) => {
        messagePrefab.roomID = roomID;
        const message = new Message(messagePrefab);
        return message.save();
      }).then((msg) => {
        socket.to(data.room).emit('new message', {
          content: msg.content,
          sender: msg.firstName,
          createdTime: msg.createdAt,
          room: data.room,
          messageID: msg.id,
        });
        socket.emit('new message ack', {
          success: true,
          message: msg.content,
          room: data.room,
          messageID: msg.id,
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
      let seenMsgID = ObjectId(data.messageID);
      chatRoomQuery.getChatroomID(data.roomToken).then((room) => {
        roomID = room._id;
        return userQuery.updateLastSeenMessageInRoom(data.user, roomID, seenMsgID);
      }).then((result) => {
        const updatedResult = result.nMatched === 1;
        const currentTime = Date.now();
        console.log('Write Result is ', updatedResult ? 'Success' : 'Fail');
        socket.emit('read ack', {
          success: updatedResult,
          seenTimestamp: currentTime,
          seenMessageID: data.messageID,
        });
        socket.to(data.roomToken).emit('seen', {
          success: updatedResult,
          seenTimestamp: currentTime,
          seenMessageID: data.messageID,
        })
      }).catch((err) => {
        console.error('Cannot Set Read status ', err);
        socket.emit('read ack', {
          success: false,
        });
      });
    });
  });

  return io;
}

module.exports = createSocketServer;
