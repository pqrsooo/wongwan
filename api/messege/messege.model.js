const mongoose = require('mongoose');
const objID = mongoose.Types.ObjectId;

const chatMessege = new mongoose.Schema({
    messege: String,
    username: String,
    room: String,
});

module.exports = chatMessege;