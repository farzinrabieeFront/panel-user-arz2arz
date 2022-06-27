import React, { useEffect, useRef, useState } from "react";
import { Field, Form, Formik, useField } from "formik";
import {
  HiOutlineChevronDown,
  HiPlus,
  HiOutlineChevronUp,
  FaChevronLeft,
} from "react-icons/all";
import InputElement from "../../../common/element/formik-inputs/input/Input";

import Styles from "./AccountBankDropdown.module.scss";
import { CardConvert } from "../../../utils";

import NewSelect from "../../../common/element/formik-inputs/new-select/NewSelect";
import { Link } from "react-router-dom";

const AccountBankDropdown = ({
  symbol,
  options,
  network,
  setMemo,
  ...props
}) => {
  const [
    { name, onChange, value, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);

  let ref = useRef(null);
  const [openAddress, setOpenAddress] = useState(false);

  useEffect(() => {
    if (!value && options.length) {
      let default_card = options.find((item) => !item.isdisabled);
      if (default_card) setValue(default_card.value);
    }
  }, [options]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenAddress(false);
    }
  };

  return (
    <div className="position-relative">
      <InputElement
        name={name}
        onClick={() => setOpenAddress(true)}
        className={`${Styles.input} fw-500 size-4 en text-white dropDown-input`}
        label="شماره کارت"
        prepend={
          <span
            className="pointer d-flex align-items-center"
            onClick={() => setOpenAddress(true)}
          >
            {openAddress ? (
              <HiOutlineChevronUp size={16} className="text-gray-3" />
            ) : (
              <HiOutlineChevronDown size={16} className="text-gray-3" />
            )}
          </span>
        }
        onChange={onChange}
        readOnly
        value={value}
        fakeValue={
          <span
            onClick={() => setOpenAddress(true)}
            className={`${Styles.fakeValue} w-50 pointer size-4 fw-500 text-gray-4`}
          >
            <span className="ltr">
              {CardConvert(
                options.find((item) => item.value === value)?.card
              )}
            </span>
          </span>
        }
      />

      <ul
        ref={ref}
        className={`${Styles.address} ${openAddress ? Styles.show : ""} m-0`}
      >
        {options.map((item, i) => {
          return (
            <li
              key={i}
              className={`${Styles.item} ${item.isdisabled ? Styles.isdisabled : ""
                } d-flex align-items-center justify-content-between py-2 fw-500 size-4 text-gray-4 px-3`}
              onClick={() => {
                if (!item.isdisabled) {
                  setValue(item.value);
                  setOpenAddress(false);
                }
              }}
            >
              <span>
                <img
                  src={`https://main.arz2arz.net/api/v1/bankLogo/images/${item.logo}`}
                  width={24}
                  height={24}
                />
                <span className="me-2">{item.bank}</span>
              </span>
              <span className={`${Styles.bankCard} me-1 en ltr`}>
                {CardConvert(item.card)}
              </span>
            </li>
          );
        })}
        <li className="d-flex align-items-center py-2 px-3 text-blue size-4 fw-500 pointer">
          <Link to="/my/bank-accounts">
            <HiPlus size={16} className="ms-1" />
            افزودن کارت جدید
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AccountBankDropdown;
