(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var video = document.querySelector("#videoElement");
const openBtn = document.getElementById("openBtn");
const snapBtn = document.getElementById("snapBtn");
const stopBtn = document.getElementById("stopBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resultPic = document.getElementById("resultPic");
const confirmWords = document.getElementById("confirmP");
const confirmA = document.getElementById("confirmA");
const confirmBtn = document.getElementById("confirmBtn");
const progressWords = document.getElementById("analyzeLabel");
const progress = document.querySelector("progress");
const finalconfirmA = document.getElementById("finalConfirmA");
const finalconfirmBtn = document.getElementById("finalConfirmBtn");
const txtOutput = document.getElementById("txtOCRResult");

const select = document.querySelector(".srcLocation");
const confirmA2 = document.getElementById("confirmA2");
const confirmBtn2 = document.getElementById("confirmBtn2");
let data_image_uri;
let buffer;
let https_image_uri;

confirmWords.style.display = "none";
confirmA.style.visibility = "hidden";
confirmBtn.style.visibility = "hidden";
progressWords.style.visibility = "hidden";
progress.style.visibility = "hidden";
finalconfirmA.style.visibility = "hidden";
finalconfirmBtn.style.visibility = "hidden";
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

openBtn.addEventListener("click", () => {
  start();
});

snapBtn.addEventListener("click", () => {
  take_snapshot();
});

stopBtn.addEventListener("click", () => {
  stop();
});

resumeBtn.addEventListener("click", () => {
  resume();
});

confirmBtn.addEventListener("click", async () => {
  progressWords.style.visibility = "visible";
  progress.style.visibility = "visible";

  console.log(70, data_image_uri);

  // buffer = new Buffer(data_image_uri.split(",")[1], "base64");
  // console.log(buffer);

  const config1 = {
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      progress.setAttribute("value", percentCompleted);
      progress.previousElementSibling.textContent = `${percentCompleted}%`;
      if (percentCompleted === 100) {
        progress.previousElementSibling.textContent = `Upload complete!`;
      }
    },
  };
  await uploadImagetoFirebase(config1);

  const config2 = {
    onUploadProgress: function (progressEvent) {
      const percentCompleted = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100
      );
      progress.setAttribute("value", percentCompleted);
      progress.previousElementSibling.textContent = `${percentCompleted}%`;
      if (percentCompleted === 100) {
        progress.previousElementSibling.textContent = `Analyze complete!`;
      }
    },
  };
  await urlSendtoPythonAnalsis(config2);

  finalconfirmA.style.visibility = "visible";
  finalconfirmBtn.style.visibility = "visible";
});

select.addEventListener("change", () => {
  confirmA2.style.visibility = "visible";
  confirmBtn2.style.visibility = "visible";
  confirmA2.innerHTML = `確認`;
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
    data_image_uri = data_uri;
    // display results in page
    resultPic.innerHTML = '<img src="' + data_uri + '"/>';
  });
  confirmWords.style.display = "block";
  confirmWords.innerHTML = `請確認您拍攝的圖片是否有誤`;
  confirmA.style.visibility = "visible";
  confirmBtn.style.visibility = "visible";
  confirmA.innerHTML = `確認`;
}

async function uploadImagetoFirebase(config) {
  const blob = dataURItoBlob(data_image_uri);
  const file = new File([blob], "snap.jpg");
  const data = new FormData();
  data.append("file", file);
  await axios
    .post("/setupSrcPath/upload", data, config)
    .then((res) => {
      https_image_uri = res.data.imageUrl;
    })
    .catch((err) => {
      console.log("錯誤", err.response.data);
    });
}

async function urlSendtoPythonAnalsis(config) {
  await axios
    .post("/api/setupSrcPath-img-analysis", { url: https_image_uri }, config)
    .then((res) => {
      console.log(res.data.result);
      txtOutput.innerHTML = res.data.result;
    })
    .catch((err) => {
      console.log("錯誤", err);
    });
}

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

// /**
//  * Converts data URI in 'image/png' format to an image data object
//  * @param dataURL Base64 encoded string
//  * @returns {ImageData/undefined}
//  */
// function convertDataURLToImageData(dataURL) {
//   if (dataURL !== undefined && dataURL !== null) {
//     var canvas, context, image, imageData;
//     canvas = document.createElement("canvas");
//     canvas.width = 540;
//     canvas.height = 400;
//     context = canvas.getContext("2d");
//     image = new Image();

//     image.addEventListener(
//       "load",
//       function () {
//         context.drawImage(image, 0, 0, canvas.width, canvas.height);
//         imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//         //how do i return this?
//       },
//       false
//     );
//     image.src = dataURL;

//     return imageData;
//   }
// }

},{}]},{},[1]);
