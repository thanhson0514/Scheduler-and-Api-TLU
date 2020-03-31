const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const Strategy = require("passport-facebook").Strategy;
const _ = require('lodash')

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
// passport.use(
//   new Strategy(
//     {
//       clientID: process.env["FACEBOOK_CLIENT_ID"],
//       clientSecret: process.env["FACEBOOK_CLIENT_SECRET"],
//       callbackURL: "/return",
//       profileFields: ["id", "displayName", "photos", "email"]
//     },
//     function(accessToken, refreshToken, profile, cb) {
//       console.log("accessToken", accessToken);
//       console.log("refeshToken", refreshToken);
//       console.log("profile", profile._json);

//       return cb(null, profile);
//     }
//   )
// );
// Initialize Passport and restore authentication state
// app.use(passport.initialize());
// app.use(passport.session());

// Configure Passport authenticated session persistence.
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

// function timers
notication.notication();

// passport facebook
// app.use("/", passportRouter);
// Api get infomation TLU
app.use("/api", router);

// automatic BOT messenger facebook
app.post("/message", messageWebhook);
app.get("/message", verifyWebhook);

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
    app.listen(PORT, () => console.log(`Listing to port on ${PORT}`));
  })
  .catch(err => console.log(err));
