import React, { useEffect, memo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import BitImg from "../../../../assets/images/coin_ic_input.png";
import USDTImg from "../../../../assets/images/usdt_ic_input.png";
import { useOrder } from "../../../../context/OrderServises";
import Styles from "./Prices.module.scss";
import * as math from "mathjs";

function Prices() {
  const { spot } = useParams();
  const { state } = useLocation();
  const [infomarket, setInfoMarket] = useState({});
  const { marketsTicker, updateMarketsTicker } = useOrder();
  let market = spot.split("-").join("");
  const [marketsTickerList, setMarketsTickerList] = useState([]);
  const { configs } = useSelector((state) => state.config);

  useEffect(() => {
    setMarketsTickerList(marketsTicker);
  }, [marketsTicker]);

  useEffect(() => {
    setMarketsTickerList((prev) => ({ ...prev, ...updateMarketsTicker }));
  }, [updateMarketsTicker]);

  function appendPriceMarket(coin) {
    let price = "0",
      textColor = "";

    if (marketsTickerList[coin]) {
      price = marketsTickerList[coin]?.c;
      if (Number(price).toString().includes("e")) {
        price = Number(price).toFixed(8);
      } else {
        price = Number(price).toString();
      }
    }

    const priceElement = document.querySelector(`[name='c-${coin}']`);
    if (priceElement) {
      if (priceElement.className) textColor = priceElement.className;
      const lastPrice = Number(priceElement.innerText);
      if (math.larger(lastPrice, 0) && math.larger(lastPrice, Number(price))) {
        textColor = "text-danger";
      } else if (math.smaller(lastPrice, Number(price))) {
        textColor = "text-success";
      }
    }

    return {
      __html: `<div  name="c-${coin}" class="${textColor}">${price}</div>`,
    };
  }

  function appendChangeMarket(coin) {
    let change = "0",
      change_price = "0",
      textColor = "";

    if (marketsTickerList[coin]) {
      change = marketsTickerList[coin]?.P?.toString();
      change_price = Number(marketsTickerList[coin]?.p).toString();
    }

    if (math.larger(Number(change?.slice(0, -1)), 0)) {
      textColor = "text-success";
    } else if (math.smaller(Number(change?.slice(0, -1)), 0)) {
      textColor = "text-danger";
    }

    return {
      __html: `<div>
    <span class="${textColor} en ltr">${change > 0 ? "+" : ""}${
        change || 0
      }%</span>
    <span class="${textColor} en ltr ms-2">${change_price || 0}</span>
    </div>`,
    };
  }

  return (
    <div className={`${Styles.container} w-100 rounded-12 bg-white h-100 p-3`}>
      <div className={Styles.gridItem1}>
        <div className="d-flex align-items-center justify-content-between justify-content-md-start">
          {/* <span className={Styles.sellCoin}> */}
          <span className={`${Styles.imgCoin}`}>
            <img
              //  src={BitImg}
              src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${
                configs[spot.split("-")[1]]?.icon
              }`}
              width={31}
              height={31}
            />
          </span>
          <div className="mx-2 d-flex flex-column justify-content-between align-items-center">
            <span className="text-gray-4 en fw-500 size-4 mb-0 ">
              <span> {spot.split("-")[0]}</span>
              <span className="mx-1">/</span>
              <span>{spot.split("-")[1]}</span>
            </span>
            <span className="fw-500 size-5 mt-1 text-gray-2">
              {configs[spot.split("-")[0]]?.faName}
              {" / "}
              {configs[spot.split("-")[1]]?.faName}
            </span>
          </div>
          {/* <span className={Styles.buyCoin}> */}
          <span className={` ${Styles.imgCoin}`}>
            {/* configs[spot.split("-")[0]]?.icon */}
            <img
              src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${
                configs[spot.split("-")[0]]?.icon
              }`}
              width={31}
              height={31}
            />
          </span>
        </div>
      </div>

      <div className={Styles.gridItem2}>
        <div className="d-flex flex-column justify-content-between align-items-start align-items-md-start">
          <span className="text-gray-3 size-5">قیمت جهانی</span>
          <div
            className={`size-5 en mt-1`}
            dangerouslySetInnerHTML={appendPriceMarket(
              spot.split("-").join("")
            )}
          ></div>
        </div>
      </div>

      <div className={Styles.gridItem3}>
        <div className="d-flex flex-column justify-content-between align-items-start align-items-md-start">
          <span className="text-gray-3 size-5">تغییرات قیمت (24h)</span>
          <div
            className={`size-5 mt-1 ltr`}
            dangerouslySetInnerHTML={appendChangeMarket(
              spot.split("-").join("")
            )}
          ></div>
        </div>
      </div>

      <div className={Styles.gridItem4}>
        <div className="d-flex flex-column justify-content-between align-items-start align-items-md-start">
          <span className="text-gray-3 size-5">بالاترین قیمت (24h)</span>
          <span className="text-gray-4 size-5 en mt-1">
            {Number(
              marketsTickerList[spot.split("-").join("")]?.h || 0
            ).toLocaleString()}
          </span>
        </div>
      </div>

      <div className={Styles.gridItem5}>
        <div className="d-flex flex-column justify-content-between align-items-start align-items-md-start">
          <span className="text-gray-3 size-5">پایین ترین قیمت (24h)</span>
          <span className="text-gray-4 size-5 en mt-1">
            {Number(
              marketsTickerList[spot.split("-").join("")]?.l || 0
            ).toLocaleString()}
          </span>
        </div>
      </div>

      <div className={Styles.gridItem6}>
        <div className="d-flex flex-column justify-content-between align-items-start align-items-md-start">
          <span className="text-gray-3 size-5">حجم معامله (USDT)</span>
          <span className="text-gray-4 size-5 en mt-1">
            {Number(
              marketsTickerList[spot.split("-").join("")]?.q || 0
            ).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Prices);
