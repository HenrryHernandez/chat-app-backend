const express = require("express");

const { login } = require("../controllers/auth.controller");
const { userExists, correctPassword } = require("../helpers/custom-validators");

const route = express.Router();

route.post("/login", [userExists, correctPassword], login);

module.exports = route;
