import React from "react";
import { Link, } from "react-router-dom";
import { FiChevronDown, } from "react-icons/all";
import Styles from "./Item.module.scss";

const Items = ({ title, url = "./", subItem = [] }) => {
  return (
    <>
      <li
        className={`${Styles.ListItem}  ml-1 py-3 size-4  px-2 d-flex justify-content-between align-items-center`}
      >
        <span className="text-gray-2">
          <Link to={url}>
            <span className={`${Styles.none} pointer fw-500 `}>{title}</span>
          </Link>

          {subItem && subItem.length ? (
            <span className="mr-2">
              <FiChevronDown />
            </span>
          ) : null}
        </span>

        {subItem && subItem.length ?
          <ul className={`${Styles.subItem}`}>
            {subItem.map((item, index) => {
              return (
                <li
                  className={`p-2 size-5  fw-500 `}
                  key={index}
                >
                  <Link to={item.url}>
                    <span className="text-gray-2">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          : null
        }
      </li>
    </>
  );
};

export default Items;
