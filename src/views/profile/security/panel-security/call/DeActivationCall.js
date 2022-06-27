/**intenal imports */
import { useState } from "react";
import { Toastify } from "../../../../../utils";
import Styles from "../../Security.module.scss";
import { otpForm } from "../../formValidation";
import { useMainApi } from "../../../../../common/hooks";
/**external imports */
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import {
  AiOutlineCheck,
  RiErrorWarningLine,
  IoIosArrowBack,
} from "react-icons/all";
import classNames from "classnames";
/**component imports */
import OTPInputElement from "../../../../../common/element/formik-inputs/otp-input/OTPInput";
import CustomizedButton from "../../../../../components/form/button/Button";
import CustomizedTips from "../../../../../components/tips/Tips";
import CustomizedModal from "../../../../../components/modal/Modal";

export default function DeActivationCall({
  show,
  onHide,
  refreshUserData,
  otpData,
  setOtpData,
}) {
  const { mobile } = useSelector((state) => state.user.customerIdentity);
  const { urls, get, post } = useMainApi()

  const [confirm, setConfirm] = useState(false);

  async function deactivationCode() {
    try {
      const _url = urls.DeActivation2FA.replace('_type', 'call')
      const res = await get(_url);
      Toastify.success(res.message);
      setOtpData(res.data);
      setConfirm(true);

    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function verifyDeactivation(_body) {
    try {
      const _url = urls.DeActivation2FA.replace('_type', 'call')
      const { message } = await post(_url, _body);
      Toastify.success(message);
      refreshUserData();
      onHide();
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <CustomizedModal
      className={classNames(Styles.lgModal, 'size-4', ' fw-400')}
      bodyClassName="p-3"
      {...{ show, onHide }}
      title="غیر فعال کردن ورود دو مرحله‌ای از طریق تماس صوتی"
    >
      {confirm || "nonce" in otpData ? (
        [
          <p className="mt-0 ">
            لطفا کد تاییدی ارسال شده به شماره تلفن{" "}
            <span className="ltr d-inline-block">{`${mobile.slice(
              0,
              4
            )}***${mobile.slice(-4)}`}</span>{" "}
            رو وارد کن.
          </p>,
          <Formik
            enableReinitialize={true}
            initialValues={{ otpText: "", nonce: otpData.nonce }}
            onSubmit={verifyDeactivation}
            validationSchema={otpForm}
          >
            {({ isValid, dirty, resetForm }) => (
              <Form className={"size-5 d-flex flex-wrap align-items-end"}>
                <Col xs={12} className="my-2">
                  <Field
                    as={OTPInputElement}
                    name="otpText"
                    type="call"
                    expiryDate={otpData.expiryDate}
                    onResendClick={() => {
                      deactivationCode();
                      resetForm();
                    }}
                  />
                </Col>
                <Col xs={12} className={`${Styles.modalButton} my-2`}>
                  <CustomizedButton
                    rightIcon={<AiOutlineCheck size={24} />}
                    className="size-2 py-3 w-100 minHeight-auto fw-500 line-height-normal"
                    variant="danger"
                    type="submit"
                    disabled={!(isValid && dirty)}
                  >
                    غیر فعال کردن
                  </CustomizedButton>
                </Col>
              </Form>
            )}
          </Formik>,
        ]
      ) : (
        <div className="px-2">
          <CustomizedTips variant={"warning"}>
            <RiErrorWarningLine size={16} className="text-orange" />
            با غیر فعال کردن کد تایید تماس صوتی، امنیت حساب کاربریت رو کاهش میدی
            و همچنین امکان داره بعضی از فعالیت ها از قبیل امکان برداشت ریالی و
            ارزی رو تا 24 ساعت نداشته باشی!
          </CustomizedTips>

          <Col xs={12} className={`${Styles.modalButton} mb-2 mt-4`}>
            <CustomizedButton
              leftIcon={<IoIosArrowBack size={16} />}
              className="size-3 py-3 w-100 minHeight-auto fw-500 line-height-normal"
              variant="blue"
              onClick={deactivationCode}
            >
              تایید و ادامه
            </CustomizedButton>
          </Col>
        </div>
      )}
    </CustomizedModal>
  );
}
