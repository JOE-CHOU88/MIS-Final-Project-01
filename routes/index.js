const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/result", (req, res, next) => {
  res.render("result");
});

module.exports = router;
