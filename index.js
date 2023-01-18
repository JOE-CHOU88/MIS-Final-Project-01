const input = document.querySelector("input");
const output = document.querySelector("output");
const confirmWords = document.getElementById("confirmP");
const confirmButton = document.getElementById("confirmB");
confirmButton.style.visibility = "hidden";
let image = "";

input.addEventListener("change", () => {
  const file = input.files;
  image = file[0];
  console.log(file[0]);
  displayImages();
  confirmWords.innerHTML += `請確認您上傳的圖檔是否有誤`;
  confirmButton.style.visibility = "visible";
  confirmButton.innerHTML += `確認`;
});

function displayImages() {
  let imageContent = `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                </div>`;
  output.innerHTML = imageContent;
}
