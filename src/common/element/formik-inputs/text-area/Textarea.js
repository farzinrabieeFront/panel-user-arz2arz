/**internal imports */
import { forwardRef } from "react";
import Styles from "./Textarea.module.scss";
/**extenal imports */
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from "formik";
import TextareaAutosize from "react-textarea-autosize";
import classNames from "classnames";



const TextArea = ({ label, inputClassName, ...props }, ref) => {
  const [{ name, value, onChange, ...field }, { error, touched }, { setValue }] =
    useField(props);


  let inputClasses = classNames(inputClassName, Styles.textArea);
  const input = <TextareaAutosize
    className={inputClasses}
    name={name}
    ref={ref}
    {...props}
  />

  return input
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  isValid: PropTypes.bool,
  isInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
  guide: PropTypes.node,
  limit: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onPaste: PropTypes.func,
  onKeyDown: PropTypes.func,
};

TextArea.defaultProps = {
  name: 'test',
  value: '',
  inputClassName: '',
  placeholder: '',
  isValid: false,
  isInvalid: false,
  disabled: false,
  onChange: function (e) { console.log(e.target.value); },
  onBlur: function () { },
  onPaste: function () { },
  onKeyDown: function () { },
}

export default forwardRef(TextArea);
