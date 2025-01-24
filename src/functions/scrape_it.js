const cheerio = require("cheerio");
const axios = require("axios");
//Models
const Day = require("../models/Day");
const Day0 = require("../models/Day0");
const Stock = require("../models/Stock");
//Constans
const Bist100 = require("../constants/Bist100");

const url = "https://finans.mynet.com/borsa/en-cok-dusen-hisseler/";

const GetHTmlData = async () => {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const table = $("table");
    const tableData = [];
    table.find("tr").each((i, row) => {
      const rowData = {};
      $(row)
        .find("td, th")
        .each((j, cell) => {
          rowData[$(cell).text()] = j;
        });
      tableData.push(Object.keys(rowData)[0]);
    });

    const day_5_days = await Day.aggregate([
      { $sort: { created_at: -1 } },
      { $limit: 5 },
      { $sort: { created_at: 1 } },
    ]);
    const last_1_loses = Object.values(day_5_days[4].stocks)
      .filter((i) => i !== null)
      .filter((i) => {
        let price = i?.price;
        let last_price = day_5_days[3].stocks[i.name]?.price;
        return last_price > price;
      })
      .map((i) => i.name);
    const last_2_loses = Object.values(day_5_days[3].stocks)
      .filter((i) => i !== null)
      .filter((i) => {
        let price = i?.price;
        let last_price = day_5_days[2].stocks[i.name]?.price;
        return last_price > price;
      })
      .map((i) => i.name)
      .filter((i) => last_1_loses.includes(i));
    const last_3_loses = Object.values(day_5_days[2].stocks)
      .filter((i) => i !== null)
      .filter((i) => {
        let price = i?.price;
        let last_price = day_5_days[1].stocks[i.name]?.price;
        return last_price > price;
      })
      .map((i) => i.name)
      .filter((i) => last_2_loses.includes(i));
    const last_4_loses = Object.values(day_5_days[1].stocks)
      .filter((i) => i !== null)
      .filter((i) => {
        let price = i?.price;
        let last_price = day_5_days[0].stocks[i.name]?.price;
        return last_price > price;
      })
      .map((i) => i.name)
      .filter((i) => last_3_loses.includes(i));
    let last_10_stocks = await Stock.aggregate([{ $sort: { created_at: 1 } }]);
    let last_10_names = last_10_stocks
      .slice(Math.max(last_10_stocks.length - 10, 0))
      .map((i) => i.stock);
    //TODO: Add current stocks to last_10_names..

    let table_stocks = tableData.map((i) => i.replaceAll("\n", ""));

    let bests_1 = table_stocks.filter(
      (i) =>
        i !== "Hisse" &&
        Bist100.includes(i) &&
        last_4_loses.includes(i) &&
        !last_10_names.includes(i)
    ); //5 Loses.
    let bests_2 = table_stocks.filter(
      (i) =>
        i !== "Hisse" &&
        Bist100.includes(i) &&
        last_3_loses.includes(i) &&
        !last_10_names.includes(i) &&
        !bests_1.includes(i)
    ); //4 Loses
    let bests_3 = tableData
      .map((i) => i.replaceAll("\n", ""))
      .filter(
        (i) =>
          i !== "Hisse" &&
          Bist100.includes(i) &&
          last_2_loses.includes(i) &&
          !last_10_names.includes(i) &&
          !bests_1.includes(i) &&
          !bests_2.includes(i)
      ); //3 Loses
    let bests_4 = tableData
      .map((i) => i.replaceAll("\n", ""))
      .filter(
        (i) =>
          i !== "Hisse" &&
          Bist100.includes(i) &&
          last_1_loses.includes(i) &&
          !last_10_names.includes(i) &&
          !bests_1.includes(i) &&
          !bests_2.includes(i) &&
          !bests_3.includes(i)
      ); //2 Loses
    let bests_5 = tableData
      .map((i) => i.replaceAll("\n", ""))
      .filter(
        (i) =>
          i !== "Hisse" &&
          Bist100.includes(i) &&
          !last_10_names.includes(i) &&
          !bests_1.includes(i) &&
          !bests_2.includes(i) &&
          !bests_3.includes(i) &&
          !bests_4.includes(i)
      ); //1 Loses
    const last_60_days = await Day0.aggregate([
      { $sort: { created_at: -1 } },
      { $limit: 60 },
      { $sort: { created_at: 1 } },
    ]);
    /*
    let all_stocks_sorted = Bist100.filter(
      (i) => !last_10_names.includes(i) && table_stocks.includes(i)
    )
      .map((i) => {
        let highest = last_60_days[0].stocks[i].price;
        let lowest = last_60_days[0].stocks[i].price;
        let latest_price = last_60_days[59].stocks[i].price;
        last_60_days
          .map((k) => {
            let price = k.stocks[i].price;
            if (price > highest) {
              highest = price;
            }
            if (price < lowest) {
              lowest = price;
            }
          });
        let point = (latest_price - lowest) / (highest - lowest);
        return {
          name: i,
          highest: highest,
          lowest: lowest,
          latest_price: latest_price,
          point: point,
        };
      })
      .sort((a, b) => {
        return a.point - b.point;
      })
      .map((i) => i.name);
      */

    let finals = [bests_1, bests_2, bests_3, bests_4, bests_5];
    let final = {
      name:
        finals[0].length !== 0
          ? finals[0][0]
          : finals[1]?.length !== 0
          ? finals[1][0]
          : finals[2]?.length !== 0
          ? finals[2][0]
          : finals[3]?.length !== 0
          ? finals[3][0]
          : finals[4]?.length !== 0
          ? finals[4][0]
          : null,
      price: null,
      amount: null,
    };

    console.log(finals);

    return final;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const SI = async () => {
  const datas = await GetHTmlData();
  return datas; //Stocks to buy!!
};

module.exports = SI;
