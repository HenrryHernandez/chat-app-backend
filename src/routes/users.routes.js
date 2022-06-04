const express = require("express");

const { createNewUser, getUsers } = require("../controllers/users.controller");

const route = express.Router();

route.post("/", createNewUser);
route.get("/", getUsers);

module.exports = route;
