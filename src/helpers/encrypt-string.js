const bcryptjs = require("bcryptjs");

const encryptString = (str) => {
  const salt = bcryptjs.genSaltSync();
  const encryptedString = bcryptjs.hashSync(str, salt);

  return encryptedString;
};

module.exports = { encryptString };
