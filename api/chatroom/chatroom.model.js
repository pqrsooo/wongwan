const mongoose = require('mongoose');
const objID = mongoose.Schema.Types.ObjectId;

const chatRoomSchema = new mongoose.Schema({
    roomName: String,
    roomID: String,
    users: [{
        username: String,
        lastSeenMessage: objID,
    }],
});
const m = mongoose.model('chatRoom',chatRoomSchema);
module.exports = m;