const bcryptjs = require("bcryptjs");

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

module.exports = { userExists, correctPassword };
