const express = require("express");
const { memberLogin } = require("../Controllers/members");
const routes = express.Router();

routes.post("/", memberLogin);

module.exports = routes;
