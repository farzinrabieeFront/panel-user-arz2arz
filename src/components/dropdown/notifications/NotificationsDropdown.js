import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { BsDot, RiMailLine } from "react-icons/all";
import { Link } from "react-router-dom";
import Styles from "./NotificationsDropdown.module.scss";

const NotificationsDropdown = ({ title }) => {
  return (
    <>
      <DropdownButton
        className={`${Styles.position} notifications-dropdown pointer`}
        id="dropdown-item-button"
        title={title || ""}
      >
        <Dropdown.ItemText className="gray size-4  ">
          اعلانات
        </Dropdown.ItemText>

        {[" ", " "].map((item, index) => {
          return (
            <Dropdown.Item
              key={index}
              as="CustomToggle"
              className={`${Styles.buttons} size-4  py-3 d-flex flex-wrap border-bottom-lightGray`}
            >
              <div className="d-flex align-items-start flex-wrap w-100 overflow-hidden">
                <div className="text-gray-1 col-1 p-0 ps-2">
                  <RiMailLine size={25} />{" "}
                </div>
                <div className="col-11 p-0">
                  <h6 className="size-4 ">
                    <BsDot className="text-danger" size={25} />
                    تغییر قیمت بیت کوین در ۲۴ ساعت گذشته در صرافی
                  </h6>
                  <p className="size-5 mb-2 text-gray-1">
                    تست تست تست تست تست تست تست تست تست تست تست تست تست تست تست تست
                    تست تست تست .
                  </p>
                  <p className="mb-0 text-gray-2 size-5 text-start">
                    <span>۱۳۹۹/۱۰/۱۴</span> | <span>۱۳:۳۱:۴۸</span>
                  </p>
                </div>
              </div>
            </Dropdown.Item>
          )

        })}


        <Link to="/notifications">
          <div className="size-4  fw-700  mb-2 text-center pt-3   ">همه اعلانات</div>
        </Link>
      </DropdownButton>
    </>
  );
};

export default NotificationsDropdown;
