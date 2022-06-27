/**internal imports */
import { memo, useRef } from "react";
import Styles from "./RadioInput.module.scss";
/**extenal imports */
import { useField } from "formik";
import { Form } from "react-bootstrap"
import PropTypes from 'prop-types';
import classNames from 'classnames';



const RadioInput = ({ label, inputClassName, disabled, inline, labelValue,
    noError, type, isValid, isInvalid, ...props }) => {
    const [
        { value, name, onChange, ...field }, ,
        { setValue },
    ] = useField(props);
    const RadioInputRef = useRef();

    const inputClasses = classNames(inputClassName, Styles.input,
        value === labelValue ? Styles.active : "");
    const input = <Form.Check
        ref={RadioInputRef}
        className={inputClasses}
        id={label}
        checked={value === labelValue}
        onChange={() => setValue(labelValue)}
        {...{
            type,
            label,
            inline,
            disabled,
            name,
            isValid,
            isInvalid
        }}
    />


    return input
}

RadioInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    label: PropTypes.string,
    labelValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    inputClassName: PropTypes.string,
    type: PropTypes.oneOf(['radio', 'checkbox', 'switch']),
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    noError: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

RadioInput.defaultProps = {
    name: 'input',
    value: '',
    label: '',
    type: 'radio',
    labelValue: '',
    inputClassName: '',
    disabled: false,
    inline: false,
    noError: true,
    isValid: false,
    isInvalid: false,
    onChange: function (e) { console.log(e.target.value); },
    onBlur: function () { },

}


export default memo(RadioInput)