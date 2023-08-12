const mongoose = require("mongoose");

async function mongodbCon() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Edwins", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`Connection failed while connecting to mongoDB ${error}`);
  }
}

module.exports = mongodbCon;
