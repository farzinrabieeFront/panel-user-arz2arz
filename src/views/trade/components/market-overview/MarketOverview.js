import React, { Fragment, useState, useEffect, memo } from "react";
import { FiSearch, HiStar } from "react-icons/all";
import { Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useOrder } from "../../../../context/OrderServises";
import Styles from "./MarketOverview.module.scss";
import * as math from "mathjs";
import { useSelector } from "react-redux";
import TableElement from "../../../../common/element/table/Table";
import { Toastify } from "../../../../utils";
import { orderServices } from "../../../../services";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import { useMainApi } from "../../../../common/hooks";

let quoteList = ["BTC", "USDT", "ETH", "BNB", "BUSD"];

function MarketOverview() {
    const navigate = useNavigate();
    const { tradeAreas, tradeAreasAsset, marketInfo } = useSelector(
        (state) => state.market
    );
    const { marketsTicker, updateMarketsTicker, test } = useOrder();
    const { urls, post, get } = useMainApi()
    const [favoritesList, setFavoritesList] = useState([]);
    const [filterAsset, setFilterAsset] = useState("USDT");
    const [allAssets, setAllAssets] = useState([]);
    const [searchBox, setSearchBox] = useState("");

    useEffect(() => {
        getFavorites();
    }, []);


    useEffect(() => {
        if (Object.keys(tradeAreasAsset).length) {
            let new_array = [];
            tradeAreas.forEach((coin) => {
                let arr = tradeAreasAsset[coin] || [];
                new_array.push(...arr);
            });
            setAllAssets(new_array);
        }
    }, [tradeAreasAsset]);

    useEffect(() => {
        for (const marketKey in updateMarketsTicker) {
            const priceElement = document.getElementById(`c-${marketKey}`);
            const precentElement = document.getElementById(`P-${marketKey}`);

            if (priceElement && precentElement) {
                const before_price = priceElement.getAttribute("value");

                priceElement.innerText = math.bignumber(
                    Number(updateMarketsTicker[marketKey].c || 0).toFixed(8)
                );

                priceElement.setAttribute(
                    "value",
                    Number(updateMarketsTicker[marketKey].c || 0)
                );

                if (
                    math.larger(
                        Number(updateMarketsTicker[marketKey]?.c),
                        Number(before_price)
                    )
                ) {
                    priceElement.className = "text-success";
                } else {
                    priceElement.className = "text-danger";
                }

                precentElement.innerText = `${Number(
                    updateMarketsTicker[marketKey]?.P || 0
                )}%`;
                if (Number(updateMarketsTicker[marketKey]?.P || 0) > 0) {
                    precentElement.className = "text-success";
                } else {
                    precentElement.className = "text-danger";
                }
            }
        }
    }, [updateMarketsTicker]);

    const getFavorites = async () => {
        try {
            const res = await get(urls.FavoriteMarkets);
            setFavoritesList(res.data);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const favoriteHandler = async (market) => {
        try {
            const _body = { market }
            const { data, status } = await post(urls.FavoriteMarkets, _body);
            getFavorites();
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return (
        <div className={`${Styles.marketOverviewCard} p-2`}>
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
             text-gray-3 en px-1 mx-1 is-size-8`}
                        onClick={() => {
                            setFilterAsset(coin);
                            setSearchBox("");
                        }}
                    >
                        {coin}
                    </li>
                ))}
            </ul>

            <div className={`${Styles.coins} ps-2 h-100`}>
                <TableElement
                    className="w-100"
                    fixedHeader
                    header={
                        <>
                            <th className="p-1 text-end size-5 text-gray-2">تغییرات (24h)</th>
                            <th className="p-1 text-end size-5 text-gray-2">قیمت</th>
                            <th className="p-1 text-start size-5 text-gray-2">بازار</th>
                        </>
                    }
                >
                    {searchBox
                        ? allAssets
                            .filter((coin) => new RegExp(searchBox, "gi").test(coin))
                            .map((coin, index) => {
                                return (
                                    <tr key={index}>
                                        <td className={`py-2 px-1 text-end ltr`}>
                                            <span
                                                id={`P-${coin}`}
                                                className={
                                                    Number(marketsTicker[coin]?.P || 0) > 0
                                                        ? "text-success"
                                                        : "text-danger"
                                                }
                                            >
                                                {Number(marketsTicker[coin]?.P || 0)}%
                                            </span>
                                        </td>
                                        <td className="py-2 px-1 text-end">
                                            <span id={`c-${coin}`} className="text-success">
                                                {Number(marketsTicker[coin]?.c || 0)}
                                            </span>
                                        </td>
                                        <td className="py-2 px-1 text-start ltr">
                                            <div className="d-flex align-items-center">
                                                <HiStar
                                                    className={`${favoritesList.includes(coin)
                                                        ? Styles.activeStar
                                                        : ""
                                                        } text-gray-1 pointer me-1`}
                                                    size={16}
                                                    onClick={() => favoriteHandler(coin)}
                                                />
                                                <span
                                                    className="pointer d-flex align-items-center"
                                                    onClick={() =>
                                                        navigate(
                                                            `/trade/${marketInfo[coin]?.baseAsset}-${marketInfo[coin]?.quoteAsset}`
                                                        )
                                                    }
                                                >
                                                    <span className="en fw-500 text-gray-4">
                                                        {marketInfo[coin]?.baseAsset}
                                                    </span>
                                                    <span className="en fw-500 text-gray-1 mx-1">
                                                        /
                                                    </span>
                                                    <span className="en fw-500 text-gray-1">
                                                        {marketInfo[coin]?.quoteAsset}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        : filterAsset === "bookmark"
                            ? favoritesList
                                .filter((coin) => marketInfo[coin])
                                .map((coin, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="py-2 px-1 text-end">
                                                <span
                                                    id={`P-${coin}`}
                                                    className={
                                                        Number(marketsTicker[coin]?.P || 0) > 0
                                                            ? "text-success"
                                                            : "text-danger"
                                                    }
                                                >
                                                    {Number(marketsTicker[coin]?.P || 0)}%
                                                </span>
                                            </td>
                                            <td className="py-2 px-1 text-end">
                                                <span id={`c-${coin}`} className="text-success">
                                                    {Number(marketsTicker[coin]?.c || 0).toFixed(8)}
                                                </span>
                                            </td>
                                            <td className="py-2 px-1 text-start ltr">
                                                <div className="d-flex align-items-center">
                                                    <HiStar
                                                        className={`${favoritesList.includes(coin)
                                                            ? Styles.activeStar
                                                            : ""
                                                            } text-gray-1 pointer me-1`}
                                                        size={16}
                                                        onClick={() => favoriteHandler(coin)}
                                                    />
                                                    <span
                                                        className="pointer d-flex align-items-center"
                                                        onClick={() =>
                                                            navigate(
                                                                `/trade/${marketInfo[coin]?.baseAsset}-${marketInfo[coin]?.quoteAsset}`
                                                            )
                                                        }
                                                    >
                                                        <span className="en fw-500 text-gray-4">
                                                            {marketInfo[coin]?.baseAsset}
                                                        </span>
                                                        <span className="en fw-500 text-gray-1 mx-1">
                                                            /
                                                        </span>
                                                        <span className="en fw-500 text-gray-1">
                                                            {marketInfo[coin]?.quoteAsset}
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            : tradeAreasAsset[filterAsset]
                                ? tradeAreasAsset[filterAsset].map((coin, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className={`py-2 px-1 text-end ltr`}>
                                                <span
                                                    id={`P-${coin}`}
                                                    className={
                                                        Number(marketsTicker[coin]?.P || 0) > 0
                                                            ? "text-success"
                                                            : "text-danger"
                                                    }
                                                >
                                                    {Number(marketsTicker[coin]?.P || 0)}%
                                                </span>
                                            </td>
                                            <td className="py-2 px-1 text-end">
                                                <span
                                                    id={`c-${coin}`}
                                                    className="text-success"
                                                    value={Number(marketsTicker[coin]?.c || 0)}
                                                >
                                                    {parseFloat(
                                                        Number(marketsTicker[coin]?.c || 0).toFixed(8)
                                                    )}
                                                </span>
                                            </td>
                                            <td className="py-2 px-1 text-start ltr">
                                                <div className="d-flex align-items-center">
                                                    <HiStar
                                                        className={`${favoritesList.includes(coin)
                                                            ? Styles.activeStar
                                                            : ""
                                                            } text-gray-1  pointer me-1`}
                                                        size={16}
                                                        onClick={() => favoriteHandler(coin)}
                                                    />
                                                    <span
                                                        className="pointer d-flex align-items-center"
                                                        onClick={() =>
                                                            navigate(
                                                                `/trade/${marketInfo[coin]?.baseAsset}-${marketInfo[coin]?.quoteAsset}`
                                                            )
                                                        }
                                                    >
                                                        <span className="en fw-500 text-gray-4">
                                                            {marketInfo[coin]?.baseAsset}
                                                        </span>
                                                        <span className="en fw-500 text-gray-1 mx-1">/</span>
                                                        <span className="en fw-500 text-gray-1">
                                                            {marketInfo[coin]?.quoteAsset}
                                                        </span>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                                : null}
                </TableElement>
            </div>
        </div>
    );
}

export default memo(MarketOverview);
