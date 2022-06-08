const express = require("express");

const {
  createNewUser,
  getUsers,
  getUser,
} = require("../controllers/users.controller");
const { validateJWT } = require("../helpers/validate-jwt");

const route = express.Router();

route.post("/", createNewUser);
route.get("/", getUsers);
route.get("/:id", [validateJWT], getUser);

module.exports = route;
