const Scheduler = require("../models/scheduler");
const schedule = require("node-schedule");
const sendTextMessage = require("./send-text-message");

const { FACEBOOK_ID_USER } = process.env;

exports.notication = async (hour = 22, minutes = 30) => {
  try {
    const scheduler = await Scheduler.find();

    scheduler.forEach(el => {
      //   console.log(el)
      schedule.scheduleJob(
        `0 ${el.startHour.split("h")[0]} ${el.startHour.split("h")[1] -
          2} * * ${el.date - 1}`,
        () => {
          return sendTextMessage(
            Number(el.idUser),
            `Hôm nay có môn ${el.displayName} vào lúc ${
              el.startHour.split("h")[0]
            }:${el.startHour.split("h")[1]} nhớ đi học nha. Yêu <3!`
          );
        }
      );
    });

    schedule.scheduleJob(`00 ${minutes + 2} ${hour} * * *`, () => {
      sendTextMessage(
        FACEBOOK_ID_USER,
        "Good Night, Buổi tối vui vẻ code nhiều bug :). Yêu Sơn <3 !"
      );
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error");
  }
};
