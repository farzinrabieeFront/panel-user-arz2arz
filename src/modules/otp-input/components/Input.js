import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const inputDefaultStyles = {
  width: '15%',
  height: 'auto',
  textAlign: "center",
  minHeight: 48,
  maxWidth: 60,
  direction : 'ltr',
};

function Input({
  focus,
  autoFocus,
  disabled,
  value,
  onInputFocus,
  index,
  secure,
  inputStyles,
  otpType,
  ...rest
}) {
  const input = useRef(null);
  const componentMounted = useRef(false);

  useEffect(() => {
    if (autoFocus && focus) {
      input.current.focus();
    }
  }, []);

  useEffect(() => {
    if (componentMounted.current && focus) {
      input.current.focus();
    }
    componentMounted.current = true;
  }, [focus]);

  const handelInputFocus = (event) => onInputFocus(index, event);

  let inputType = "tel";
  if (secure) {
    inputType = "password";
  } else if (otpType === "number") {
    inputType = "tel";
  }

  return (
    <input
      style={{ ...inputDefaultStyles, ...inputStyles }}
      type={inputType}
      maxLength="1"
      ref={input}
      disabled={disabled}
      onFocus={handelInputFocus}
      value={value || ""}
      {...rest}
    />
  );
}

Input.propTypes = {
  inputStyles: PropTypes.object,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  secure: PropTypes.bool,
  onChange: PropTypes.func,
  index: PropTypes.number.isRequired,
  numInputs: PropTypes.number,
  autoFocus: PropTypes.bool,
  focus: PropTypes.bool,
  otpType: PropTypes.oneOf(["number", "alpha", "alphanumeric", "any"]),
};

export default React.memo(Input);
