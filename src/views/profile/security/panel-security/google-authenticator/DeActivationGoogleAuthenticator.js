/**intenal imports */
import { useState } from "react";
import Styles from "../../Security.module.scss";
import { useMainApi } from "../../../../../common/hooks";
import { otpForm } from "../../formValidation";
/**external imports */
import { Formik, Form, Field } from "formik";
import classNames from "classnames";
import { Toastify } from "../../../../../utils";
import { Col } from "react-bootstrap";
import {
  AiOutlineCheck,
  RiErrorWarningLine,
  IoIosArrowBack,
} from "react-icons/all";
/**component imports */
import OTPInputElement from "../../../../../common/element/formik-inputs/otp-input/OTPInput";
import CustomizedTips from "../../../../../components/tips/Tips";
import CustomizedButton from "../../../../../components/form/button/Button";
import CustomizedModal from "../../../../../components/modal/Modal";

export default function DeActivationGoogleAuthenticator({
  show,
  onHide,
  refreshUserData,
}) {
  const { urls, get, post } = useMainApi()
  const [confirm, setConfirm] = useState(false);

  async function deactivationCode() {
    try {
      const _url = urls.DeActivation2FA.replace('_type', 'google')
      const { message } = await get(_url);
      Toastify.success(message);
      setConfirm(true);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function verifyDeactivation(_body) {
    try {
      const _url = urls.DeActivation2FA.replace('_type', 'google')
      const { message } = await post(_url, _body);
      Toastify.success(message);
      refreshUserData();
    } catch (error) {
      Toastify.error(error.message);
    } finally {
      onHide();
    }
  };


  return (
    <CustomizedModal
      className={classNames(Styles.lgModal, 'size-3', 'fw-400')}
      bodyClassName="p-2"
      {...{ show, onHide }}
      title="غیر فعال کردن ورود دو مرحله‌ای از طریق Google Authenticator"
    >
      {confirm ? [
        <p className="mt-0 size-3 pr-4">
          لطفا کد تایید اپلیکیشن Google Authenticator رو وارد کن.
        </p>,
        <Formik
          initialValues={{ otpText: "" }}
          onSubmit={verifyDeactivation}
          validationSchema={otpForm}
        >
          {({ dirty, isValid }) => (
            <Form className={"size-5 d-flex flex-wrap align-items-end"}>
              <Col xs={12} className="my-2">
                <Field as={OTPInputElement} type="google" name="otpText" />
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
        </Formik>
      ] : (
        <div className="px-2">
          <CustomizedTips variant={"warning"}>
            <RiErrorWarningLine size={16} className="text-orange" />
            <span className="size-4 mb-0">
              با غیر فعال کردن کد تایید Google Authenticator امنیت حساب کاربریت
              رو کاهش میدی و همچنین امکان داره بعضی از فعالیت ها از قبیل امکان
              برداشت ریالی و ارزی رو تا 24 ساعت نداشته باشی!
            </span>
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
