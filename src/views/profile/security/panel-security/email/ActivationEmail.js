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

export default function ActivationEmail({
  show,
  onHide,
  refreshUserData,
  otpData,
  setOtpData,
}) {
  const { email } = useSelector((state) => state.user.customer);
  const { urls, get, post } = useMainApi()

  useEffect(() => {
    if (show && !("nonce" in otpData)) activationCode();
  }, [show]);

  async function activationCode() {
    try {
      const _url = urls.Activation2FA.replace('_type', 'email')
      const res = await get(_url);
      Toastify.success(res.message);
      setOtpData(res.data);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function verifyActivition(_body) {
    try {
      const _url = urls.Activation2FA.replace('_type', 'email')
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
      title="فعال کردن کد تایید ایمیل"
    >
      <p className="mt-4 text-center">
        لطفا کد تایید ارسال شده به ایمیل {email.slice(0, 3)}*****
        {email.slice(-10)} رو وارد کن.
      </p>

      <Formik
        enableReinitialize={true}
        initialValues={{ otpText: "", nonce: otpData.nonce }}
        onSubmit={verifyActivition}
        validationSchema={otpForm}
      >
        {({ dirty, isValid, resetForm }) => (
          <Form className={"d-flex flex-wrap align-items-end"}>
            <Col xs={12} className="my-2">
              <Field
                as={OTPInputElement}
                name="otpText"
                type="email"
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
