/**intenal imports */
import { useEffect } from "react";
import { Toastify } from "../../../../../utils";
import Styles from "../../Security.module.scss";
import { otpForm } from "../../formValidation";
import { useMainApi } from "../../../../../common/hooks";
/**external imports */
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { AiOutlineCheck } from "react-icons/all";
import classNames from "classnames";
/**component imports */
import CustomizedModal from "../../../../../components/modal/Modal";
import OTPInputElement from "../../../../../common/element/formik-inputs/otp-input/OTPInput";
import CustomizedButton from "../../../../../components/form/button/Button";


export default function ActivationSms({
  show,
  onHide,
  refreshUserData,
  otpData,
  setOtpData,
}) {
  let { mobile } = useSelector((state) => state.user.customerIdentity);
  const { urls, get, post } = useMainApi()

  useEffect(() => {
    if (show && !("nonce" in otpData)) activationCode();
  }, [show]);

  async function activationCode() {
    try {
      const _url = urls.Activation2FA.replace('_type', 'sms')
      const res = await get(_url);
      Toastify.success(res.message);
      setOtpData(res.data);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function verifyActivition(_body) {
    try {
      const _url = urls.Activation2FA.replace('_type', 'sms')
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
      className={classNames(Styles.lgModal, 'size-3', ' fw-400')}
      bodyClassName="p-3"
      {...{ show, onHide }}
      title="فعال کردن کد تایید پیامک"
    >
      <p className="size-4 mt-4 text-center">
        لطفا کد تایید پیامک ارسال شده به شماره تلفن
        <span className="ltr d-inline-block">{`${mobile.slice(
          0,
          4
        )}***${mobile.slice(-4)}`}</span>
        رو وارد کن.
      </p>

      <Formik
        enableReinitialize={true}
        initialValues={{ otpText: "", nonce: otpData.nonce }}
        onSubmit={verifyActivition}
        validationSchema={otpForm}
      >
        {({ isValid, dirty, resetForm }) => (
          <Form className={"d-flex flex-wrap align-items-end"}>
            <Col xs={12} className="my-2">
              <Field
                as={OTPInputElement}
                name="otpText"
                type="sms"
                expiryDate={otpData.expiryDate}
                onResendClick={() => {
                  activationCode();
                  resetForm();
                }}
              />
            </Col>
            <Col xs={12} className={`${Styles.modalButton} my-2`}>
              <CustomizedButton
                rightIcon={<AiOutlineCheck size={24} />}
                className="size-2 py-3 w-100 minHeight-auto fw-500 line-height-normal"
                variant="blue"
                type="submit"
                disabled={!(isValid && dirty)}
              >
                فعال کردن
              </CustomizedButton>
            </Col>
          </Form>
        )}
      </Formik>
    </CustomizedModal>
  );
}
