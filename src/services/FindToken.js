const Token = require("../models/Token");

const FindToken = async () => {
  const data = await Token.findOne();
  return data;
};

module.exports = FindToken;
