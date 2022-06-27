import { ErrorMessage, useField } from "formik";
import OTPInputReact, { ResendOTP } from "../../../../modules/otp-input";
import {
  MdOutlineChevronLeft,
  MdOutlineTextsms,
  HiOutlineMail,
  RiGoogleLine,
  FiPhoneCall,
} from "react-icons/all";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import InputElement from "../input/Input";

let confirmSource_types = {
  email: {
    label: "کد تایید ایمیل",
    icon: <HiOutlineMail size={18} className="ms-2 text-gray-2" />,
  },
  sms: {
    label: "کد تایید تلفن همراه",
    icon: <MdOutlineTextsms size={18} className="ms-2 text-gray-2" />,
  },
  google: {
    label: "کد تایید Google Authenticator",
    icon: <RiGoogleLine size={18} className="ms-2 text-gray-2" />,
  },
  call: {
    label: "کد تایید تماس صوتی",
    icon: <FiPhoneCall size={18} className="ms-2 text-gray-2" />,
  },
};

export default function OTPInputElement({
  type,
  expiryDate,
  gpClassName,
  onResendClick,
  labelClassName,
  singleInput = false,
  ...props
}) {
  const [{ onChange, ...field }, { error, touched }, { setValue }] =
    useField(props);

  const [expiryTime, setExpiryTime] = useState(0);

  useEffect(() => {
    handleDetectTime();
  }, [expiryDate]);

  const handleDetectTime = () => {
    if (expiryDate > 120) {
      const current = Date.now();
      const difference = expiryDate - current;

      const differenceToSecond = Math.floor(difference / 1000);
      setExpiryTime(differenceToSecond);
    } else {
      setExpiryTime(expiryDate);
    }
  };

  const renderButton = (buttonProps) => {
    return (
      <div
        className="center-content text-blue mt-3 pointer "
        onClick={async () => {
          await setExpiryTime(0);
          onResendClick();
        }}
      >
        <span className="size-5">ارسال مجدد کد </span>
        <MdOutlineChevronLeft size={18} className="me-1" />
      </div>
    );
  };

  const renderTime = (remainingTime) => {
    let minutes, seconds;
    if (remainingTime) {
      minutes = Math.floor(remainingTime / 60);
      seconds = remainingTime - minutes * 60;
    }
    return (
      <div className="size-5 center-content text-blue mt-3 pointer ltr">
        <span>{minutes}</span>
        <span className="mx-1">:</span>
        <span>{seconds}</span>
      </div>
    );
  };

  return (
    <Form.Group className={`position-relative ${gpClassName || "mb-3"} `}>
      <Form.Label
        className={`${labelClassName || ""} size-4 px-1 mb-2`}
        htmlFor={field.name}
      >
        {confirmSource_types[type]?.icon}
        {confirmSource_types[type]?.label}
      </Form.Label>
      <OTPInputReact onChange={setValue} autoFocus {...field} />
      {expiryDate && type !== "google" ? (
        <ResendOTP
          maxTime={expiryTime}
          renderButton={renderButton}
          // onTimerComplete={()=>console.log('aloo')}
          renderTime={renderTime}
        />
      ) : null}
    </Form.Group>
  );
}
