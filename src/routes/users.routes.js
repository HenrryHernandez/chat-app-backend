const express = require("express");

const { createNewUser } = require("../controllers/users.controller");

const route = express.Router();

route.post("/", createNewUser);

module.exports = route;
