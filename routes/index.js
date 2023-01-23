const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/setupSrcPath", (req, res, next) => {
  res.render("setupSrcPath");
});

router.get("/srcPathDisplay", (req, res, next) => {
  console.log("Hi");
  res.render("srcPathDisplay");
});

module.exports = router;
