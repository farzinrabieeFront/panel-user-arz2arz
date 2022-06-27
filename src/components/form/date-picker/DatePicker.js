import {forwardRef } from "react";
import Styles from "./DatePicker.module.scss";
import { Form } from "react-bootstrap";
import { DatePicker } from "jalali-react-datepicker";
import { convertIntoTimeStamp } from "../../../utils/dateFuncs";
import { AiOutlineCalendar } from "react-icons/ai";

const CustomizedDatePicker = forwardRef(
  (
    {
      label = "",
      icon: Icon,
      classLabel = "",
      onChange = () => false,
      errorMessage,
      className,
      timeStamp,
      size='',
    },
    ref
  ) => {
    return (
      <>
        <Form.Group className={`${className} mb-0 DatePicker position-relative`}>
          {/* {label ? (
            <Form.Label className={classLabel}>
              {Icon ? <Icon /> : null}
              {label}
            </Form.Label>
          ) : (
            ""
          )} */}
          <DatePicker
            className={`${Styles.CustomizedDatePicker} text-black fw-700 size-4  w-100 `}
            label={label}
            
            ref={ref}
            onClickSubmitButton={(date) =>
              onChange(
                timeStamp ? convertIntoTimeStamp(date.value._d) : date.value._d
              )
            }
            timePicker={false}
          />
          <span className={`${Styles.icon} text-gray-1 `}>
            <AiOutlineCalendar size={25}/>
          </span>
          {errorMessage ? (
            <Form.Text className="text-danger">{errorMessage}</Form.Text>
          ) : null}
        </Form.Group>
      </>
    );
  }
);
export default CustomizedDatePicker;
