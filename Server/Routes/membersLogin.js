const express = require("express");
const routes = express.Router();

routes.post("/", require("../Controllers/membersLogin"));

module.exports = routes;
