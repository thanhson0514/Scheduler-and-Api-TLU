const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

// router
const verifyWebhook = require("./cron-scheduler/verify-webhook");
const messageWebhook = require("./cron-scheduler/message-webhook");
const notication = require("./cron-scheduler/process-scheduler");
const router = require("./routes/router");

const app = express();

// variable evinoment
const PORT = process.env.PORT || 5000;
dotenv.config();

// use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// function timers
notication.notication();
app.use("/api", router);
app.post("/message", messageWebhook);
app.get("/message", verifyWebhook);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Listing to port on ${PORT}`));
  })
  .catch(err => console.log(err));
