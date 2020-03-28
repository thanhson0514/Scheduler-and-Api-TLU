const Scheduler = require("../models/scheduler");
const schedule = require("node-schedule");
const sendTextMessage = require("./send-text-message");

exports.notication = async () => {
  try {
    const scheduler = await Scheduler.find();
    const id = scheduler[0].idUser;
    scheduler.forEach(el => {
      //   console.log(el)
      schedule.scheduleJob(
        `0 ${el.startHour.split("h")[0]} ${el.startHour.split("h")[1] -
          2} * * ${el.date}`,
        () => {
          return sendTextMessage(
            el.idUser,
            `Hôm nay có môn ${el.displayName} vào lúc ${
              el.startHour.split("h")[0]
            }:${el.startHour.split("h")[1]} nhớ đi học nha. Yêu <3!`
          );
        }
      );
    });

    schedule.scheduleJob("00 14 22 * * *", () => {
      sendTextMessage(
        id,
        "Good Night, Buổi tối vui vẻ code nhiều bug :). Yêu Sơn <3 !"
      );
    });
  } catch (err) {
    console.log(err);
    throw new Error("Error");
  }
};
