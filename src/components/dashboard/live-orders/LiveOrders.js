import React from "react";
import Styles from "./LiveOrders.module.scss";
//pics
import orderBuyIcon from "../../../assets/images/order-buy.png";
import orderSellIcon from "../../../assets/images/order-sell.png";
import orderAllIcon from "../../../assets/images/order-all.png";
import bitcoinPic from "../../../assets/images/BitCoin_ICON.png";
import lightcoinPic from "../../../assets/images/LightCoin_ICON.png";
//components
import TableElement from "../../../common/element/table/Table";

const LiveOrders = () => {
  return (
    <div className="h-100 size-5 card-style rounded-10 py-3 px-3">
      <div className="d-flex align-items-center  pb-3 justify-content-between ">
        <div className="d-flex flex-column align-items-start">
          <span className="size-4  fw-700 text-gray-2">
            سفارشات زنده
          </span>
          <span className="size-5 fw-700 text-gray-1">
            Live Orders
          </span>
        </div>
        <div className="d-flex align-items-center">
          <span className="d-flex align-items-center pointer p-2 ml-2 rounded-10">
            <span>همه</span>
            <img src={orderAllIcon} className="mr-2" alt="" />
          </span>
          <span
            className={`${Styles.activetype} d-flex pointer align-items-center p-2 ml-2 rounded-10`}
          >
            <span>خرید</span>
            <img src={orderBuyIcon} className="mr-2" alt="" />
          </span>
          <span className="d-flex align-items-center  pointer p-2 rounded-10">
            <span>فروش</span>
            <img src={orderSellIcon} className="mr-2" alt="" />
          </span>
        </div>
      </div>

      <TableElement
        header={
          <>
            <th>نام ارز</th>
            <th>
              مقدار ارزی <span className="is-size-8">(Price)</span>
            </th>
            <th>
              مقدار واریزی <span className="is-size-8">(Amount)</span>
            </th>
            <th>زمان</th>
          </>
        }
      >
        {["", "", "", "", ""].map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <span>
                  <span className={Styles.tableImg}>
                    <img src={bitcoinPic} alt="" />
                    <img src={lightcoinPic} alt="" />
                  </span>
                  <span className="mr-2 fw-500">BTC / LTC</span>
                </span>
              </td>
              <td>
                <span className="text-danger fw-500">۰.۰۰۰۰۰۹۴۷</span>
              </td>
              <td>
                <span className="text-gray-2 fw-500">۳۲۴,۳۲۰,۲</span>
              </td>
              <td>
                <span className="text-light fw-500"> 13:34:52</span>
              </td>
            </tr>
          );
        })}
      </TableElement>

      {/* <div
        className={`${Styles.headerTable} p-3 d-flex justify-content-between fw-900`}
      >
        <span>نام ارزها</span>
        <span>مقدار ارزی</span>
        <span>مقدار ریالی</span>
        <span>زمان انجام معامه</span>
      </div>
      {["", "", "", "", "", "", "", "", "", ""].map((item, index) => {
        return (
          <div
            className={`py-3 px-3 d-flex justify-content-between `}
          >
            <span>
              <span></span>
              <span>BTC / LTC</span>
            </span>
            <span
              className={`${index % 2 === 0 ? "text-success" : "text-danger"}`}
            >
              ۰.۰۰۰۰۰۹۴۷
            </span>
            <span className="text-gray-2">۳۲۴,۳۲۰,۲</span>
            <span className="text-light">15 دقیقه پیش</span>
          </div>
        );
      })} */}
    </div>
  );
};
export default LiveOrders;
