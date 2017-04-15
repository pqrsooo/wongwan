const mongoose = require('mongoose');
const objID = mongoose.Types.ObjectId;

const chatMessageSchema = new mongoose.Schema({
    message: String,
    username: String,
    room: String,
});

module.exports = mongoose.model('chatMessage',chatMessageSchema);