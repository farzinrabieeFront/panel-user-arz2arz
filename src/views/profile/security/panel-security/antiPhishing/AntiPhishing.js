/**intenal imports */
import { useState } from "react";
import lock from "../../../../../assets/images/panel-security/icon-lock.svg";
import checkedIcon from "../../../../../assets/images/panel-security/icon-check-circle.svg";
import crossIcon from "../../../../../assets/images/panel-security/icon-cross-circle.svg";
import Styles from "../../Security.module.scss";
/**external imports */
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IoIosArrowBack, FiEdit2 } from "react-icons/all";
/**component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import ActivationAntiPhishing from "./ActivationAntiPhishing";
import ChangeAntiPhishingCode from "./ChangeAntiPhishingCode";

export default function AntiPhishing({ refreshUserData }) {
  const { antiPhishingCode } = useSelector((state) => state.user);

  const [showActivationModal, setShowActivationModal] = useState(false);
  const [showChangeModal, setShowChangeModal] = useState(false);

  return [
    <Row className="border-top-lightGray py-3 mx-0">
      <Col xs="12" sm="5" className="d-flex flex-row align-items-center">
        <img className="ml-4" src={lock} alt="googleAuth" />
        <div>
          <h2 className="text-gray-4 size-3 mb-1">آنتی فیشینگ</h2>
          <p className="fw-500 text-gray-2 size-5 mb-0 text-nowrap">
            ارسال کد یکتا در ایمیل های اطلاع رسانی
          </p>
        </div>
      </Col>

      <Col
        xs="4"
        sm="3"
        className="d-flex flex-row justify-content-end align-items-center justify-content-sm-start mt-3 mt-sm-0"
      >
        <img src={antiPhishingCode ? checkedIcon : crossIcon} alt="" />
        <p
          className={`${
            antiPhishingCode ? "text-gray-3" : "text-red"
          } size-5 mr-2 mt-1 mb-0 ltr d-none d-md-block`}
        >
          {antiPhishingCode
            ? `${antiPhishingCode?.slice(0, 1)}**${antiPhishingCode?.slice(-1)}`
            : "فعال نشده"}
        </p>
        <p
          className={`${
            antiPhishingCode ? "text-gray-3" : "text-red"
          } size-5 mr-2 mt-1 mb-0 d-md-none`}
        >
          {antiPhishingCode ? "فعال شده" : "فعال نشده"}
        </p>
      </Col>

      <Col
        xs="8"
        sm="4"
        className="d-flex justify-content-center mt-sm-0 mt-3 justify-content-sm-end"
      >
        <CustomizedButton
          leftIcon={!antiPhishingCode && <IoIosArrowBack size={16} />}
          rightIcon={antiPhishingCode && <FiEdit2 size={16} />}
          outlined
          className={`${Styles.actionsBtn} size-5 py-1 fw-500 line-height-normal`}
          size="xs"
          variant={antiPhishingCode ? "light" : "blue"}
          onClick={() =>
            antiPhishingCode
              ? setShowChangeModal(true)
              : setShowActivationModal(true)
          }
        >
          {antiPhishingCode ? "تغییر کد" : "فعال کردن"}
        </CustomizedButton>
      </Col>
    </Row>,
    showActivationModal ? (
      <ActivationAntiPhishing
        show={showActivationModal}
        onHide={() => setShowActivationModal(false)}
        refreshUserData={refreshUserData}
      />
    ) : null,
    showChangeModal ? (
      <ChangeAntiPhishingCode
        currentCode={antiPhishingCode}
        show={showChangeModal}
        onHide={() => setShowChangeModal(false)}
        refreshUserData={refreshUserData}
      />
    ) : null,
  ];
}
