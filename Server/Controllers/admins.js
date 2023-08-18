const admin = require("../Models/adminRegModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminRegister = async (req, res) => {
  const { usn, password, email } = req.body;
  try {
    const user = await admin.findOne({ usn });
    if (user != null) {
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
          // console.log(err);
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
          expiresIn: "20h",
        });
        const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res
          .status(202)
          .cookie("token", token, { expires: expirationDate, httpOnly: true })
          .json({ status: true });
      } else {
        res.status(400).json({ status: false });
      }
    });
  }
};

const memberRegAuth = async (req, res) => {
  const { usn, password } = req.body;
  const pipeLine = [
    {
      $match: { usn },
    },
    {
      $project: {
        _id: 0,
        password: 1,
      },
    },
  ];
  const user = await admin.aggregate(pipeLine);
  if (user.length === 0) {
    res.json({ status: false });
  } else {
    bcrypt.compare(password, user[0]?.password, (err, decoded) => {
      if (err) {
        res.status(500);
        throw new Error("Internal Server Error");
      }
      if (decoded) {
        res.json({ status: true });
      } else {
        res.json({ status: false });
      }
    });
  }
};

const adminLogout = (req, res) => {
  console.log(req.headers);
  res
    .cookie("token", "", "/", { expires: new Date(0), httpOnly: true })
    .json({ status: true });
};

module.exports = { adminRegister, adminLogin, memberRegAuth, adminLogout };
