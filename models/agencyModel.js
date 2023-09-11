const mongoose = require("mongoose");

const agencySchema = mongoose.Schema({

    agencyName: {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Agency',agencySchema);