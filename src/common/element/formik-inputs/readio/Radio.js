import { useField } from "formik";
import React from "react";
import { Form } from "react-bootstrap";
import Styles from "./Radio.module.scss"
export default function RadioElement({
  label,
  disabled = false,
  inline = true,
  className,
  ...props
}) {
  const [{ name, value, ...field }, { error, touched }, { setValue }] =
    useField(props);
  return (
    <>
      <Form.Check
        className={`${Styles.input} ${className || ""}`}
        id={label}
        name={name}
        inline={inline}
        disabled={disabled}
        label={label}
        type="radio"
        {...field}
        onChange={(e) => setValue(e.target.id)}
      />
    </>
  );
}
