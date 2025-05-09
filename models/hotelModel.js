const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rooms: [
    {
      roomName: {
        type: String,
        required: true,
      },
    },
  ],
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
