const express = require("express");
const { adminRegister, adminLogin } = require("../Controllers/admins");
const { membersRegister } = require("../Controllers/members");
const authToken = require("../Controllers/authToken");
const routes = express.Router();

routes.post("/register", adminRegister);
routes.post("/login", adminLogin);
routes.post("/memberReg", authToken, membersRegister);

module.exports = routes;
