const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;

const chatMessageSchema = new mongoose.Schema({
    message: String,
    userID: objectID,
    roomID: objectID,
});

module.exports = mongoose.model('chatMessage',chatMessageSchema);