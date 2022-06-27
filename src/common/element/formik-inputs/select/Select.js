import { forwardRef, useState } from "react";
import { Form } from "react-bootstrap";
import Styles from "./Select.module.scss";
import Select from "react-select";
import { ErrorMessage, useField } from "formik";

const SelectElement = forwardRef(
  (
    {
      options = [] /** array */,
      isMulti = false /** boolean */,
      isDisabled = false /** boolean */,
      loading = false /** boolean */,
      isClearable = false /** boolean */,
      isRtl = false /** boolean */,
      isSearchable = false /** boolean */,
      readOnly = false /** boolean */,
      label /** string */,
      optionLabel = "label",
      optionValue = "id",
      optionDisable = "isdisabled",
      className,
      labelClassName,
      errorMessage,
      placeholder = "انتخاب کنید ..." /** string */,
      ...props
    },
    ref
  ) => {
    const [
      { value, name, onChange, ...field },
      { error, touched },
      { setValue },
    ] = useField(props);
    return (
      <div className="mb-0">
        {label ? (
          <Form.Label
            className={`me-2 text-regular w-Bold size-5 ${Styles.label}`}
            htmlFor={name}
          >
            {label}
          </Form.Label>
        ) : null}
        <Select
          className={`${Styles.select} size-5 text-gray-4`}
          classNamePrefix="Select"
          {...field}
          options={options}
          placeholder={placeholder}
          name={name}
          value={
          options ? options.find((option) => option.value === value) : ""
          }
          getOptionLabel={(option) => option[optionLabel]}
          getOptionValue={(option) => option[optionValue]}
          isOptionDisabled={(option) => option[optionDisable]}
          onChange={(option) => setValue(option[optionValue])}
          ref={ref}
          isMulti={isMulti}
          // defaultValue={colourOptions[0]}
          isDisabled={isDisabled || readOnly}
          loading={loading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
        />
        {error && touched ? (
          <ErrorMessage
            name={name}
            component={Form.Text}
            className={`${Styles.inputErrorText} text-danger size-5 text-start`}
          />
        ) : null}
      </div>
    );
  }
);
export default SelectElement;
