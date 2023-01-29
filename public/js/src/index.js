const input = document.querySelector("input");
const output = document.querySelector("output");
const confirmWords = document.getElementById("confirmP");
const confirmA = document.getElementById("confirmA");
const confirmBtn = document.getElementById("confirmBtn");
const progressWords = document.getElementById("analyzeLabel");
const progress = document.querySelector("progress");
const finalconfirmA = document.getElementById("finalConfirmA");
const finalconfirmBtn = document.getElementById("finalConfirmBtn");
const txtOutput = document.getElementById("txtOCRResult");

confirmA.style.visibility = "hidden";
confirmBtn.style.visibility = "hidden";
progressWords.style.visibility = "hidden";
progress.style.visibility = "hidden";
finalconfirmA.style.visibility = "hidden";
finalconfirmBtn.style.visibility = "hidden";
let image = "";

input.addEventListener("change", () => {
  const file = input.files;
  image = file[0];
  console.log(file[0]);
  displayImages();
  confirmWords.innerHTML = `請確認您上傳的圖檔是否有誤`;
  confirmA.style.visibility = "visible";
  confirmBtn.style.visibility = "visible";
  confirmA.innerHTML = `確認`;
});

confirmBtn.addEventListener("click", () => {
  progressWords.style.visibility = "visible";
  progress.style.visibility = "visible";
  const tesseract = require("tesseract.js");
  tesseract
    .recognize(image, "eng", {
      logger: (m) => {
        console.log(m);
        if (m.status === "recognizing text") {
          progress.value = m.progress;
        }
      },
    })
    .then(({ data: { text } }) => {
      console.log(text);
      txtOutput.innerHTML = text;
      finalconfirmA.style.visibility = "visible";
      finalconfirmBtn.style.visibility = "visible";
    });
});

function displayImages() {
  let imageContent = `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                </div>`;
  output.innerHTML = imageContent;
}
