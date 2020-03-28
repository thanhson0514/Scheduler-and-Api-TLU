const timetables = require("./timetables");
require("dotenv").config();
const sendTextMessage = require('./send-text-message')

// // You can find your project ID in your Dialogflow agent settings
// const projectId = "bot-scheduler-guakdb"; //https://dialogflow.com/docs/agents#settings
// const sessionId = "123456";
// const languageCode = "en-US";

// const dialogflow = require("dialogflow");

// const config = {
//   credentials: {
//     private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
//     client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
//   }
// };

// const sessionClient = new dialogflow.SessionsClient(config);
// const sessionPath = sessionClient.sessionPath(projectId, sessionId);

module.exports = event => {
  const userId = event.sender.id;
  const message = event.message.text;

  if (message === "update") {
    return timetables(userId);
  }
  sendTextMessage(userId)
  // const request = {
  //   session: sessionPath,
  //   queryInput: {
  //     text: {
  //       text: message,
  //       languageCode: languageCode
  //     }
  //   }
  // };

  // sessionClient
  //   .detectIntent(request)
  //   .then(responses => {
  //     const result = responses[0].queryResult;
  //     return sendTextMessage(userId, result.fulfillmentText);
  //   })
  //   .catch(err => {
  //     console.error("ERROR:", err);
  //   });
};
