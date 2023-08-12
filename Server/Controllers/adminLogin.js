const admin = require("../Models/adminRegModel");
const bcrypt = require("bcrypt");
const adminLogin = async (req, res) => {
  const { userName, password } = req.body;
  const user = await admin.findOne({ userName });
  if (user === null) {
    res.status(400).send("user does't exist");
  } else {
    bcrypt.compare(password, user?.password, (err, result) => {
      if (err) {
        res.status(500).send("Error occured while validating  password");
      }
      if (result) {
        res.status(201).send("Login successfull");
      } else {
        res.status(400).send("Invalid password");
      }
    });
  }
};

module.exports = adminLogin;
