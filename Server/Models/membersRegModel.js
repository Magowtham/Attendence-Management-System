const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  usn: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  linkedinLink: {
    type: String,
  },
});

module.exports = mongoose.model("members", memberSchema);
