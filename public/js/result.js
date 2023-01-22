var video = document.querySelector("#videoElement");
const openBtn = document.getElementById("openBtn");
const stopBtn = document.getElementById("stopBtn");
const resumeBtn = document.getElementById("resumeBtn");

video.style.display = "none";
openBtn.style.visibility = "visible";
stopBtn.style.visibility = "hidden";
resumeBtn.style.visibility = "hidden";

// openBtn.addEventListener("change", () => {
//   console.log("Hi!!!");
//   open();
// });

function start() {
  console.log("Hi");
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
  stopBtn.style.visibility = "hidden";
  resumeBtn.style.visibility = "visible";
}

function resume() {
  open();
  video.style.display = "block";
  stopBtn.style.visibility = "visible";
  resumeBtn.style.visibility = "hidden";
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
}

// var video = document.querySelector("video");
// var exArray = [];

// function getMedia() {
//   if (navigator.getUserMedia) {
//     navigator.getUserMedia(
//       {
//         video: {
//           optional: [
//             {
//               sourceId: exArray[1], //0为前置摄像头，1为后置
//             },
//           ],
//         },
//         audio: true,
//       },
//       successFunc,
//       errorFunc
//     ); //success是获取成功的回调函数
//   } else {
//     alert(
//       "Native device media streaming (getUserMedia) not supported in this browser."
//     );
//   }
// }

// function successFunc(stream) {
//   //alert('Succeed to get media!');
//   if (video.mozSrcObject !== undefined) {
//     //Firefox中，video.mozSrcObject最初为null，而不是未定义的，我们可以靠这个来检测Firefox的支持
//     video.mozSrcObject = stream;
//   } else {
//     video.src = window.URL || stream;
//     video.srcObject = new MediaStream();
//   }
// }
// // window.URL.createObjectURL(stream)
// function errorFunc(e) {
//   alert("Error！" + e);
// }
