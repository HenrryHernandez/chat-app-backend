const bcryptjs = require("bcryptjs");

const Chat = require("../models/chats.model");
const User = require("../models/users.model");

const userExists = async (req, res, next) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user) return res.status(404).json({ msg: "user not found" });

    next();
  } catch (error) {
    return res.status(404).json({ msg: "something went wrong", error });
  }
};

const correctPassword = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const { password: userPassword } = await User.findOne({ username }).exec();

    const isValidPassword = bcryptjs.compareSync(password, userPassword);

    if (!isValidPassword)
      return res.status(401).json({ ok: false, msg: "incorrect password" });
  } catch (error) {
    return res.status(404).json({ msg: "something went wrong", error });
  }

  next();
};

const chatExists = async (req, res, next) => {
  const { chatId } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat)
    return res
      .status(404)
      .json({ success: false, msg: "the group doesn't exist", data: null });

  next();
};

const userHasNotBeenJoinedToChat = async (req, res, next) => {
  const { userId, chatId } = req.body;

  try {
    const { chats } = await User.findById(userId);

    chats.forEach((chat) => {
      if (chat.toString() === chatId)
        return res.status(400).json({
          success: false,
          msg: "user is already in the group",
          data: null,
        });
    });

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "something went wrong", data: { error } });
  }
};

module.exports = {
  userExists,
  correctPassword,
  chatExists,
  userHasNotBeenJoinedToChat,
};
