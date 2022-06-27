import { forwardRef } from "react";
import Styles from "./CustomizedSwitch.module.scss";
import { Form } from "react-bootstrap";

function CustomizedSwitch({ label, checked, className, id, handleChange, ...rest }, ref) {
    return (
        <Form.Switch
            type="switch"
            id={id}
            label={label}
            className={`${Styles.switch} ${className || ""}`}
            onChange={handleChange}
            checked={checked}
        />
    );
}
export default forwardRef(CustomizedSwitch)