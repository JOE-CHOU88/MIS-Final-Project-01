const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

// 取得路由資源
// 引用./routes/index.js作為indexRouter
const indexRouter = require("./routes/index");
// 引用./routes/api.js作為apiRouter
const apiRouter = require("./routes/api");
// 引用./routes/setupSrcPath.js作為setupSrcPathRouter
const setupSrcPathRouter = require("./routes/setupSrcPath");

var app = express();

// 定義視圖引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middleware
app.use(logger("dev"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

// 設定前端資源路由 / => 可指向public資料夾內的資源
app.use(express.static(path.join(__dirname, "public")));
// 設定前端資源路由 /node_modules/ => node_modules
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
// 設定前端資源路由 /python/ => python
app.use("/python", express.static(path.join(__dirname, "python")));

// 指派indexRouter負責處理 / 路由的邏輯
app.use("/", indexRouter);
// 指派apiRouter負責處理 /api 路由的邏輯
app.use("/api", apiRouter);
// 指派setupSrcPathRouter負責處理 /setupSrcPath 路由的邏輯
app.use("/setupSrcPath", setupSrcPathRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3000);
// http://localhost:3000/
// http://localhost:3000/?name=Joe&from=Taipei
// http://localhost:3000/setupSrcPath
// http://localhost:3000/srcPathDisplay
