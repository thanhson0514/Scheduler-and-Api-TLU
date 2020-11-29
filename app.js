const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const _ = require("lodash");

// router
const verifyWebhook = require("./cron-scheduler/verify-webhook");
const messageWebhook = require("./cron-scheduler/message-webhook");
const notication = require("./cron-scheduler/process-scheduler");
const router = require("./routes/router");
const passportRouter = require("./routes/passportFb");

const app = express();

// variable evinoment
const PORT = process.env.PORT || 5000;
dotenv.config();

// use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Api get infomation TLU
app.use("/api", router);

// setting server run localtion
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// connect database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    notication.notication();
    app.listen(PORT, () => console.log(`Listing to port on ${PORT}`));
    // function timers
  })
  .catch(err => console.log(err));
