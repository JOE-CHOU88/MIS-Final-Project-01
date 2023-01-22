const input = document.querySelector("input");
const output = document.querySelector("output");
const confirmWords = document.getElementById("confirmP");
const confirmA = document.getElementById("confirmA");
const confirmBtn = document.getElementById("confirmBtn");
confirmA.style.visibility = "hidden";
confirmBtn.style.visibility = "hidden";
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

function displayImages() {
  let imageContent = `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                </div>`;
  output.innerHTML = imageContent;
}
