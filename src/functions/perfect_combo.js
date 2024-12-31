const puppeteer = require("puppeteer");
//Models
const ADay = require("../models/ADay");
const ADay0 = require("../models/ADay0");
const ADay1 = require("../models/ADay1");
const Day = require("../models/Day");
const Day0 = require("../models/Day0");
const Day1 = require("../models/Day1");
//Constans
const Bist = require("../constants/BistA");

const url = ["https://tr.tradingview.com/symbols/BIST-", "/technicals/"];

const createNewADay = async (date) => {
  let new_stocks = {};
  [{ name: "XU100" }].concat(Bist).map((i) => {
    let new_obj = {
      name: i.name,
      price: null,
    };
    new_stocks[i.name] = new_obj;
  });
  await ADay.create({
    date: date,
    stocks: new_stocks,
  });
};

const createNewADay0 = async (date) => {
  let new_stocks = {};
  [{ name: "XU100" }].concat(Bist).map((i) => {
    let new_obj = {
      name: i.name,
      price: null,
    };
    new_stocks[i.name] = new_obj;
  });
  await ADay0.create({
    date: date,
    stocks: new_stocks,
  });
};

const createNewADay1 = async (date) => {
  let new_stocks = {};
  [{ name: "XU100" }].concat(Bist).map((i) => {
    let new_obj = {
      name: i.name,
      price: null,
    };
    new_stocks[i.name] = new_obj;
  });
  await ADay1.create({
    date: date,
    stocks: new_stocks,
  });
};

const PC = async (date) => {
  const getDatas = async () => {
    try {
      const aday = await ADay.findOne({ date: date }).exec();
      const aday0 = await ADay0.findOne({ date: date }).exec();
      const aday1 = await ADay1.findOne({ date: date }).exec();
      const day = await Day.findOne({ date: date }).exec();
      const day0 = await Day0.findOne({ date: date }).exec();
      const day1 = await Day1.findOne({ date: date }).exec();
      let non_finds = Object.values(aday.stocks).filter(
        (i) => i.price === null
      );
      if (non_finds.length === 0) {
        //Hepsi bitti, belki bir kerelik notify?
      } else {
        let stock_name = non_finds[0].name;
        let full_url = url[0] + stock_name + url[1];
        let todays_xu100 = 0;

        if (stock_name !== "XU100") {
          todays_xu100 = aday.stocks["XU100"].daily_percentage;
        }

        const browser = await puppeteer.launch({
          headless: true,
          protocolTimeout: 0,
        });
        const page = await browser.newPage();
        await page.goto(full_url, {
          waitUntil: "networkidle0",
          timeout: 50000,
        });
        await page.setViewport({ width: 1920, height: 1080 });
        const new_obj = await page.evaluate(
          (stock_name, todays_xu100) =>
            new Promise((resolve) => {
              {
                const color_1 = "#f23645";
                const color_2 = "#f7525f";
                const color_3 = "#131722";
                const color_4 = "#3179f5";
                const color_5 = "#2962ff";

                let main_timeout = setTimeout(() => {
                  resolve(null);
                }, 45000);

                let object_to_send = {
                  price: null,
                  daily_percentage: null,
                  daily_comparison: null,
                  oscillators_1: null,
                  oscillators_1_point: null,
                  oscillators_7: null,
                  oscillators_7_point: null,
                  oscillators_30: null,
                  oscillators_30_point: null,
                  summary_1: null,
                  summary_1_point: null,
                  summary_7: null,
                  summary_7_point: null,
                  summary_30: null,
                  summary_30_point: null,
                  moving_averages_1: null,
                  moving_averages_1_point: null,
                  moving_averages_7: null,
                  moving_averages_7_point: null,
                  moving_averages_30: null,
                  moving_averages_30_point: null,
                  raw_datas: {
                    day_1: {
                      oscillators: {
                        relative_strength_index_14: {
                          value: null,
                          point: null,
                        },
                        stochastic_14_3_3: {
                          value: null,
                          point: null,
                        },
                        commodity_channel_index_20: {
                          value: null,
                          point: null,
                        },
                        average_directional_index_14: {
                          value: null,
                          point: null,
                        },
                        awesome_oscillator: {
                          value: null,
                          point: null,
                        },
                        momentum_10: {
                          value: null,
                          point: null,
                        },
                        macd_level_12_26: {
                          value: null,
                          point: null,
                        },
                        stochastic_rsi_fast_3_3_14_14: {
                          value: null,
                          point: null,
                        },
                        williams_percent_range_14: {
                          value: null,
                          point: null,
                        },
                        taurus_bear_strength: {
                          value: null,
                          point: null,
                        },
                        ultimate_oscillator_7_14_28: {
                          value: null,
                          point: null,
                        },
                      },
                      moving_averages: {
                        exponential_moving_average_10: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_10: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_30: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_30: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_50: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_50: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_100: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_100: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_200: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_200: {
                          value: null,
                          point: null,
                        },
                        ichimoku_mainline_9_26_52_26: {
                          value: null,
                          point: null,
                        },
                        volume_weighted_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        hull_moving_average: {
                          value: null,
                          point: null,
                        },
                      },
                    },
                    day_7: {
                      oscillators: {
                        relative_strength_index_14: {
                          value: null,
                          point: null,
                        },
                        stochastic_14_3_3: {
                          value: null,
                          point: null,
                        },
                        commodity_channel_index_20: {
                          value: null,
                          point: null,
                        },
                        average_directional_index_14: {
                          value: null,
                          point: null,
                        },
                        awesome_oscillator: {
                          value: null,
                          point: null,
                        },
                        momentum_10: {
                          value: null,
                          point: null,
                        },
                        macd_level_12_26: {
                          value: null,
                          point: null,
                        },
                        stochastic_rsi_fast_3_3_14_14: {
                          value: null,
                          point: null,
                        },
                        williams_percent_range_14: {
                          value: null,
                          point: null,
                        },
                        taurus_bear_strength: {
                          value: null,
                          point: null,
                        },
                        ultimate_oscillator_7_14_28: {
                          value: null,
                          point: null,
                        },
                      },
                      moving_averages: {
                        exponential_moving_average_10: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_10: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_30: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_30: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_50: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_50: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_100: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_100: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_200: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_200: {
                          value: null,
                          point: null,
                        },
                        ichimoku_mainline_9_26_52_26: {
                          value: null,
                          point: null,
                        },
                        volume_weighted_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        hull_moving_average: {
                          value: null,
                          point: null,
                        },
                      },
                    },
                    day_30: {
                      oscillators: {
                        relative_strength_index_14: {
                          value: null,
                          point: null,
                        },
                        stochastic_14_3_3: {
                          value: null,
                          point: null,
                        },
                        commodity_channel_index_20: {
                          value: null,
                          point: null,
                        },
                        average_directional_index_14: {
                          value: null,
                          point: null,
                        },
                        awesome_oscillator: {
                          value: null,
                          point: null,
                        },
                        momentum_10: {
                          value: null,
                          point: null,
                        },
                        macd_level_12_26: {
                          value: null,
                          point: null,
                        },
                        stochastic_rsi_fast_3_3_14_14: {
                          value: null,
                          point: null,
                        },
                        williams_percent_range_14: {
                          value: null,
                          point: null,
                        },
                        taurus_bear_strength: {
                          value: null,
                          point: null,
                        },
                        ultimate_oscillator_7_14_28: {
                          value: null,
                          point: null,
                        },
                      },
                      moving_averages: {
                        exponential_moving_average_10: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_10: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_30: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_30: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_50: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_50: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_100: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_100: {
                          value: null,
                          point: null,
                        },
                        exponential_moving_average_200: {
                          value: null,
                          point: null,
                        },
                        simple_moving_average_200: {
                          value: null,
                          point: null,
                        },
                        ichimoku_mainline_9_26_52_26: {
                          value: null,
                          point: null,
                        },
                        volume_weighted_moving_average_20: {
                          value: null,
                          point: null,
                        },
                        hull_moving_average: {
                          value: null,
                          point: null,
                        },
                      },
                    },
                  },
                  hash_1: null,
                  hash_7: null,
                  hash_30: null,
                  name: stock_name,
                  multiplier: 1,
                };

                const isTabOpen = (days) => {
                  if (days === 1) {
                    let isSelected = tab_1.getAttribute("aria-selected");
                    if (isSelected === "true") {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  if (days === 7) {
                    let isSelected = tab_7.getAttribute("aria-selected");
                    if (isSelected === "true") {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  if (days === 30) {
                    let isSelected = tab_30.getAttribute("aria-selected");
                    if (isSelected === "true") {
                      return true;
                    } else {
                      return false;
                    }
                  }
                };

                const getPointFromContainer = (container) => {
                  const learnColor = (element) => {
                    let rgb_of_color = window
                      .getComputedStyle(element, null)
                      .getPropertyValue("color");
                    let r_color = rgb_of_color
                      .split(",")[0]
                      .replaceAll("rgb(", "");
                    let g_color = rgb_of_color
                      .split(",")[1]
                      .replaceAll(" ", "");
                    let b_color = rgb_of_color
                      .split(",")[2]
                      .replaceAll(")", "")
                      .replaceAll(" ", "");
                    return rgbToHex(r_color, g_color, b_color);
                  };
                  const rgbToHex = (r, g, b) => {
                    return (
                      "#" +
                      ((1 << 24) | (r << 16) | (g << 8) | b)
                        .toString(16)
                        .slice(1)
                    );
                  };
                  let point_1 = learnColor(container.children[2].children[0]);
                  if (point_1 === color_1) {
                    return 1;
                  }
                  let point_2 = learnColor(container.children[1].children[0]);
                  if (point_2 === color_2) {
                    return 2;
                  }
                  let point_3 = learnColor(container.children[0]);
                  if (point_3 === color_3) {
                    return 3;
                  }
                  let point_4 = learnColor(container.children[1].children[1]);
                  if (point_4 === color_4) {
                    return 4;
                  }
                  let point_5 = learnColor(container.children[2].children[1]);
                  if (point_5 === color_5) {
                    return 5;
                  }
                };

                const getPointFromString = (string) => {
                  if (string === "Güçlü Sat") return 1;
                  if (string === "Sat") return 2;
                  if (string === "Nötr") return 3;
                  if (string === "Al") return 4;
                  if (string === "Güçlü Al") return 5;
                };

                const nullNumberOfObject = (object) => {
                  let number = 0;
                  Object.values(object).map((i) =>
                    Object.values(i).map((j) => {
                      if (j === null) number += 1;
                      return j;
                    })
                  );
                  return number;
                };

                const getPercantageForValue = (original_value) => {
                  return (
                    (100 * object_to_send.price) /
                    original_value
                  ).toFixed(4);
                };

                const checkIf1DaysAreDone = () => {
                  if (
                    object_to_send.daily_comparison !== null &&
                    object_to_send.oscillators_1 !== null &&
                    object_to_send.oscillators_1_point !== null &&
                    object_to_send.summary_1 !== null &&
                    object_to_send.summary_1_point !== null &&
                    object_to_send.moving_averages_1 !== null &&
                    object_to_send.moving_averages_1_point !== null &&
                    object_to_send.hash_1 !== null
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                };

                const checkIf7DaysAreDone = () => {
                  if (
                    object_to_send.oscillators_7 !== null &&
                    object_to_send.oscillators_7_point !== null &&
                    object_to_send.summary_7 !== null &&
                    object_to_send.summary_7_point !== null &&
                    object_to_send.moving_averages_7 !== null &&
                    object_to_send.moving_averages_7_point !== null &&
                    object_to_send.hash_7 !== null
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                };

                const checkIf30DaysAreDone = () => {
                  if (
                    object_to_send.oscillators_30 !== null &&
                    object_to_send.oscillators_30_point !== null &&
                    object_to_send.summary_30 !== null &&
                    object_to_send.summary_30_point !== null &&
                    object_to_send.moving_averages_30 !== null &&
                    object_to_send.moving_averages_30_point !== null &&
                    object_to_send.hash_30 !== null
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                };

                const pause = () => {
                  return new Promise((resolve) =>
                    setTimeout(() => {
                      resolve();
                    }, 1 * 1000)
                  );
                };

                const price_span_span = document.getElementsByClassName(
                  "last-JWoJqCpY js-symbol-last"
                )[0].children[0];
                const daily_percentage_span = document.getElementsByClassName(
                  "js-symbol-change-pt"
                )[0];
                const stock_name_from_url = stock_name;
                const tab_1 = document.getElementById("1D");
                const tab_7 = document.getElementById("1W");
                const tab_30 = document.getElementById("1M");
                const speeds_container = document.getElementsByClassName(
                  "speedometersContainer-kg4MJrFB"
                )[0];
                const oscillators_counter =
                  speeds_container.children[0].children[2];
                const oscillators_point_container =
                  speeds_container.children[0].children[1].children[0];
                const summary_counter =
                  speeds_container.children[1].children[2];
                const summary_point_container =
                  speeds_container.children[1].children[1].children[0];
                const moving_averages_counter =
                  speeds_container.children[2].children[2];
                const moving_averages_point_container =
                  speeds_container.children[2].children[1].children[0];
                const oscillators_table =
                  document.getElementsByClassName("table-hvDpy38G")[0];
                const moving_averages_table =
                  document.getElementsByClassName("table-hvDpy38G")[1];

                const getPriceValue = async () => {
                  if (object_to_send.price === null) {
                    if (price_span_span?.innerHTML !== "") {
                      await pause();
                      object_to_send.price = parseFloat(
                        price_span_span?.innerHTML
                          .replaceAll(".", "")
                          .replaceAll(",", ".")
                      );
                    }
                  } else {
                    clearInterval(price_interval);
                  }
                };
                const price_interval = setInterval(getPriceValue, 1500);

                const getDailyPercentageValue = () => {
                  if (object_to_send.daily_percentage === null) {
                    if (daily_percentage_span?.innerHTML !== "") {
                      let daily_percentage_string =
                        daily_percentage_span?.innerHTML
                          .replaceAll("%", "")
                          .replaceAll("−", "-")
                          .replaceAll(",", ".");
                      object_to_send.daily_percentage = parseFloat(
                        daily_percentage_string
                      );
                    }
                  } else {
                    clearInterval(daily_percentage_interval);
                  }
                };
                const daily_percentage_interval = setInterval(
                  getDailyPercentageValue,
                  1500
                );

                const getDailyComparisonValue = () => {
                  if (stock_name_from_url === "XU100") {
                    object_to_send.daily_comparison = 0;
                  } else {
                    if (object_to_send.price !== null) {
                      object_to_send.daily_comparison =
                        Math.round(
                          (object_to_send.daily_percentage - todays_xu100) * 100
                        ) / 100;
                      clearInterval(daily_comparison_interval);
                    }
                  }
                };
                const daily_comparison_interval = setInterval(
                  getDailyComparisonValue,
                  1500
                );

                const getOscillators1Value = () => {
                  if (object_to_send.oscillators_1 === null) {
                    if (isTabOpen(1)) {
                      let point_1 =
                        oscillators_counter.children[0].children[1].innerHTML;
                      let point_2 =
                        oscillators_counter.children[1].children[1].innerHTML;
                      let point_3 =
                        oscillators_counter.children[2].children[1].innerHTML;
                      object_to_send.oscillators_1 =
                        point_1 + "-" + point_2 + "-" + point_3;
                    } else {
                      tab_1.click(); //Opens the 1D tab..
                    }
                  } else {
                    clearInterval(oscillators_1_interval);
                  }
                };
                const oscillators_1_interval = setInterval(
                  getOscillators1Value,
                  1500
                );

                const getOscillators1PointValue = () => {
                  if (object_to_send.oscillators_1_point === null) {
                    if (isTabOpen(1)) {
                      let point = getPointFromContainer(
                        oscillators_point_container
                      );
                      object_to_send.oscillators_1_point = point;
                    } else {
                      tab_1.click(); //Opens the 1D tab..
                    }
                  } else {
                    clearInterval(oscillators_1_point_interval);
                  }
                };
                const oscillators_1_point_interval = setInterval(
                  getOscillators1PointValue,
                  1500
                );

                const getSummary1Value = () => {
                  if (object_to_send.summary_1 === null) {
                    if (isTabOpen(1)) {
                      let point_1 =
                        summary_counter.children[0].children[1].innerHTML;
                      let point_2 =
                        summary_counter.children[1].children[1].innerHTML;
                      let point_3 =
                        summary_counter.children[2].children[1].innerHTML;
                      object_to_send.summary_1 =
                        point_1 + "-" + point_2 + "-" + point_3;
                    } else {
                      tab_1.click(); //Opens the 1D tab..
                    }
                  } else {
                    clearInterval(summary_1_interval);
                  }
                };
                const summary_1_interval = setInterval(getSummary1Value, 1500);

                const getSummary1PointValue = () => {
                  if (object_to_send.summary_1_point === null) {
                    if (isTabOpen(1)) {
                      let point = getPointFromContainer(
                        summary_point_container
                      );
                      object_to_send.summary_1_point = point;
                    } else {
                      tab_1.click(); //Opens the 1D tab..
                    }
                  } else {
                    clearInterval(summary_1_point_interval);
                  }
                };
                const summary_1_point_interval = setInterval(
                  getSummary1PointValue,
                  1500
                );

                const getMovingAverages1Value = () => {
                  if (object_to_send.moving_averages_1 === null) {
                    if (isTabOpen(1)) {
                      let point_1 =
                        moving_averages_counter.children[0].children[1]
                          .innerHTML;
                      let point_2 =
                        moving_averages_counter.children[1].children[1]
                          .innerHTML;
                      let point_3 =
                        moving_averages_counter.children[2].children[1]
                          .innerHTML;
                      object_to_send.moving_averages_1 =
                        point_1 + "-" + point_2 + "-" + point_3;
                    } else {
                      tab_1.click(); //Opens the 1D tab..
                    }
                  } else {
                    clearInterval(moving_averages_1_interval);
                  }
                };
                const moving_averages_1_interval = setInterval(
                  getMovingAverages1Value,
                  1500
                );

                const getMovingAverages1PointValue = () => {
                  if (object_to_send.moving_averages_1_point === null) {
                    if (isTabOpen(1)) {
                      let point = getPointFromContainer(
                        moving_averages_point_container
                      );
                      object_to_send.moving_averages_1_point = point;
                    } else {
                      tab_1.click(); //Opens the 1D tab..
                    }
                  } else {
                    clearInterval(moving_averages_1_point_interval);
                  }
                };
                const moving_averages_1_point_interval = setInterval(
                  getMovingAverages1PointValue,
                  1500
                );

                const getRawDatasDay1OscillatorsValues = () => {
                  if (
                    nullNumberOfObject(
                      object_to_send.raw_datas.day_1.oscillators
                    ) > 0
                  ) {
                    if (isTabOpen(1)) {
                      let oscillator_0_value =
                        oscillators_table.children[0].children[1].children[1]
                          .innerHTML;
                      let oscillator_0_point = getPointFromString(
                        oscillators_table.children[0].children[1].children[2]
                          .innerHTML
                      );
                      let oscillator_1_value =
                        oscillators_table.children[0].children[2].children[1]
                          .innerHTML;
                      let oscillator_1_point = getPointFromString(
                        oscillators_table.children[0].children[2].children[2]
                          .innerHTML
                      );
                      let oscillator_2_value =
                        oscillators_table.children[0].children[3].children[1]
                          .innerHTML;
                      let oscillator_2_point = getPointFromString(
                        oscillators_table.children[0].children[3].children[2]
                          .innerHTML
                      );
                      let oscillator_3_value =
                        oscillators_table.children[0].children[4].children[1]
                          .innerHTML;
                      let oscillator_3_point = getPointFromString(
                        oscillators_table.children[0].children[4].children[2]
                          .innerHTML
                      );
                      let oscillator_4_value =
                        oscillators_table.children[0].children[5].children[1]
                          .innerHTML;
                      let oscillator_4_point = getPointFromString(
                        oscillators_table.children[0].children[5].children[2]
                          .innerHTML
                      );
                      let oscillator_5_value =
                        oscillators_table.children[0].children[6].children[1]
                          .innerHTML;
                      let oscillator_5_point = getPointFromString(
                        oscillators_table.children[0].children[6].children[2]
                          .innerHTML
                      );
                      let oscillator_6_value =
                        oscillators_table.children[0].children[7].children[1]
                          .innerHTML;
                      let oscillator_6_point = getPointFromString(
                        oscillators_table.children[0].children[7].children[2]
                          .innerHTML
                      );
                      let oscillator_7_value =
                        oscillators_table.children[0].children[8].children[1]
                          .innerHTML;
                      let oscillator_7_point = getPointFromString(
                        oscillators_table.children[0].children[8].children[2]
                          .innerHTML
                      );
                      let oscillator_8_value =
                        oscillators_table.children[0].children[9].children[1]
                          .innerHTML;
                      let oscillator_8_point = getPointFromString(
                        oscillators_table.children[0].children[9].children[2]
                          .innerHTML
                      );
                      let oscillator_9_value =
                        oscillators_table.children[0].children[10].children[1]
                          .innerHTML;
                      let oscillator_9_point = getPointFromString(
                        oscillators_table.children[0].children[10].children[2]
                          .innerHTML
                      );
                      let oscillator_10_value =
                        oscillators_table.children[0].children[11].children[1]
                          .innerHTML;
                      let oscillator_10_point = getPointFromString(
                        oscillators_table.children[0].children[11].children[2]
                          .innerHTML
                      );
                      object_to_send.raw_datas.day_1.oscillators.relative_strength_index_14.value =
                        oscillator_0_value;
                      object_to_send.raw_datas.day_1.oscillators.relative_strength_index_14.point =
                        oscillator_0_point;
                      object_to_send.raw_datas.day_1.oscillators.stochastic_14_3_3.value =
                        oscillator_1_value;
                      object_to_send.raw_datas.day_1.oscillators.stochastic_14_3_3.point =
                        oscillator_1_point;
                      object_to_send.raw_datas.day_1.oscillators.commodity_channel_index_20.value =
                        oscillator_2_value;
                      object_to_send.raw_datas.day_1.oscillators.commodity_channel_index_20.point =
                        oscillator_2_point;
                      object_to_send.raw_datas.day_1.oscillators.average_directional_index_14.value =
                        oscillator_3_value;
                      object_to_send.raw_datas.day_1.oscillators.average_directional_index_14.point =
                        oscillator_3_point;
                      object_to_send.raw_datas.day_1.oscillators.awesome_oscillator.value =
                        oscillator_4_value;
                      object_to_send.raw_datas.day_1.oscillators.awesome_oscillator.point =
                        oscillator_4_point;
                      object_to_send.raw_datas.day_1.oscillators.momentum_10.value =
                        oscillator_5_value;
                      object_to_send.raw_datas.day_1.oscillators.momentum_10.point =
                        oscillator_5_point;
                      object_to_send.raw_datas.day_1.oscillators.macd_level_12_26.value =
                        oscillator_6_value;
                      object_to_send.raw_datas.day_1.oscillators.macd_level_12_26.point =
                        oscillator_6_point;
                      object_to_send.raw_datas.day_1.oscillators.stochastic_rsi_fast_3_3_14_14.value =
                        oscillator_7_value;
                      object_to_send.raw_datas.day_1.oscillators.stochastic_rsi_fast_3_3_14_14.point =
                        oscillator_7_point;
                      object_to_send.raw_datas.day_1.oscillators.williams_percent_range_14.value =
                        oscillator_8_value;
                      object_to_send.raw_datas.day_1.oscillators.williams_percent_range_14.point =
                        oscillator_8_point;
                      object_to_send.raw_datas.day_1.oscillators.taurus_bear_strength.value =
                        oscillator_9_value;
                      object_to_send.raw_datas.day_1.oscillators.taurus_bear_strength.point =
                        oscillator_9_point;
                      object_to_send.raw_datas.day_1.oscillators.ultimate_oscillator_7_14_28.value =
                        oscillator_10_value;
                      object_to_send.raw_datas.day_1.oscillators.ultimate_oscillator_7_14_28.point =
                        oscillator_10_point;
                    } else {
                      tab_1.click(); //Opens the 1D tab..
                    }
                  } else {
                    clearInterval(raw_datas_day_1_interval);
                  }
                };
                const raw_datas_day_1_interval = setInterval(
                  getRawDatasDay1OscillatorsValues,
                  1500
                );

                const getRawDatasDay1MovingAveragesValues = () => {
                  if (
                    nullNumberOfObject(
                      object_to_send.raw_datas.day_1.moving_averages
                    ) > 0
                  ) {
                    //There are still some field that are null
                    if (object_to_send.price !== null) {
                      if (isTabOpen(1)) {
                        let moving_averages_0_value = getPercantageForValue(
                          moving_averages_table.children[0].children[1]
                            .children[1].innerHTML
                        );
                        let moving_averages_0_point = getPointFromString(
                          moving_averages_table.children[0].children[1]
                            .children[2].innerHTML
                        );
                        let moving_averages_1_value = getPercantageForValue(
                          moving_averages_table.children[0].children[2]
                            .children[1].innerHTML
                        );
                        let moving_averages_1_point = getPointFromString(
                          moving_averages_table.children[0].children[2]
                            .children[2].innerHTML
                        );
                        let moving_averages_2_value = getPercantageForValue(
                          moving_averages_table.children[0].children[3]
                            .children[1].innerHTML
                        );
                        let moving_averages_2_point = getPointFromString(
                          moving_averages_table.children[0].children[3]
                            .children[2].innerHTML
                        );
                        let moving_averages_3_value = getPercantageForValue(
                          moving_averages_table.children[0].children[4]
                            .children[1].innerHTML
                        );
                        let moving_averages_3_point = getPointFromString(
                          moving_averages_table.children[0].children[4]
                            .children[2].innerHTML
                        );
                        let moving_averages_4_value = getPercantageForValue(
                          moving_averages_table.children[0].children[5]
                            .children[1].innerHTML
                        );
                        let moving_averages_4_point = getPointFromString(
                          moving_averages_table.children[0].children[5]
                            .children[2].innerHTML
                        );
                        let moving_averages_5_value = getPercantageForValue(
                          moving_averages_table.children[0].children[6]
                            .children[1].innerHTML
                        );
                        let moving_averages_5_point = getPointFromString(
                          moving_averages_table.children[0].children[6]
                            .children[2].innerHTML
                        );
                        let moving_averages_6_value = getPercantageForValue(
                          moving_averages_table.children[0].children[7]
                            .children[1].innerHTML
                        );
                        let moving_averages_6_point = getPointFromString(
                          moving_averages_table.children[0].children[7]
                            .children[2].innerHTML
                        );
                        let moving_averages_7_value = getPercantageForValue(
                          moving_averages_table.children[0].children[8]
                            .children[1].innerHTML
                        );
                        let moving_averages_7_point = getPointFromString(
                          moving_averages_table.children[0].children[8]
                            .children[2].innerHTML
                        );
                        let moving_averages_8_value = getPercantageForValue(
                          moving_averages_table.children[0].children[9]
                            .children[1].innerHTML
                        );
                        let moving_averages_8_point = getPointFromString(
                          moving_averages_table.children[0].children[9]
                            .children[2].innerHTML
                        );
                        let moving_averages_9_value = getPercantageForValue(
                          moving_averages_table.children[0].children[10]
                            .children[1].innerHTML
                        );
                        let moving_averages_9_point = getPointFromString(
                          moving_averages_table.children[0].children[10]
                            .children[2].innerHTML
                        );
                        let moving_averages_10_value = getPercantageForValue(
                          moving_averages_table.children[0].children[11]
                            .children[1].innerHTML
                        );
                        let moving_averages_10_point = getPointFromString(
                          moving_averages_table.children[0].children[11]
                            .children[2].innerHTML
                        );
                        let moving_averages_11_value = getPercantageForValue(
                          moving_averages_table.children[0].children[12]
                            .children[1].innerHTML
                        );
                        let moving_averages_11_point = getPointFromString(
                          moving_averages_table.children[0].children[12]
                            .children[2].innerHTML
                        );
                        let moving_averages_12_value = getPercantageForValue(
                          moving_averages_table.children[0].children[13]
                            .children[1].innerHTML
                        );
                        let moving_averages_12_point = getPointFromString(
                          moving_averages_table.children[0].children[13]
                            .children[2].innerHTML
                        );
                        let moving_averages_13_value = getPercantageForValue(
                          moving_averages_table.children[0].children[14]
                            .children[1].innerHTML
                        );
                        let moving_averages_13_point = getPointFromString(
                          moving_averages_table.children[0].children[14]
                            .children[2].innerHTML
                        );
                        let moving_averages_14_value = getPercantageForValue(
                          moving_averages_table.children[0].children[15]
                            .children[1].innerHTML
                        );
                        let moving_averages_14_point = getPointFromString(
                          moving_averages_table.children[0].children[15]
                            .children[2].innerHTML
                        );
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_10.value =
                          moving_averages_0_value;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_10.point =
                          moving_averages_0_point;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_10.value =
                          moving_averages_1_value;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_10.point =
                          moving_averages_1_point;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_20.value =
                          moving_averages_2_value;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_20.point =
                          moving_averages_2_point;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_20.value =
                          moving_averages_3_value;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_20.point =
                          moving_averages_3_point;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_30.value =
                          moving_averages_4_value;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_30.point =
                          moving_averages_4_point;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_30.value =
                          moving_averages_5_value;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_30.point =
                          moving_averages_5_point;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_50.value =
                          moving_averages_6_value;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_50.point =
                          moving_averages_6_point;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_50.value =
                          moving_averages_7_value;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_50.point =
                          moving_averages_7_point;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_100.value =
                          moving_averages_8_value;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_100.point =
                          moving_averages_8_point;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_100.value =
                          moving_averages_9_value;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_100.point =
                          moving_averages_9_point;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_200.value =
                          moving_averages_10_value;
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_200.point =
                          moving_averages_10_point;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_200.value =
                          moving_averages_11_value;
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_200.point =
                          moving_averages_11_point;
                        object_to_send.raw_datas.day_1.moving_averages.ichimoku_mainline_9_26_52_26.value =
                          moving_averages_12_value;
                        object_to_send.raw_datas.day_1.moving_averages.ichimoku_mainline_9_26_52_26.point =
                          moving_averages_12_point;
                        object_to_send.raw_datas.day_1.moving_averages.volume_weighted_moving_average_20.value =
                          moving_averages_13_value;
                        object_to_send.raw_datas.day_1.moving_averages.volume_weighted_moving_average_20.point =
                          moving_averages_13_point;
                        object_to_send.raw_datas.day_1.moving_averages.hull_moving_average.value =
                          moving_averages_14_value;
                        object_to_send.raw_datas.day_1.moving_averages.hull_moving_average.point =
                          moving_averages_14_point;
                      } else {
                        tab_1.click(); //Opens the 1D tab..
                      }
                    }
                  } else {
                    clearInterval(raw_datas_day_1_moving_averages_interval);
                  }
                };
                const raw_datas_day_1_moving_averages_interval = setInterval(
                  getRawDatasDay1MovingAveragesValues,
                  1500
                );

                const createHash1 = () => {
                  if (object_to_send.hash_1 === null) {
                    if (
                      nullNumberOfObject(
                        object_to_send.raw_datas.day_1.moving_averages
                      ) === 0 &&
                      nullNumberOfObject(
                        object_to_send.raw_datas.day_1.oscillators
                      ) === 0
                    ) {
                      object_to_send.hash_1 =
                        object_to_send.raw_datas.day_1.oscillators.relative_strength_index_14.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.stochastic_14_3_3.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.commodity_channel_index_20.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.average_directional_index_14.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.awesome_oscillator.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.momentum_10.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.macd_level_12_26.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.stochastic_rsi_fast_3_3_14_14.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.williams_percent_range_14.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.taurus_bear_strength.point.toString() +
                        object_to_send.raw_datas.day_1.oscillators.ultimate_oscillator_7_14_28.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_10.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_10.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_20.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_20.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_30.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_30.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_50.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_50.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_100.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_100.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.exponential_moving_average_200.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.simple_moving_average_200.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.ichimoku_mainline_9_26_52_26.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.volume_weighted_moving_average_20.point.toString() +
                        object_to_send.raw_datas.day_1.moving_averages.hull_moving_average.point.toString();
                    }
                  } else {
                    clearInterval(hash_1_interval);
                  }
                };
                const hash_1_interval = setInterval(createHash1, 1500);

                const getOscillators7Value = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (object_to_send.oscillators_7 === null) {
                      if (isTabOpen(7)) {
                        await pause();
                        let point_1 =
                          oscillators_counter.children[0].children[1].innerHTML;
                        let point_2 =
                          oscillators_counter.children[1].children[1].innerHTML;
                        let point_3 =
                          oscillators_counter.children[2].children[1].innerHTML;
                        object_to_send.oscillators_7 =
                          point_1 + "-" + point_2 + "-" + point_3;
                      } else {
                        tab_7.click(); //Opens the 1W tab..
                      }
                    } else {
                      clearInterval(oscillators_7_interval);
                    }
                  }
                };
                const oscillators_7_interval = setInterval(
                  getOscillators7Value,
                  1500
                );

                const getOscillators7PointValue = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (object_to_send.oscillators_7_point === null) {
                      if (isTabOpen(7)) {
                        await pause();
                        let point = getPointFromContainer(
                          oscillators_point_container
                        );
                        object_to_send.oscillators_7_point = point;
                      } else {
                        tab_7.click(); //Opens the 1D tab..
                      }
                    } else {
                      clearInterval(oscillators_7_point_interval);
                    }
                  }
                };
                const oscillators_7_point_interval = setInterval(
                  getOscillators7PointValue,
                  1500
                );

                const getSummary7Value = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (object_to_send.summary_7 === null) {
                      if (isTabOpen(7)) {
                        await pause();
                        let point_1 =
                          summary_counter.children[0].children[1].innerHTML;
                        let point_2 =
                          summary_counter.children[1].children[1].innerHTML;
                        let point_3 =
                          summary_counter.children[2].children[1].innerHTML;
                        object_to_send.summary_7 =
                          point_1 + "-" + point_2 + "-" + point_3;
                      } else {
                        tab_7.click(); //Opens the 1D tab..
                      }
                    } else {
                      clearInterval(summary_7_interval);
                    }
                  }
                };
                const summary_7_interval = setInterval(getSummary7Value, 1500);

                const getSummary7PointValue = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (object_to_send.summary_7_point === null) {
                      if (isTabOpen(7)) {
                        await pause();
                        let point = getPointFromContainer(
                          summary_point_container
                        );
                        object_to_send.summary_7_point = point;
                      } else {
                        tab_7.click(); //Opens the 1D tab..
                      }
                    } else {
                      clearInterval(summary_7_point_interval);
                    }
                  }
                };
                const summary_7_point_interval = setInterval(
                  getSummary7PointValue,
                  1500
                );

                const getMovingAverages7Value = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (object_to_send.moving_averages_7 === null) {
                      if (isTabOpen(7)) {
                        await pause();
                        let point_1 =
                          moving_averages_counter.children[0].children[1]
                            .innerHTML;
                        let point_2 =
                          moving_averages_counter.children[1].children[1]
                            .innerHTML;
                        let point_3 =
                          moving_averages_counter.children[2].children[1]
                            .innerHTML;
                        object_to_send.moving_averages_7 =
                          point_1 + "-" + point_2 + "-" + point_3;
                      } else {
                        tab_7.click(); //Opens the 1W tab..
                      }
                    } else {
                      clearInterval(moving_averages_7_interval);
                    }
                  }
                };
                const moving_averages_7_interval = setInterval(
                  getMovingAverages7Value,
                  1500
                );

                const getMovingAverages7PointValue = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (object_to_send.moving_averages_7_point === null) {
                      if (isTabOpen(7)) {
                        await pause();
                        let point = getPointFromContainer(
                          moving_averages_point_container
                        );
                        object_to_send.moving_averages_7_point = point;
                      } else {
                        tab_7.click(); //Opens the 1D tab..
                      }
                    } else {
                      clearInterval(moving_averages_7_point_interval);
                    }
                  }
                };
                const moving_averages_7_point_interval = setInterval(
                  getMovingAverages7PointValue,
                  1500
                );

                const getRawDatasDay7OscillatorsValues = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (
                      nullNumberOfObject(
                        object_to_send.raw_datas.day_7.oscillators
                      ) > 0
                    ) {
                      //There are still some field that are null
                      if (isTabOpen(7)) {
                        await pause();
                        let oscillator_0_value =
                          oscillators_table.children[0].children[1].children[1]
                            .innerHTML;
                        let oscillator_0_point = getPointFromString(
                          oscillators_table.children[0].children[1].children[2]
                            .innerHTML
                        );
                        let oscillator_1_value =
                          oscillators_table.children[0].children[2].children[1]
                            .innerHTML;
                        let oscillator_1_point = getPointFromString(
                          oscillators_table.children[0].children[2].children[2]
                            .innerHTML
                        );
                        let oscillator_2_value =
                          oscillators_table.children[0].children[3].children[1]
                            .innerHTML;
                        let oscillator_2_point = getPointFromString(
                          oscillators_table.children[0].children[3].children[2]
                            .innerHTML
                        );
                        let oscillator_3_value =
                          oscillators_table.children[0].children[4].children[1]
                            .innerHTML;
                        let oscillator_3_point = getPointFromString(
                          oscillators_table.children[0].children[4].children[2]
                            .innerHTML
                        );
                        let oscillator_4_value =
                          oscillators_table.children[0].children[5].children[1]
                            .innerHTML;
                        let oscillator_4_point = getPointFromString(
                          oscillators_table.children[0].children[5].children[2]
                            .innerHTML
                        );
                        let oscillator_5_value =
                          oscillators_table.children[0].children[6].children[1]
                            .innerHTML;
                        let oscillator_5_point = getPointFromString(
                          oscillators_table.children[0].children[6].children[2]
                            .innerHTML
                        );
                        let oscillator_6_value =
                          oscillators_table.children[0].children[7].children[1]
                            .innerHTML;
                        let oscillator_6_point = getPointFromString(
                          oscillators_table.children[0].children[7].children[2]
                            .innerHTML
                        );
                        let oscillator_7_value =
                          oscillators_table.children[0].children[8].children[1]
                            .innerHTML;
                        let oscillator_7_point = getPointFromString(
                          oscillators_table.children[0].children[8].children[2]
                            .innerHTML
                        );
                        let oscillator_8_value =
                          oscillators_table.children[0].children[9].children[1]
                            .innerHTML;
                        let oscillator_8_point = getPointFromString(
                          oscillators_table.children[0].children[9].children[2]
                            .innerHTML
                        );
                        let oscillator_9_value =
                          oscillators_table.children[0].children[10].children[1]
                            .innerHTML;
                        let oscillator_9_point = getPointFromString(
                          oscillators_table.children[0].children[10].children[2]
                            .innerHTML
                        );
                        let oscillator_10_value =
                          oscillators_table.children[0].children[11].children[1]
                            .innerHTML;
                        let oscillator_10_point = getPointFromString(
                          oscillators_table.children[0].children[11].children[2]
                            .innerHTML
                        );
                        object_to_send.raw_datas.day_7.oscillators.relative_strength_index_14.value =
                          isNaN(oscillator_0_value) ? "-" : oscillator_0_value;
                        object_to_send.raw_datas.day_7.oscillators.relative_strength_index_14.point =
                          isNaN(oscillator_0_point) ? "-" : oscillator_0_point;
                        object_to_send.raw_datas.day_7.oscillators.stochastic_14_3_3.value =
                          isNaN(oscillator_1_value) ? "-" : oscillator_1_value;
                        object_to_send.raw_datas.day_7.oscillators.stochastic_14_3_3.point =
                          isNaN(oscillator_1_point) ? "-" : oscillator_1_point;
                        object_to_send.raw_datas.day_7.oscillators.commodity_channel_index_20.value =
                          isNaN(oscillator_2_value) ? "-" : oscillator_2_value;
                        object_to_send.raw_datas.day_7.oscillators.commodity_channel_index_20.point =
                          isNaN(oscillator_2_point) ? "-" : oscillator_2_point;
                        object_to_send.raw_datas.day_7.oscillators.average_directional_index_14.value =
                          isNaN(oscillator_3_value) ? "-" : oscillator_3_value;
                        object_to_send.raw_datas.day_7.oscillators.average_directional_index_14.point =
                          isNaN(oscillator_3_point) ? "-" : oscillator_3_point;
                        object_to_send.raw_datas.day_7.oscillators.awesome_oscillator.value =
                          isNaN(oscillator_4_value) ? "-" : oscillator_4_value;
                        object_to_send.raw_datas.day_7.oscillators.awesome_oscillator.point =
                          isNaN(oscillator_4_point) ? "-" : oscillator_4_point;
                        object_to_send.raw_datas.day_7.oscillators.momentum_10.value =
                          isNaN(oscillator_5_value) ? "-" : oscillator_5_value;
                        object_to_send.raw_datas.day_7.oscillators.momentum_10.point =
                          isNaN(oscillator_5_point) ? "-" : oscillator_5_point;
                        object_to_send.raw_datas.day_7.oscillators.macd_level_12_26.value =
                          isNaN(oscillator_6_value) ? "-" : oscillator_6_value;
                        object_to_send.raw_datas.day_7.oscillators.macd_level_12_26.point =
                          isNaN(oscillator_6_point) ? "-" : oscillator_6_point;
                        object_to_send.raw_datas.day_7.oscillators.stochastic_rsi_fast_3_3_14_14.value =
                          isNaN(oscillator_7_value) ? "-" : oscillator_7_value;
                        object_to_send.raw_datas.day_7.oscillators.stochastic_rsi_fast_3_3_14_14.point =
                          isNaN(oscillator_7_point) ? "-" : oscillator_7_point;
                        object_to_send.raw_datas.day_7.oscillators.williams_percent_range_14.value =
                          isNaN(oscillator_8_value) ? "-" : oscillator_8_value;
                        object_to_send.raw_datas.day_7.oscillators.williams_percent_range_14.point =
                          isNaN(oscillator_8_point) ? "-" : oscillator_8_point;
                        object_to_send.raw_datas.day_7.oscillators.taurus_bear_strength.value =
                          isNaN(oscillator_9_value) ? "-" : oscillator_9_value;
                        object_to_send.raw_datas.day_7.oscillators.taurus_bear_strength.point =
                          isNaN(oscillator_9_point) ? "-" : oscillator_9_point;
                        object_to_send.raw_datas.day_7.oscillators.ultimate_oscillator_7_14_28.value =
                          isNaN(oscillator_10_value)
                            ? "-"
                            : oscillator_10_value;
                        object_to_send.raw_datas.day_7.oscillators.ultimate_oscillator_7_14_28.point =
                          isNaN(oscillator_10_point)
                            ? "-"
                            : oscillator_10_point;
                      } else {
                        tab_7.click(); //Opens the 1D tab..
                      }
                    } else {
                      clearInterval(raw_datas_day_7_interval);
                    }
                  }
                };
                const raw_datas_day_7_interval = setInterval(
                  getRawDatasDay7OscillatorsValues,
                  1500
                );

                const getRawDatasDay7MovingAveragesValues = async () => {
                  if (checkIf1DaysAreDone()) {
                    if (
                      nullNumberOfObject(
                        object_to_send.raw_datas.day_7.moving_averages
                      ) > 0
                    ) {
                      //There are still some field that are null
                      if (object_to_send.price !== null) {
                        if (isTabOpen(7)) {
                          await pause();
                          let moving_averages_0_value = getPercantageForValue(
                            moving_averages_table.children[0].children[1]
                              .children[1].innerHTML
                          );
                          let moving_averages_0_point = getPointFromString(
                            moving_averages_table.children[0].children[1]
                              .children[2].innerHTML
                          );
                          let moving_averages_1_value = getPercantageForValue(
                            moving_averages_table.children[0].children[2]
                              .children[1].innerHTML
                          );
                          let moving_averages_1_point = getPointFromString(
                            moving_averages_table.children[0].children[2]
                              .children[2].innerHTML
                          );
                          let moving_averages_2_value = getPercantageForValue(
                            moving_averages_table.children[0].children[3]
                              .children[1].innerHTML
                          );
                          let moving_averages_2_point = getPointFromString(
                            moving_averages_table.children[0].children[3]
                              .children[2].innerHTML
                          );
                          let moving_averages_3_value = getPercantageForValue(
                            moving_averages_table.children[0].children[4]
                              .children[1].innerHTML
                          );
                          let moving_averages_3_point = getPointFromString(
                            moving_averages_table.children[0].children[4]
                              .children[2].innerHTML
                          );
                          let moving_averages_4_value = getPercantageForValue(
                            moving_averages_table.children[0].children[5]
                              .children[1].innerHTML
                          );
                          let moving_averages_4_point = getPointFromString(
                            moving_averages_table.children[0].children[5]
                              .children[2].innerHTML
                          );
                          let moving_averages_5_value = getPercantageForValue(
                            moving_averages_table.children[0].children[6]
                              .children[1].innerHTML
                          );
                          let moving_averages_5_point = getPointFromString(
                            moving_averages_table.children[0].children[6]
                              .children[2].innerHTML
                          );
                          let moving_averages_6_value = getPercantageForValue(
                            moving_averages_table.children[0].children[7]
                              .children[1].innerHTML
                          );
                          let moving_averages_6_point = getPointFromString(
                            moving_averages_table.children[0].children[7]
                              .children[2].innerHTML
                          );
                          let moving_averages_7_value = getPercantageForValue(
                            moving_averages_table.children[0].children[8]
                              .children[1].innerHTML
                          );
                          let moving_averages_7_point = getPointFromString(
                            moving_averages_table.children[0].children[8]
                              .children[2].innerHTML
                          );
                          let moving_averages_8_value = getPercantageForValue(
                            moving_averages_table.children[0].children[9]
                              .children[1].innerHTML
                          );
                          let moving_averages_8_point = getPointFromString(
                            moving_averages_table.children[0].children[9]
                              .children[2].innerHTML
                          );
                          let moving_averages_9_value = getPercantageForValue(
                            moving_averages_table.children[0].children[10]
                              .children[1].innerHTML
                          );
                          let moving_averages_9_point = getPointFromString(
                            moving_averages_table.children[0].children[10]
                              .children[2].innerHTML
                          );
                          let moving_averages_10_value = getPercantageForValue(
                            moving_averages_table.children[0].children[11]
                              .children[1].innerHTML
                          );
                          let moving_averages_10_point = getPointFromString(
                            moving_averages_table.children[0].children[11]
                              .children[2].innerHTML
                          );
                          let moving_averages_11_value = getPercantageForValue(
                            moving_averages_table.children[0].children[12]
                              .children[1].innerHTML
                          );
                          let moving_averages_11_point = getPointFromString(
                            moving_averages_table.children[0].children[12]
                              .children[2].innerHTML
                          );
                          let moving_averages_12_value = getPercantageForValue(
                            moving_averages_table.children[0].children[13]
                              .children[1].innerHTML
                          );
                          let moving_averages_12_point = getPointFromString(
                            moving_averages_table.children[0].children[13]
                              .children[2].innerHTML
                          );
                          let moving_averages_13_value = getPercantageForValue(
                            moving_averages_table.children[0].children[14]
                              .children[1].innerHTML
                          );
                          let moving_averages_13_point = getPointFromString(
                            moving_averages_table.children[0].children[14]
                              .children[2].innerHTML
                          );
                          let moving_averages_14_value = getPercantageForValue(
                            moving_averages_table.children[0].children[15]
                              .children[1].innerHTML
                          );
                          let moving_averages_14_point = getPointFromString(
                            moving_averages_table.children[0].children[15]
                              .children[2].innerHTML
                          );
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_10.value =
                            isNaN(moving_averages_0_value)
                              ? "-"
                              : moving_averages_0_value;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_10.point =
                            isNaN(moving_averages_0_point)
                              ? "-"
                              : moving_averages_0_point;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_10.value =
                            isNaN(moving_averages_1_value)
                              ? "-"
                              : moving_averages_1_value;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_10.point =
                            isNaN(moving_averages_1_point)
                              ? "-"
                              : moving_averages_1_point;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_20.value =
                            isNaN(moving_averages_2_value)
                              ? "-"
                              : moving_averages_2_value;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_20.point =
                            isNaN(moving_averages_2_point)
                              ? "-"
                              : moving_averages_2_point;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_20.value =
                            isNaN(moving_averages_3_value)
                              ? "-"
                              : moving_averages_3_value;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_20.point =
                            isNaN(moving_averages_3_point)
                              ? "-"
                              : moving_averages_3_point;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_30.value =
                            isNaN(moving_averages_4_value)
                              ? "-"
                              : moving_averages_4_value;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_30.point =
                            isNaN(moving_averages_4_point)
                              ? "-"
                              : moving_averages_4_point;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_30.value =
                            isNaN(moving_averages_5_value)
                              ? "-"
                              : moving_averages_5_value;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_30.point =
                            isNaN(moving_averages_5_point)
                              ? "-"
                              : moving_averages_5_point;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_50.value =
                            isNaN(moving_averages_6_value)
                              ? "-"
                              : moving_averages_6_value;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_50.point =
                            isNaN(moving_averages_6_point)
                              ? "-"
                              : moving_averages_6_point;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_50.value =
                            isNaN(moving_averages_7_value)
                              ? "-"
                              : moving_averages_7_value;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_50.point =
                            isNaN(moving_averages_7_point)
                              ? "-"
                              : moving_averages_7_point;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_100.value =
                            isNaN(moving_averages_8_value)
                              ? "-"
                              : moving_averages_8_value;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_100.point =
                            isNaN(moving_averages_8_point)
                              ? "-"
                              : moving_averages_8_point;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_100.value =
                            isNaN(moving_averages_9_value)
                              ? "-"
                              : moving_averages_9_value;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_100.point =
                            isNaN(moving_averages_9_point)
                              ? "-"
                              : moving_averages_9_point;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_200.value =
                            isNaN(moving_averages_10_value)
                              ? "-"
                              : moving_averages_10_value;
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_200.point =
                            isNaN(moving_averages_10_point)
                              ? "-"
                              : moving_averages_10_point;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_200.value =
                            isNaN(moving_averages_11_value)
                              ? "-"
                              : moving_averages_11_value;
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_200.point =
                            isNaN(moving_averages_11_point)
                              ? "-"
                              : moving_averages_11_point;
                          object_to_send.raw_datas.day_7.moving_averages.ichimoku_mainline_9_26_52_26.value =
                            isNaN(moving_averages_12_value)
                              ? "-"
                              : moving_averages_12_value;
                          object_to_send.raw_datas.day_7.moving_averages.ichimoku_mainline_9_26_52_26.point =
                            isNaN(moving_averages_12_point)
                              ? "-"
                              : moving_averages_12_point;
                          object_to_send.raw_datas.day_7.moving_averages.volume_weighted_moving_average_20.value =
                            isNaN(moving_averages_13_value)
                              ? "-"
                              : moving_averages_13_value;
                          object_to_send.raw_datas.day_7.moving_averages.volume_weighted_moving_average_20.point =
                            isNaN(moving_averages_13_point)
                              ? "-"
                              : moving_averages_13_point;
                          object_to_send.raw_datas.day_7.moving_averages.hull_moving_average.value =
                            isNaN(moving_averages_14_value)
                              ? "-"
                              : moving_averages_14_value;
                          object_to_send.raw_datas.day_7.moving_averages.hull_moving_average.point =
                            isNaN(moving_averages_14_point)
                              ? "-"
                              : moving_averages_14_point;
                        } else {
                          tab_7.click(); //Opens the 1W tab..
                        }
                      }
                    } else {
                      clearInterval(raw_datas_day_7_moving_averages_interval);
                    }
                  }
                };
                const raw_datas_day_7_moving_averages_interval = setInterval(
                  getRawDatasDay7MovingAveragesValues,
                  1500
                );

                const createHash7 = () => {
                  if (checkIf1DaysAreDone()) {
                    if (object_to_send.hash_7 === null) {
                      if (
                        nullNumberOfObject(
                          object_to_send.raw_datas.day_7.moving_averages
                        ) === 0 &&
                        nullNumberOfObject(
                          object_to_send.raw_datas.day_7.oscillators
                        ) === 0
                      ) {
                        object_to_send.hash_7 =
                          object_to_send.raw_datas.day_7.oscillators.relative_strength_index_14.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.stochastic_14_3_3.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.commodity_channel_index_20.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.average_directional_index_14.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.awesome_oscillator.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.momentum_10.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.macd_level_12_26.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.stochastic_rsi_fast_3_3_14_14.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.williams_percent_range_14.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.taurus_bear_strength.point.toString() +
                          object_to_send.raw_datas.day_7.oscillators.ultimate_oscillator_7_14_28.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_10.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_10.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_20.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_20.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_30.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_30.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_50.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_50.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_100.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_100.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.exponential_moving_average_200.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.simple_moving_average_200.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.ichimoku_mainline_9_26_52_26.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.volume_weighted_moving_average_20.point.toString() +
                          object_to_send.raw_datas.day_7.moving_averages.hull_moving_average.point.toString();
                      }
                    } else {
                      clearInterval(hash_7_interval);
                    }
                  }
                };
                const hash_7_interval = setInterval(createHash7, 1500);

                const getOscillators30Value = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (object_to_send.oscillators_30 === null) {
                      if (isTabOpen(30)) {
                        await pause();
                        let point_1 =
                          oscillators_counter.children[0].children[1].innerHTML;
                        let point_2 =
                          oscillators_counter.children[1].children[1].innerHTML;
                        let point_3 =
                          oscillators_counter.children[2].children[1].innerHTML;
                        object_to_send.oscillators_30 =
                          point_1 + "-" + point_2 + "-" + point_3;
                      } else {
                        tab_30.click(); //Opens the 1M tab..
                      }
                    } else {
                      clearInterval(oscillators_30_interval);
                    }
                  }
                };
                const oscillators_30_interval = setInterval(
                  getOscillators30Value,
                  1500
                );

                const getOscillators30PointValue = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (object_to_send.oscillators_30_point === null) {
                      if (isTabOpen(30)) {
                        await pause();
                        let point = getPointFromContainer(
                          oscillators_point_container
                        );
                        object_to_send.oscillators_30_point = point;
                      } else {
                        tab_30.click(); //Opens the 1M tab..
                      }
                    } else {
                      clearInterval(oscillators_30_point_interval);
                    }
                  }
                };
                const oscillators_30_point_interval = setInterval(
                  getOscillators30PointValue,
                  1500
                );

                const getSummary30Value = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (object_to_send.summary_30 === null) {
                      if (isTabOpen(30)) {
                        await pause();
                        let point_1 =
                          summary_counter.children[0].children[1].innerHTML;
                        let point_2 =
                          summary_counter.children[1].children[1].innerHTML;
                        let point_3 =
                          summary_counter.children[2].children[1].innerHTML;
                        object_to_send.summary_30 =
                          point_1 + "-" + point_2 + "-" + point_3;
                      } else {
                        tab_30.click(); //Opens the 1M tab..
                      }
                    } else {
                      clearInterval(summary_30_interval);
                    }
                  }
                };
                const summary_30_interval = setInterval(
                  getSummary30Value,
                  1500
                );

                const getSummary30PointValue = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (object_to_send.summary_30_point === null) {
                      if (isTabOpen(30)) {
                        await pause();
                        let point = getPointFromContainer(
                          summary_point_container
                        );
                        object_to_send.summary_30_point = point;
                      } else {
                        tab_30.click(); //Opens the 1M tab..
                      }
                    } else {
                      clearInterval(summary_30_point_interval);
                    }
                  }
                };
                const summary_30_point_interval = setInterval(
                  getSummary30PointValue,
                  1500
                );

                const getMovingAverages30Value = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (object_to_send.moving_averages_30 === null) {
                      if (isTabOpen(30)) {
                        await pause();
                        let point_1 =
                          moving_averages_counter.children[0].children[1]
                            .innerHTML;
                        let point_2 =
                          moving_averages_counter.children[1].children[1]
                            .innerHTML;
                        let point_3 =
                          moving_averages_counter.children[2].children[1]
                            .innerHTML;
                        object_to_send.moving_averages_30 =
                          point_1 + "-" + point_2 + "-" + point_3;
                      } else {
                        tab_30.click(); //Opens the 1M tab..
                      }
                    } else {
                      clearInterval(moving_averages_30_interval);
                    }
                  }
                };
                const moving_averages_30_interval = setInterval(
                  getMovingAverages30Value,
                  1500
                );

                const getMovingAverages30PointValue = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (object_to_send.moving_averages_30_point === null) {
                      if (isTabOpen(30)) {
                        await pause();
                        let point = getPointFromContainer(
                          moving_averages_point_container
                        );
                        object_to_send.moving_averages_30_point = point;
                      } else {
                        tab_30.click(); //Opens the 1M tab..
                      }
                    } else {
                      clearInterval(moving_averages_30_point_interval);
                    }
                  }
                };
                const moving_averages_30_point_interval = setInterval(
                  getMovingAverages30PointValue,
                  1500
                );

                const getRawDatasDay30OscillatorsValues = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (
                      nullNumberOfObject(
                        object_to_send.raw_datas.day_30.oscillators
                      ) > 0
                    ) {
                      //There are still some field that are null
                      if (isTabOpen(30)) {
                        await pause();
                        let oscillator_0_value =
                          oscillators_table.children[0].children[1].children[1]
                            .innerHTML;
                        let oscillator_0_point = getPointFromString(
                          oscillators_table.children[0].children[1].children[2]
                            .innerHTML
                        );
                        let oscillator_1_value =
                          oscillators_table.children[0].children[2].children[1]
                            .innerHTML;
                        let oscillator_1_point = getPointFromString(
                          oscillators_table.children[0].children[2].children[2]
                            .innerHTML
                        );
                        let oscillator_2_value =
                          oscillators_table.children[0].children[3].children[1]
                            .innerHTML;
                        let oscillator_2_point = getPointFromString(
                          oscillators_table.children[0].children[3].children[2]
                            .innerHTML
                        );
                        let oscillator_3_value =
                          oscillators_table.children[0].children[4].children[1]
                            .innerHTML;
                        let oscillator_3_point = getPointFromString(
                          oscillators_table.children[0].children[4].children[2]
                            .innerHTML
                        );
                        let oscillator_4_value =
                          oscillators_table.children[0].children[5].children[1]
                            .innerHTML;
                        let oscillator_4_point = getPointFromString(
                          oscillators_table.children[0].children[5].children[2]
                            .innerHTML
                        );
                        let oscillator_5_value =
                          oscillators_table.children[0].children[6].children[1]
                            .innerHTML;
                        let oscillator_5_point = getPointFromString(
                          oscillators_table.children[0].children[6].children[2]
                            .innerHTML
                        );
                        let oscillator_6_value =
                          oscillators_table.children[0].children[7].children[1]
                            .innerHTML;
                        let oscillator_6_point = getPointFromString(
                          oscillators_table.children[0].children[7].children[2]
                            .innerHTML
                        );
                        let oscillator_7_value =
                          oscillators_table.children[0].children[8].children[1]
                            .innerHTML;
                        let oscillator_7_point = getPointFromString(
                          oscillators_table.children[0].children[8].children[2]
                            .innerHTML
                        );
                        let oscillator_8_value =
                          oscillators_table.children[0].children[9].children[1]
                            .innerHTML;
                        let oscillator_8_point = getPointFromString(
                          oscillators_table.children[0].children[9].children[2]
                            .innerHTML
                        );
                        let oscillator_9_value =
                          oscillators_table.children[0].children[10].children[1]
                            .innerHTML;
                        let oscillator_9_point = getPointFromString(
                          oscillators_table.children[0].children[10].children[2]
                            .innerHTML
                        );
                        let oscillator_10_value =
                          oscillators_table.children[0].children[11].children[1]
                            .innerHTML;
                        let oscillator_10_point = getPointFromString(
                          oscillators_table.children[0].children[11].children[2]
                            .innerHTML
                        );
                        object_to_send.raw_datas.day_30.oscillators.relative_strength_index_14.value =
                          isNaN(oscillator_0_value) ? "-" : oscillator_0_value;
                        object_to_send.raw_datas.day_30.oscillators.relative_strength_index_14.point =
                          isNaN(oscillator_0_point) ? "-" : oscillator_0_point;
                        object_to_send.raw_datas.day_30.oscillators.stochastic_14_3_3.value =
                          isNaN(oscillator_1_value) ? "-" : oscillator_1_value;
                        object_to_send.raw_datas.day_30.oscillators.stochastic_14_3_3.point =
                          isNaN(oscillator_1_point) ? "-" : oscillator_1_point;
                        object_to_send.raw_datas.day_30.oscillators.commodity_channel_index_20.value =
                          isNaN(oscillator_2_value) ? "-" : oscillator_2_value;
                        object_to_send.raw_datas.day_30.oscillators.commodity_channel_index_20.point =
                          isNaN(oscillator_2_point) ? "-" : oscillator_2_point;
                        object_to_send.raw_datas.day_30.oscillators.average_directional_index_14.value =
                          isNaN(oscillator_3_value) ? "-" : oscillator_3_value;
                        object_to_send.raw_datas.day_30.oscillators.average_directional_index_14.point =
                          isNaN(oscillator_3_point) ? "-" : oscillator_3_point;
                        object_to_send.raw_datas.day_30.oscillators.awesome_oscillator.value =
                          isNaN(oscillator_4_value) ? "-" : oscillator_4_value;
                        object_to_send.raw_datas.day_30.oscillators.awesome_oscillator.point =
                          isNaN(oscillator_4_point) ? "-" : oscillator_4_point;
                        object_to_send.raw_datas.day_30.oscillators.momentum_10.value =
                          isNaN(oscillator_5_value) ? "-" : oscillator_5_value;
                        object_to_send.raw_datas.day_30.oscillators.momentum_10.point =
                          isNaN(oscillator_5_point) ? "-" : oscillator_5_point;
                        object_to_send.raw_datas.day_30.oscillators.macd_level_12_26.value =
                          isNaN(oscillator_6_value) ? "-" : oscillator_6_value;
                        object_to_send.raw_datas.day_30.oscillators.macd_level_12_26.point =
                          isNaN(oscillator_6_point) ? "-" : oscillator_6_point;
                        object_to_send.raw_datas.day_30.oscillators.stochastic_rsi_fast_3_3_14_14.value =
                          isNaN(oscillator_7_value) ? "-" : oscillator_7_value;
                        object_to_send.raw_datas.day_30.oscillators.stochastic_rsi_fast_3_3_14_14.point =
                          isNaN(oscillator_7_point) ? "-" : oscillator_7_point;
                        object_to_send.raw_datas.day_30.oscillators.williams_percent_range_14.value =
                          isNaN(oscillator_8_value) ? "-" : oscillator_8_value;
                        object_to_send.raw_datas.day_30.oscillators.williams_percent_range_14.point =
                          isNaN(oscillator_8_point) ? "-" : oscillator_8_point;
                        object_to_send.raw_datas.day_30.oscillators.taurus_bear_strength.value =
                          isNaN(oscillator_9_value) ? "-" : oscillator_9_value;
                        object_to_send.raw_datas.day_30.oscillators.taurus_bear_strength.point =
                          isNaN(oscillator_9_point) ? "-" : oscillator_9_point;
                        object_to_send.raw_datas.day_30.oscillators.ultimate_oscillator_7_14_28.value =
                          isNaN(oscillator_10_value)
                            ? "-"
                            : oscillator_10_value;
                        object_to_send.raw_datas.day_30.oscillators.ultimate_oscillator_7_14_28.point =
                          isNaN(oscillator_10_point)
                            ? "-"
                            : oscillator_10_point;
                      } else {
                        tab_30.click(); //Opens the 1M tab..
                      }
                    } else {
                      clearInterval(raw_datas_day_30_interval);
                    }
                  }
                };
                const raw_datas_day_30_interval = setInterval(
                  getRawDatasDay30OscillatorsValues,
                  1500
                );

                const getRawDatasDay30MovingAveragesValues = async () => {
                  if (checkIf7DaysAreDone()) {
                    if (
                      nullNumberOfObject(
                        object_to_send.raw_datas.day_30.moving_averages
                      ) > 0
                    ) {
                      //There are still some field that are null
                      if (object_to_send.price !== null) {
                        if (isTabOpen(30)) {
                          await pause();
                          let moving_averages_0_value = getPercantageForValue(
                            moving_averages_table.children[0].children[1]
                              .children[1].innerHTML
                          );
                          let moving_averages_0_point = getPointFromString(
                            moving_averages_table.children[0].children[1]
                              .children[2].innerHTML
                          );
                          let moving_averages_1_value = getPercantageForValue(
                            moving_averages_table.children[0].children[2]
                              .children[1].innerHTML
                          );
                          let moving_averages_1_point = getPointFromString(
                            moving_averages_table.children[0].children[2]
                              .children[2].innerHTML
                          );
                          let moving_averages_2_value = getPercantageForValue(
                            moving_averages_table.children[0].children[3]
                              .children[1].innerHTML
                          );
                          let moving_averages_2_point = getPointFromString(
                            moving_averages_table.children[0].children[3]
                              .children[2].innerHTML
                          );
                          let moving_averages_3_value = getPercantageForValue(
                            moving_averages_table.children[0].children[4]
                              .children[1].innerHTML
                          );
                          let moving_averages_3_point = getPointFromString(
                            moving_averages_table.children[0].children[4]
                              .children[2].innerHTML
                          );
                          let moving_averages_4_value = getPercantageForValue(
                            moving_averages_table.children[0].children[5]
                              .children[1].innerHTML
                          );
                          let moving_averages_4_point = getPointFromString(
                            moving_averages_table.children[0].children[5]
                              .children[2].innerHTML
                          );
                          let moving_averages_5_value = getPercantageForValue(
                            moving_averages_table.children[0].children[6]
                              .children[1].innerHTML
                          );
                          let moving_averages_5_point = getPointFromString(
                            moving_averages_table.children[0].children[6]
                              .children[2].innerHTML
                          );
                          let moving_averages_6_value = getPercantageForValue(
                            moving_averages_table.children[0].children[7]
                              .children[1].innerHTML
                          );
                          let moving_averages_6_point = getPointFromString(
                            moving_averages_table.children[0].children[7]
                              .children[2].innerHTML
                          );
                          let moving_averages_7_value = getPercantageForValue(
                            moving_averages_table.children[0].children[8]
                              .children[1].innerHTML
                          );
                          let moving_averages_7_point = getPointFromString(
                            moving_averages_table.children[0].children[8]
                              .children[2].innerHTML
                          );
                          let moving_averages_8_value = getPercantageForValue(
                            moving_averages_table.children[0].children[9]
                              .children[1].innerHTML
                          );
                          let moving_averages_8_point = getPointFromString(
                            moving_averages_table.children[0].children[9]
                              .children[2].innerHTML
                          );
                          let moving_averages_9_value = getPercantageForValue(
                            moving_averages_table.children[0].children[10]
                              .children[1].innerHTML
                          );
                          let moving_averages_9_point = getPointFromString(
                            moving_averages_table.children[0].children[10]
                              .children[2].innerHTML
                          );
                          let moving_averages_10_value = getPercantageForValue(
                            moving_averages_table.children[0].children[11]
                              .children[1].innerHTML
                          );
                          let moving_averages_10_point = getPointFromString(
                            moving_averages_table.children[0].children[11]
                              .children[2].innerHTML
                          );
                          let moving_averages_11_value = getPercantageForValue(
                            moving_averages_table.children[0].children[12]
                              .children[1].innerHTML
                          );
                          let moving_averages_11_point = getPointFromString(
                            moving_averages_table.children[0].children[12]
                              .children[2].innerHTML
                          );
                          let moving_averages_12_value = getPercantageForValue(
                            moving_averages_table.children[0].children[13]
                              .children[1].innerHTML
                          );
                          let moving_averages_12_point = getPointFromString(
                            moving_averages_table.children[0].children[13]
                              .children[2].innerHTML
                          );
                          let moving_averages_13_value = getPercantageForValue(
                            moving_averages_table.children[0].children[14]
                              .children[1].innerHTML
                          );
                          let moving_averages_13_point = getPointFromString(
                            moving_averages_table.children[0].children[14]
                              .children[2].innerHTML
                          );
                          let moving_averages_14_value = getPercantageForValue(
                            moving_averages_table.children[0].children[15]
                              .children[1].innerHTML
                          );
                          let moving_averages_14_point = getPointFromString(
                            moving_averages_table.children[0].children[15]
                              .children[2].innerHTML
                          );
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_10.value =
                            isNaN(moving_averages_0_value)
                              ? "-"
                              : moving_averages_0_value;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_10.point =
                            isNaN(moving_averages_0_point)
                              ? "-"
                              : moving_averages_0_point;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_10.value =
                            isNaN(moving_averages_1_value)
                              ? "-"
                              : moving_averages_1_value;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_10.point =
                            isNaN(moving_averages_1_point)
                              ? "-"
                              : moving_averages_1_point;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_20.value =
                            isNaN(moving_averages_2_value)
                              ? "-"
                              : moving_averages_2_value;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_20.point =
                            isNaN(moving_averages_2_point)
                              ? "-"
                              : moving_averages_2_point;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_20.value =
                            isNaN(moving_averages_3_value)
                              ? "-"
                              : moving_averages_3_value;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_20.point =
                            isNaN(moving_averages_3_point)
                              ? "-"
                              : moving_averages_3_point;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_30.value =
                            isNaN(moving_averages_4_value)
                              ? "-"
                              : moving_averages_4_value;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_30.point =
                            isNaN(moving_averages_4_point)
                              ? "-"
                              : moving_averages_4_point;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_30.value =
                            isNaN(moving_averages_5_value)
                              ? "-"
                              : moving_averages_5_value;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_30.point =
                            isNaN(moving_averages_5_point)
                              ? "-"
                              : moving_averages_5_point;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_50.value =
                            isNaN(moving_averages_6_value)
                              ? "-"
                              : moving_averages_6_value;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_50.point =
                            isNaN(moving_averages_6_point)
                              ? "-"
                              : moving_averages_6_point;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_50.value =
                            isNaN(moving_averages_7_value)
                              ? "-"
                              : moving_averages_7_value;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_50.point =
                            isNaN(moving_averages_7_point)
                              ? "-"
                              : moving_averages_7_point;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_100.value =
                            isNaN(moving_averages_8_value)
                              ? "-"
                              : moving_averages_8_value;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_100.point =
                            isNaN(moving_averages_8_point)
                              ? "-"
                              : moving_averages_8_point;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_100.value =
                            isNaN(moving_averages_9_value)
                              ? "-"
                              : moving_averages_9_value;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_100.point =
                            isNaN(moving_averages_9_point)
                              ? "-"
                              : moving_averages_9_point;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_200.value =
                            isNaN(moving_averages_10_value)
                              ? "-"
                              : moving_averages_10_value;
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_200.point =
                            isNaN(moving_averages_10_point)
                              ? "-"
                              : moving_averages_10_point;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_200.value =
                            isNaN(moving_averages_11_value)
                              ? "-"
                              : moving_averages_11_value;
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_200.point =
                            isNaN(moving_averages_11_point)
                              ? "-"
                              : moving_averages_11_point;
                          object_to_send.raw_datas.day_30.moving_averages.ichimoku_mainline_9_26_52_26.value =
                            isNaN(moving_averages_12_value)
                              ? "-"
                              : moving_averages_12_value;
                          object_to_send.raw_datas.day_30.moving_averages.ichimoku_mainline_9_26_52_26.point =
                            isNaN(moving_averages_12_point)
                              ? "-"
                              : moving_averages_12_point;
                          object_to_send.raw_datas.day_30.moving_averages.volume_weighted_moving_average_20.value =
                            isNaN(moving_averages_13_value)
                              ? "-"
                              : moving_averages_13_value;
                          object_to_send.raw_datas.day_30.moving_averages.volume_weighted_moving_average_20.point =
                            isNaN(moving_averages_13_point)
                              ? "-"
                              : moving_averages_13_point;
                          object_to_send.raw_datas.day_30.moving_averages.hull_moving_average.value =
                            isNaN(moving_averages_14_value)
                              ? "-"
                              : moving_averages_14_value;
                          object_to_send.raw_datas.day_30.moving_averages.hull_moving_average.point =
                            isNaN(moving_averages_14_point)
                              ? "-"
                              : moving_averages_14_point;
                        } else {
                          tab_30.click(); //Opens the 1M tab..
                        }
                      }
                    } else {
                      clearInterval(raw_datas_day_30_moving_averages_interval);
                    }
                  }
                };
                const raw_datas_day_30_moving_averages_interval = setInterval(
                  getRawDatasDay30MovingAveragesValues,
                  1500
                );

                const createHash30 = () => {
                  if (checkIf7DaysAreDone()) {
                    if (object_to_send.hash_30 === null) {
                      if (
                        nullNumberOfObject(
                          object_to_send.raw_datas.day_30.moving_averages
                        ) === 0 &&
                        nullNumberOfObject(
                          object_to_send.raw_datas.day_30.oscillators
                        ) === 0
                      ) {
                        object_to_send.hash_30 =
                          object_to_send.raw_datas.day_30.oscillators.relative_strength_index_14.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.stochastic_14_3_3.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.commodity_channel_index_20.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.average_directional_index_14.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.awesome_oscillator.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.momentum_10.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.macd_level_12_26.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.stochastic_rsi_fast_3_3_14_14.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.williams_percent_range_14.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.taurus_bear_strength.point.toString() +
                          object_to_send.raw_datas.day_30.oscillators.ultimate_oscillator_7_14_28.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_10.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_10.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_20.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_20.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_30.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_30.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_50.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_50.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_100.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_100.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.exponential_moving_average_200.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.simple_moving_average_200.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.ichimoku_mainline_9_26_52_26.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.volume_weighted_moving_average_20.point.toString() +
                          object_to_send.raw_datas.day_30.moving_averages.hull_moving_average.point.toString();
                      }
                    } else {
                      clearInterval(hash_30_interval);
                    }
                  }
                };
                const hash_30_interval = setInterval(createHash30, 1500);

                const checkingAllDatas = () => {
                  if (
                    checkIf1DaysAreDone() &&
                    checkIf7DaysAreDone() &&
                    checkIf30DaysAreDone() &&
                    object_to_send.hash_1 !== null &&
                    object_to_send.hash_7 !== null &&
                    object_to_send.hash_30 !== null
                  ) {
                    clearInterval(all_datas_interval);
                    clearTimeout(main_timeout);
                    resolve(object_to_send);
                  }
                };
                const all_datas_interval = setInterval(checkingAllDatas, 1500);
              }
            }),
          stock_name,
          todays_xu100
        );
        let date = new Date();
        let second = date.getSeconds();
        if (new_obj !== null) {
          let default_obj = {
            price: new_obj.price,
            daily_percentage: new_obj.daily_percentage,
            daily_comparison: new_obj.daily_comparison,
            oscillators_1: new_obj.oscillators_1,
            oscillators_1_point: new_obj.oscillators_1_point,
            oscillators_7: new_obj.oscillators_7,
            oscillators_7_point: new_obj.oscillators_7_point,
            oscillators_30: new_obj.oscillators_30,
            oscillators_30_point: new_obj.oscillators_30_point,
            summary_1: new_obj.summary_1,
            summary_1_point: new_obj.summary_1_point,
            summary_7: new_obj.summary_7,
            summary_7_point: new_obj.summary_7_point,
            summary_30: new_obj.summary_30,
            summary_30_point: new_obj.summary_30_point,
            moving_averages_1: new_obj.moving_averages_1,
            moving_averages_1_point: new_obj.moving_averages_1_point,
            moving_averages_7: new_obj.moving_averages_7,
            moving_averages_7_point: new_obj.moving_averages_7_point,
            moving_averages_30: new_obj.moving_averages_30,
            moving_averages_30_point: new_obj.moving_averages_30_point,
            hash_1: new_obj.hash_1,
            hash_7: new_obj.hash_7,
            hash_30: new_obj.hash_30,
            name: new_obj.name,
            multiplier: new_obj.multiplier,
          };
          let default_obj_0 = {
            price: new_obj.price,
            name: new_obj.name,
            multiplier: new_obj.multiplier,
          };
          let default_obj_1 = {
            price: new_obj.price,
            daily_percentage: new_obj.daily_percentage,
            daily_comparison: new_obj.daily_comparison,
            hash_1: new_obj.hash_1,
            hash_7: new_obj.hash_7,
            hash_30: new_obj.hash_30,
            name: new_obj.name,
            multiplier: new_obj.multiplier,
          };
          if (aday.stocks[stock_name].price === null) {
            aday.stocks[stock_name] = default_obj;
            await aday.markModified("stocks");
            await aday.save();
          }
          if (aday0.stocks[stock_name].price === null) {
            aday0.stocks[stock_name] = default_obj_0;
            await aday0.markModified("stocks");
            await aday0.save();
          }
          if (aday1.stocks[stock_name].price === null) {
            aday1.stocks[stock_name] = default_obj_1;
            await aday1.markModified("stocks");
            await aday1.save();
          }
          if (day.stocks[stock_name] === null) {
            day.stocks[stock_name] = new_obj;
            await day.markModified("stocks");
            await day.save();
          }
          if (day0.stocks[stock_name] === null) {
            let new_obj_0 = {
              price: new_obj.price,
              name: new_obj.name,
            };
            day0.stocks[stock_name] = new_obj_0;
            await day0.markModified("stocks");
            await day0.save();
          }
          if (day1.stocks[stock_name] === null) {
            let new_obj_0 = {
              price: new_obj.price,
              daily_percentage: new_obj.daily_percentage,
              daily_comparison: new_obj.daily_comparison,
              hash_1: new_obj.hash_1,
              hash_7: new_obj.hash_7,
              hash_30: new_obj.hash_30,
              name: new_obj.name,
            };
            day1.stocks[stock_name] = new_obj_0;
            await day1.markModified("stocks");
            await day1.save();
          }
          console.log(new_obj.name, " TW okuması bitti!");
          await page.close();
          await browser.close();
          if (second < 40) {
            getDatas();
          }
        } else {
          console.log("Boş! ", stock_name);
          await page.close();
          await browser.close();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const aday = await ADay.findOne({ date: date }).exec();
  const aday0 = await ADay0.findOne({ date: date }).exec();
  const aday1 = await ADay1.findOne({ date: date }).exec();
  const day_check = await Day.findOne({ date: date }).exec();
  const day0_check = await Day0.findOne({ date: date }).exec();
  const day1_check = await Day1.findOne({ date: date }).exec();
  if (!aday) {
    createNewADay(date);
  }
  if (!aday0) {
    createNewADay0(date);
  }
  if (!aday1) {
    createNewADay1(date);
  }
  if (!day_check) {
    await Day.create({ date: date });
  }
  if (!day0_check) {
    await Day0.create({ date: date });
  }
  if (!day1_check) {
    await Day1.create({ date: date });
  }
  if (aday0 && aday && aday1 && day_check && day0_check && day1_check) {
    getDatas();
  }
};

module.exports = PC;
