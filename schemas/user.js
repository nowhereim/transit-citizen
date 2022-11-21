var mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");
require("moment-timezone");
const now = moment().format("YYYY-MM-DD HH:mm:ss");
const userSchema = new Schema({
  snsId: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    // required: true
  },
  phoneNumber: {
    type: String,
    // required: true
  },
  nickname: {
    type: String,
    // required: true
  },
  location: {
    type: String,
  },
  gender: {
    type: Boolean, // 남: 0, 여: 1
    // required: true
  },
  status: {
    type: String,
  },
  createdAt: {
    type: String,
    default: now, // data 생성 당시의 시간
    required: true,
  },
  updatedAt: {
    type: String,
    default: now,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
