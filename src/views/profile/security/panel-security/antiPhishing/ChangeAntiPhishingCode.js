/**intenal imports */
import { useState } from "react";
import { Toastify } from "../../../../../utils";
import { antiPhishingCode, antiPhishingPass } from "../../formValidation";
import { useMainApi } from "../../../../../common/hooks";
import Styles from "../../Security.module.scss";
/**external imports */
import { FastField, Formik, Form } from "formik";
import { Col } from "react-bootstrap";
import { AiOutlineCheck, IoIosArrowBack, VscLock } from "react-icons/all";
import classNames from "classnames";
/**component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import CustomizedModal from "../../../../../components/modal/Modal";
import { NewInput } from "../../../../../common/element/formik-inputs";

export default function ChangeAntiPhishingCode({
  show,
  onHide,
  refreshUserData,
  currentCode,
}) {
  const { urls, post } = useMainApi()
  const [nonce, setNonce] = useState("");
  const [confirm, setConfirm] = useState(false);

  async function passwordVerifyHandler(_body) {
    try {
      const { data } = await post(urls.AntiPhishingVerufyPassword, _body);

      setNonce(data.nonce);
      setConfirm(true);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function sendCodeHandler(_body) {
    try {
      const { message } = post(urls.AntiPhishingChangeCode, _body);
      Toastify.success(message);
      refreshUserData();
      onHide();
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <CustomizedModal
      className={classNames(Styles.lgModal, 'size-3 ', 'fw-400')}
      bodyClassName="p-3"
      {...{ show, onHide }}
      title="تغییر کد Anti-Phishing"
    >
      {confirm ? (
        <div className="px-2">
          <div className="px-2">
            <p className="mt-5 size-3">
              کد چهار رقمی Anti-Phishing جدید رو وارد کن.
            </p>
            <Formik
              enableReinitialize
              initialValues={{ code: currentCode || "", nonce }}
              onSubmit={sendCodeHandler}
              validationSchema={antiPhishingCode}
            >
              <Form className={"d-flex flex-wrap align-items-end"}>
                <Col xs={12} className="my-2">
                  <FastField as={NewInput} name="code" type="password" maxLength={4} />
                </Col>
                <Col xs={12} className={`${Styles.modalButton} my-2`}>
                  <CustomizedButton
                    rightIcon={<AiOutlineCheck size={24} />}
                    className="size-2 py-3 w-100 minHeight-auto fw-500 line-height-normal"
                    variant="blue"
                    type="submit"
                  >
                    تغییر کد Anti-Phishing{" "}
                  </CustomizedButton>
                </Col>
              </Form>
            </Formik>
          </div>
        </div>
      ) : (
        <div className="px-2">
          <p className="mt-5">
            برای تغییر کد Anti-Phishing ابتدا رمز عبور حساب کاربریت رو وارد کن.
          </p>
          <Formik
            initialValues={{ password: "" }}
            onSubmit={passwordVerifyHandler}
            validationSchema={antiPhishingPass}
          >
            <Form className={"d-flex flex-wrap align-items-end"}>
              <Col xs={12} className="my-2">
                <FastField
                  as={NewInput}
                  name="password"
                  type="password"
                  preIcon={<VscLock size={24} />}
                  label="رمز عبور"
                />
              </Col>
              <Col xs={12} className={`${Styles.modalButton} my-2`}>
                <CustomizedButton
                  leftIcon={<IoIosArrowBack size={16} />}
                  className="size-2 py-3 w-100 minHeight-auto fw-500 line-height-normal"
                  variant="blue"
                  type="submit"
                >
                  تایید و ادامه
                </CustomizedButton>
              </Col>
            </Form>
          </Formik>
        </div>
      )}
    </CustomizedModal>
  );
}
