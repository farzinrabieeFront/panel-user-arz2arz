/**internal imports */
import { memo, useState } from "react";
import Styles from "./AmountInput.module.scss";
import { amountFilter } from "./inputFilters";
/**extenal imports */
import { useField } from "formik";
import { Form } from "react-bootstrap";
import { RiErrorWarningLine } from "react-icons/all";
import Num2persian from "num2persian";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
import * as math from "mathjs";
import classNames from "classnames";
import PropTypes, { string } from 'prop-types';
import { propTypes } from "qrcode.react";
import { number } from "mathjs";

function percentFormatter(v) {
    return `${v} %`;
}
const SliderWithTooltip = createSliderWithTooltip(Slider);

function AmountInput({ label, symbol, limit = {},
    isValid, isInvalid, disabled, inputClassName, placeholder,
    sliderVariant, minValue, maxValue, maxDecimal, guidText: GuidText,
    amountString, hiddenSymbolLabel,
    onPaste, onKeyDown, ...props
}) {
    const [{ name, value = 0, ...field }, { error, touched }, { setValue }] =
        useField(props);
    const [perc, setPerc] = useState(0);
    const pasteHandler = (evt) => {
        let clipboardData, pastedData;
        // evt.stopPropagation();

        clipboardData = evt.clipboardData || window.clipboardData;
        pastedData = clipboardData.getData("Text");

        if (!new RegExp(/^[\d.]+$/, "g").test(pastedData)) {
            evt.preventDefault();
        } else if (pastedData.includes(".")) {
            // if (math.larger(pastedData.split(".").length, 2)) {
            //   evt.preventDefault();
            //   let [num, decimals] = pastedData.split(".")

            //   setValue(
            //     pastedData.split(".").slice(0, 2).join(".")
            //   );
            // } else
            // if (math.larger(pastedData.split(".")[1].length, maxDecimal)) {
            evt.preventDefault();
            let [num, decimals] = pastedData.split(".");
            setValue(
                [num, decimals.split("").slice(0, maxDecimal).join("")].join(".")
            );
            // }
        }
        onPaste();
    };

    const keyDownHandler = (evt) => {
        let ASCIICode = evt.which ? evt.which : evt.keyCode;

        if (maxDecimal) {
            let current_value = math.largerEq(Number(evt.key), 0)
                ? [evt.target.value, evt.key].join("")
                : evt.target.value;

            if (current_value.includes(".")) {
                if (!math.smaller(current_value.split(".")[1].length, maxDecimal + 1))
                    evt.preventDefault();
            }
        } else if (ASCIICode === 110 || ASCIICode === 190) {
            evt.preventDefault();
        }

        onKeyDown();
    };

    const inputClasses = classNames(
        inputClassName,
        "en fw-500",
        symbol ? Styles.prependPadding : ""
    );
    const input = (
        <Form.Control
            className={inputClasses}
            type="text"
            inputMode="decimal"
            isInvalid={isInvalid || (error && touched)}
            value={value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
            onKeyPress={amountFilter}
            onKeyDown={keyDownHandler}
            onPaste={pasteHandler}
            {...{
                ...field,
                ...props,
                placeholder,
                isValid,
                disabled,
                name,
            }}
            onChange={(e) => setValue(e.target.value.replaceAll(',', ''))}
        />
    );


    const inputLimit = "label" in limit ?
        <div className="d-flex align-items-center">
            <span className="size-5 text-gray-2 ms-1">{`${limit.label} :`}</span>
            <span
                className="size-5 text-
                gray-4 en pointer"
                onClick={() =>
                    setValue(math.ceil(limit.value || 0, maxDecimal))
                }
            >
                {math.ceil(limit.value || 0, maxDecimal)}
                <span className="text-gray-2 en ms-1">{symbol}</span>
            </span>
        </div>
        : null

    const inputSymbol = symbol ? (
        <span className={Styles.inputPrepend}>
            <span className="text-gray-1 size-5 fw-500">{symbol}</span>
        </span>
    ) : null;

    const slider = (
        <SliderWithTooltip
            {...field}
            tipFormatter={percentFormatter}
            onChange={(val) => {
                setPerc(val)
                const amount = math.floor(
                    math.evaluate(`${maxValue}% * ${val}`),
                    maxDecimal
                );
                setValue(amount.toString());
            }}
            name={name}
            marks={{ 0: "", 25: "", 50: "", 75: "", 100: "" }}
            // min={0}
            // max={100}
            // step={math.evaluate(`(${maxValue} / ${0.00001})`)}
            // step={12}
            // value={perc}
            value={math.smallerEq(Number(value), Number(maxValue)) ?
                math.evaluate(`${value || 0} / (${maxValue}%)`) : 0}
            // dots={true}
            trackStyle={{ backgroundColor: sliderVariant || "#00BABA" }}
            handleStyle={{ borderColor: sliderVariant || "#00BABA" }}
            activeDotStyle={{ borderColor: sliderVariant || "#00BABA" }}
        />
    );

    const subTitle =
        error && touched ? (
            <span className={`${Styles.inputErrorText} text-danger size-5 `}>
                <RiErrorWarningLine size={16} /> {error}
            </span>
        ) : amountString && value ? (
            <Form.Text
                className={`${Styles.inputText} text-gary-2 size-5 px-1 fw-500 text-start`}
            >
                {`${Num2persian(value)} تومان`}
            </Form.Text>
        ) : GuidText ? (
            GuidText
        ) : null;

    return (
        <Form.Group className="position-relative mb-3">
            {label || "label" in limit ? (
                <div className="d-flex justify-content-between px-1 mb-1">
                    {label ? (
                        <Form.Label className="fw-500 size-5 text-gray-3">
                            {label}
                            {hiddenSymbolLabel ? null : (
                                <span className="text-gray-2 me-1 en">{symbol}</span>
                            )}
                        </Form.Label>
                    ) : null}
                    {inputLimit}
                </div>
            ) : null}

            <div className="position-relative">
                {input}

                {inputSymbol}

                {subTitle}
            </div>

            <div className="px-1 mt-4 py-2">{slider}</div>
        </Form.Group>
    );
}

AmountInput.propTypes = {
    label: PropTypes.string,
    symbol: PropTypes.string,
    placeholder: PropTypes.string,
    inputClassName: PropTypes.string,
    sliderVariant: PropTypes.string,
    guidText: PropTypes.string,
    minValue: PropTypes.oneOf([number, string]),
    maxValue: PropTypes.oneOf([number, string]),
    maxDecimal: PropTypes.oneOf([number, string]),
    isValid: PropTypes.bool,
    isInvalid: PropTypes.bool,
    disabled: PropTypes.bool,
    amountString: PropTypes.bool,
    hiddenSymbolLabel: PropTypes.bool,
    limit: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onPaste: PropTypes.func,
    onKeyDown: PropTypes.func,
};

AmountInput.defaultProps = {
    limit: {},
    isValid: false,
    isInvalid: false,
    disabled: false,
    onChange: function (e) { console.log(e.target.value); },
    onBlur: function () { },
    onPaste: function () { },
    onKeyDown: function () { },
}


export default memo(AmountInput);
