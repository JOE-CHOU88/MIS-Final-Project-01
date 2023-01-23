const express = require("express");
const app = express();
const path = require("path");

// 取得路由資源
// 引用./routes/index.js作為indexRouter
const indexRouter = require("./routes/index");

// 指派indexRouter負責處理 / 路由的邏輯
app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.listen(3000);
// http://localhost:3000/
// http://localhost:3000/setupSrcPath
// http://localhost:3000/srcPathDisplay
