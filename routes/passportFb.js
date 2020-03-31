const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/success", (req, res) => {
  console.log("user:", res);
  res.json({ msg: "Success", status: "OK", user: req.user });
});

router.get("/fail", (req, res) => res.json({ msg: "Fail" }));
router.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: ["user_friends"] })
);

router.get(
  "/return",
  passport.authenticate("facebook", { failureRedirect: "/fail" }),
  function(req, res) {
    res.json({ user: req.user });
    // res.redirect("/success");
  }
);

module.exports = router;
