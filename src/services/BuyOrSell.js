const crypto = require("crypto");

const BuyOrSell = async (symbol, price, lot, hash, fn, isSell) => {
  try {
    const body = {
      symbol,
      direction: isSell ? "SELL" : "BUY",
      pricetype: isSell ? "piyasa" : "limit",
      price: price,
      lot,
      sms: true,
      email: false,
      subAccount: "",
    };
    const apiUrl = process.env.EXCHANGEAPI.split("/api")[0];
    const checker = crypto
      .createHash("sha256")
      .update(
        process.env.APIKEY +
          apiUrl +
          "/api/SendOrder" +
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
      `${process.env.EXCHANGEAPI}/api/SendOrder`,
      options
    );
    console.log("response = ", response);
    if (!response.ok) {
      const errFromServer = await response.json();
      throw new Error(errFromServer.message);
    }
    const data = await response.json();
    console.log("data = ", data);
    if (!data.success) {
      throw new Error(data.message);
    } else {
      //TODO: Extra control here.
      //data.success === true
      //content: 'İşlem bakiyesi yetersiz.TradeLimitInsufficient'
      if (
        data.content !== "İşlem bakiyesi yetersiz.TradeLimitInsufficient" &&
        data.content !== "InvalidUnitsInvalidUnits"
      ) {
        fn();
      }
    }
    return data;
  } catch (error) {
    console.log("error = ", error);
    //throw new Error(error);
  }
};

module.exports = BuyOrSell;
