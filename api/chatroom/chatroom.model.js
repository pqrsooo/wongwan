const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const chatRoomSchema = new mongoose.Schema({
    roomName: String,
    roomID: String,
    users: [{
        userID: ObjectID,
    }],
});
const m = mongoose.model('chatRoom',chatRoomSchema);
module.exports = m;