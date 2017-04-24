const mongoose = require('mongoose');

const objectID = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  chatRooms: [{
    roomID: objectID,
    lastSeenMessage: objectID,
    isJoin: Boolean,
    join: [Date],
    leave: [Date],
  }],
});
// Users
module.exports = mongoose.model('User', userSchema);
