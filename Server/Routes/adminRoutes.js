const express = require("express");
const { adminRegister, adminLogin } = require("../Controllers/admins");
const {
  membersRegister,
  membersData,
  memberTable,
  activeMembers,
  inActiveMembers
} = require("../Controllers/members");
const authToken = require("../Controllers/authToken");
const routes = express.Router();

routes.get("/verify", authToken, (req, res) => {});
routes.post("/register", adminRegister);
routes.post("/login", adminLogin);
routes.post("/memberReg", membersRegister);
routes.get("/membersData", membersData);
routes.post("/memberTable", memberTable);
routes.get("/activeMembers",activeMembers);
routes.get("/inActiveMembers",inActiveMembers)

module.exports = routes;
