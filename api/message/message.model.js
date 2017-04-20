const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const chatMessageSchema = new mongoose.Schema({
  message: String,
  sender: {
    id: objectID,
    firstName: String,
    lastName: String,
  },
  roomID: objectID,
}, { timestamps: true });
module.exports = mongoose.model('chatMessage', chatMessageSchema);
