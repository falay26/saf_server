const cron = require("node-cron");
//Services
const FindToken = require("./services/FindToken");
const CheckToken = require("./services/CheckToken");
//Functions
const NM = require("./functions/notify_me");
const M = require("./functions/main");
const MBO = require("./functions/mbo");
const PC = require("./functions/perfect_combo");
//Models
const ADay = require("./models/ADay");

class Cron {
  expression;

  constructor(expression) {
    this.expression = expression;
  }

  run() {
    try {
      cron.schedule(this.expression, async () => {
        //This whole section is going to run every minute.

        //Getting date to use in other functions..
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let day = date.getDay();
        let just_date = date.toJSON().slice(0, 10).replace(/-/g, "/");
        let yesterday = new Date(Date.now() - 20 * 60 * 60 * 1000);
        let just_date_0 = yesterday.toJSON().slice(0, 10).replace(/-/g, "/");
        //Getting date to use in other functions.

        if (day !== 0 && day !== 1 && hour === 0 && minute === 0) {
          const aday = await ADay.findOne({ date: just_date }).exec();
          let non_finds = Object.values(aday.stocks).filter(
            (i) => i.price === null
          );
          if (non_finds.length === 0) {
            NM("TW Okuması tamamlandı!");
          }
        }
        if (day !== 6 && day !== 0) {
          //Finding Datas with MBÖ method
          MBO();

          //Reading data from TW
          if (hour >= 19) {
            PC(just_date);
          }

          if (hour <= 9 && day !== 1) {
            PC(just_date_0);
          }

          //This is for getting hash from database, will notify me if needed.
          const hashInDB = await FindToken();
          if (!hashInDB.hash) {
            NM("Giriş yapmalısın!");
            return;
          }
          const checkToken = await CheckToken(hashInDB.hash);
          if (!checkToken) {
            NM("Giriş yapmalısın!");
            return;
          }
          //This is for getting hash from database, will notify me if needed.

          //To run a function at 10:00AM..
          if (hour === 10 && minute === 0) {
            NM("Saat 10:00 oldu!");
          }

          if (hour >= 10 && hour < 18) {
            M(hashInDB.hash);
          }

          if (hour === 23 && minute === 0) {
            const aday = await ADay.findOne({ date: just_date }).exec();
            let non_finds = Object.values(aday.stocks).filter(
              (i) => i.price === null
            );
            if (non_finds.length === 0) {
              NM("TW Okuması tamamlandı!");
            }
          }
        } else {
          //Weekend
          MBO();

          if (hour <= 9 && day === 6) {
            PC(just_date_0);
          }
        }
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = Cron;
