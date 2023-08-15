const members = require("../Models/membersRegModel");
const mongoose = require("mongoose");
const totalTimeCalculator = (loginTime, logoutTime) => {
  const loginTimeArr = loginTime.split(":").map((value) => Number(value));
  const logoutTimeArr = logoutTime.split(":").map((value) => Number(value));
  const totalLoginTimeMin = loginTimeArr[0] * 60 + loginTimeArr[1];
  const totalLogoutTimeMin = logoutTimeArr[0] * 60 + logoutTimeArr[1];
  return (totalLogoutTimeMin - totalLoginTimeMin) / 60;
};

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

const memberLogin = async (req, res) => {
  const { id } = req.body;
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const date = `${day}/${month}/${year}`;
  const currentTime = `${hours}:${minute}:${seconds}`;
  const pipeLine = [
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $project: {
        _id: 0,
        history: { $slice: ["$history", -1] },
        historySize: { $size: { $ifNull: ["$history", []] } },
      },
    },
  ];
  try {
    const [memberHistory] = await members.aggregate(pipeLine);
    const historySize = memberHistory?.historySize;
    const loginTime =
      memberHistory.history[0]?.logoutTime === "in Lab"
        ? memberHistory.history[0]?.loginTime
        : "";
    if (memberHistory.history.length === 0) {
      const status = await members.findByIdAndUpdate(id, {
        $push: {
          history: {
            date,
            loginTime: currentTime,
            logoutTime: "in Lab",
            totalTime: "",
          },
        },
      });
      if (status) {
        res.status(202).json({ status: true });
      }
    } else {
      if (memberHistory.history[0].logoutTime === "in Lab") {
        const totalLabTime = totalTimeCalculator(loginTime, currentTime);
        const status = await members.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          {
            $set: {
              [`history.${historySize - 1}.logoutTime`]: currentTime,
              [`history.${historySize - 1}.totalTime`]: totalLabTime.toFixed(1),
            },
          }
        );
        if (status?.acknowledged) {
          res.status(202).json({ status: true });
        }
      } else {
        const status = await members.findByIdAndUpdate(id, {
          $push: {
            history: {
              date,
              loginTime: currentTime,
              logoutTime: "in Lab",
              totalTime: "",
            },
          },
        });
        if (status) {
          res.status(202).json({ status: true });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = { membersRegister, membersData, memberTable, memberLogin };
