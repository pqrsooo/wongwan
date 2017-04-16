const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    chatRooms : [{
        roomID : ObjectId,
        lastSeenMeesage: ObjectId
    }]
});
//Users 
module.exports = mongoose.model('User',userSchema);