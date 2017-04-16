const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const chatRoomSchema = new mongoose.Schema({
    roomName: String,
    roomToken: String,
    users: [{
        userID: objectID,
    }],
});
const m = mongoose.model('chatRoom',chatRoomSchema);
module.exports = m;