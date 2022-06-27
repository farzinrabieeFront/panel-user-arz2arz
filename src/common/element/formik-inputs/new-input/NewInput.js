/**internal imports */
import { memo, useState } from 'react';
import Styles from './NewInput.module.scss';
import { amountFilter } from './inputFilters';
/**extenal imports */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Num2persian from 'num2persian';
import { Form } from 'react-bootstrap';
import { useField } from 'formik';
import { IoMdEyeOff, IoMdEye, RiErrorWarningLine } from "react-icons/all";

function NewInput({ label, placeholder, isValid, isInvalid, type, autoComplete, unit,
    digit, disabled, inputClassName, guide: Guide, limit: Limit, preIcon,
    symbol, onPaste, onKeyDown, ...props }) {

    const [{ name, value, onChange, ...field }, { error, touched }, { setValue }] =
        useField(props);

    const [isShowPass, setIsShowPass] = useState(false);

    const keyPressHandler = (evt) => {
        if (digit) amountFilter(evt)
    }

    const pasteHandler = (evt) => {
        let clipboardData, pastedData;
        evt.stopPropagation();//546532.65241dddd

        clipboardData = evt.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData("Text");
        if (digit) {
            if (!new RegExp(/^[\d.]+$/, "g").test(pastedData)) {
                evt.preventDefault();
            }
            if (unit === 'IRT') {
                if (!new RegExp(/^[\d]+$/, "g").test(pastedData)) {
                    evt.preventDefault();
                    setValue(pastedData.split(".")[0]);
                }
            }
        }

        onPaste()
    }

    const keyDownHandler = (evt) => {
        let ASCIICode = evt.which ? evt.which : evt.keyCode;

        if (unit === 'IRT') {
            if (ASCIICode === 110 || ASCIICode === 190) {
                evt.preventDefault();
            }
        }

        onKeyDown()
    }


    const inputClasses = classNames(inputClassName, { 'pe-5': preIcon });
    const input =
        <Form.Control
            type={type === "password" ? (isShowPass ? "text" : "password") : type}
            className={inputClasses}
            value={digit ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : value}
            isInvalid={isInvalid || (error && touched)}
            onChange={(e) => setValue(e.target.value.replaceAll(',', ''))}
            onKeyPress={keyPressHandler}
            onPaste={pasteHandler}
            onKeyDown={keyDownHandler}
            {...{
                ...field,
                ...props,
                autoComplete,
                placeholder,
                isValid,
                disabled,
                name,
            }}
        />


    return (
        <Form.Group className="mb-3">
            <div className={classNames('d-flex', 'justify-content-between', 'align-items-center', 'mb-2', 'px-1')}>
                {label ? <Form.Label className={classNames(Styles.label)} htmlFor={name}>{label}</Form.Label> : null}
                {Limit ? Limit : null}
            </div>

            <div className={classNames('position-relative', 'mb-4')}>
                <div className={classNames('position-relative')}>
                    {input}

                    {unit &&
                        unit === 'IRT' ?
                        <i className={classNames(Styles.unit, 'text-gray-2')}>تومان</i> :
                        <i className={classNames(Styles.unit, 'pt-1', 'text-gray-1')}>{unit}</i>}

                    {preIcon && <i className={classNames(Styles.preIcon, 'text-gray-2')}>{preIcon}</i>}

                    {type !== "password" ? null :
                        isShowPass ?
                            <i className={classNames(Styles.passwordIcon, 'text-gray-2')}
                                onClick={() => setIsShowPass(false)}><IoMdEye size={25} /></i> :
                            <i className={classNames(Styles.passwordIcon, 'text-gray-2')}
                                onClick={() => setIsShowPass(true)}><IoMdEyeOff size={25} /></i>}

                </div>

                {error && touched ?
                    <span className={classNames(Styles.inputErrorText)}>
                        <RiErrorWarningLine size={16} />   {error}
                    </span>
                    : unit && value ?
                        <span className={classNames(Styles.amountText, 'size-5', 'text-start')}>
                            {`${Num2persian(value)} ${unit === 'IRT' ? 'تومان' : unit}`}
                        </span>
                        : Guide ? Guide : null}
            </div>
        </Form.Group>
    );
};

NewInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    inputClassName: PropTypes.string,
    unit: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    symbol: PropTypes.string,
    autoComplete: PropTypes.oneOf(['off', 'on']),
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    disabled: PropTypes.bool,
    digit: PropTypes.bool,
    guide: PropTypes.node,
    limit: PropTypes.node,
    preIcon: PropTypes.node,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onPaste: PropTypes.func,
    onKeyDown: PropTypes.func,

};

NewInput.defaultProps = {
    name: 'test',
    value: '',
    inputClassName: '',
    type: 'text',
    unit: '',
    placeholder: '',
    isValid: false,
    isInvalid: false,
    disabled: false,
    digit: false,
    autoComplete: 'off',
    onChange: function (e) { console.log(e.target.value); },
    onBlur: function () { },
    onPaste: function () { },
    onKeyDown: function () { },
}

export default memo(NewInput);

//as={textArea && "textarea"}