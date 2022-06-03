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

module.exports = { createNewUser };
