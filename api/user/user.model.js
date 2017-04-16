const mongoose = require('mongoose');
const objectID = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    chatRooms : [{
        roomID : objectID,
        lastSeenMeesage: objectID
    }]
});
//Users 
module.exports = mongoose.model('User',userSchema);