const adminRegModel = require("../Models/adminRegModel");
const bcrypt = require("bcrypt");

const adminRegister = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new adminRegModel({
      userName,
      password: hashedPassword,
    });
    newAdmin
      .save()
      .then(() => {
        res.status(201).json(newAdmin);
      })
      .catch(() => {
        res.status(500).send("Error occured while registration");
      });
  } catch (err) {
    res.status(500).send("invalid user credentials" + err);
  }
};

module.exports = adminRegister;
