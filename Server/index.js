const express = require("express");
const mongodbCon = require("./mongoDBConn");
// const historyInsert = require("./ControlMethods/historyInsert");
const searchMember = require("./ControlMethods/searchMember");

const app = express();
//Global variables
const serverPort = 4000;
const collections = {};
//middlewares
app.use(express.json());
//function to connect mongoDB
mongodbCon()
  .then((db) => {
    collections.members = db.collection("members");
  })
  .catch((err) => {
    console.log(`Error while getting the collection from database ${err}`);
  });

app.post("/auth", function (req, res) {
  const fingerPrint = req.body.fingerPrintData;
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const date = `${day}/${month}/${year}`;
  const currentTime = `${hours}:${minute}:${seconds}`;
  console.log(date);
  console.log(currentTime);
  const response = searchMember(
    fingerPrint,
    collections.members,
    currentTime,
    date
  );
});
console.log(__dirname);
app.get("/test",(req,res)=>{
  res.download(__dirname+"/logo512.png","logo512.png")
})

app.listen(serverPort, function () {
  console.log(`server has been started @ ${serverPort}`);
});
