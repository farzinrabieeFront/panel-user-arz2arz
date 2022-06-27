/**internal imports */
import Styles from "./BankInput.module.scss";
/**external imports */
import { useEffect, useRef, useState } from "react";
import { useField } from "formik";
import {
  HiOutlineChevronDown,
  RiErrorWarningLine,
  TiContacts,
  HiOutlineChevronUp,
} from "react-icons/all";
/**components imports */
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";

export default function BankInput({
  label,
  isValid,
  isInvalid,
  disabled,
  ...props
}) {
  const [
    { name, onChange, value, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);

  const { banks } = useSelector((state) => state.exchange);

  const [showList, setShowList] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  let ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    setValue(banks[0]._id);
    setSearchInputValue(banks[0].name);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowList(false);
    }
  };

  useEffect(() => {
    setShowList(false);
  }, [value]);

  const renderBanksList = () => {
    let banks_list = [];
    let selected_bank = banks.find((item) => item._id === value)?.name;

    for (const item of banks) {
      let { _id, logo, name } = item;

      let element = (
        <li
          className={`${Styles.item} d-flex align-items-center justify-content-start py-2 px-3`}
          key={name}
          onClick={() => {
            setValue(_id);
            setShowList(false);
            setSearchInputValue(name);
          }}
        >
          <span className={Styles.img}>
            <img
              src={`https://main.arz2arz.net/api/v1/bankLogo/images/${logo}`}
            />
          </span>
          <span className="text-gray-4 me-2 size-4">{name}</span>
        </li>
      );

      if (searchInputValue !== selected_bank) {
        if (new RegExp(searchInputValue, "gi").test(name))
          banks_list.push(element);
      } else banks_list.push(element);
    }

    let element = (
      <div className={`${Styles.address} ${Styles.show} m-0`}>
        <ul ref={ref} className={`${Styles.wrap} p-0 m-0`}>
          {banks_list}
        </ul>
      </div>
    );

    return showList && banks_list.length ? element : null;
  };

  return (
    <Form.Group>
      {label ? (
        <Form.Label className={Styles.inputLabel} htmlFor={name}>
          {label}
        </Form.Label>
      ) : null}

      <div className="position-relative mb-3">
        <Form.Control
          {...props}
          type="text"
          name={name}
          isValid={isValid}
          isInvalid={isInvalid || (error && touched)}
          disabled={disabled}
          value={searchInputValue}
          onChange={(e) => {
            setSearchInputValue(e.target.value);
            if (e.target.value) setShowList(true);
          }}
        />
        <span
          className={`${Styles.inputPrepend} px-2 pointer d-flex align-items-center`}
          onClick={() => setShowList((prev) => !prev)}
        >
          {showList ? (
            <HiOutlineChevronUp size={16} className="text-gray-3 ms-1" />
          ) : (
            <HiOutlineChevronDown size={16} className="text-gray-3 ms-1" />
          )}
        </span>
        {renderBanksList()}
      </div>

      {error && touched ? (
        <span className={`${Styles.inputErrorText} text-danger size-5 `}>
          <RiErrorWarningLine size={16} /> {error}
        </span>
      ) : null}
    </Form.Group>
  );
}
