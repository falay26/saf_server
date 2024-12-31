const aes = require("js-crypto-aes");

const CreateToken = require("./CreateToken");
const FindToken = require("./FindToken");

const encrypt = async (data) => {
  const apiKey = process.env.APIKEY.split("-")[1];
  const key = Buffer.from(apiKey, "base64");
  const cipherText = await aes.encrypt(Buffer.from(data), key, {
    name: "AES-CBC",
    iv: Buffer.from(
      "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"
    ),
  });
  return Buffer.from(cipherText).toString("base64");
};

const LoginCheck = async (code) => {
  try {
    const tokenInDB = await FindToken();
    if (!tokenInDB || !code) {
      throw new Error("No token or code");
    }
    const token = await encrypt(tokenInDB.token);
    const password = await encrypt(code);
    const body = {
      token,
      password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        APIKEY: process.env.APIKEY,
      },
    };
    const response = await fetch(
      `${process.env.EXCHANGEAPI}/api/LoginUserControl`,
      options
    );
    if (!response.ok) {
      const errFromServer = await response.json();
      throw new Error(errFromServer.message);
    }
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    await CreateToken({
      token: tokenInDB.token,
      hash: data.content.hash,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = LoginCheck;
