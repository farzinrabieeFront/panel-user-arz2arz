import React from "react";
import Styles from './SecurityPanelCard.module.scss';
import { BiCheckShield, BiShieldX } from "react-icons/all";
const SecurityPanelCard = () => {
  return (

    <div className="d-flex flex-wrap align-items-center justify-content-center">
      <div className="px-2 col-6 col-lg-6 col-md-12">
        <p className="mb-0 mb-xl-2 fw-500 text-center size-4  text-blue">Google Authenticator</p>
        <p className="mb-0 d-flex justify-content-center align-items-center fw-300 text-success">
          <BiCheckShield size={30} className="pl-1" />
            فعال
          </p>
      </div>
      <div className={`${Styles.border} col-6 col-lg-6 col-md-12 px-2 border-right-lightGray`}>
        <p className="mb-0 mb-xl-2 fw-500 text-center size-4  text-blue">رمز یک بار مصرف پیامکی</p>
        <p className="mb-0 d-flex justify-content-center align-items-center fw-300 text-danger">
          <BiShieldX size={30} className="pl-1" />
            غیر فعال
          </p>
      </div>
    </div>

  );
};

export default SecurityPanelCard;
