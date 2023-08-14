const members = require("../Models/membersRegModel");
const mongoose = require("mongoose");

const membersRegister = async (req, res) => {
  const { name, usn, email, imageLink, githubLink, linkedinLink } = req.body;
  try {
    const user = await members.findOne({ usn });
    if (user === null) {
      const memberModel = new members({
        name,
        usn,
        email,
        imageLink,
        githubLink,
        linkedinLink,
      });
      memberModel
        .save()
        .then((result) => {
          if (result) {
            res.status(202).json({ status: true });
          }
        })
        .catch(() => {
          res
            .status(400)
            .json({ message: "error occured while saving the data" });
        });
    } else {
      res.json({ status: false });
    }
  } catch (err) {
    res.status(500);
    throw new Error(`error occured while saving the data ${err}`);
  }
};

const membersData = async (req, res) => {
  try {
    const pipeLine = [
      {
        $project: {
          __v: 0,
        },
      },
    ];
    const allMembers = await members.aggregate(pipeLine);
    res.json(allMembers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const memberTable = async (req, res) => {
  const pipeLine = [
    {
      $match: { _id: new mongoose.Types.ObjectId(req.body?.id) },
    },
    {
      $project: {
        _id: 0,
        history: 1,
      },
    },
  ];
  const memberHistory = await members.aggregate(pipeLine);
  res.json(memberHistory);
};

module.exports = { membersRegister, membersData, memberTable };
