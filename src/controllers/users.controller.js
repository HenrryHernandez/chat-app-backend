const { encryptString } = require("../helpers/encrypt-string");
const User = require("./../models/users.model");

const createNewUser = async (req, res) => {
  const { _id, username, password } = req.body;

  const newPassword = encryptString(password);

  try {
    const user = await User.create({ username, password: newPassword });

    res.status(201).json({ msg: "success", user });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json({ msg: "success", users });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "chats",
    select: "name isGroup",
  });

  const { __v, password, username, chats, _id } = user;

  try {
    res.status(200).json({
      success: true,
      msg: "success",
      data: { user: { username, chats, _id } },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong", data: { error } });
  }
};

module.exports = { createNewUser, getUsers, getUser };
