const express = require("express");

const routes = express.Router();

routes.post("/register", require("../Controllers/adminRegister"));
routes.post("/login", require("../Controllers/adminLogin"));
routes.post("/membersRegAuth", require("../Controllers/membersRegAuth"));
routes.post("/membersRegister", require("../Controllers/membersRegister"));

module.exports = routes;
