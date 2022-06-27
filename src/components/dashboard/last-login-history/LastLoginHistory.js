import React from "react";

import { MdLaptopMac } from "react-icons/all";
const LastLoginHistory = () => {
  return (
    <div>
      {["", "", "", "", "", ""].map((item, index) => {
        return (
          <div key={index} className="border-bottom-lightGray d-flex justify-content-between flex-column flex-lg-row align-items-between align-items-lg-center size-4  py-2">
            <span className="d-flex align-items-center">
              <span className="text-gray-1">
                <MdLaptopMac size={20} className="ml-2" />
              </span>
              <span>
                <p className="mb-2"><span className="text-gray-2 size-5">دسکتاپ</span></p>
                <p className="mb-0 text-gray-2 is-size-8"> IP: 213.207.196.158 </p>
              </span>
            </span>
            <span className="is-size-8 d-flex flex-lg-column justify-content-end flex-row text-gray-1">
              <span className="text-gray-1 text-start">۱۳:۳۱:۴۸</span>
              <span className="d-block d-lg-none mx-2">{` | `}</span>
              <span className="text-gray-1 text-start">۱۳۹۹/۱۰/۱۴</span>
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default LastLoginHistory;
