const express = require("express");

const router = express.Router();

// use middleware authentication
const authMiddleware = require("../middleware/auth");

// controllers
const { auth } = require("../controllers/auth");
const { getUser } = require("../controllers/user");
const { getSubject, filterSubject } = require("../controllers/timetables");
const { getMark } = require("../controllers/mark");
const { sendPhone } = require("../controllers/send-phone");
const { getChart } = require("../controllers/chart");
router.post("/auth", auth);
router.get("/user", authMiddleware, getUser);
router
  .route("/subjects")
  .get(authMiddleware, getSubject)
  .post(authMiddleware, filterSubject);
router.get("/mark", authMiddleware, getMark);
router.post("/send", authMiddleware, sendPhone);
router.get("/chart", authMiddleware,getChart);
module.exports = router;
