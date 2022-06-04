const jwt = require("jsonwebtoken");

const generateJWT = async (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.PRIVATE_KEY + "",
      { expiresIn: "10 days" },
      (error, token) => {
        if (error) {
          console.log(error);

          reject("Token couldn't be generated.");
        } else {
          resolve(token ?? "");
        }
      }
    );
  });
};

module.exports = { generateJWT };
