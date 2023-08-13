const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
//Global variables
const serverPort = 5001;

mongoose
  .connect("mongodb://localhost:27017/Edwins", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    throw new Error("Error occured while connecting to MongoDB" + err);
  });

//middlewares
app.use(express.json());
app.use("/admin", require("./Routes/adminRoutes"));
// app.use("/membersLogin", require("./Routes/membersLogin"));

app.listen(serverPort, function () {
  console.log(`server has been started @ ${serverPort}`);
});