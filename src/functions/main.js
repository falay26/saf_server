//Functions
const ApiCall = require("../functions/api_call");
const NM = require("../functions/notify_me");
const SI = require("../functions/scrape_it");
//Services
const BuyOrSell = require("../services/BuyOrSell");
//Constant
const calculateSP = require("../constants/SP");
//Models
const Stock = require("../models/Stock");
const Gem = require("../models/Gem");
const Segment = require("../models/Segment");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const M = async (hash) => {
  try {
    //Finding stocks that we own right now.
    const stocks = await Stock.find({ end_date: null });
    const segments = await Segment.find({ finished: false }); //TODO: aggrate and fill finished
    console.log("Mevcut hisse sayısı = ", stocks.length); //To be deleted.
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (stocks.length === 6) {
      //Getting current prices of the stocks we own.
      let stocks_array = stocks.map((i) => {
        return {
          _id: i._id,
          name: i.stock,
          buy_price: i.start_value,
          amount: i.amount,
          price: null,
          start_date: i.start_date,
          end_date: i.end_date,
          end_value: i.end_value,
          values: i.values,
          tiers: i.tiers,
        };
      });
      for (let i = 0; i < stocks_array.length; i++) {
        if (stocks_array[i].end_date === null) {
          let data = await new ApiCall().getPrice(stocks_array[i].name, hash);
          stocks_array[i].price = parseFloat(data?.content?.lst);
          let percent =
            (parseFloat(data?.content?.lst) * 100) / stocks_array[i].buy_price -
            100;
          let tier = Math.floor(Math.pow(percent / 100 + 1, 240));
          let k_z =
            (
              stocks_array[i].price * stocks_array[i].amount -
              stocks_array[i].buy_price * stocks_array[i].amount
            ).toFixed(2) + " TL";
          stocks_array[i].values = stocks_array[i].values.concat([percent]);
          stocks_array[i].tiers = stocks_array[i].tiers.concat([tier]);

          const stock = await Stock.findOne({
            _id: stocks_array[i]._id,
          }).exec();
          stock.values = stock.values.concat([percent]);
          if (
            isNaN(stock.values[stock.values.length - 1]) &&
            isNaN(stock.values[stock.values.length - 2]) &&
            isNaN(stock.values[stock.values.length - 3])
          ) {
            NM("Giriş yapmalısın!");
          }
          //TODO: If last 3 is NaN, notify "Need To Login!"
          stock.tiers = stock.tiers.concat([tier]);

          let now = Date.now();
          let hours =
            Math.abs(now - parseInt(stocks_array[i].start_date)) / 36e5;

          await stock.save();
          console.log(
            hour + ":" + minute,
            hours.toFixed(0),
            stocks_array[i].name,
            tier,
            percent.toFixed(2),
            calculateSP(
              stocks_array[i].tiers[stocks_array[i].tiers.length - 2]
            ),
            calculateSP(
              stocks_array[i].tiers[stocks_array[i].tiers.length - 1]
            ),
            k_z
          );
          if (hours >= 1 && hours < 8) {
            if (percent >= 0.5) {
              await timer(5000);
              let date = Date.now();
              await BuyOrSell(
                stocks_array[i].name,
                "",
                stocks_array[i].amount.toString(),
                hash,
                async () => {
                  const stock = await Stock.findOne({
                    _id: stocks_array[i]._id,
                  }).exec();
                  stock.end_date = date;
                  stock.end_value = stocks_array[i].price;

                  await stock.save();
                },
                true
              );
            }
          } else if (hours >= 8) {
            if (percent >= 0.35) {
              await timer(5000);
              let date = Date.now();
              await BuyOrSell(
                stocks_array[i].name,
                "",
                stocks_array[i].amount.toString(),
                hash,
                async () => {
                  const stock = await Stock.findOne({
                    _id: stocks_array[i]._id,
                  }).exec();
                  stock.end_date = date;
                  stock.end_value = stocks_array[i].price;

                  await stock.save();
                },
                true
              );
            }
          } else {
            if (
              calculateSP(
                stocks_array[i].tiers[stocks_array[i].tiers.length - 2]
              ) >
              calculateSP(
                stocks_array[i].tiers[stocks_array[i].tiers.length - 1]
              )
            ) {
              await timer(5000);
              let date = Date.now();
              await BuyOrSell(
                stocks_array[i].name,
                "",
                stocks_array[i].amount.toString(),
                hash,
                async () => {
                  const stock = await Stock.findOne({
                    _id: stocks_array[i]._id,
                  }).exec();
                  stock.end_date = date;
                  stock.end_value = stocks_array[i].price;

                  await stock.save();
                },
                true
              );
            }
          }
          await timer(5000);
        }
      }
      //Getting current prices of the stocks we own.

      /*
    //Calculating tier and percentage
    let starting_cash = 0;
    let current_cash = 0;
    stocks_array.map((i) => {
      starting_cash += i.buy_price * i.amount;
      current_cash +=
        i.end_date === null ? i.price * i.amount : i.end_value * i.amount;
    });
    let percent = (current_cash * 100) / starting_cash - 100;
    let tier = Math.floor(Math.pow(percent / 100 + 1, 240));
    let profit = current_cash - starting_cash;
    //Calculating tier and percentage

    //Tracking tier to find out when to sell stocks.
    const day = await Gem.findOne({ date: date }).exec();
    if (!day) {
      NM(
        "Günün ortalama değişimi: " +
          percent.toFixed(2) +
          ", Tier: " +
          tier +
          ", Kar: " +
          profit.toFixed(2)
      );
      await Gem.create({
        date: date,
        values: [percent],
        tiers: [tier],
      });
    } else {
      let last_percent = day.values[day.values.length - 1];
      let last_tier = day.tiers[day.tiers.length - 1];
      if (last_percent !== percent) {
        console.log(
          "Günün ortalama değişimi: " +
            percent.toFixed(2) +
            ", Tier: " +
            tier +
            ", Kar: " +
            profit.toFixed(2)
        );
        day.values = day.values.concat([percent]);
        await day.save();
      }
      if (last_tier !== tier) {
        NM(
          "Günün ortalama değişimi:" +
            percent.toFixed(2) +
            ", Tier:" +
            tier +
            ", Kar: " +
            profit.toFixed(2)
        );
        day.tiers = day.tiers.concat([tier]);
        await day.save();
      }
      */

      //TODO: sell them indevidually somewhere in here.

      /*
      if (
        calculateSP(day.tiers[day.tiers.length - 2]) >
        calculateSP(day.tiers[day.tiers.length - 1])
      ) {
        console.log(
          calculateSP(day.tiers[day.tiers.length - 2]),
          calculateSP(day.tiers[day.tiers.length - 1])
        );
        for (let i = 0; i < stocks_array.length; i++) {
          await exchangeService.sellOrBuy(
            stocks_array[i].name,
            "",
            stocks_array[i].amount.toString(),
            hash,
            async () => {
              const stock = await Stock.findOne({
                _id: stocks_array[i]._id,
              }).exec();
              stock.end_date = date;
              stock.end_value = stocks_array[i].price;

              await stock.save();
            },
            true
          );
          await timer(5000);
        }
      }
      if (percent < -1) {
        for (let i = 0; i < stocks_array.length; i++) {
          await exchangeService.sellOrBuy(
            stocks_array[i].name,
            "",
            stocks_array[i].amount.toString(),
            hash,
            async () => {
              const stock = await Stock.findOne({
                _id: stocks_array[i]._id,
              }).exec();
              stock.end_date = date;
              stock.end_value = stocks_array[i].price;

              await stock.save();
            },
            true
          );
          await timer(5000);
        }
      }
    }
      */
    } else {
      //There is no stocks in account. So start to buy them.
      console.log("Açık segment sayısı = ", segments.length);
      if (segments.length === 0) {
        //Open new segment
        const all_segments = await Segment.find({});
        await Segment.create({
          _id: all_segments.length + 1,
          stocks: [],
        });
      } else {
        let how_many_buys = 6 - stocks.length;
        let stock_to_buy = await SI();
        let balance = await new ApiCall().getBalance(hash);
        if (isNaN(balance)) {
          NM("Giriş yapmalısın!");
          return;
        }
        console.log("Bakiye === ", balance);
        await timer(5000);
        let data = await new ApiCall().getPrice(stock_to_buy.name, hash);
        stock_to_buy.price = parseFloat(data?.content?.lst);
        stock_to_buy.amount = Math.min(
          Math.floor(
            Math.min(1000, balance / how_many_buys) /
              parseFloat(data?.content?.lst)
          )
        );
        await timer(5000);
        console.log(stock_to_buy);
        let date = Date.now();
        console.log(date);
        let price_order = "";
        let amount_order = stock_to_buy.amount.toString();
        console.log(price_order, amount_order);
        await BuyOrSell(
          stock_to_buy.name,
          price_order,
          amount_order,
          hash,
          async () => {
            let new_stock = await Stock.create({
              start_date: date,
              start_value: stock_to_buy.price,
              stock: stock_to_buy.name,
              amount: stock_to_buy.amount,
            });
            if (segments[0].stocks.length < 5) {
              console.log("İlk segmentte yer var.");
              let segment = await Segment.findOne({ _id: segments[0]._id });
              console.log(segment);
              if (segment.start_date === null) {
                segment.start_date = date;
              }
              segment.stocks = segment.stocks.concat([stock_to_buy.name]);
              if (segment.stock_1_id === null) {
                segment.stock_1_id = new_stock._id;
              } else if (segment.stock_2_id === null) {
                segment.stock_2_id = new_stock._id;
              } else if (segment.stock_3_id === null) {
                segment.stock_3_id = new_stock._id;
                return;
              } else if (segment.stock_4_id === null) {
                segment.stock_4_id = new_stock._id;
              } else if (segment.stock_5_id === null) {
                segment.stock_5_id = new_stock._id;
              }

              await segment.save();
            } else {
              if (segments[1]?.stocks?.length < 5) {
                console.log("İkinci segmentte yer var.");
                let segment = await Segment.find({ _id: segments[1]._id });
                console.log(segment);
                if (segment.start_date === null) {
                  segment.start_date = date;
                }
                segment.stocks = segment.stocks.concat([stock_to_buy.name]);
                if (segment.stock_1_id === null) {
                  segment.stock_1_id = new_stock._id;
                } else if (segment.stock_2_id === null) {
                  segment.stock_2_id = new_stock._id;
                } else if (segment.stock_3_id === null) {
                  segment.stock_3_id = new_stock._id;
                } else if (segment.stock_4_id === null) {
                  segment.stock_4_id = new_stock._id;
                } else if (segment.stock_5_id === null) {
                  segment.stock_5_id = new_stock._id;
                }

                await segment.save();
              }
            }
          },
          false
        );
      }
    }
    //Tracking tier to find out when to sell stocks.
  } catch (e) {
    console.log(e);
  }
};

module.exports = M;
