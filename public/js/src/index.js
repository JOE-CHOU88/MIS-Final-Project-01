const FormData = require("form-data");

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
let image;
let blob_image_uri;
let https_image_uri;

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

confirmBtn.addEventListener("click", async () => {
  progressWords.style.visibility = "visible";
  progress.style.visibility = "visible";

  console.log(45, input.files[0]);

  await uploadImagetoFirebase();
  console.log(51, https_image_uri);
  await urlSendtoPythonAnalsis();

  finalconfirmA.style.visibility = "visible";
  finalconfirmBtn.style.visibility = "visible";
});

function displayImages() {
  blob_image_uri = URL.createObjectURL(image);
  let imageContent = `<div class="image">
                  <img src="${blob_image_uri}" alt="image">
                </div>`;
  output.innerHTML = imageContent;
}

async function uploadImagetoFirebase() {
  const data = new FormData();
  data.append("file", image);
  await axios
    .post("/upload", data)
    .then((res) => {
      https_image_uri = res.data.imageUrl;
    })
    .catch((err) => {
      console.log("錯誤", err.response.data);
    });
}

async function urlSendtoPythonAnalsis() {
  await axios
    .post("/api/index-img-analysis", { url: https_image_uri })
    .then((res) => {
      console.log(res.data.result);
      txtOutput.innerHTML = res.data.result;
    })
    .catch((err) => {
      console.log("錯誤", err);
    });
}
