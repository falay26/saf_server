const aes = require("js-crypto-aes");

const CreateToken = require("./CreateToken");
const DeleteToken = require("./DeleteToken");

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

const Login = async () => {
  try {
    const username = await encrypt(process.env.USERNAME);
    const password = await encrypt(process.env.PASSWORD);
    const body = {
      username,
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
      `${process.env.EXCHANGEAPI}/api/LoginUser`,
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
    await DeleteToken({});
    await CreateToken(data.content);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = Login;
