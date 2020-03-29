const express = require("express");

const router = express.Router();

// use middleware authentication
const authMiddleware = require("../middleware/auth");

// controllers
const { auth } = require("../controllers/auth");
const { getUser } = require("../controllers/user");
const { getSubject } = require("../controllers/timetables");
const { getMark } = require("../controllers/mark");
const { sendPhone } = require("../controllers/send-phone");

router.post("/auth", auth);
router.get("/user", authMiddleware, getUser);
router.get("/subjects", authMiddleware, getSubject);
router.get("/mark", authMiddleware, getMark);
router.post("/send", authMiddleware, sendPhone);

module.exports = router;
