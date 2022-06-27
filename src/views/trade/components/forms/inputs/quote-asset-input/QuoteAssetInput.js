import { useEffect, memo, useState } from "react";
import Styles from "./QuoteAssetInput.module.scss";
import * as math from "mathjs";
import {
  RiWalletLine,
  RiCopperCoinLine,
  FiSearch,
  AiFillCaretDown,
} from "react-icons/all";
import { useSelector } from "react-redux";
import CustomizedModal from "../../../../../../components/modal/Modal";
import { useOrder } from "../../../../../../context/OrderServises";
import { useField } from "formik";
import { useParams } from "react-router-dom";
import DefaultIcon from "../../../../../../assets/images/coin-binance1.png";
import InfiniteScroll from "react-infinite-scroll-component";

function QuoteAssetInput({ label, className, labelClassName, ...props }) {
  const [
    { name, value, onChange, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);

  const { spot } = useParams();
  let { configs } = useSelector((state) => state.config);
  let { marketInfo } = useSelector((state) => state.market);
  const { balance } = useOrder();

  const [searchBox, setSearchBox] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [showList, setShowList] = useState([]);

  useEffect(() => {
    let assets = [];
    const [base, quote] = spot.split("-");

    let coin = base === value ? quote : base;
    for (const market in marketInfo) {
      let { baseAsset, quoteAsset, spotTradingAllowed, status } =
        marketInfo[market];

      if (spotTradingAllowed && status === "TRADING") {
        if (searchBox) {
          if (
            baseAsset === coin &&
            !assets.includes(quoteAsset) &&
            new RegExp(searchBox, "gi").test(quoteAsset)
          )
            assets.push(quoteAsset);
          if (
            quoteAsset === coin &&
            !assets.includes(baseAsset) &&
            new RegExp(searchBox, "gi").test(baseAsset)
          )
            assets.push(baseAsset);
        } else {
          if (baseAsset === coin && !assets.includes(quoteAsset))
            assets.push(quoteAsset);
          if (quoteAsset === coin && !assets.includes(baseAsset))
            assets.push(baseAsset);
        }
      }
    }

    if (!assets.includes(value)) {
      setValue(assets[0]);
    }
    setShowList(assets.splice(0, 20));
    setOptions(assets);
  }, [marketInfo, spot, value, searchBox]);

  useEffect(() => {
    setSearchBox("");
    setShowModal(false);
  }, [value]);

  const setMore = () => {
    let options_list = options;
    let new_list = options_list.splice(0, 20);
    setShowList((prev) => [...prev, ...new_list]);
    setOptions(options_list);
  };

  return (
    <>
      {label ? (
        <label className={`${Styles.selectionLabel} ${labelClassName} fw-500`}>
          {label}
        </label>
      ) : null}

      <div
        className={`${Styles.selection} ${className || ""} d-flex justify-content-between align-items-center pointer`}
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
        <AiFillCaretDown size={12} className="text-gray-2" />
      </div>

      <CustomizedModal
        show={showModal}
        onHide={() => setShowModal(false)}
        keyboard={true}
        backdrop="static"
        contentClassName={Styles.modal}
        centered
        size="md"
        title={` انتخاب ${label}`}
      >
        <div className={`${Styles.head} mb-3`}>
          <div className={Styles.searchInput}>
            <span className={Styles.icon}>
              <FiSearch className="text-gray-1" size={20} />
            </span>
            <input
              type="text"
              placeholder="جستجو"
              className="is-size-8"
              onChange={(e) => setSearchBox(e.target.value)}
            />
          </div>
        </div>

        <div
          className={`${Styles.items}  transition py-2 px-2 d-flex align-items-center justify-content-between`}
        >
          <span className="size-5 text-gray-2">نام ارز</span>
          <span className="size-5 text-gray-2">دارایی کیف پول</span>
        </div>

        <InfiniteScroll
          dataLength={showList.length}
          next={setMore}
          hasMore={options.length > 0}
          // loader={<h4>Loading...</h4>}
          height={400}
        >
          <ul className={`${Styles.list} mt-3 px-2`}>
            {showList.map((coin, i) => (
              <li
                key={coin}
                className={`${Styles.items}  transition py-2 px-2 d-flex align-items-center justify-content-between`}
                onClick={() => setValue(coin)}
              >
                <div className="d-flex align-items-center">
                  <div className={`${Styles.img} ml-3`}>
                    {configs[coin].icon ? (
                      <img
                        src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${configs[coin].icon}`}
                        alt=""
                      />
                    ) : (
                      <img src={DefaultIcon} alt="" />
                    )}
                  </div>
                  <div>
                    <div className="d-flex align-items-center">
                      <div className="size-4  text-gray-4 roboto-Bold">
                        {coin}
                      </div>
                      <div>
                        <div className="d-flex align-items-center">
                          <div className="size-4  text-gray-4 en fw-700">
                            {coin}
                          </div>
                          <div className="size-5 text-gray-1 me-2">
                            {configs[coin]?.name
                              ? `(${configs[coin]?.name})`
                              : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex align-items-center ">
                      <div className="is-size-8 text-gray-1">{coin}</div>
                      {balance.spotWallets && balance.spotWallets[coin] ? (
                        <div className="mx-1 is-size-8 en fw-700">
                          {math.fix(balance.spotWallets[coin].balance, 8)}
                        </div>
                      ) : (
                        <div className="mx-1 is-size-8 en fw-700">0</div>
                      )}
                      <RiWalletLine className="text-gray-1" size={16} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </CustomizedModal>
    </>
  );
}
export default memo(QuoteAssetInput);
