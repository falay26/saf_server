const Token = require("../models/Token");

const CreateToken = async (token) => {
  const data = await Token.findOneAndUpdate({ token: token.token }, token, {
    upsert: true,
    new: true,
  });
  return data;
};

module.exports = CreateToken;
