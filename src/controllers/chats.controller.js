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
  const { userId, chatId } = req.body;

  try {
    await Chat.findByIdAndUpdate(chatId, { $push: { users: [userId] } });
    await User.findByIdAndUpdate(userId, { $push: { chats: [chatId] } });

    res.status(201).json({ success: true, msg: "success", data: null });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const exitUserFromChat = async (req, res) => {
  const { userId, chatId } = req.body;

  try {
    const userQuery = User.findByIdAndUpdate(userId, {
      $pullAll: { chats: [chatId] },
    });

    const chatQuery = Chat.findByIdAndUpdate(chatId, {
      $pullAll: { users: [userId] },
    });

    await Promise.all([userQuery, chatQuery]);

    res.status(200).json({ success: true, msg: "success", data: null });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ succes: false, msg: "something went wrong", data: { error } });
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

const getChatsSearch = async (req, res) => {
  const { name } = req.params;

  try {
    const chats = await Chat.find({ name: { $regex: name } }).select(
      "name isGroup"
    );

    res.status(201).json({ success: true, msg: "success", data: { chats } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong", data: { error } });
  }
};

module.exports = {
  createChat,
  joinUserToChat,
  exitUserFromChat,
  getChats,
  getChatsSearch,
};
