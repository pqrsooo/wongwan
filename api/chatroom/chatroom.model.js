const mongoose = require('mongoose');
const objID = mongoose.Types.ObjectId;

const chatRoomSchema = new mongoose.Schema({
    room: String,
    users: [{
        username: String,
        lastSeenMessege: objID,
    }],
});

module.exports = chatRoomSchema;