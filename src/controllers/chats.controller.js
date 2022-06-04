const Chat = require("../models/chats.model");
const User = require("../models/users.model");

const createChat = async (req, res) => {
  const { _id, name, userId } = req.body;

  try {
    const chat = await Chat.create({ name, users: userId });
    await User.findByIdAndUpdate(userId, { $push: { chats: [chat._id] } });

    res.status(201).json({ msg: "success", chat });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const joinUserToChat = async (req, res) => {
  const { userId, groupId } = req.body;

  try {
    await Chat.findByIdAndUpdate(groupId, { $push: { users: [userId] } });
    await User.findByIdAndUpdate(userId, { $push: { chats: [groupId] } });

    res.status(201).json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();

    res.status(201).json({ msg: "success", chats });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

module.exports = { createChat, joinUserToChat, getChats };
