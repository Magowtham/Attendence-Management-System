const admin = require("../Models/adminRegModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminRegister = async (req, res) => {
  const { usn, password, email } = req.body;
  try {
    const user = await admin.findOne({ usn });
    if (user) {
      res.status(400).send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new admin({
        usn,
        password: hashedPassword,
        email,
      });

      newAdmin
        .save()
        .then(() => {
          res.status(201).json(newAdmin);
        })
        .catch((err) => {
          res.status(500).send("Error occured while registration");
          console.log(err);
        });
    }
  } catch (err) {
    res.status(500).send("invalid user credentials" + err);
  }
};

const adminLogin = async (req, res) => {
  const { usn, password } = req.body;
  const user = await admin.findOne({ usn });
  if (user === null) {
    res.status(400).send("user does't exist");
  } else {
    bcrypt.compare(password, user?.password, (err, result) => {
      if (err) {
        res.status(500).send("Error occured while validating  password");
      }
      if (result) {
        const payload = {
          usn: user.usn,
          email: user.email,
        };
        const token = jwt.sign(payload, process.env.SECRETE_KEY, {
          expiresIn: "1h",
        });
        res.status(201).json(token);
      } else {
        res.status(400).send("Invalid password");
      }
    });
  }
};

module.exports = { adminRegister, adminLogin };