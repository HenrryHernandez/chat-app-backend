const express = require("express");

const {
  chatExists,
  userHasNotBeenJoinedToChat,
} = require("../helpers/custom-validators");
const {
  createChat,
  joinUserToChat,
  exitUserFromChat,
  getChats,
  getChatsSearch,
} = require("../controllers/chats.controller");

const route = express.Router();

route.post("/", createChat);
route.patch("/join", [chatExists, userHasNotBeenJoinedToChat], joinUserToChat);
route.patch("/exit", exitUserFromChat);
route.get("/", getChats);
route.get("/search/:name", getChatsSearch);

module.exports = route;
