import { forwardRef } from "react";
import Styles from "./Select.module.scss";
import { Form } from "react-bootstrap";
import { ErrorMessage, useField } from "formik";

//sample={id='',title:'',disabled:false}

const CustomizedSelect = forwardRef(
  (
    {
      label /** string */,
      className,
      labelClassName,
      options /** array */,
      showField = "title" /** string */,
      fieldValue = "id" /** string */,
      isValid /** boolean */,
      isInvalid /** boolean */,
      ...props
    },
    ref
  ) => {
    const [{ name, ...field }, { error, touched }] = useField(props);
    return (
      <Form.Group className={`position-relative mb-0`}>
        {label ? (
          <Form.Label
            className={`${Styles.selectLabel} ${labelClassName}  px-1 size-5   `}
            htmlFor={name}
          >
            {label}
          </Form.Label>
        ) : null}

        <Form.Control
          as="select"
          name={name}
          {...field}
          isValid={isValid}
          isInvalid={isInvalid || (error && touched)}
          className={`${Styles.select} ${className} form-select size-4 `}
        >
          {/* <option value={0}></option> */}
          <option value={0} disabled selected hidden>
            انتخاب
          </option>

          {options[0] instanceof Object
            ? options.map((item) => (
                <option
                  value={item[fieldValue]}
                  key={item[showField]}
                  disabled={item.disabled}
                >
                  {item[showField]}
                </option>
              ))
            : options.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
        </Form.Control>
        <ErrorMessage
          name={name}
          component={Form.Text}
          className={`${Styles.inputErrorText} text-danger size-5 text-start`}
        />
      </Form.Group>
    );
  }
);
export default CustomizedSelect;
