const crypto = require("crypto");

const CheckToken = async (hash) => {
  try {
    const apiUrl = process.env.EXCHANGEAPI.split("/api")[0];
    const checker = crypto
      .createHash("sha256")
      .update(process.env.APIKEY + apiUrl + "/api/SessionRefresh")
      .digest("hex");
    const options = {
      method: "POST",
      data: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
        Authorization: hash,
        APIKEY: process.env.APIKEY,
        Checker: checker,
      },
    };
    const response = await fetch(
      `${process.env.EXCHANGEAPI}/api/SessionRefresh`,
      options
    );
    if (!response.ok) {
      const errFromServer = await response.json();
      throw new Error(errFromServer.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = CheckToken;
