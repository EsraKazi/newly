const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({

    roomType: {
        type : String,
        required : true
    },

    hotel: {
        type : String,
        required : true
    }

});

module.exports = mongoose.model('room',roomSchema);