const cheerio = require("cheerio");
const axios = require("axios");
//Models
const Quarter = require("../models/Quarter");
//Constans
const Bist = require("../constants/Bist");

const createNewQuarter = async (date) => {
  let new_stocks = {};
  Bist.map((i) => {
    let new_obj = {
      name: i.name,
      last_iy_read: null,
      dv: null,
      kvyk: null,
      s: null,
      tb: null,
      tv: null,
      dv0: null,
      os: null,
      ns: null,
      kvta: null,
      sm: null,
      os0: null,
      nk: null,
    };
    new_stocks[i.name] = new_obj;
  });
  await Quarter.create({
    date: date,
    stocks: new_stocks,
  });
};

const isPassed = (now, then) => {
  if (then === null) {
    return true;
  } else {
    let time_passed = now - then;
    return time_passed > 1000 * 60 * 60 * 48;
  }
};

const MBO = () => {
  const mainFunction = async () => {
    const last_quarter = await Quarter.findOne().sort("created_at").exec(); //Add minus maybe?
    if (last_quarter === null) {
      createNewQuarter("2024/09");
      return;
    }
    const now = Date.now();
    let to_be_checkeds = Object.values(last_quarter.stocks).filter((i) =>
      isPassed(now, i.last_iy_read)
    );
    if (to_be_checkeds.length !== 0) {
      let stock_to_check = to_be_checkeds[0];
      /*
      let kap_url =
        "https://www.kap.org.tr/tr/sirket-finansal-bilgileri/" +
        Bist.filter((i) => i.name === stock_to_check.name)[0].kap;
      */
      let ft_url =
        "https://www.isyatirim.com.tr/tr-tr/analiz/hisse/Sayfalar/sirket-karti.aspx?hisse=" +
        stock_to_check.name;
      /*
      if (isPassed(now, stock_to_check.last_kap_read)) {
        const response = await axios.get(kap_url);
        const $ = cheerio.load(response.data);
        const table = $("#printAreaDiv").children(0).children(0);
        const table_date = table.children(0).children()[4].attribs.title;
        const quarter_to_edit = await Quarter.findOne({
          date: table_date,
        }).exec();
        if (quarter_to_edit === null) {
          createNewQuarter(table_date);
        }
        const new_dv = parseInt(
          table.children(0).children()[19].attribs.title.replaceAll(".", "")
        );
        const new_kvyk = parseInt(
          table.children(0).children()[34].attribs.title.replaceAll(".", "")
        );
        const new_tb = parseInt(
          table.children(0).children()[44].attribs.title.replaceAll(".", "")
        );
        const new_dv0 = parseInt(
          table.children(0).children()[24].attribs.title.replaceAll(".", "")
        );
        const new_os = parseInt(
          table.children(0).children()[49].attribs.title.replaceAll(".", "")
        );
        const new_ns = parseInt(
          table.children(0).children()[89].attribs.title.replaceAll(".", "")
        );
        const new_sm = parseInt(
          table.children(0).children()[94].attribs.title.replaceAll(".", "")
        );
        const kap_read = Date.now();
        quarter_to_edit.stocks[stock_to_check.name].dv = new_dv;
        quarter_to_edit.stocks[stock_to_check.name].kvyk = new_kvyk;
        quarter_to_edit.stocks[stock_to_check.name].tb = new_tb;
        quarter_to_edit.stocks[stock_to_check.name].dv0 = new_dv0;
        quarter_to_edit.stocks[stock_to_check.name].os = new_os;
        quarter_to_edit.stocks[stock_to_check.name].ns = new_ns;
        quarter_to_edit.stocks[stock_to_check.name].sm = new_sm;
        quarter_to_edit.stocks[stock_to_check.name].last_kap_read = kap_read;
        quarter_to_edit.markModified("stocks");
        await quarter_to_edit.save();
        console.log(stock_to_check.name + " KAP okunması bitti!");
      }
      */
      if (isPassed(now, stock_to_check.last_iy_read)) {
        const response = await axios.get(ft_url);
        const $ = cheerio.load(response.data);
        const table = $('[data-csvname="malitablo"]')[0];
        const date_unedited =
          table.children[1].children[1].children[3].children[0].children[1]
            .children[0].data;
        const table_date =
          date_unedited.split("/")[0] +
          "/" +
          (date_unedited.split("/")[1].length === 1
            ? "0" + date_unedited.split("/")[1]
            : date_unedited.split("/")[1]);
        const quarter_to_edit = await Quarter.findOne({
          date: table_date,
        }).exec();
        if (quarter_to_edit === null) {
          createNewQuarter(table_date);
          return;
        }
        const new_dv = parseInt(
          table.children[3].children[2].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_kvyk = parseInt(
          table.children[3].children[32].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_s = parseInt(
          table.children[3].children[9].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_tb =
          parseInt(
            table.children[3].children[32].children[1].children[0].data.replaceAll(
              ".",
              ""
            )
          ) +
          parseInt(
            table.children[3].children[46].children[1].children[0].data.replaceAll(
              ".",
              ""
            )
          );
        const new_tv = parseInt(
          table.children[3].children[30].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_dv0 = parseInt(
          table.children[3].children[14].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_os = parseInt(
          table.children[3].children[59].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_ns = parseInt(
          table.children[3].children[74].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_kvta = parseInt(
          table.children[3].children[5].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_sm = parseInt(
          table.children[3].children[75].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const new_os0 =
          (parseInt(
            table.children[3].children[9].children[1].children[0].data.replaceAll(
              ".",
              ""
            )
          ) +
            parseInt(
              table.children[3].children[9].children[2].children[0].data.replaceAll(
                ".",
                ""
              )
            ) +
            parseInt(
              table.children[3].children[9].children[3].children[0].data.replaceAll(
                ".",
                ""
              )
            ) +
            parseInt(
              table.children[3].children[9].children[4].children[0].data.replaceAll(
                ".",
                ""
              )
            )) /
          4;
        const new_nk = parseInt(
          table.children[3].children[68].children[1].children[0].data.replaceAll(
            ".",
            ""
          )
        );
        const iy_read = Date.now();
        quarter_to_edit.stocks[stock_to_check.name].dv = new_dv;
        quarter_to_edit.stocks[stock_to_check.name].kvyk = new_kvyk;
        quarter_to_edit.stocks[stock_to_check.name].s = new_s;
        quarter_to_edit.stocks[stock_to_check.name].tb = new_tb;
        quarter_to_edit.stocks[stock_to_check.name].tv = new_tv;
        quarter_to_edit.stocks[stock_to_check.name].dv0 = new_dv0;
        quarter_to_edit.stocks[stock_to_check.name].os = new_os;
        quarter_to_edit.stocks[stock_to_check.name].ns = new_ns;
        quarter_to_edit.stocks[stock_to_check.name].kvta = new_kvta;
        quarter_to_edit.stocks[stock_to_check.name].sm = new_sm;
        quarter_to_edit.stocks[stock_to_check.name].os0 = new_os0;
        quarter_to_edit.stocks[stock_to_check.name].nk = new_nk;
        if (quarter_to_edit.date === last_quarter.date) {
          quarter_to_edit.stocks[stock_to_check.name].last_iy_read = iy_read;
        } else {
          last_quarter.stocks[stock_to_check.name].last_iy_read = iy_read;
          last_quarter.markModified("stocks");
          await last_quarter.save();
        }
        quarter_to_edit.markModified("stocks");
        await quarter_to_edit.save();
        console.log(stock_to_check.name + " IY okunması bitti!");
      }
    }
  };

  mainFunction();
  setTimeout(() => {
    mainFunction();
  }, 20000);
  setTimeout(() => {
    mainFunction();
  }, 40000);
};

module.exports = MBO;
