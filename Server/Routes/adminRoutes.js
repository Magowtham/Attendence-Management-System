const express = require("express");
const {
  adminRegister,
  adminLogin,
  memberRegAuth,
  adminLogout,
  sendOtp,
  otpValidater,
  adminNewPassUpdater
} = require("../Controllers/admins");
const {
  membersRegister,
  membersData,
  memberTable,
  activeMembers,
  inActiveMembers,
} = require("../Controllers/members");
const authToken = require("../Controllers/authToken");;
const routes = express.Router();

routes.get("/verify", authToken, (req, res) => {});
routes.post("/register", adminRegister);
routes.post("/login", adminLogin);
routes.post("/memberReg", membersRegister);
routes.get("/membersData", membersData);
routes.post("/memberTable", memberTable);
routes.get("/activeMembers", activeMembers);
routes.get("/inActiveMembers", inActiveMembers);
routes.post("/memberRegAuth", memberRegAuth);
routes.get("/logout", adminLogout);
routes.post("/sendOtp", sendOtp);
routes.post("/verifyOtp", otpValidater);
routes.put("/newPassword/:usn",adminNewPassUpdater);
module.exports = routes;
