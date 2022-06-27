import React from "react";
import { DropdownButton } from "react-bootstrap";

import Styles from "./ProfileDropdown.module.scss";

const ProfileDropdown = () => {
  return (
    <>
      <DropdownButton
        className={`${Styles.position} p-3 header-dropdown pointer`}
        id="dropdown-item-button"
        title="title"
      >
        <div
          className={`${Styles.wallet} d-flex align-items-start flex-wrap mb-4`}
        >
          <div
            className={`${Styles.info} col-12 p-2 d-flex align-items-center justify-content-end flex-wrap `}
          >
            <div className="d-flex align-items-center flex-row-reverse ">
              <span className="fw-900 blue is-size-4">556,654.55</span>
              <span className="text-gray-1 text-start ml-2 ltr">
                <span className="size-5 fw-700 mr-1">USDT</span>
                <span className="size-5">(تتر)</span>
              </span>
            </div>
            <div className="  d-flex align-items-center f-100 flex-row-reverse ">
              <span className="text-regular fw-500  is-size-5 mr-1">
                ~
              </span>
              <span className="text-gray-2 size-5 fw-500">
                ۵۵۶,۶۵۴.۵۶۵
              </span>
              <span className="text-gray-1 text-start ml-2 ltr">
                <span className="size-5 fw-700 mr-1">IRR</span>
                <span className="size-5">(ریال)</span>
              </span>
            </div>
          </div>
        </div>
      </DropdownButton>
    </>
  );
};

export default ProfileDropdown;
