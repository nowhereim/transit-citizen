var mongoose = require("mongoose");
const { Schema } = mongoose;

const localSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Local", localSchema);
