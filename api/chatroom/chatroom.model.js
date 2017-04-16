const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const chatRoomSchema = new mongoose.Schema({
  roomName: String,
  roomToken: String,
});
module.exports = mongoose.model('chatRoom', chatRoomSchema);
