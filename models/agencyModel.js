const mongoose = require("mongoose");

const agencySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Agency", agencySchema);
