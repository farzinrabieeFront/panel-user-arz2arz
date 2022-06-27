import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useField } from "formik";
import { RiCalendarLine, RiErrorWarningLine } from "react-icons/all";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Form } from "react-bootstrap";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition";
import InputIcon from "react-multi-date-picker/components/input_icon";
// import "react-multi-date-picker/styles/colors/purple.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import Styles from "./Datepicker.module.scss";

export default function DatepickerElement({
  label = "",
  className,
  labelClassName,
  timePicer,
  readOnly = false,
  disabled = false,
  range = false,
  editable = false,
  hideOnScroll = true,
  small,
  ...props
}) {
  const [
    { name, value, onChange, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);
  const [initialDate, setInitialDate] = useState();

  useEffect(() => {
    !initialDate && setInitialDate(new Date(value));
  }, []);

  return (
    <div>
      {label ? (
        <Form.Label
          className={` me-2 text-regular w-Bold size-5 ${Styles.label}`}
          htmlFor={name}
        >
          {label}
        </Form.Label>
      ) : null}
      <div className="position-relative d-flex align-items-center">
        <DatePicker
          {...field}
          name={name}
          title={name}
          value={range ? [new Date(value[0]), new Date(value[1])] : initialDate}
          onChange={(val) => {
            if (range) {
              setValue([
                new Date(val[0]).toISOString(),
                new Date(val[1]).toISOString(),
              ]);
            } else {
              setValue(new Date(val).toISOString().split("T")[0]);
            }
          }}
          locale={persian_fa}
          calendar={persian}
          calendarPosition="bottom-right"
          // className="purple"
          inputClass={`${Styles.datePicker} ${small ? Styles.small : ""} ${
            error && touched ? Styles["is-invalid"] : ""
          }`}
          digits={true}
          plugins={timePicer ? [<TimePicker position="bottom" />] : null}
          containerClassName="w-100"
          // animations={[
          //   transition({
          //     from: 35,
          //     transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
          //   }),
          // ]}
          readOnly={readOnly}
          disabled={disabled}
          range={range}
          hideOnScroll={hideOnScroll}
          editable={editable}
          // onOpen
          // onClose
        />
        <span
          className={`${Styles.icon} ${
            error && touched ? "text-danger" : "text-gray-3"
          }  `}
        >
          <RiCalendarLine size={18} />
        </span>
        {error && touched ? (
          <span className={`${Styles.inputErrorText} text-danger size-5 `}>
            <RiErrorWarningLine size={16} /> {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}
