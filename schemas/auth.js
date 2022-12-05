var mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");
require("moment-timezone");
const now = moment().format("YYYY-MM-DD HH:mm:ss");

const authSchema = new Schema(
  {
    snsId: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    authCode: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", authSchema);
