import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DefaultIcon from "../../../../../../assets/images/coin-binance1.png";
import Styles from "./MarketInput.module.scss";
import { FiChevronDown } from "react-icons/all";
import ListMarket from "./ListMarket";

export default function BaseMarket({ className, value, list = [], onChange }) {
  let { configs } = useSelector((state) => state.config);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(false);
  }, [value]);

  return (
    <>
      <div
        className={`${
          className || ""
        } d-flex justify-content-between align-items-center pointer`}
        onClick={() => setShowModal(true)}
      >
        <div className="d-flex align-items-center">
          {configs[value]?.icon ? (
            <img
              className={`${Styles.imgIcon} ml-2`}
              src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${configs[value]?.icon}`}
              alt=""
            />
          ) : (
            <img className={`${Styles.imgIcon} ml-2`} src={DefaultIcon} />
          )}

          <span className="size-4  text-gray-4 en fw-500">{value}</span>
        </div>
        <FiChevronDown size={16} className="text-gray-2" />
      </div>

      {showModal ? (
        <ListMarket
          show={showModal}
          onHide={() => setShowModal()}
          title="انتخاب ارز پایه"
          data={list}
          onChange={onChange}
        />
      ) : null}
    </>
  );
}
