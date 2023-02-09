// 引用在firebase.js裡已經初始化的admin
// FIRESTORE 文件
// https://firebase.google.com/docs/firestore/quickstart
const admin = require("./connection/firebase");
// 初始化db
const db = admin.firestore();
const storage = admin.storage();

// 輸出db讓其他檔案可使用
module.exports = { admin, db, storage };
