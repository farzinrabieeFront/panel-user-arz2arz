/**intenal imports */
import { useRef, useState } from "react";
import { Toastify } from "../../../../../utils";
import { copyToClipboard } from "../../../../../utils";
import playStore from "../../../../../assets/images/panel-security/googleAuthSteps/dl-play-store.png";
import appStore from "../../../../../assets/images/panel-security/googleAuthSteps/dl-app-store.png";
import Styles from "../../Security.module.scss";
import { otpForm } from "../../formValidation";
import { useMainApi } from "../../../../../common/hooks";
/**external imports */
import { Formik, Form, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import {
  HiOutlineChevronLeft,
  IoCheckboxOutline,
  IoIosArrowForward,
  HiOutlineCheck,
  MdContentCopy,
} from "react-icons/all";
import QRCode from "qrcode.react";
/**component imports */
import OTPInputElement from "../../../../../common/element/formik-inputs/otp-input/OTPInput";
import GoogleAuthSteps from "./activation-google-stepbar/GoogleAuthSteps";
import CustomizedButton from "../../../../../components/form/button/Button";
import CustomizedModal from "../../../../../components/modal/Modal";

const activationSteps = {
  downloadApp: 1,
  qrCode: 2,
  backup: 3,
  activate: 4,
};

export default function ActivationGoogleAuthenticator({
  show,
  onHide,
  refreshUserData,
}) {
  const { urls, get, post } = useMainApi()
  const [activeStep, setActiveStep] = useState(1);
  const [secretCode, setSecretCode] = useState("");

  async function activationHanler() {
    try {
      const _url = urls.Activation2FA.replace('_type', 'google')
      const res = await get(_url);
      setSecretCode({
        secret: res.secret,
        otpauth_url: res.otpauth_url
      });
      setActiveStep((prev) => prev + 1);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function verifyActivition(_body) {
    try {
      const _url = urls.Activation2FA.replace('_type', 'google')
      const { message } = await post(_url, _body);
      Toastify.success(message);
      setActiveStep(1);
      refreshUserData();
    } catch (error) {
      Toastify.error(error.message);
    } finally {
      onHide();
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case activationSteps.downloadApp:
        return <DownloadApp next={activationHanler} />;

      case activationSteps.qrCode:
        return (
          <ShowSecretCode
            next={() => setActiveStep((prev) => prev + 1)}
            prev={() => setActiveStep((prev) => prev - 1)}
            secretCode={secretCode}
          />
        );

      case activationSteps.backup:
        return (
          <BackupSecretCode
            next={() => setActiveStep((prev) => prev + 1)}
            prev={() => setActiveStep((prev) => prev - 1)}
            secretCode={secretCode}
          />
        );

      case activationSteps.activate:
        return (
          <VerifyActivationCode
            next={verifyActivition}
            prev={() => setActiveStep((prev) => prev - 1)}
          />
        );

      default:
        onHide();
        break;
    }
  };

  return (
    <CustomizedModal
      className={Styles.googleModal}
      bodyClassName="p-3"
      {...{ show, onHide }}
      title="فعال کردن کد تایید Google Authenticator"
    >
      <div className="mb-8 d-none d-md-block">
        <GoogleAuthSteps currentstep={activeStep} />
      </div>

      <div className="size-4 text-center">
        <span className="text-blue fw-500">
          {`مرحله ${(activeStep == 1 && "اول") ||
            (activeStep == 2 && "دوم") ||
            (activeStep == 3 && "سوم") ||
            (activeStep == 4 && "چهارم")
            }:`}
        </span>
        <br />

        {renderStepContent()}
      </div>
    </CustomizedModal>
  );
}

const DownloadApp = ({ next }) => {
  return [
    <Col xs="9" className="mt-2 mx-auto lmb-2">
      <p className="text-center text-gray-4 mb-0">
        برای فعال کردن کد تایید Google Authenticator ابتدا اپلیکیشن رو دانلود
        کن.
      </p>
    </Col>
    ,
    <div className="d-flex w-100 justify-content-center">
      <a
        className={`${Styles.dlAppImg} mx-2 d-inline-block`}
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
        target="_blank"
      >
        <img src={playStore} width={185} height={64} alt="play-store" />
      </a>
      <a
        className={`${Styles.dlAppImg} mx-2 d-inline-block`}
        target="_blank"
        href="https://apps.apple.com/us/app/google-authenticator/id388497605"
      >
        <img src={appStore} width={185} height={64} alt="app-store" />
      </a>
    </div>
    ,
    <Row className="mt-5">
      <Col sm="5" xs="7" className="mx-auto">
        <CustomizedButton
          isFullWidth
          leftIcon={<HiOutlineChevronLeft size={22} />}
          className="size-3 py-2 minHeight-auto fw-700"
          size="lg"
          variant="blue"
          onClick={() => {
            next();
          }}
        >
          مرحله بعدی
        </CustomizedButton>
      </Col>
    </Row>
  ]
};

const ShowSecretCode = ({ next, prev, secretCode }) => {
  const [copied, setCopied] = useState();
  return [
    <Col xs="9" className="mt-2 mx-auto mb-3">
      <p className="text-gray-4 mb-0 text-center ">
        بارکد زیر رو از طریق اپلیکیشن Google Authenticator اسکن کرده یا کد رو
        به صورت دستی وارد کن.
      </p>
    </Col>
    ,
    <Col xs={12} className="mb-3 text-center">
      <div
        className={`${Styles.qrCode} d-inline-flex bordered p-2 rounded-12`}
      >
        <QRCode value={secretCode.otpauth_url} />
      </div>
    </Col>
    ,
    <Col xs={10} className="my-3 mx-auto">
      <div className="form-control readonly d-flex align-items-center justify-content-between">
        <span className={`${Styles.address} text-gray-4 en size-4 fw-500`}>
          {secretCode.secret}
        </span>
        <span className={Styles.icon}>
          {copied ? (
            <IoCheckboxOutline
              size={18}
              className={`${copied ? Styles.copied : ""} text-blue pointer`}
            />
          ) : (
            <MdContentCopy
              size={18}
              className={`${copied ? Styles.copied : ""} text-gray-3 pointer`}
              onClick={() => {
                copyToClipboard(secretCode.secret);
                setCopied(true);
              }}
            />
          )}
        </span>
      </div>
    </Col>
    ,
    <Row className="mt-5 justify-content-between justify-content-md-center position-relative">
      <span
        className={`${Styles.prevNextBtn} text-gray-3 d-inline-flex align-items-center py-2`}
        onClick={() => {
          prev();
        }}
      >
        <IoIosArrowForward size={18} className="ms-2" />
        <span className="size-5 fw-500">مرحله قبل</span>
      </span>
      <Col sm="5" xs="7">
        <CustomizedButton
          isFullWidth
          leftIcon={<HiOutlineChevronLeft size={22} />}
          className="size-3 py-2 minHeight-auto fw-700"
          size="lg"
          variant="blue"
          onClick={() => {
            next();
          }}
        >
          مرحله بعدی
        </CustomizedButton>
      </Col>
    </Row>
  ]
};

const BackupSecretCode = ({ next, prev, secretCode }) => {
  const [copied, setCopied] = useState(false);

  return [
    <Col xs="9" className="mt-2 mx-auto mb-4">
      <p className="text-gray-4 mb-0 text-center ">
        کد زیر رو یک جای امن یادداشت کن!
        <br /> داشتن این کد باعث میشه در صورت گم شدن تلفن همراه،
        <br /> اپلیکیشن Google Authenticator خودت رو بازیابی کنی.
      </p>
    </Col>
    ,
    <Col xs={10} className="mb-3 mx-auto">
      <div className="form-control readonly d-flex align-items-center justify-content-between">
        <span className={`${Styles.address} text-gray-4 en size-4 fw-500`}>
          {secretCode.secret}
        </span>
        <span className={Styles.icon}>
          {copied ? (
            <IoCheckboxOutline
              size={18}
              className={`${copied ? Styles.copied : ""} text-blue pointer`}
            />
          ) : (
            <MdContentCopy
              size={18}
              className={`${copied ? Styles.copied : ""} text-gray-3 pointer`}
              onClick={() => {
                copyToClipboard(secretCode.secret);
                setCopied(true);
              }}
            />
          )}
        </span>
      </div>
    </Col>
    ,
    <Row className="mt-5 justify-content-between justify-content-md-center position-relative">
      <span
        className={`${Styles.prevNextBtn} text-gray-3 d-inline-flex align-items-center py-2`}
        onClick={() => {
          prev();
        }}
      >
        <IoIosArrowForward size={18} className="ms-2" />
        <span className="size-5 fw-500 ">مرحله قبل</span>
      </span>
      <Col sm="5" xs="7">
        <CustomizedButton
          isFullWidth
          leftIcon={<HiOutlineChevronLeft size={22} />}
          className="size-3 py-2 minHeight-auto fw-700"
          size="lg"
          variant="blue"
          onClick={() => {
            next();
          }}
        >
          مرحله بعدی
        </CustomizedButton>
      </Col>
    </Row>
  ]
};

const VerifyActivationCode = ({ next, prev }) => {
  const formikRef = useRef(null);
  return [
    <Col xs="9" className="mt-2 mx-auto mb-4">
      <p className="text-gray-4 mb-0 text-center ">
        کد تایید 6 رقمی Google Authenticator رو وارد کن.
      </p>
    </Col>
    ,
    <Formik
      innerRef={formikRef}
      validationSchema={otpForm}
      initialValues={{
        otpText: "",
      }}
    >
      <Form
        className={
          "pt-2 d-flex flex-wrap justify-content-center align-items-end"
        }
      >
        <Col sm={8} xs={12} className="my-2">
          <Field as={OTPInputElement} name="otpText" type="google" />
        </Col>
      </Form>
    </Formik>
    ,
    <Row className="mt-4 justify-content-between justify-content-md-center position-relative">
      <span
        className={`${Styles.prevNextBtn} text-gray-3 d-inline-flex align-items-center py-2`}
        onClick={() => {
          prev();
        }}
      >
        <IoIosArrowForward size={18} className="ms-2" />
        <span className="size-5 fw-500">مرحله قبل</span>
      </span>
      <Col sm="5" xs="7">
        <CustomizedButton
          isFullWidth
          className="size-3 py-2 minHeight-auto fw-700"
          rightIcon={<HiOutlineCheck size={22} />}
          size="lg"
          variant="blue"
          onClick={() => {
            next(formikRef.current.values);
          }}
        >
          فعال کردن{" "}
        </CustomizedButton>
      </Col>
    </Row>
  ]
};
