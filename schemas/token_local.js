var mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // data 생성 당시의 시간
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Token_local", userSchema);