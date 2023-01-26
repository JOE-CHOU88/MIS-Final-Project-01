# MIS-Final-Project-01
載下GitHub專案後要做的事：
1. 在terminal端跑”npm i”，安裝node_modules裡所有的資料
2. 在Extension安裝EJS language support
3. Download Tesseract installer for Windows: https://digi.bib.uni-mannheim.de/tesseract/tesseract-ocr-w64-setup-5.3.0.20221222.exe
(Credit: https://github.com/UB-Mannheim/tesseract/wiki)

*小提醒1：安裝時請勾選 Additional language data (download)（如下圖），否則無法解析英文以外的語言
![螢幕擷取畫面 2023-01-25 233058](https://user-images.githubusercontent.com/62171839/214606410-bb5415f9-b9e4-4fa4-966f-98e565d7a51d.png)

*小提醒2：修改環境變數（詳情請見https://www.youtube.com/watch?v=Rb93uLXiTwA 4:15處），修改完 VS Code 需重新啟動!

4. 執行時在terminal端跑”npm run devStart"，並在網頁開啟http://localhost:3000/ 

偶爾遇到的問題：

If you encounter "Cannot find module 'express'" error, you can run "npm install --save express" in terminal
