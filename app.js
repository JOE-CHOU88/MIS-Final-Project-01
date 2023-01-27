const express = require("express");
const app = express();
const path = require("path");
// const url = require("url");
// const filename = url.fileURLToPath(import.meta.url);

// 取得路由資源
// 引用./routes/index.js作為indexRouter
const indexRouter = require("./routes/index.js");

// 指派indexRouter負責處理 / 路由的邏輯
app.use("/", indexRouter);

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(path.dirname(filename), "public")));
// app.use(
//   "/node-tesseract-ocr",
//   express.static(
//     path.join(
//       path.dirname(filename),
//       "node_modules/node-tesseract-ocr/src/index.js"
//     )
//   )
// );
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.listen(3000);
// http://localhost:3000/
// http://localhost:3000/setupSrcPath
// http://localhost:3000/srcPathDisplay
