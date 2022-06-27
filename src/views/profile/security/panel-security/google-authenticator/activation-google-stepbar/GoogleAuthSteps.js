/**intenal imports */
import { useEffect, useState } from "react";
import Styles from "./GoogleAuthSteps.module.scss";
import StepOne from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-download.svg";
import StepOneDone from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-download-done.svg";
import StepTwo from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-scan-qr.svg";
import StepTwoActive from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-scan-qr-active.svg";
import StepTwoDone from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-scan-qr-done.svg";
import StepThree from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-backup.svg";
import StepThreeActive from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-backup-active.svg";
import StepThreeDone from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-backup-done.svg";
import StepFour from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-check-progress.svg";
import StepFourActive from "../../../../../../assets/images/panel-security/googleAuthSteps/icon-check-progress-active.svg";

const GoogleAuthSteps = ({ currentstep }) => {
  const [progress, setProgress] = useState(0);
  const [fullProgress, setFullProgress] = useState(0);
  useEffect(() => {
    let currentWidth =
      document.getElementById("1").offsetLeft -
      document.getElementById("4").offsetLeft;
    setFullProgress(currentWidth);
  }, []);

  useEffect(() => {
    let currentStep = document.getElementById(currentstep).offsetLeft;
    let firstStep = document.getElementById("1").offsetLeft;
    let progressWidth = firstStep - currentStep;
    setProgress(progressWidth);
  }, [currentstep]);

  return (
    <div className="px-0  mb-3 mb-sm-4">
      <div
        className={`${Styles.container} d-flex justify-content-between align-items-center`}
      >
        <div
          id="1"
          className={`${Styles.step} flex-column ${
            currentstep > 1 ? Styles.done : Styles.active
          } center-content`}
        >
          <span className={`${Styles.icon} center-content FaNum text-gray-4`}>
            {currentstep > 1 ? (
              <img src={StepOneDone} />
            ) : (
              <img src={StepOne} />
            )}
          </span>
          <label className={`${Styles.text} size-4 fw-500 text-gray-3`}>
            دانلود اپلیکیشن
          </label>
        </div>
        <div
          id="2"
          className={`${Styles.step} flex-column ${
            (currentstep < 2 && "") ||
            (currentstep == 2 && Styles.active) ||
            (currentstep > 2 && Styles.done)
          } center-content`}
        >
          <span className={`${Styles.icon} center-content FaNum text-gray-4`}>
            {(currentstep < 2 && <img src={StepTwo} />) ||
              (currentstep == 2 && <img src={StepTwoActive} />) ||
              (currentstep > 2 && <img src={StepTwoDone} />)}
          </span>
          <label className={`${Styles.text} size-4 fw-500 text-gray-3`}>اسکن کد QR</label>
        </div>
        <div
          id="3"
          className={`${Styles.step} flex-column ${
            (currentstep < 3 && "") ||
            (currentstep == 3 && Styles.active) ||
            (currentstep > 3 && Styles.done)
          } center-content`}
        >
          <span className={`${Styles.icon} center-content FaNum text-gray-4`}>
            {(currentstep < 3 && <img src={StepThree} />) ||
              (currentstep == 3 && <img src={StepThreeActive} />) ||
              (currentstep > 3 && <img src={StepThreeDone} />)}
          </span>
          <label className={`${Styles.text} size-4 fw-500 text-gray-3`}>پشتیبانی گرفتن</label>
        </div>
        <div
          id="4"
          className={`${Styles.step} flex-column ${
            currentstep >= 4 ? Styles.active : ""
          } center-content`}
        >
          <span className={`${Styles.icon} center-content FaNum text-gray-4`}>
            {currentstep < 4 ? (
              <img src={StepFour} />
            ) : (
              <img src={StepFourActive} />
            )}
          </span>
          <label className={`${Styles.text} size-4 fw-500 text-gray-3`}>فعال سازی</label>
        </div>
        <div className={Styles.progressSteps} style={{ width: fullProgress }}>
          <span
            id="currentProgress"
            style={{ width: progress }}
            className={Styles.current}
          ></span>
        </div>

      </div>
    </div>
  );
};

export default GoogleAuthSteps;
