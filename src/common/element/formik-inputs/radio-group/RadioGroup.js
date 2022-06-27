import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import { RiErrorWarningLine } from "react-icons/all";
import Styles from "./RadioGroup.module.scss";

export default function RadioGroupElement({
  label,
  radioClassName = "",
  labelClassName = "",
  list = [],
  inline = false,
  columnClassName,
  noError,
  ...props
}) {
  const [{ name, value, onChange }, { error, touched }, { setValue }] =
    useField(props);

  return [
    label ? (
      <label className={`${labelClassName} fw-500 size-5 w-100 me-1`}>
        {label}
      </label>
    ) : null,
    list.map((item, i) => (
      <div className={`${columnClassName || ""}`}>
        <Form.Check
          className={`${Styles.input} ${radioClassName || ""} ${
            value === item.value ? Styles.active : ""
          }
               ${!noError && error && touched ? Styles.isInvalid : ""}`}
          id={item.label}
          name={name}
          inline={inline}
          disabled={item.disabled}
          label={item.label}
          type="radio"
          checked={value === item.value}
          onChange={() => setValue(item.value)}
        />
      </div>
    )),
    !noError && error && touched ? (
      <span className={`${Styles.inputErrorText} text-danger size-5 `}>
        <RiErrorWarningLine size={16} /> {error}
      </span>
    ) : null,
  ];
}
