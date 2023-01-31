const express = require("express");
const app = express();
const path = require("path");
// let { PythonShell } = require("python-shell");

// 取得路由資源
// 引用./routes/index.js作為indexRouter
const indexRouter = require("./routes/index.js");

// 指派indexRouter負責處理 / 路由的邏輯
app.use("/", indexRouter);

// 設定前端資源路由 / => 可指向public資料夾內的資源
app.use(express.static(path.join(__dirname, "public")));
// 設定前端資源路由 /node_modules/ => node_modules
app.use("/support_js", express.static(path.join(__dirname, "support_js")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.listen(3000);
// http://localhost:3000/
// http://localhost:3000/?name=Joe&from=Taipei
// http://localhost:3000/setupSrcPath
// http://localhost:3000/srcPathDisplay
