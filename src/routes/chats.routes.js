const express = require("express");

const {
  chatExists,
  userHasNotBeenJoinedToChat,
} = require("../helpers/custom-validators");
const {
  createChat,
  joinUserToChat,
  getChats,
  getChatsSearch,
} = require("../controllers/chats.controller");

const route = express.Router();

route.post("/", createChat);
route.patch("/", [chatExists, userHasNotBeenJoinedToChat], joinUserToChat);
route.get("/", getChats);
route.get("/search/:name", getChatsSearch);

module.exports = route;
