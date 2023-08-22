const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
//Global variables
const serverPort = 5001;

mongoose
  .connect("mongodb://127.0.0.1:27017/Edwins", {
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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/admin", require("./Routes/adminRoutes"));
app.use("/memberLogin", require("./Routes/membersRoute"));

app.listen(serverPort, function () {
  console.log(`server has been started @ ${serverPort}`);
});
