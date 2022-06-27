import DefaultIcon from "../../../../../../assets/images/coin-binance1.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { useOrder } from "../../../../context/OrderServises";
import { useEffect, useState } from "react";
import CustomizedModal from "../../../../components/modal/Modal";
import Styles from "./MarketInput.module.scss";
import * as math from "mathjs";
import { RiWalletLine, FiSearch } from "react-icons/all";

export default function ListMarket({ show, onHide, title, data, onChange }) {
  let { configs } = useSelector((state) => state.config);
  const { balance } = useOrder();

  const [searchBox, setSearchBox] = useState("");
  const [options, setOptions] = useState([]);
  const [showList, setShowList] = useState([]);

  useEffect(async () => {
    if (searchBox) {
      let filter_data = data.filter((coin) =>
        new RegExp(searchBox, "gi").test(coin)
      );

      await setShowList(filter_data.slice(0, 10));
      await setOptions(filter_data.slice(10));
    } else {
      await setShowList(data.slice(0, 10));
      await setOptions(data.slice(10));
    }
  }, [data, searchBox]);

  const setMore = () => {
    let options_list = options;
    let new_list = options_list.splice(0, 20);
    setShowList((prev) => [...prev, ...new_list]);
    setOptions(options_list);
  };

  return (
    <div>
      <CustomizedModal
        show={show}
        onHide={() => {
          onHide();
          setSearchBox("");
        }}
        keyboard={true}
        backdrop="static"
        contentClassName={Styles.modal}
        centered
        size="md"
        title={title}
      >
        <div className={`${Styles.head} mb-3`}>
          <div className={Styles.searchInput}>
            <span className={Styles.icon}>
              <FiSearch className="text-gray-1" size={18} />
            </span>
            <input
              type="text"
              placeholder="جستجو"
              className="size-5 text-gray-2"
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
          loader={
            <div className="w-100 h-100 ms-2 center-content">loading</div>
          }
          height={400}
        >
          <ul className={`${Styles.list} ms-2 mt-3 px-2`}>
            {showList.length
              ? showList.map((coin, i) => (
                  <li
                    key={coin}
                    className={`${Styles.items} transition p-2`}
                    onClick={() => onChange(coin)}
                  >
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
                    <div className="col d-flex justify-content-between">
                      <div>
                        <div className="size-4  text-gray-4 en fw-500">
                          {coin}
                        </div>
                        <div className="size-5 text-gray-1 me-2">
                          {configs[coin]?.name
                            ? `(${configs[coin]?.name})`
                            : null}
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        {balance.spotWallets && balance.spotWallets[coin] ? (
                          <>
                            <div className="is-size-8 text-gray-1">{coin}</div>
                            <div className="mx-1 is-size-8 en fw-700">
                              {math.fix(balance.spotWallets[coin].balance, 8)}
                            </div>
                          </>
                        ) : (
                          <div className="mx-1 is-size-8 en fw-700">0</div>
                        )}
                        <RiWalletLine className="text-gray-1" size={16} />
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </InfiniteScroll>
      </CustomizedModal>
    </div>
  );
}
