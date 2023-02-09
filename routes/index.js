const express = require("express");
const indexRouter = express.Router();
const multer = require("multer");
const { admin } = require("../db");
const bucket = admin.storage().bucket();
const uuidv1 = require("uuid").v1;

// Setting up multer as a middleware to grab photo uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

indexRouter.get("/", (req, res) => {
  // pythonProcess(req, res);
  res.render("index");
});

indexRouter.get("/setupSrcPath", (req, res, next) => {
  res.render("setupSrcPath");
});

indexRouter.get("/srcPathDisplay", (req, res, next) => {
  res.render("srcPathDisplay");
});

indexRouter.post("/upload", upload.single("file"), function (req, res) {
  console.log(req.file);
  // 取得上傳的檔案資訊
  const file = req.file;
  // 基於檔案的原始名稱建立一個 blob 物件
  const blob = bucket.file("index-images/" + file.originalname);
  // 建立一個可以寫入 blob 的物件
  const blobStream = blob.createWriteStream({
    contentType: req.file.mimetype, // 網址會變成預覽圖片，不是直接下載
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv1(), // 疊兩層才吃得到
      },
    },
  });

  // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
  blobStream.on("finish", () => {
    const file = bucket.file(blob.name);
    file.getMetadata().then((data) => {
      const metadata = data[0];
      res.send({
        success: true,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(file.name)}?alt=media&token=${
          metadata.metadata.firebaseStorageDownloadTokens
        }`,
      });
    });
  });

  // 如果上傳過程中發生錯誤，會觸發 error 事件
  blobStream.on("error", (err) => {
    res.status(500).send("上傳失敗");
  });

  // 將檔案的 buffer 寫入 blobStream
  blobStream.end(file.buffer);
});

module.exports = indexRouter;
