const express = require("express");

const {
  createChat,
  joinUserToChat,
  getChats,
  getChatsSearch,
} = require("../controllers/chats.controller");

const route = express.Router();

route.post("/", createChat);
route.patch("/", joinUserToChat);
route.get("/", getChats);
route.get("/search/:name", getChatsSearch);

module.exports = route;
