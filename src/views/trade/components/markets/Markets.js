import React, { useRef, useState, useEffect, memo } from "react";
import { FiSearch, HiStar } from "react-icons/all";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useOrder } from "../../../../context/OrderServises";
import Styles from "./Markets.module.scss";
import * as math from "mathjs";
import { useSelector } from "react-redux";
import TableElement from "../../../../common/element/table/Table";
import { changeWheelSpeed, Toastify } from "../../../../utils";
import { orderServices } from "../../../../services";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMainApi } from "../../../../common/hooks";

let quoteList = ["BTC", "USDT", "ETH", "BNB", "BUSD"];

function Markets() {
    const marketListRef = useRef();
    const navigate = useNavigate();
    const { tradeAreas, tradeAreasAsset, marketInfo } = useSelector(
        (state) => state.market
    );

    const { marketsTicker, updateMarketsTicker } = useOrder();
    const { urls, get, post } = useMainApi()
    const [favoritesList, setFavoritesList] = useState([]);
    const [filterAsset, setFilterAsset] = useState("USDT");
    const [searchBox, setSearchBox] = useState("");
    const [list, setList] = useState([]);
    const [start, setStart] = useState(0);
    const [marketsTickerList, setMarketsTickerList] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    useEffect(() => {
        if (searchBox && Object.keys(tradeAreasAsset).length) {
            let new_array = [];
            tradeAreas.forEach((coin) => {
                let arr = tradeAreasAsset[coin] || [];
                new_array.push(...arr);
            });

            let filterList = new_array.filter((coin) =>
                new RegExp(searchBox, "gi").test(coin)
            );

            setList(filterList);
        } else if (filterAsset === "bookmark") {
            setList(favoritesList);
        } else {
            setList(tradeAreasAsset[filterAsset]);
        }
    }, [tradeAreasAsset, filterAsset, searchBox, favoritesList]);

    useEffect(() => {
        setMarketsTickerList(marketsTicker);
    }, [marketsTicker]);

    useEffect(() => {
        setMarketsTickerList((prev) => ({ ...prev, ...updateMarketsTicker }));
    }, [updateMarketsTicker]);

    const getFavorites = async () => {
        try {
            const res = await get(urls.FavoriteMarkets);
            setFavoritesList(res.data);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    function appendPriceMarket(coin) {
        let price = "0",
            textColor = "";

        if (marketsTickerList[coin]) {
            price = marketsTickerList[coin].c;
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
            __html: `<div name="c-${coin}" class="${textColor}">${price || 0}</div>`,
        };
    }

    function appendChangeMarket(coin) {
        let change = "0",
            textColor = "";

        if (marketsTickerList[coin]) {
            change = marketsTickerList[coin].P?.toString();
        }

        if (math.larger(Number(change?.slice(0, -1)), 0)) {
            textColor = "text-success";
        } else if (math.smaller(Number(change?.slice(0, -1)), 0)) {
            textColor = "text-danger";
        }

        return { __html: `<div class="${textColor}">${change || 0}%</div>` };
    }

    const favoriteHandler = async (market) => {
        try {
            const _body = { market }
            await post(urls.FavoriteMarkets, _body);
            getFavorites();
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return (
        <div className={`${Styles.marketOverviewCard} p-2`}>
            <div className="w-100">
                <div className="p-2 w-100 d-flex justify-content-between align-items-center mb-2">
                    <TriangleTitle>
                        <h2 className="mb-0 fw-500 text-gray-4 size-4">بازارها</h2>
                    </TriangleTitle>
                    <div className={Styles.searchInput}>
                        <span className={Styles.icon}>
                            <FiSearch className="text-gray-1" size={20} />
                        </span>
                        <input
                            type="text"
                            placeholder="جستجو"
                            className="size-5 text-gray-2"
                            onChange={(e) => setSearchBox(e.target.value)}
                        />
                    </div>
                </div>
                <ul className={`${Styles.filterAssetsList} m-0 pb-3 px-2`}>
                    <li
                        className={`${filterAsset === "bookmark" ? Styles.active : ""
                            } text-gray-1 pointer en px-1 me-1 is-size-8`}
                        onClick={() => setFilterAsset("bookmark")}
                    >
                        <HiStar size={16} />
                    </li>

                    {quoteList.map((coin, index) => (
                        <li
                            key={index}
                            className={`${coin === filterAsset ? Styles.active : ""}
             text-gray-3 en p-1 mx-1 is-size-8`}
                            onClick={() => {
                                setFilterAsset(coin);
                                setSearchBox("");
                            }}
                        >
                            {coin}
                        </li>
                    ))}
                </ul>
                <div className="d-flex align-items-center">
                    <span className="p-1 ms-auto text-end size-5 text-gray-2">
                        تغییرات (24h)
                    </span>
                    <span className="p-1 mx-auto ms-lg-auto text-end size-5 text-gray-2">قیمت</span>
                    <span className="p-1 mx-auto ms-lg-auto text-start size-5 text-gray-2">
                        بازار
                    </span>
                </div>
            </div>
            <div className={`${Styles.listContainer}`}>
                <div className={Styles.autoSizer}>
                    <div
                        className={Styles.fixedSizeList}
                        onScroll={(e) => setStart(math.divide(e.target.scrollTop, 32))}
                    >
                        <div
                            style={{ height: `${list.length * 32}px`, width: "100%" }}
                            className="market-list"
                            ref={marketListRef}
                        >
                            {list.slice(start, start + 15).map((coin, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={Styles.marketItem}
                                        style={{ top: `${(start + index) * 32}px` }}
                                    >
                                        <Link
                                            to={`/trade/${marketInfo[coin]?.baseAsset}-${marketInfo[coin]?.quoteAsset}`}
                                            className={`${Styles.marketContent} px-2`}
                                        >
                                            <div className={`${Styles.item} ${Styles.symbol}`}>
                                                <div
                                                    className={`${Styles.favorite} px-2`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        favoriteHandler(coin);
                                                    }}
                                                >
                                                    <HiStar
                                                        className={`text-gray-1  pointer me-1 ${favoritesList.includes(coin)
                                                            ? Styles.activeStar
                                                            : ""
                                                            }`}
                                                        size={18}
                                                    />
                                                </div>
                                                <div className={Styles.symbolText}>
                                                    <span className="en fw-500 text-gray-4">
                                                        {marketInfo[coin]?.baseAsset}
                                                    </span>
                                                    <span className="size-5 en text-gray-1 ms-1">
                                                        / {marketInfo[coin]?.quoteAsset}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className={`${Styles.item} ${Styles.price}`}
                                                dangerouslySetInnerHTML={appendPriceMarket(coin)}
                                            ></div>
                                            <div
                                                className={`${Styles.item} ${Styles.percent}`}
                                                dangerouslySetInnerHTML={appendChangeMarket(coin)}
                                            ></div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default memo(Markets);
