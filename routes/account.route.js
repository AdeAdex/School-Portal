const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup", { message: "" });
});

router.get("/signin", (req, res) => {
  res.render("signin", { message: "" });
});

module.exports = router;
