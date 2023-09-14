const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    userRole: {
        type: String,
        required: true,
        default: "call center"
    }
});

module.exports = mongoose.model('User', userSchema);
