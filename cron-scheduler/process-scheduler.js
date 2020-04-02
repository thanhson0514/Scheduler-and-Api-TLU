const Scheduler = require("../models/scheduler");
const schedule = require("node-schedule");
const sendTextMessage = require("./send-text-message");

const { FACEBOOK_ID_USER } = process.env;

exports.notication = async (hour = 22, minutes = 30) => {
  try {
    console.log(FACEBOOK_ID_USER);
    const scheduler = await Scheduler.find();
    scheduler.forEach(el => {
      schedule.scheduleJob(
        `0 ${+el.startHour.split("h")[0]} ${el.startHour.split("h")[1] -
          2} * * ${el.date - 1}`,
        () => {
          sendTextMessage(
            +el.idUser,
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
        `Bạn đã update vào khoảng ${hour}:${minutes} vào 1 ngày đẹp trời không biết ngày bao nhiêu :))`
      );
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error");
  }
};
