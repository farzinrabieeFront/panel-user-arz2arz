export default function detectWebcam(callback) {
  let md = navigator.mediaDevices;
  if (!md || !md.enumerateDevices) return callback(false);
  md.enumerateDevices().then((devices) => {
    callback(devices.some((device) => "videoinput" === device.kind));
  });
}

// export default function detectWebcam(callback) {
//   if (navigator.getUserMedia) {
//     navigator.getUserMedia(
//       { video: true, audio: false },
//       () => callback(true),
//       () => callback(false)
//     );
//   } else {
//     error();
//   }
// }
// function success(stream) {
//   // The success function receives an argument which points to the webcam stream
//   alert(" webcam for you, matey!");
// }

// function error() {
//   alert("No webcam for you, matey!");
// }
