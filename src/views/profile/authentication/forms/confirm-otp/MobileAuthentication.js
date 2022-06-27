/**internal imports */
import { useEffect, useState } from "react";
import Styles from "./ConfirmOtp.module.scss";
import { authenticationServices } from "../../../../../services";
import { Toastify } from "../../../../../utils";
import { mobile as vaildationMethodSchema } from "../formValidation";
import { useMainApi, useRedux } from "../../../../../common/hooks";

/**external imports */
import { FastField, Field, Form, Formik } from "formik";
import { Col } from "react-bootstrap";
import { FiCheck, MdOutlineTextsms } from "react-icons/all";
import { useSelector } from "react-redux";

/**component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import InputElement from "../../../../../common/element/formik-inputs/input/Input";
import SuccessIco from "../../../../../assets/images/successIco.png";
import OTPInputElement from "../../../../../common/element/formik-inputs/otp-input/OTPInput";

export default function MobileAuthentication() {
  const { customerIdentity, customer } = useSelector(
    (state) => state.user
  );

  const { getUserData } = useRedux();
  const { urls, post, loading } = useMainApi()
  const { isVerified } = customer;
  const { verifiedMobile, mobile, verified, verifyRequest } = customerIdentity || {};

  const [identityData, setIdentityData] = useState({});
  const [otpData, setOtpData] = useState({});

  useEffect(() => setIdentityData({ verifiedMobile, mobile }), [customerIdentity]);

  async function generateOtpHandler(_body) {
    setIdentityData((prev) => ({ ...prev, mobile: _body.mobile }));
    try {
      const _url = urls.Auth_GenerateOTP.replace('_type', 'mobile')
      const { data, message } = await post(_url, _body);

      Toastify.success(message);
      setOtpData(data);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function confirmOtpHandler(_body) {
    try {
      const _url = urls.Auth_ConfirmOTP.replace('_type', 'mobile')
      const { message } = await post(_url, _body)
      Toastify.success(message);
      setOtpData({});
      getUserData();
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const renderForm = () => {
    let element = <></>;

    if (identityData.verifiedMobile) {
      element = (
        <Col lg={12}>
          <h2 className="size-3 fw-700 text-blue mb-3 p-0">احراز تلفن همراه</h2>
          <div className="center-content flex-column w-100">
            <img src={SuccessIco} />
            <span className="size-3 text-gray-3 mt-4 fw-500">
              تلفن همراه شما با موفقیت احراز شد
            </span>
            <span
              className="size-3 text-gray-2 mt-3 fw-500 pointer"
              onClick={() => {
                if (!isVerified && verified !== "approved" && !verifyRequest) {
                  setIdentityData((prev) => ({
                    ...prev,
                    verifiedMobile: false,
                  }));
                } else
                  Toastify.error(
                    "برای تغییر تلفن همراه با پشتیبانی ارتباط برقرار کنید."
                  );
              }}
            >
              تغییر شماره
            </span>
          </div>
        </Col>
      );
    } else if ("nonce" in otpData || loading) {
      element = (
        <Formik
          enableReinitialize
          initialValues={{
            nonce: otpData.nonce,
            otpText: "",
            confirmSource: "sms",
          }}
          onSubmit={confirmOtpHandler}
        >
          {({ setFieldValue, values }) => (
            <Form className="d-flex flex-wrap align-items-stretch justify-content-start w-100 h-100">
              <h2 className="size-3 fw-700 text-blue mb-3 p-0">
                احراز تلفن همراه
              </h2>
              <Col xs={12} className="mb-3 p-0">
                <Field
                  as={OTPInputElement}
                  name="otpText"
                  expiryDate={otpData.expiryDate}
                  type="sms"
                  onResendClick={() => {
                    generateOtpHandler({
                      mobile: identityData.mobile,
                      confirmSource: values.confirmSource,
                    });
                    setFieldValue("otpText", "");
                  }}
                />
              </Col>
              <Col xs={12} className="p-0">
                <CustomizedButton
                  isFullWidth
                  rightIcon={<FiCheck size={20} />}
                  outlined
                  size="xs"
                  className="fw-700 size-3"
                  variant="blue"
                  type="submit"
                  loading={loading}
                >
                  تایید
                </CustomizedButton>
              </Col>
            </Form>
          )}
        </Formik>
      );
    } else {
      element = (
        <Formik
          enableReinitialize
          initialValues={{
            mobile: mobile || "",
            confirmSource: "sms",
          }}
          validationSchema={vaildationMethodSchema}
          onSubmit={generateOtpHandler}
        >
          {({ isValid, dirty, values, setFieldValue }) => (
            <Form className="d-flex flex-wrap align-items-stretch justify-content-start w-100 m-0 h-100">
              <h2 className="size-3 fw-700 text-blue mb-3 p-0">
                احراز تلفن همراه
              </h2>
              <Col xs={12} className="mb-3 p-0">
                <FastField
                  as={InputElement}
                  type="tel"
                  name="mobile"
                  label="شماره تلفن همراه"
                  preIcon={<MdOutlineTextsms size={24} />}
                />
              </Col>
              <Col xs={12} className="p-0">
                <CustomizedButton
                  isFullWidth
                  rightIcon={<FiCheck size={20} />}
                  outlined
                  size="xs"
                  className="fw-700 size-3"
                  variant="blue"
                  disabled={!isValid}
                  type="submit"
                >
                  ارسال کد
                </CustomizedButton>
              </Col>
            </Form>
          )}
        </Formik>
      );
    }

    return element;
  };

  return (
    <div className={`${Styles.otpForms} bordered rounded-20 p-4 w-100`}>
      {renderForm()}
    </div>
  );
}
