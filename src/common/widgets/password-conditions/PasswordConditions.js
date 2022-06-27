import React from "react";
import passwordMeter from "../passwordMeter/passwordMeter";

import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoAlertCircleOutline,
} from "react-icons/all";

export default function PasswordConditions({ password }) {
  const checkPassword = (code) => {
    let icon = <IoAlertCircleOutline size={18} className="ml-1 text-blue" />;
    if (password) {
      const requirement = passwordMeter.getResult(password).errors || [];
      const test = requirement.find((item) => item.code === code);

      if (test) {
        icon = <IoCloseCircleOutline size={18} className="ml-1 text-danger" />;
      } else {
        icon = (
          <IoCheckmarkCircleOutline size={18} className="ml-1 text-success" />
        );
      }
    }

    return icon;
  };

  return (
    <ul className="p-3 text-end m-0">
      <li className="mb-2 text-gray-4 size-5">
        {checkPassword(1)}
        حداقل ۸ کاراکتر
      </li>
      <li className="mb-2 text-gray-4 size-5">
        {checkPassword(3)}
        حداقل یک حرف بزرگ انگلیسی
      </li>
      <li className="mb-2 text-gray-4 size-5">
        {checkPassword(4)}
        حداقل یک حرف کوچک انگلیسی
      </li>
      <li className="mb-2 text-gray-4 size-5">
        {checkPassword(5)}
        حداقل داری یک عدد
      </li>
      <li className="text-gray-4 size-5">
        {checkPassword(6)}
        حداقل داری یک کاراکتر ویژه (.!@#$%^&*)
      </li>
    </ul>
  );
}
