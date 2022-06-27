/**internal imports */
import { useEffect, useRef, useState } from "react";
import { Toastify } from "../../../../utils";
import Styles from "../Security.module.scss";
import {
  changePass as vaildationMethodSchema,
  otpForm,
} from "../formValidation";
import { useMainApi } from "../../../../common/hooks";
/**external imports */
import { FastField, Field, Form, Formik } from "formik";
import { Col } from "react-bootstrap";
import { VscLock, AiOutlineCheck, FaChevronLeft } from "react-icons/all";
/**component imports */
import { NewInput } from "../../../../common/element/formik-inputs";
import PasswordConditions from "../../../../common/widgets/password-conditions/PasswordConditions";
import CustomizedModal from "../../../../components/modal/Modal";
import PassStrenght from "../../../../common/widgets/pass-strenght/PassStrenght";
import CustomizedButton from "../../../../components/form/button/Button";
import Select2faMethods from "../../../../common/widgets/select-2fa-methods/Select2faMethods";
import OTPNewInput from "../../../../common/element/formik-inputs/otp-input/OTPInput";

const form_steps = {
  otp: 0,
  verifyOtp: 1,
  changePass: 2,
};

export default function EditPass({ show, onHide, otpData, setOtpData }) {
  const formikRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { urls, post, loading } = useMainApi();

  useEffect(() => {
    if (Object.keys(otpData).length)
      if ("expiryDate" in otpData) setActiveStep(1);
      else setOtpData({});
  }, []);

  async function sendOtpHandler(confirmSource) {
    if (confirmSource !== "google")
      try {
        const _body = { confirmSource };
        const res = await post(urls.ChangePasswordGenerateOtp, _body);
        Toastify.success(res.message);
        setOtpData(res.data);
        setActiveStep(1);
      } catch (error) {
        Toastify.error(error.message);
        console.log(error, error.message, Object.keys(error));
      }
    else setActiveStep(1);
  }

  async function resendOtpHandler({ confirmSource }) {
    try {
      const _body = { confirmSource, nonce: otpData.resendOTPNonce };
      const res = await post(urls.ChangePasswordGenerateOtp, _body);
      Toastify.success(res.message);
      setOtpData(res.data);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  async function verifyOtpHandler(_body) {
    try {
      const _url = _body.confirmSource
        ? urls.ChangePasswordConfirmInternalOtp
        : urls.ChangePasswordConfirmGoogleOtp;

      const { data } = await post(_url, _body);
      setOtpData({ nonce: data.nonce });
      setActiveStep(2);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  const changePassHandler = async ({ newPassword2, ..._body }) => {
    try {
      const { message } = await post(urls.SecurityChangePassword, _body);
      Toastify.success(message);
      setOtpData({});
      onHide();
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case form_steps.otp:
        return [
          <p className="size-4 mb-4">
            برای تغییر رمز عبور ابتدا یک روش ارسال کد تایید انتخاب کن .
          </p>,
          <Select2faMethods
            loading={loading}
            onSubmit={([method]) => sendOtpHandler(method)}
          />,
        ];

      case form_steps.verifyOtp:
        return (
          <Formik
            innerRef={formikRef}
            initialValues={{
              otpText: "",
              nonce: otpData.nonce,
              confirmSource: otpData.sendMethod,
            }}
            validationSchema={otpForm}
            onSubmit={verifyOtpHandler}
          >
            {({ isValid, dirty, setFieldValue, values, resetForm }) => (
              <Form
                className={`${Styles.formInput} d-flex flex-wrap align-items-end`}
              >
                <Col xs={12} className="mb-5">
                  <Field
                    as={OTPNewInput}
                    name="otpText"
                    expiryDate={otpData.sendMethod ? otpData.expiryDate : 0}
                    type={otpData.sendMethod ? otpData.sendMethod : "google"}
                    onResendClick={() => {
                      resendOtpHandler(values);
                      resetForm();
                    }}
                  />
                </Col>

                <Col xs={12}>
                  <CustomizedButton
                    isFullWidth
                    leftIcon={<FaChevronLeft size={20} />}
                    type="submit"
                    className="size-3 fw-700"
                    size="lg"
                    variant="blue"
                    disabled={!(isValid && dirty)}
                    loading={loading}
                  >
                    تایید کد
                  </CustomizedButton>
                </Col>
              </Form>
            )}
          </Formik>
        );

      case form_steps.changePass:
        return (
          <Formik
            enableReinitialize={true}
            initialValues={{
              currentPassword: "",
              newPassword: "",
              newPassword2: "",
              nonce: otpData.nonce,
            }}
            validationSchema={vaildationMethodSchema}
            onSubmit={changePassHandler}
          >
            {({ values, isValid, dirty }) => (
              <Form className={"d-flex flex-wrap align-items-end"}>
                <Col xs={12} className="my-2">
                  <FastField
                    as={NewInput}
                    name="currentPassword"
                    type="password"
                    preIcon={<VscLock size={24} />}
                    label="رمز عبور فعلی"
                  />
                </Col>
                <Col xs={12} className="my-2">
                  <FastField
                    as={NewInput}
                    name="newPassword"
                    type="password"
                    preIcon={<VscLock size={24} />}
                    label="رمز عبور جدید"
                  />
                </Col>
                <Col xs={12} className="my-2">
                  <FastField
                    as={NewInput}
                    name="newPassword2"
                    type="password"
                    preIcon={<VscLock size={24} />}
                    label="تکرار رمز عبور جدید"
                  />
                </Col>
                <Col xs={12} className="my-2">
                  <PassStrenght password={values.newPassword} />
                </Col>
                <Col xs={12} className="my-2">
                  <PasswordConditions password={values.newPassword} />
                </Col>
                <Col xs={12} className="my-2">
                  <CustomizedButton
                    rightIcon={<AiOutlineCheck size={24} />}
                    className="size-2 py-3 w-100 minHeight-auto fw-500 line-height-normal"
                    variant="blue"
                    type="submit"
                    disabled={!(isValid && dirty)}
                  >
                    تغییر رمز عبور
                  </CustomizedButton>
                </Col>
              </Form>
            )}
          </Formik>
        );

      default:
        onHide();
        break;
    }
  };

  return (
    <CustomizedModal
      className={Styles.lgModal}
      {...{ show, onHide }}
      title="تغییر رمز عبور"
    >
      {renderStepContent()}
    </CustomizedModal>
  );
}
