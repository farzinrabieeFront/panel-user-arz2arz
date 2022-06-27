/**internal imports */
import { useEffect, useState } from "react";
import Styles from "./MarketInput.module.scss";
import DefaultIcon from "../../../../assets/images/coin-binance1.png";
/**eternal imports */
import { useSelector } from "react-redux";
import { FiChevronDown, IoWalletOutline } from "react-icons/all";
import * as math from "mathjs";
/**component imports */
import ModalMarket from "./ModalMarket";

function BaseMarket({
    market,
    type,
    userBalances = {},
    changeMarketHandler,
    changeTypeHandler,
    setAmount,
}) {
    let { config, market: marketState } = useSelector((state) => state);
    let { configs } = config;
    let { marketInfo } = marketState;

    const [showModal, setShowModal] = useState(false);
    const [coinList, setCoinList] = useState([]);
    const [coin, setCoin] = useState("");

    useEffect(() => {
        setShowModal(false);
        if (marketInfo[market]) {
            const { baseAsset: baseMarket, quoteAsset: quoteMarket } =
                marketInfo[market];

            if (type === "sell") setCoin(baseMarket);
            else setCoin(quoteMarket);
        }
    }, [market, type]);

    useEffect(() => {
        if (Object.keys(configs).length) {
            let list = [];
            for (const key in configs) {
                const { trading } = configs[key];
                if (trading) list.push(key);
            }

            setCoinList(list);
        }
    }, [configs]);

    const changeCoinHandler = async (new_coin) => {
        let list = [];
        const new_market = market.replace(coin, new_coin);

        for (const key in marketInfo) {
            let { baseAsset, quoteAsset, spotTradingAllowed, status } =
                marketInfo[key];

            if (spotTradingAllowed && status === "TRADING")
                if ([baseAsset, quoteAsset].includes(new_coin)) {
                    const current_market = [baseAsset, quoteAsset].join("");

                    if (!list.includes(current_market)) list.push(current_market);

                    if (new_market === current_market) {
                        changeMarketHandler(new_market);
                        return;
                    }
                }
        }

        if (!list.includes(new_market)) {
            await changeMarketHandler(list[0]);
            changeTypeHandler("sell");
        }
    };

    const element = (
        <div className={`${Styles.base} px-3`} onClick={() => setShowModal(true)}>
            <div className="pointer">
                {configs[coin]?.icon ? (
                    <img
                        className={`${Styles.imgIcon} ml-2`}
                        src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${configs[coin]?.icon}`}
                        alt=""
                    />
                ) : (
                    <img className={`${Styles.imgIcon} ml-2`} src={DefaultIcon} />
                )}

                <span className="size-4 text-gray-4 en fw-500 mx-2">{coin}</span>
                <label className={`${Styles.label} size-5 fw-500 text-gray-3 mb-2`}>
                    ارز پایه
                </label>
            </div>
            <FiChevronDown size={20} className="text-gray-2 " />
            <div
                className={`${Styles.balance} px-2 size-5 fw-400 d-flex align-items-center pointer`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setAmount(userBalances[coin].balance);
                }}
            >
                <span className="text-gray-2 size-5 en">{coin}</span>
                <span className="mx-1 size-5 text-gray-4 en">
                    {userBalances[coin] ? math.fix(userBalances[coin].balance, 8) : 0}
                </span>
                <IoWalletOutline className="text-blue" size={16} />
            </div>
        </div>
    );

    return (
        <>
            {element}
            {showModal ? (
                <ModalMarket
                    title="انتخاب ارز پایه"
                    show={showModal}
                    data={coinList}
                    onHide={() => setShowModal(false)}
                    onChange={(new_coin) => changeCoinHandler(new_coin)}
                />
            ) : null}
        </>
    )
}
export default BaseMarket;
