const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    loggedIn : Boolean,
    apiToken : String
}, {
    timestamps: true,
});

const userModel = mongoose.model('user', userSchema);

module.exports = {
    userModel
};
