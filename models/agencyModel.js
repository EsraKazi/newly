const mongoose = require("mongoose");

const agencySchema = mongoose.Schema({

    agencyName: {
        type : String,
        unique: true,
        required : true
    }
});

module.exports = mongoose.model('Agency',agencySchema);