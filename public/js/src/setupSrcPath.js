var video = document.querySelector("#videoElement");
const openBtn = document.getElementById("openBtn");
const snapBtn = document.getElementById("snapBtn");
const stopBtn = document.getElementById("stopBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resultPic = document.getElementById("resultPic");
const confirmWords = document.getElementById("confirmP");
const confirmA = document.getElementById("confirmA");
const confirmBtn = document.getElementById("confirmBtn");
const select = document.querySelector(".srcLocation");
const confirmA2 = document.getElementById("confirmA2");
const confirmBtn2 = document.getElementById("confirmBtn2");
let img_uri;

confirmWords.style.display = "none";
confirmA.style.visibility = "hidden";
confirmBtn.style.visibility = "hidden";
video.style.display = "none";
openBtn.style.visibility = "visible";
snapBtn.style.visibility = "hidden";
stopBtn.style.visibility = "hidden";
resumeBtn.style.visibility = "hidden";
confirmA2.style.visibility = "hidden";
confirmBtn2.style.visibility = "hidden";

// Configure a few settings and attach camera
Webcam.set({
  width: 540,
  height: 400,
  image_format: "jpeg",
  jpeg_quality: 90,
});

Webcam.attach("#videoElement");

// preload shutter audio clip
var shutter = new Audio();
shutter.autoplay = true;

select.addEventListener("change", () => {
  confirmA2.style.visibility = "visible";
  confirmBtn2.style.visibility = "visible";
  confirmA2.innerHTML = `確認`;
});

confirmBtn.addEventListener("click", () => {
  alert(img_uri);
});

function start() {
  open();
  video.style.display = "block";
  openBtn.style.visibility = "hidden";

  stopBtn.style.visibility = "visible";
  resumeBtn.style.visibility = "hidden";
}

function stop() {
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
  video.style.display = "none";
  snapBtn.style.visibility = "hidden";
  stopBtn.style.visibility = "hidden";
  resumeBtn.style.visibility = "visible";
  resultPic.style.display = "none";
  confirmWords.style.display = "none";
  confirmA.style.visibility = "hidden";
  confirmBtn.style.visibility = "hidden";
}

function resume() {
  open();
  video.style.display = "block";
  snapBtn.style.visibility = "visible";
  stopBtn.style.visibility = "visible";
  resumeBtn.style.visibility = "hidden";
  resultPic.style.display = "block";
  confirmWords.style.display = "block";
  confirmA.style.visibility = "visible";
  confirmBtn.style.visibility = "visible";
}

function open() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }
  snapBtn.style.visibility = "visible";
}

function take_snapshot() {
  // play sound effect
  shutter.play();

  // take snapshot and get image data

  Webcam.snap(function (data_uri) {
    // By getting data_uri, you can access the image you just captured!!!
    console.log(data_uri);
    img_uri = data_uri;
    // display results in page
    resultPic.innerHTML = '<img src="' + data_uri + '"/>';
  });
  confirmWords.style.display = "block";
  confirmWords.innerHTML = `請確認您拍攝的圖片是否有誤`;
  confirmA.style.visibility = "visible";
  confirmBtn.style.visibility = "visible";
  confirmA.innerHTML = `確認`;
}
