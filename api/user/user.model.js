const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
//Users 
module.exports = mongoose.model('User',userSchema);