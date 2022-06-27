import React from "react";
import Styles from "./OrderBook.module.scss";
import {
  HiSortAscending,
  HiSortDescending,
  BiSort,
  HiArrowNarrowUp,
} from "react-icons/all";
export default function OrderBook() {
  return (
    <div className={`${Styles.orderBook}`}>
      <div className={` w-100 d-flex p-2`}>
        <ul className={`${Styles.switchItems} d-flex p-0 m-0`}>
          <li className={`${Styles.active} me-2 p-1`}>
            <HiSortAscending size={18} />
          </li>
          <li className={`${Styles.active1} me-2 p-1`}>
            <HiSortDescending size={18} />
          </li>
          <li className={`${Styles.active1} me-2 p-1`}>
            <BiSort size={18} />
          </li>
        </ul>
      </div>
      <div className={`${Styles.orders} w-100`}>
        <div className="d-flex justify-content-between align-items-center px-2 mt-2">
          <div className="size-5">قیمت (USDT)</div>
          <div className="size-5">مقدار (BTC)</div>
          <div className="size-5">جمع (BTC)</div>
        </div>
        <ul className="w-100 p-0 m-0 ">
          {[...Array(15)].map((item, index) => (
            <li
              amount="65"
              type="sell"
              className="w-100 d-flex justify-content-between align-items-center"
            >
              <div className="px-2">57401</div>
              <div className="px-2">0.06580000</div>
              <div className="px-2">2.90435372</div>
            </li>
          ))}
        </ul>
        <div className="d-flex align-items-center p-2">
          <div className="is-size-4 me-3 fw-700 text-success d-flex align-items-center">
            <HiArrowNarrowUp size={18} className="text-success mb-2" />
            57352.35
          </div>
          <div className="size-5">$ 57238.75</div>
        </div>
        <ul className="w-100 p-0 m-0 ">
          {[...Array(15)].map((item, index) => (
            <li
              amount="65"
              type="buy"
              className="w-100 d-flex justify-content-between align-items-center"
            >
              <div className="px-2">57401</div>
              <div className="px-2">0.06580000</div>
              <div className="px-2">2.90435372</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
