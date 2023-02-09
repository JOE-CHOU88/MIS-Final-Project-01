const express = require("express");
const apiRouter = express.Router();
const spawn = require("child_process").spawn;

apiRouter.post("/index-img-analysis", (req, res) => {
  console.log("[前端送來的資料](index)", req.body.url);

  const pythonProcess = spawn("python", [
    "./python/pytesseract-example.py",
    "index",
    req.body.url,
  ]);
  console.log("--------------1");
  pythonProcess.stdout.on("data", (data) => {
    const parsedString = JSON.parse(data);
    console.log("22", parsedString);
    // 回傳資料給前端
    res.status(200).json(parsedString);
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr:${data}`);
    res.status(500).json(data);
  });
});

apiRouter.post("/setupSrcPath-img-analysis", (req, res) => {
  console.log("[前端送來的資料](setupSrcPath)", req.body.url);

  const pythonProcess = spawn("python", [
    "./python/pytesseract-example.py",
    "setupSrcPath",
    req.body.url,
  ]);
  console.log("--------------1");
  pythonProcess.stdout.on("data", (data) => {
    const parsedString = JSON.parse(data);
    console.log("22", parsedString);
    // 回傳資料給前端
    res.status(200).json(parsedString);
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr:${data}`);
    res.status(500).json(data);
  });
});

module.exports = apiRouter;
