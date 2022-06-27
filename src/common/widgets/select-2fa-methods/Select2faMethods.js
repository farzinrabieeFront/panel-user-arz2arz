import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Styles from "./Select2faMethods.module.scss";
import SmsEnableIcon from "../../../assets/svgs/2fa-methods/enable-small-sms.svg";
import SmsDisableIcon from "../../../assets/svgs/2fa-methods/disable-small-sms.svg";
import GoogleEnableIcon from "../../../assets/svgs/2fa-methods/enable-small-google.svg";
import GoogleDisableIcon from "../../../assets/svgs/2fa-methods/disable-small-google.svg";
import EmailEnableIcon from "../../../assets/svgs/2fa-methods/enable-small-email.svg";
import EmailDisableIcon from "../../../assets/svgs/2fa-methods/disable-small-email.svg";
import CallEnableIcon from "../../../assets/svgs/2fa-methods/enable-small-call.svg";
import CallDisableIcon from "../../../assets/svgs/2fa-methods/disable-small-call.svg";
import { useState } from "react";
import { useEffect } from "react";
import CustomizedButton from "../../../components/form/button/Button";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

let data = {
  sms: {
    title: "پیامک",
    checked: false,
    enable_icon: SmsEnableIcon,
    disable_icon: SmsDisableIcon,
  },
  call: {
    title: "تماس",
    checked: false,
    enable_icon: CallEnableIcon,
    disable_icon: CallDisableIcon,
  },
  email: {
    title: "ایمیل",
    checked: false,
    enable_icon: EmailEnableIcon,
    disable_icon: EmailDisableIcon,
  },
  google: {
    title: "رمزساز گوگل",
    checked: false,
    enable_icon: GoogleEnableIcon,
    disable_icon: GoogleDisableIcon,
  },
};

export default function Select2faMethods({
  onChange,
  isMulti = false,
  loading,
  onSubmit,
}) {
  const navigate = useNavigate();
  const { twoFactorAuthentication } = useSelector(
    (state) => state.user.customer
  );
  const [dataMethods, setDataMethods] = useState(data);
  const [selectedList, setSelectedList] = useState([]);
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    let active_methods_array = [];
    for (const key in twoFactorAuthentication) {
      let { enabled } = twoFactorAuthentication[key];

      if (enabled) active_methods_array.push(key);
    }

    if (isMulti)
      if (active_methods_array.length > 1) setEnableSubmit(true);
      else setEnableSubmit(false);
    else if (active_methods_array.length > 0) setEnableSubmit(true);
    else setEnableSubmit(false);
  }, [twoFactorAuthentication]);

  useEffect(() => {
    let selected_methods = [];

    for (const key in dataMethods) {
      let { checked } = dataMethods[key];

      if (checked) selected_methods.push(key);
    }

    setSelectedList(selected_methods);
  }, [dataMethods]);

  const handleChangeSelectedmethods = (method) => {
    let current_data = { ...dataMethods };

    if (!isMulti && selectedList.length > 0)
      current_data[selectedList[0]].checked =
        !current_data[selectedList[0]].checked;

    current_data[method].checked = !current_data[method].checked;
    setDataMethods(current_data);
  };

  const renderMethods = () => {
    let methods = [];

    for (const key in twoFactorAuthentication) {
      let { enabled } = twoFactorAuthentication[key];

      methods.push(
        <li
          key={key}
          className={`${Styles.methodItem} ${
            enabled ? "bg-white" : "text-gray-2"
          } my-3 px-3 pointer`}
          htmlFor={`${key}-method`}
          onClick={() => {
            if (enabled) {
              handleChangeSelectedmethods(key);
            }
          }}
        >
          <Form.Group
            className={`d-flex align-items-center mb-0`}
            controlId={`${key}-method`}
          >
            <Form.Check
              className={Styles.formCheck}
              type="checkbox"
              id={`${key}-method`}
              checked={dataMethods[key].checked}
              name={`${key}-method`}
              disabled={!enabled}
            />
          <div className={`${enabled ? "text-gray-4" : "text-gray-2"} fw-500 me-3`}>
            {dataMethods[key].title}
          </div>
          </Form.Group>
          <div>
            <img
              src={
                enabled
                  ? dataMethods[key].enable_icon
                  : dataMethods[key].disable_icon
              }
            />
          </div>
        </li>
      );
    }

    return methods;
  };

  return (
    <ul className={`${Styles.methodList} p-0 mb-0`}>
      {renderMethods()}

      {enableSubmit ? (
        <CustomizedButton
          isFullWidth
          leftIcon={<FaChevronLeft size={20} />}
          className="tradeBtn size-3 fw-700 py-1"
          size="sm"
          variant="blue"
          disabled={
            isMulti ? selectedList.length !== 2 : selectedList.length !== 1
          }
          loading={loading}
          onClick={() => onSubmit(selectedList)}
        >
          ارسال کد تایید
        </CustomizedButton>
      ) : (
        <CustomizedButton
          isFullWidth
          leftIcon={<FaChevronLeft size={20} />}
          className="tradeBtn size-3 fw-700 py-1"
          size="sm"
          variant="blue"
          onClick={() => navigate("/my/security")}
        >
          فعالسازی
        </CustomizedButton>
      )}
    </ul>
  );
}
