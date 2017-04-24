const mongoose = require('mongoose');

const objectID = mongoose.Schema.Types.ObjectId;

const chatMessageSchema = new mongoose.Schema({
  content: String,
  sender: {
    id: objectID,
    username: String,
    firstName: String,
    lastName: String,
  },
  roomID: objectID,
}, { timestamps: true });
module.exports = mongoose.model('chatMessage', chatMessageSchema);
