const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/users.model");

const login = async (req, res) => {
  const { username } = req.body;

  try {
    const { _id } = await User.findOne({ username }).exec();

    const token = await generateJWT(_id);

    res.status(201).json({ msg: "success", token });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong", error });
  }
};

module.exports = { login };
