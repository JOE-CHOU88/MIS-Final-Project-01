const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.render("index");
});

indexRouter.get("/setupSrcPath", (req, res, next) => {
  res.render("setupSrcPath");
});

indexRouter.get("/srcPathDisplay", (req, res, next) => {
  res.render("srcPathDisplay");
});

module.exports = indexRouter;
