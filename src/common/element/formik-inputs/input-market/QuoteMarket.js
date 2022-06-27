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

function QuoteMarket({
    market,
    type,
    userBalances = {},
    changeMarketHandler,
    changeTypeHandler,
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

            if (type === "sell") setCoin(quoteMarket);
            else setCoin(baseMarket);
        }
    }, [market, type]);

    useEffect(() => {
        const { baseAsset: baseMarket, quoteAsset: quoteMarket } =
            marketInfo[market];
        const base = type === "sell" ? baseMarket : quoteMarket;

        if (Object.keys(marketInfo).length) {
            let list = [];
            for (const key in marketInfo) {
                const { baseAsset, quoteAsset, spotTradingAllowed, status } =
                    marketInfo[key];

                if (spotTradingAllowed && status === "TRADING")
                    if ([baseAsset, quoteAsset].includes(base)) {
                        const coin = [baseAsset, quoteAsset].join("").replace(base, "");
                        if (!list.includes(coin)) list.push(coin);
                    }
            }
            setCoinList(list);
        }
    }, [market, type, marketInfo]);

    const changeCoinHandler = (new_coin) => {
        let new_market = market;
        const base = market.replace(coin, "");

        if (marketInfo[[base, new_coin].join("")]) {
            new_market = marketInfo[[base, new_coin].join("")];
            if (type === 'buy') changeTypeHandler("sell");
        } else {
            new_market = marketInfo[[new_coin, base].join("")];
            if (type === 'sell') changeTypeHandler("buy");
        }



        const { baseAsset: baseMarket, quoteAsset: quoteMarket } = new_market;
        changeMarketHandler([baseMarket, quoteMarket].join(""));
    };

    const element = (
        <div className={`${Styles.quote} px-3`} onClick={() => setShowModal(true)}>
            <div className="pe-2 pointer">
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
                <label
                    className={`${Styles.label} size-5 fw-500 text-gray-3 mb-2 me-1`}
                >
                    ارز درخواستی
                </label>
            </div>
            <FiChevronDown size={20} className="text-gray-2 " />
            <div
                className={`${Styles.balance} px-2 w-50 size-5 fw-400 d-flex align-items-center justify-content-end`}
            >
                <span className="text-gray-2 size-5 en">{coin}</span>
                <span className="mx-1 size-5 text-gray-4 en">
                    {userBalances[coin] ? math.fix(userBalances[coin].balance, 5) : 0}
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
                    title="انتخاب ارز درخواستی"
                    show={showModal}
                    data={coinList}
                    onHide={() => setShowModal(false)}
                    onChange={(new_coin) => changeCoinHandler(new_coin)}
                />
            ) : null}
        </>
    )
}
export default QuoteMarket;
