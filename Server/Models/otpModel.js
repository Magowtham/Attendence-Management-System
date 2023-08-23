const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    usn: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    timeToLive: {
      type: Date,
      expires: 30,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("otp", otpSchema);
