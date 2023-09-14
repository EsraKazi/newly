const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    roomType: {
        type: String,
        unique: true,
        required: true,
    },
    adultCount: {
        type: Number,
    },
    childAbove4Count: {
        type: Number,
    },
    childBelow4Count: {
        type: Number,
    },
});

module.exports = mongoose.model('Room', roomSchema);
