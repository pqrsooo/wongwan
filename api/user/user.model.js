const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
});
//Users 
module.exports = mongoose.model('User',userSchema);