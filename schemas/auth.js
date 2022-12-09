var mongoose = require("mongoose");
const { Schema } = mongoose;

const authSchema = new Schema(
  {
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
