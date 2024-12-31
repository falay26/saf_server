const Token = require("../models/Token");

const DeleteToken = async (token) => {
  const data = await Token.deleteMany(token);
  return data;
};

module.exports = DeleteToken;
