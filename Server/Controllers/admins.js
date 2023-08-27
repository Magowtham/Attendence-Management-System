const admin = require("../Models/adminRegModel");
const otpModel = require("../Models/otpModel");
const sendEmail = require("./sendMail");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
    res.json({ status: false, usnError: "invalid usn" });
  } else {
    bcrypt.compare(password, user?.password, (err, result) => {
      if (err) {
        res.status(500).json({ status: false, message: err });
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
        res.json({ status: false, passwordError: "incorrect password" });
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

const generateOtp = (length) => {
  const otp = crypto.randomInt(
    Math.pow(10, length - 1),
    Math.pow(10, length) - 1
  );
  return otp.toString();
};

const sendOtp = async (req, res) => {
  try {
    const { usn } = req.body;
    const pipeLine = [
      {
        $match: { usn },
      },
      {
        $project: {
          _id: 0,
          email: 1,
        },
      },
    ];
    const deleteResult = await otpModel.deleteMany({ usn });
    if (!deleteResult.acknowledged) {
      res.status(500).json({ staus: false, message: "internal server error" });
      return;
    }
    const [user] = await admin.aggregate(pipeLine);
    if (!user) {
      res.send({ status: false, message: "USN is not registered" });
    } else {
      const otp = generateOtp(4);
      const emailResult = await sendEmail(user?.email, otp, res);
      if (!emailResult.status) {
        res.status(500).json("error occurred while sending the email");
        return;
      }
      const hashedOtp = await bcrypt.hash(otp, 5);
      const storeOtp = new otpModel({
        usn,
        otp: hashedOtp,
        email: user?.email,
      });
      storeOtp
        .save()
        .then((data) => {
          res.json({
            status: true,
            email: data?.email,
          });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ status: false, message: `internal server error ${err}` });
          return;
        });
    }
  } catch (err) {
    res.status(500).json({ status: false, message: "internal server error" });
  }
};
const otpValidater = async (req, res) => {
  const { usn, otp } = req.body;
  const pipeLine = [
    {
      $match: {
        usn,
      },
    },
    {
      $project: {
        otp: 1,
        _id: 0,
      },
    },
  ];
  const userOtp = await otpModel.aggregate(pipeLine);
  if (userOtp.length === 0) {
    res.json({ status: false, message: "invalid otp" });
  } else {
    bcrypt.compare(otp, userOtp[0].otp, (err, decodedOtp) => {
      if (err) {
        res.status(500).json({ status: false, message: err });
      }
      if (decodedOtp) {
        res.json({ status: true, message: "valid otp" });
      } else {
        res.json({ status: false, message: "invalid otp" });
      }
    });
  }
};
const adminNewPassUpdater = async (req, res) => {
  try {
    const usn = req.params.usn;
    const { password } = req.body;
    console.log(usn, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateResult = await admin.findOneAndUpdate(
      { usn },
      { $set: { password: hashedPassword } },
      { new: true }
    );
    if (updateResult) {
      res.json({ status: true, message: "password changed" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: false, message: `internal server error ${err}` });
  }
};
module.exports = {
  adminRegister,
  adminLogin,
  memberRegAuth,
  adminLogout,
  sendOtp,
  otpValidater,
  adminNewPassUpdater,
};
