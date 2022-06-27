/**intenal imports */
import { useState } from "react";
import crossIcon from "../../../../../assets/images/panel-security/icon-cross-circle.svg";
import googleAuth from "../../../../../assets/images/panel-security/icon-google-otp.svg";
import checkedIcon from "../../../../../assets/images/panel-security/icon-check-circle.svg";
import Styles from "../../Security.module.scss";
/**external imports */
import { IoIosArrowBack, BsX } from "react-icons/all";
import { Col, Row } from "react-bootstrap";
/**component imports */
import ActivationGoogleAuthenticator from "./ActivationGoogleAuthenticator";
import CustomizedButton from "../../../../../components/form/button/Button";
import DeActivationGoogleAuthenticator from "./DeActivationGoogleAuthenticator";

export default function GoogleAuthenticator({
  enableStatus,
  activeMethods = [],
  refreshUserData,
  warningErrorHandler,
}) {
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [showDeActivationModal, setShowDeActivationModal] = useState(false);

  return [
    <Row className="border-top-lightGray py-3 align-items-center mx-0">
      <Col xs="12" sm="5" className="d-flex flex-row align-items-center">
        <img className="ml-4" src={googleAuth} alt="googleAuth" />
        <div>
          <h2 className="text-gray-4 size-3 mb-1">رمز ساز گوگل</h2>
          <p className="fw-500 text-gray-2 size-5 mb-0 text-nowrap">
            ارسال کد تایید از طریق اپلیکیشن
          </p>
        </div>
      </Col>

      <Col
        xs="4"
        sm="3"
        className="d-flex flex-row justify-content-center align-items-center justify-content-sm-start mt-3 mt-sm-0"
      >
        <img src={enableStatus ? checkedIcon : crossIcon} alt="" />
        <p
          className={`${
            enableStatus ? "text-gray-3" : "text-red"
          } size-5 mr-2 mt-1 mb-0`}
        >
          {enableStatus ? "فعال" : "فعال نشده"}
        </p>
      </Col>

      <Col
        xs="8"
        sm="4"
        className="d-flex justify-content-center mt-sm-0 mt-3 justify-content-sm-end"
      >
        <CustomizedButton
          leftIcon={!enableStatus && <IoIosArrowBack size={16} />}
          rightIcon={enableStatus && <BsX size={20} />}
          outlined
          className={`${Styles.actionsBtn} size-5 py-1 fw-500 line-height-normal`}
          size="xs"
          variant={enableStatus ? "light" : "blue"}
          onClick={() => {
            if (enableStatus) {
              if (activeMethods.length < 2) {
                warningErrorHandler();
              } else {
                setShowDeActivationModal(true);
              }
            } else {
              setShowActivationModal(true);
            }
          }}
        >
          {enableStatus ? "غیر فعال کردن" : "فعال کردن"}
        </CustomizedButton>
      </Col>
    </Row>,
    showActivationModal ? (
      <ActivationGoogleAuthenticator
        show={showActivationModal}
        onHide={() => setShowActivationModal(false)}
        refreshUserData={refreshUserData}
      />
    ) : null,
    showDeActivationModal ? (
      <DeActivationGoogleAuthenticator
        show={showDeActivationModal}
        onHide={() => setShowDeActivationModal(false)}
        refreshUserData={refreshUserData}
      />
    ) : null,
  ];
}
