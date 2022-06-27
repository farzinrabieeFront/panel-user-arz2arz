/** internal imports */
import { useEffect, useState } from "react";
import Styles from '../Tables.module.scss';
/** external imports */
import { Dropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function TradeDropDown({ asset }) {
    const navigate = useNavigate();
    const [tradeSearchBox, setTradeSearchBox] = useState("");
    const [marketOptions, setMarketOptions] = useState([]);
    const { marketInfo } = useSelector((state) => state.market);

    function getAllowedCoins(coin) {
        const assets = [];
        const markets_list = Object.keys(marketInfo);
        if (markets_list.length) {
            markets_list.forEach((market) => {
                if (
                    marketInfo[market].baseAsset === coin ||
                    marketInfo[market].quoteAsset === coin
                ) {
                    if (
                        marketInfo[market].spotTradingAllowed &&
                        marketInfo[market].status === "TRADING" &&
                        market.replace(coin, "")
                    ) {
                        assets.push(market.replace(coin, ""));
                    }
                }
            });

            setMarketOptions(assets);
        }
    }

    return (
        <Dropdown
            className={`${Styles.dropdown}`}
            autoClose="outside"
            onClick={() => getAllowedCoins(asset)}
        >
            <Dropdown.Toggle>
                <span className="pointer text-blue size-5 fw-500">معامله</span>
            </Dropdown.Toggle>
            <Dropdown.Menu
                className={`${Styles.dropdownMenu} bg-white rounded-12 shadow-card `}
            >
                <div className={Styles.inputListItem}>
                    <input
                        placeholder="جستجو"
                        className="en"
                        onChange={(e) => setTradeSearchBox(e.target.value)}
                    />
                </div>
                <ul className="m-0">
                    {marketOptions
                        .filter(item => new RegExp(tradeSearchBox, "gi").test(item))
                        .map((item, i) =>
                            <li
                                key={item}
                                className="py-1 en size-5 fw-500 text-gray-4"
                                onClick={() => {
                                    navigate(`/trade/${asset}-${item}`);
                                }}
                            >
                                {`${asset} / ${item}`}
                            </li>
                        )}
                </ul>
            </Dropdown.Menu>
        </Dropdown>
    );
}

