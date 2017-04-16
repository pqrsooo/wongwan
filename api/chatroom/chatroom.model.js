const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  roomName: String,
  roomToken: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
});
module.exports = mongoose.model('chatRoom', chatRoomSchema);
