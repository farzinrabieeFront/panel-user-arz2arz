import { useField } from "formik";
import { Form } from "react-bootstrap";
import Styles from "./CheckBox.module.scss";

export default function CheckBoxElement({
  id,
  label: Label,
  className,
  ...props
}) {
  const [{ name, value, ...field }, { error, touched }, { setValue }] =
    useField(props);
  // console.log(value);
  return (
    <Form.Group
      className={`${className || ""} d-flex align-items-center mb-0`}
      controlId="formBasicCheckbox"
    >
      <Form.Check
        className={Styles.formCheck}
        type="checkbox"
        label={Label}
        id={id}
        checked={value}
        name={name}
        {...field}
      />
    </Form.Group>
  );
}
