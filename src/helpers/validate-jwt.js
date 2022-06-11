const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/users.model");

const validateJWT = async (req = request, res = response, next) => {
  let token = req.header("Authorization") || req.header("access-token");
  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "no token",
    });
  }

  token = token.split(" ")[1];

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);

    const user = await User.findById(uid);

    if (!user || uid !== req.params.id) {
      return res.status(401).json({
        success: false,
        msg: "not valid token - user doesn't exist",
        data: null,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      msg: "no valid token",
      data: null,
    });
  }
};

module.exports = {
  validateJWT,
};
