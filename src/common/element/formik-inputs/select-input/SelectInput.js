/**internal imports */
import { memo, useRef } from "react";
import Styles from "./SelectInput.module.scss";
/**extenal imports */
import Select from "react-select";
import { useField } from "formik";
import { Form } from "react-bootstrap";
import { IoMdClose, RiErrorWarningLine, FiChevronDown } from "react-icons/all";
import PropTypes, { bool } from "prop-types";
import classNames from "classnames";

const SelectInput = ({
  label,
  options,
  placeholder,
  inputClassName,
  styles,
  maxMenuHeight,
  optionLabel,
  optionValue,
  optionDisable,
  formatOptionLabel,
  noOptionsMessage,
  isClearable,
  isDisabled,
  isLoading,
  isRtl,
  isMulti,
  isSearchable,
  hideSelectedOptions,
  menuIsOpen,
  onDisable,
  onKeyDown,
  onMenuOpen,
  components,
  ...props
}) => {
  const [
    { value, name, onChange, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);
  const selectInputRef = useRef();

  const CustomComponents = {
    ClearIndicator: () => (
      <IoMdClose className="fw-Bold pointer" onClick={() => setValue("")} />
    ),
    DropdownIndicator: () => (
      <FiChevronDown className="mx-2 pt-1 text-gray-2" size={25} />
    ),
    ...components,
  }; // Input

  const inputClasses = classNames(inputClassName, "select-input");
  const input = (
    <Select
      ref={selectInputRef}
      value={
        options && value
          ? options.find((option) => option[optionValue] === value)
          : ""
      }
      onChange={(option) => setValue(option[optionValue])}
      options={options || []}
      getOptionLabel={(option) => option[optionLabel]}
      getOptionValue={(option) => option[optionValue]}
      isOptionDisabled={(option) =>
        onDisable ? onDisable(option) : option[optionDisable]
      }
      classNamePrefix="select-input"
      className={inputClasses}
      onMenuOpen={onMenuOpen}
      styles={styles}
      hideSelectedOptions={hideSelectedOptions}
      components={CustomComponents}
      {...{
        name,
        placeholder,
        isRtl,
        isMulti,
        isSearchable,
        isClearable,
        isDisabled,
        isLoading,
        maxMenuHeight,
        formatOptionLabel,
        noOptionsMessage,
        onKeyDown,
        menuIsOpen,
      }}
    />
  );

  return (
    <Form.Group>
      <div
        className={classNames(
          "d-flex",
          "justify-content-between",
          "align-items-center",
          "mb-1",
          "px-2"
        )}
      >
        {label ? (
          <Form.Label className={classNames(Styles.label)} htmlFor={name}>
            {label}
          </Form.Label>
        ) : null}
      </div>

      {input}

      {error && touched ? (
        <span className={classNames(Styles.inputErrorText)}>
          <RiErrorWarningLine size={16} /> {error}
        </span>
      ) : null}
    </Form.Group>
  );
};

SelectInput.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  optionLabel: PropTypes.string,
  optionValue: PropTypes.string,
  optionDisable: PropTypes.string,
  maxMenuHeight: PropTypes.number,
  // isValid: PropTypes.bool,
  // isInvalid: PropTypes.bool,
  isDisabled: PropTypes.bool,
  hideSelectedOptions: PropTypes.bool,
  isClearable: PropTypes.bool,
  isLoading: PropTypes.bool,
  isRtl: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  menuIsOpen: PropTypes.oneOfType([PropTypes.bool, undefined]),
  hideSelectedOptions: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  filterOption: PropTypes.func,
  onChange: PropTypes.func,
  onDisable: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  formatOptionLabel: PropTypes.node,
};

SelectInput.defaultProps = {
  options: [],
  name: "input",
  value: "",
  inputClassName: "",
  placeholder: "",
  optionLabel: "label",
  optionValue: "value",
  optionDisable: "disable",
  maxMenuHeight: 250,
  isDisabled: false,
  isLoading: false,
  isRtl: false,
  hideSelectedOptions: false,
  isSearchable: false,
  isClearable: false,
  hideSelectedOptions: false,
  isMulti: false,
  menuIsOpen: undefined,
  // isValid: false,
  // isInvalid: false,
  filterOption: function () {},
  noOptionsMessage: function () {},
  onChange: function (e) {
    console.log(e.target.value);
  },
  onDisable: function () {},
  onBlur: function () {},
  onKeyDown: function () {},
};

export default memo(SelectInput);
