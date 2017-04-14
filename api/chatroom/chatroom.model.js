const mongoose = require('mongoose');
const objID = mongoose.Types.ObjectId;

const chatRoomSchema = new mongoose.Schema({
    room: String,
    users: [{
        username: String,
        lastSeenMessage: objID,
    }],
});

module.exports = chatRoomSchema;