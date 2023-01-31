const express = require("express");
const indexRouter = express.Router();
let { PythonShell } = require("python-shell");
let jsonReturn = "test";

indexRouter.get("/", (req, res) => {
  pythonProcess(req, res);
  res.render("index", { data: jsonReturn });
});

indexRouter.get("/setupSrcPath", (req, res, next) => {
  res.render("setupSrcPath");
});

indexRouter.get("/srcPathDisplay", (req, res, next) => {
  res.render("srcPathDisplay");
});

function pythonProcess(req, res) {
  let options = {
    args: [req.query.name, req.query.from],
  };

  PythonShell.run("./pytesseract-example.py", options, (err, data) => {
    if (err) {
      jsonReturn = err;
    }
    console.log(data);
    const parsedString = JSON.parse(data);
    // console.log(`name: ${parsedString.Name}, from: ${parsedString.From}`);
    // jsonReturn = parsedString;
    console.log(parsedString);
    console.log("------------");
  });
}

module.exports = indexRouter;
