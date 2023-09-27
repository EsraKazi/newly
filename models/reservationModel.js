const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  reservationId: {
    type:String,
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  roomType: {
    type: String,
    required: true
  },

  hotel: {
    type: String,
    required: true
  },

  agency: {
    type: String,
    required: true
  },

  addedBy: {
    type: String,
    required: true
  },

  description: {
    type: String
  },

  status: {
    type: String,
    default: "beklemede",
    required: true
  },

  confirmed: {
    type: Boolean
  },

  confirmedBy: {
    type: String
  },

  confirmationDeadline: {
    type: Date
  }
});

module.exports = mongoose.model('Reservation', reservationSchema);
