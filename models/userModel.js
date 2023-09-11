const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    username : {
        type : String,
        reqired : [true, 'Please enter a username'],
        unique : true,
        lowercase : true,
        validate : [(val) => { }]
    },

    password : {
        type : String,
        reqired : [true, 'Please enter your password'],
        minlength : 6
    },

    userRole : {
        type : String,
        reqired : true,
        default : "call center"
    }
});

module.exports = mongoose.model('User',userSchema);