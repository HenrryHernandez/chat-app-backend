const express = require("express");

const {
  createChat,
  joinUserToChat,
  getChats,
} = require("../controllers/chats.controller");

const route = express.Router();

route.post("/", createChat);
route.patch("/", joinUserToChat);
route.get("/", getChats);

module.exports = route;
