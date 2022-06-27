/**intenal imports */
import { useState, useEffect } from "react";
import emailIcon from "../../../../../assets/images/panel-security/icon-mail-otp.svg";
import checkedIcon from "../../../../../assets/images/panel-security/icon-check-circle.svg";
import crossIcon from "../../../../../assets/images/panel-security/icon-cross-circle.svg";
import Styles from "../../Security.module.scss";
/**external imports */
import { IoIosArrowBack, BsX } from "react-icons/all";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
/**component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import DeActivationEmail from "./DeActivationEmail";
import ActivationEmail from "./ActivationEmail";

export default function Email({
  enableStatus,
  activeMethods,
  refreshUserData,
  warningErrorHandler,
}) {
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [showDeActivationModal, setShowDeActivationModal] = useState(false);
  const [otpData, setOtpData] = useState({});

  const { email } = useSelector((state) => state.user.customer);

  useEffect(() => {
    if (otpData.expiryDate) {
      const isExpiredOtp = new Date().getTime() >= otpData.expiryDate;
      if (isExpiredOtp) {
        setOtpData({});
      }
    }
  }, [showActivationModal, showDeActivationModal]);

  return [
    <Row className="border-top-lightGray py-3 mx-0">
      <Col xs="12" sm="5" className="d-flex flex-row align-items-center">
        <img className="ml-4" src={emailIcon} alt="googleAuth" />
        <div>
          <h2 className="text-gray-4 size-3 mb-1">ایمیل</h2>
          <p className="fw-500 text-gray-2 size-5 mb-0 text-nowrap">
            ارسال کد تایید از طریق ایمیل
          </p>
        </div>
      </Col>

      <Col
        xs="4"
        sm="3"
        className="d-flex flex-row justify-content-cenetr align-items-center justify-content-sm-start mt-3 mt-sm-0"
      >
        <img src={enableStatus ? checkedIcon : crossIcon} alt="" />
        <p
          className={`${
            enableStatus ? "text-gray-3" : "text-red"
          } size-5 mr-2 mt-1 mb-0 d-none d-md-block text-nowrap`}
        >
          {enableStatus
            ? `${email.slice(0, 3)}*****${email.slice(-10)}`
            : "فعال نشده"}
        </p>
        <p
          className={`${
            enableStatus ? "text-gray-3" : "text-red"
          } size-5 mr-2 mt-1 mb-0 d-md-none`}
        >
          {enableStatus ? "فعال شده" : "فعال نشده"}
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
      <ActivationEmail
        show={showActivationModal}
        {...{ otpData, setOtpData }}
        onHide={() => setShowActivationModal(false)}
        refreshUserData={() => {
          refreshUserData();
          setOtpData({});
        }}
      />
    ) : null,
    showDeActivationModal ? (
      <DeActivationEmail
        show={showDeActivationModal}
        {...{ otpData, setOtpData }}
        onHide={() => setShowDeActivationModal(false)}
        refreshUserData={() => {
          refreshUserData();
          setOtpData({});
        }}
      />
    ) : null,
  ];
}
