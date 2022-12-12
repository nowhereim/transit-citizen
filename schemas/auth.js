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

const Auth = mongoose.model("Auth", authSchema);

Auth.watch().on("change", (log) => console.log(log));

module.exports = Auth;
