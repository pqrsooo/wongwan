const mongoose = require('mongoose');
const objID = mongoose.Types.ObjectId;

const chatMessage = new mongoose.Schema({
    message: String,
    username: String,
    room: String,
});

module.exports = chatMessage;