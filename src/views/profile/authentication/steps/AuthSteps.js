/**internal imports */
import Styles from "./AuthSteps.module.scss";
import StepOneActive from "../../../../assets/images/authentication/1-active.svg";
import StepOneDone from "../../../../assets/images/authentication/1-done.svg";
import StepTwo from "../../../../assets/images/authentication/2.svg";
import StepTwoActive from "../../../../assets/images/authentication/2-active.svg";
import StepTwoDone from "../../../../assets/images/authentication/2-done.svg";
import StepThree from "../../../../assets/images/authentication/3.svg";
import StepThreeActive from "../../../../assets/images/authentication/3-active.svg";
import StepThreeDone from "../../../../assets/images/authentication/3-done.svg";
import StepFour from "../../../../assets/images/authentication/4.svg";
import StepFourActive from "../../../../assets/images/authentication/4-active.svg";

const data = [
  { id: 1, step: 0, title: 'اطلاعات هویتی', icon: StepOneActive, activeIcon: StepOneActive, doneIcon: StepOneDone },
  { id: 2, step: 1, title: 'بارگزاری مدارک', icon: StepTwo, activeIcon: StepTwoActive, doneIcon: StepTwoDone },
  { id: 3, step: 2, title: 'اطلاعات مالی', icon: StepThree, activeIcon: StepThreeActive, doneIcon: StepThreeDone },
  { id: 4, step: 3, title: 'احراز هویت', icon: StepFour, activeIcon: StepFourActive, doneIcon: StepFourActive },
]

export default function AuthSteps({ currentstep }) {
  return (
    <div className="px-0 mb-3 mb-sm-4">
      <div
        className={`${Styles.container} d-flex justify-content-between align-items-center`}
      >
        {data.map(item =>
          <div
            key={item.step}
            className={`${Styles.step} flex-column ${currentstep === item.step
              ? Styles.active
              : currentstep > item.step
                ? Styles.done
                : ""
              } center-content`
            }
          >
            <span className={`${Styles.icon} center-content FaNum text-gray-4`}>
              {currentstep < item.step ? (
                <img src={item.icon} />
              ) : currentstep === item.step ? (
                <img src={item.activeIcon} />
              ) : (
                <img src={item.doneIcon} />
              )}
            </span>
            <label className="size-4 fw-500 text-gray-3">{item.title}</label>
          </div>
        )}

        <div className={Styles.progressSteps}>
          <span
            id="currentProgress"
            style={{ width: `${(100 / 3) * currentstep}%` }}
            className={Styles.current}
          />
        </div>
      </div>
    </div >
  );
};
