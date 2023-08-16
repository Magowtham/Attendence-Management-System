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
  ]
  const memberHistory = await members.aggregate(pipeLine);
  res.json(memberHistory[0].history);
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

  const date1=new Date("2023-4-29");
  const date2=new Date("2023-4-12");
  const diff=date2.getTime()-date1.getTime();
  console.log(diff/(1000 * 60 * 60 * 24));
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
        $set:{
          loginStatus:true
        }
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
              [`history.${historySize - 1}.totalTime`]: totalLabTime.toFixed(2),
              loginStatus:false
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
          $set:{
            loginStatus:true
          }
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
const findActiveMember=(history)=>{
  if(history.length!==0){
    const date=new Date();
    const [day,month,year]=history[0].date.split("/");
    const lastLoginDate=new Date(`${year}-${month}-${day}`);
    const currentDate=new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
    const dateDiff=(currentDate.getTime()-lastLoginDate.getTime())/(1000*60*60*24);
    if(dateDiff>=10){
      return false;
    }else{
      return true;
    }
    
  }else{
    return true;
  }
}
const findInActiveMember=(history)=>{
  if(history.length!==0){
    const date=new Date();
    const [day,month,year]=history[0].date.split("/");
    const lastLoginDate=new Date(`${year}-${month}-${day}`);
    const currentDate=new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`)
    const dateDiff=(currentDate.getTime()-lastLoginDate.getTime())/(1000*60*60*24);
    if(dateDiff>=10){
      return true;
    }else{
      return false;
    }
    
  }else{
    return false;
  }
}
const activeMembers=async (req,res)=>{
  const pipeLine=[
   {
    $project:{
      name:1,
      usn:1,
      email:1,
      imageLink:1,
      githubLink:1,
      linkedinLink:1,
      history: { $slice: ["$history", -1] }
    }
   }
  ]
  try{
    const allMembers=await members.aggregate(pipeLine);
    const activeMembers=allMembers.filter((member)=>findActiveMember(member.history));
    res.json(activeMembers);
  }catch(err){
    res.status(500).json(err);
  }

}
const inActiveMembers=async (req,res)=>{
  const pipeLine=[
    {
     $project:{
        name:1,
         usn:1,
        email:1,
         imageLink:1,
         githubLink:1,
        linkedinLink:1,
        history: { $slice: ["$history", -1] }
     }
    }
   ]
   try{
     const allMembers=await members.aggregate(pipeLine);
     const activeMembers=allMembers.filter((member)=>findInActiveMember(member.history));
     res.json(activeMembers);
   }catch(err){
     res.status(500).json(err);
   }
}
module.exports = { membersRegister, membersData, memberTable, memberLogin,activeMembers,inActiveMembers };
