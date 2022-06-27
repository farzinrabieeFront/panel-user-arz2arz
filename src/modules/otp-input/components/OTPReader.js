import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import useOTP from "../hook/useOTP";

function OTPReader({
  OTPLength,
  className,
  inputClassName,
  value = "",
  inputStyles,
  disabled,
  otpType,
  placeholder,
  secure,
  autoFocus,
  onChange,
}) {
  const {
    activeInput,
    getOtpValue,
    handleonChange,
    handleOnKeyDown,
    handelOnInput,
    onInputFocus,
    handleOnPaste,
  } = useOTP({
    autoFocus,
    value,
    onChange,
    otpType,
    OTPLength,
  });

  const renderInputs = useMemo(() => {
    const otp = getOtpValue();
    const inputs = [];

    for (let index = 0; index < OTPLength; index++) {
      inputs.push(
        <Input
          key={index}
          index={index}
          value={otp[index]}
          className={inputClassName}
          inputStyles={inputStyles}
          disabled={disabled}
          otpType={otpType}
          secure={secure}
          placeholder={placeholder && placeholder[index]}
          autoFocus={autoFocus}
          focus={activeInput === index}
          onChange={handleonChange}
          onKeyDown={handleOnKeyDown}
          onInput={handelOnInput}
          onPaste={handleOnPaste}
          onInputFocus={onInputFocus}
          // onBlur={() => setActiveInput(-1)}
        />
      );
    }

    return inputs;
  }, [
    getOtpValue,
    OTPLength,
    inputClassName,
    inputStyles,
    activeInput,
    handleonChange,
    handleOnKeyDown,
    handelOnInput,
    handleOnPaste,
    onInputFocus,
    disabled,
    autoFocus,
    secure,
    otpType,
    placeholder,
  ]);

  return (
    <div
      className={`${className} ltr`}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {renderInputs}
    </div>
  );
}

OTPReader.prototype = {
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  inputStyles: PropTypes.object,
  OTPLength: PropTypes.number,
  disabled: PropTypes.bool,
  secure: PropTypes.bool,
  autoFocus: PropTypes.bool,
  otpType: PropTypes.oneOf(["number", "alpha", "alphanumeric", "any"]),
  placeholder: PropTypes.array,
};

OTPReader.defaultProps = {
  className: "",
  inputClassName: "",
  OTPLength: 6,
  disabled: false,
  secure: false,
  autoFocus: false,
  inputStyles: {},
  otpType: "any",
  placeholder: undefined,
};

export default OTPReader;
