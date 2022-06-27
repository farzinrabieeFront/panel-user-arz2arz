/** package imports */
import { forwardRef, useState } from "react";
import { Form } from "react-bootstrap";
import { IoMdEyeOff, IoMdEye, RiErrorWarningLine } from "react-icons/all";
import { ErrorMessage, useField } from "formik";
import Num2persian from "num2persian";
/** internal imports */
import Styles from "./Input.module.scss";
import { mobileFilter, amountFilter } from "./inputFilters";
import ContentLoader, { Facebook, Rect } from "react-content-loader";

const InputElement = forwardRef(
  (
    {
      label /** string */,
      type /** string */,
      className,
      labelClassName,
      guidText: GuidText /** string */,
      autocomplete /** boolean */,
      currencyFormat /** boolean */,
      textArea /** boolean */,
      isValid /** boolean */,
      isInvalid /** boolean */,
      amountString /** boolean */,
      disabled = false /** boolean */,
      dataLoading = false /** boolean */,
      gpClassName,
      preIcon,
      prepend,
      tradeInput,
      fakeValue,
      ...props
    },
    ref
  ) => {
    const [{ name, value, ...field }, { error, touched }, { setValue }] =
      useField(props);
    /** states */
    const [isShowPass, setIsShowPass] = useState(false);

    return (
      <Form.Group className={`position-relative ${gpClassName || "mb-3"} `}>
        {label ? (
          <Form.Label
            className={`${Styles.inputLabel} ${labelClassName}`}
            htmlFor={name}
          >
            {label}
          </Form.Label>
        ) : null}

        <div className="position-relative">
          {preIcon ? <i className={Styles.preIcon}>{preIcon}</i> : null}
          <Form.Control
            className={`${className || ""} ${tradeInput ? Styles.trade : ""} ${
              prepend ? Styles.prependPadding : ""
            } ${preIcon ? Styles.preIconPadding : ""} 
                ${fakeValue ? Styles.hasFakeValue : null}
                `}
            type={
              type === "password" ? (isShowPass ? "text" : "password") : type
            }
            name={name}
            ref={ref}
            isValid={isValid}
            isInvalid={isInvalid || (error && touched)}
            autoComplete={autocomplete ? "on" : "off"}
            as={textArea && "textarea"}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            value={value}
            {...props}
          />

          {fakeValue ? fakeValue : null}

          {prepend ? (
            <span className={Styles.inputPrepend}>{prepend}</span>
          ) : null}

          {type === "password" ? (
            <span
              className={`${Styles.inputPrepend} ${Styles.password} text-gray-2`}
              onClick={() => setIsShowPass(!isShowPass)}
            >
              {isShowPass ? <IoMdEye size={20} /> : <IoMdEyeOff size={20} />}
            </span>
          ) : null}
        </div>

        {error && touched ? (
          <span className={`${Styles.inputErrorText} text-danger size-5`}>
            <RiErrorWarningLine size={16} /> {error}
          </span>
        ) : amountString && value ? (
          <Form.Text
            className={`${Styles.inputText} text-gary-2 size-5 px-1 fw-500 text-start`}
          >
            {/* {`${Num2persian(value.replaceAll(",", ""))} تومان`} */}
            {`${Num2persian(value)} تومان`}
          </Form.Text>
        ) : GuidText ? (
          GuidText
        ) : null}
      </Form.Group>
    );
  }
);

export default InputElement;
export { mobileFilter, amountFilter };
