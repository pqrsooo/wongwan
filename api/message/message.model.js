const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const chatMessageSchema = new mongoose.Schema({
  timeStamp: Number, // sent time
  message: String,
  sender: {
    id: objectID,
    firstName: String,
    lastName: String,
  },
  roomID: objectID,
});

module.exports = mongoose.model('chatMessage', chatMessageSchema);
