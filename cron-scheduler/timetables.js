const indexScheduler = require("./scheduler");
const weekIndex = require("./weekIndex");
const axios = require("axios");
const Scheduler = require("../models/scheduler");

const sendTextMessage = require("./send-text-message");

module.exports = async userId => {
  try {
    const login = await axios({
      method: "POST",
      url: "http://sv20.tlu.edu.vn:8092/education/oauth/token",
      data: `client_id=education_client&grant_type=password&username=1951060982&password=${process.env.PASSWORD}&client_secret=password`,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const response = await axios({
      method: "GET",
      url:
        "http://sv20.tlu.edu.vn:8092/education/api/StudentCourseSubject/student/0/2",
      headers: {
        "Content-Type": "Application/json",
        Authorization: `Bearer ${login.data.access_token}`
      }
    });
    const data = response.data;
    let courseSubject = [];
    data.forEach(values => {
      const filtered = Object.keys(values)
        .filter(key => key.includes("courseSubject"))
        .reduce((obj, key) => {
          obj[key] = values[key];
          return obj;
        }, {});
      courseSubject.push(filtered.courseSubject);
    });
    const timetables = [];
    for (let i = 0; i < courseSubject.length; i++) {
      if (!courseSubject[i].timetables) continue;
      for (let j = 0; j < courseSubject[i].timetables.length; j++) {
        if (
          courseSubject[i].timetables[j].fromWeek <= weekIndex &&
          weekIndex <= courseSubject[i].timetables[j].toWeek
        ) {
          timetables.push({
            timetables: courseSubject[i].timetables[j],
            displayName: courseSubject[i].displayName
          });
        }
      }
    }

    let schedule = [];

    for (let i = 0; i < timetables.length; i++) {
      if (!timetables[i].timetables.weekIndex) continue;
      if (
        timetables[i].timetables.startHour.id ===
        indexScheduler[timetables[i].timetables.startHour.id - 1].index
      ) {
        schedule.push({
          date: timetables[i].timetables.weekIndex,
          startHour:
            indexScheduler[timetables[i].timetables.startHour.id - 1].startHour,
          displayName: timetables[i].displayName
        });
      }
    }

    let scheduler = await Scheduler.deleteMany();
    schedule.forEach(async element => {
      scheduler = new Scheduler({
        idUser: userId,
        displayName: element.displayName,
        startHour: element.startHour,
        date: element.date
      });
      await scheduler.save();
    });

    return sendTextMessage(userId, "Update success!! yêu");
  } catch (err) {
    sendTextMessage(userId, "Update failed! Mạng như b*** không update được.");
    throw new Error("Error");
  }
};

// schedule.forEach(element => {
//   const hour = element.startHour.split("h")[0];
//   const minutes = element.startHour.split("h")[1];
//   const date = element.date;

//   scheduler.scheduleJob(`0 ${minutes} ${hour - 1} * * ${date}`, () => {
//     return require("node-fetch")(
//       `https://graph.facebook.com/v6.0/me/messages?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
//       {
//         headers: {
//           "Content-Type": "Application/json"
//         },
//         method: "POST",
//         body: JSON.stringify({
//           messaging_type: "RESPONSE",
//           recipient: {
//             id: 
//           },
//           message: {
//             text: message
//           }
//         })
//       }
//     );
//   });
//   scheduler.scheduleJob(`0 28 16 * * *`, () => {
//     return require("node-fetch")(
//       `https://graph.facebook.com/v6.0/me/messages?access_token=${process.env.FACEBOOK_ACCESS_TOKEN}`,
//       {
//         headers: {
//           "Content-Type": "Application/json"
//         },
//         method: "POST",
//         body: JSON.stringify({
//           messaging_type: "RESPONSE",
//           recipient: {
//             id: 
//           },
//           message: {
//             text: "Good afternoon Lê Thanh Sơn"
//           }
//         })
//       }
//     );
//   });
// });
