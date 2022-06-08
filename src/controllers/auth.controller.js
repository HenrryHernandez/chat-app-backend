const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/users.model");

const login = async (req, res) => {
  const { username: userName } = req.body;

  try {
    const { _id, username, chats } = await User.findOne({ userName });

    const token = await generateJWT(_id);

    res.status(201).json({
      success: true,
      msg: "success",
      data: { user: { _id, username, chats }, token },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong", data: { error } });
  }
};

module.exports = { login };
