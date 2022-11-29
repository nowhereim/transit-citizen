var mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");
require("moment-timezone");
const now = moment().format("YYYY-MM-DD HH:mm:ss");

const machingSchema = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dropstation: {
    type: String,
  },
  createdAt: {
    type: String,
    default: now,
  },
  updatedAt: {
    type: String,
    default: now,
  },
});

module.exports = mongoose.model("Maching", machingSchema);
