import React from 'react'
import { Form } from "react-bootstrap";
import Styles from './CheckBox.module.scss';

const CustomizedCheckBox = ({ label, className, checked ,onChange}) => {
    return (
        <Form.Group className={`${className || ""} d-flex align-items-center mb-0`} controlId="formBasicCheckbox">
            <Form.Check className={Styles.formCheck} type="checkbox" label={label} checked={checked} onChange={onChange}/>
        </Form.Group>
    )
}

export default CustomizedCheckBox
