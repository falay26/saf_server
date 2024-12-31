const crypto = require("crypto");

class ApiCall {
  async getPrice(stock_name, hash) {
    try {
      const body = {
        symbol: stock_name,
      };
      const apiUrl = process.env.EXCHANGEAPI.split("/api")[0];
      const checker = crypto
        .createHash("sha256")
        .update(
          process.env.APIKEY +
            apiUrl +
            "/api/GetEquityInfo" +
            JSON.stringify(body).replace(" ", "")
        )
        .digest("hex");
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: hash,
          APIKEY: process.env.APIKEY,
          Checker: checker,
        },
      };
      const response = await fetch(
        `${process.env.EXCHANGEAPI}/api/GetEquityInfo`,
        options
      );
      if (!response.ok) {
        const errFromServer = await response.json();
        throw new Error(errFromServer.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getBalance(hash) {
    try {
      const body = {};
      const apiUrl = process.env.EXCHANGEAPI.split("/api")[0];
      const checker = crypto
        .createHash("sha256")
        .update(process.env.APIKEY + apiUrl + "/api/GetSubAccounts" + "")
        .digest("hex");
      const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: hash,
          APIKEY: process.env.APIKEY,
          Checker: checker,
        },
      };
      const response = await fetch(
        `${process.env.EXCHANGEAPI}/api/GetSubAccounts`,
        options
      );
      if (!response.ok) {
        const errFromServer = await response.json();
        throw new Error(errFromServer.message);
      }
      const data = await response.json();

      return parseFloat(data.content[0]?.tradeLimit);
    } catch (error) {
      return null;
    }
  }
}

module.exports = ApiCall;
