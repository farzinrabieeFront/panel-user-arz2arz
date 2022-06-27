import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import Styles from "./VideoRecorderComp.module.scss";
import { ProgressBar } from "react-bootstrap";
import { SiDiscover, FaPlay, TiRefreshOutline, CgClose } from "react-icons/all";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
//components
import CustomizedButton from "../form/button/Button";
import { time } from "../../utils";
import StartCounter from "./startCounter/StartCounter";

export default function VideoRecorderComp({
  handleSetImageSrc,
  handleSetVideoBlob,
  videoBlob,
  onExit,
}) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [capturing, setCapturing] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [counter, setCounter] = useState(120);
  const [startCounter, setStartCounter] = useState(null);

  const videoConstraints = {
    facingMode: "user",
    // width: 350,
    // height: 550,
  };

  useEffect(() => {
    if (capturing) {
      if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
      } else {
        handleStopCaptureClick();
      }
    }
  });

  useEffect(() => {
    if (startCounter === 0) {
      handleStartRecord();
    } else if (startCounter > 0) {
      setTimeout(() => setStartCounter(startCounter - 1), 1000);
    }
  }, [startCounter]);

  const handleStartRecord = async () => {
    capturePicture();
    handleStartCaptureClick();
  };

  const handleUserMediaError = () => {
  };

  //capture from user
  const capturePicture = useCallback(() => {
    const src = webcamRef.current.getScreenshot({ width: 207, height: 354 });
    handleSetImageSrc(src);
  }, [webcamRef]);

  //start video record
  const handleStartCaptureClick = useCallback(() => {
    // startTimerRecord();

    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  //stop video record
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      handleSetVideoBlob(blob);
      setRecordedChunks([]);
      handlePlayVideo(blob);
    }
  }, [recordedChunks]);

  const handleExitrecorder = () => {
    if (capturing) {
      handleSetImageSrc(null);
      setCapturing(false);
      handleStopCaptureClick();
    }
    onExit();
  };

  //reset video recorder
  const handleReset = () => {
    if (capturing) {
      handleSetImageSrc(null);
      setCapturing(false);
      handleStopCaptureClick();
    }
  };

  //play video recorded for user
  const handlePlayVideo = (blob) => {
    let video = document.getElementsByTagName("video")[0];
    let videoUrl =
      // window.URL.createObjectURL(blob.data);
      window.URL
        ? window.URL.createObjectURL(blob.data)
        : window.webkitURL.createObjectURL(blob.data);
    video.src = videoUrl;
  };

  return (
    <div className={Styles.recorderBox}>
      <div className={Styles.videoBox}>
        {videoBlob ? (
          <video />
        ) : (
          <Webcam
            audio={true}
            videoConstraints={videoConstraints}
            ref={webcamRef}
            className={Styles.videoRecorderCard}
            width={350}
            height={550}
            screenshotFormat="image/jpeg"
            onUserMedia={() => console.log("onUserMedia")}
            onUserMediaError={handleUserMediaError}
          />
        )}
        {!startCounter ? (
          <div
            className={`${Styles.guaideText} text-justify text-white px-4 py-3 is-size-5 fw-700`}
          >
            جهت احراز هویت در سایت ارز تو ارز اینجانب قوانین سایت را مطالعه کرده
            و مسئولیت تمامی خرید و فروش ها از حساب کاربری را میپذیرم و حساب
            کاربری و کارت بانکی خود را در اختیار فرد دیگری قرار نمیدهم.
          </div>
        ) : (
          <div
            className={`${Styles.startCounter} text-justify text-white p-4 is-size-5 fw-700`}
          >
            <StartCounter num={startCounter} />
          </div>
        )}
        <div
          className={`${Styles.tools} px-4 d-flex justify-content-around align-items-center`}
        >
          <div onClick={handleReset}>
            <TiRefreshOutline size={40} className="text-medium pointer" />
          </div>
          {recordedChunks.length > 0 ? (
            <div
              className={`${Styles.playBtn} pointer`}
              onClick={handleDownload}
            >
              <FaPlay size={40} className="text-blue" />
            </div>
          ) : capturing ? (
            <div
              className={`${Styles.stopBtn} pointer`}
              onClick={handleStopCaptureClick}
            >
              <CircularProgressbar
                value={Math.floor((100 * (120 - counter)) / 120)}
                styles={{
                  root: {
                    backgroundColor: "#fff",
                  },
                  path: {
                    stroke: "#0072ff",
                    opacity: 63 / 100,
                    strokeLinecap: "round",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                  },
                  trail: {
                    // stroke: "#afb7cb",
                    // strokeLinecap: "round",
                  },
                }}
              />
            </div>
          ) : (
            <div
              className={`${Styles.recordBtn} pointer`}
              onClick={() => setStartCounter(3)}
            ></div>
          )}
          <div onClick={handleExitrecorder}>
            <CgClose size={38} className="text-medium pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

// const startTimerRecord = () => {
//   let intervalId = setInterval(() => {
//     setCounter((prev) => {
//       if(prev > 0){
//         return prev - 1
//       }else{
//         clearInterval(intervalId);
//         return prev;
//       }
//     } );
//   }, 1000);
// };

   
// <CustomizedButton className="col-7" onClick={handleDownload}>
//   تایید
// </CustomizedButton>
// <div className="FaNum text-center text-primary">
//   {120 - counter}
//   <SiDiscover size={10} className="mr-2" />
// </div>
// <ProgressBar
//   now={Math.floor((100 * (120 - counter)) / 120)}
//   label={`${Math.floor((100 * (120 - counter)) / 120)}%`}
//   variant="success"
//   variant="success"
//   animated
// />