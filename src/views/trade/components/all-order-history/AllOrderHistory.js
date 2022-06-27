import React, { useEffect, useState } from "react";
import TableElement from "../../../../common/element/table/Table";
import Styles from "./AllOrderHistory.module.scss";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import { useParams } from "react-router-dom";
import { orderServices } from "../../../../services";
import { DateConvert, Toastify } from "../../../../utils";
import { useOrder } from "../../../../context/OrderServises";
import { useMainApi } from "../../../../common/hooks";

export default function AllOrderHistory() {
    const { spot } = useParams();
    const [history, setHistory] = useState([]);
    const [tradelist, setTradeList] = useState([]);
    const { tradeMarketCall, tradeMarket } = useOrder();
    const { urls, get } = useMainApi()
    useEffect(() => {
        if (history.length >= 20) {
            if (tradeMarket.s === spot.split("-").join("")) {
                let history_list = history;
                history_list.pop();
                history_list.unshift(tradeMarket);

                setHistory(history_list);
            }
        }
    }, [tradeMarket]);

    useEffect(() => {
        getInitialTradeOrders();
        tradeMarketCall(spot.split("-").join(""));
    }, [spot]);

    const getInitialTradeOrders = async () => {
        try {
            const _params = {
                symbol: spot.split("-").join(""),
            };
            const res = await get(urls.ExchangeOrders, { _params });
            setHistory(res.data.trades);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    function appendTradeTime({ T }) {
        return {
            __html: DateConvert.getTime(T),
        };
    }

    function appendTradePrice({ p, m }) {
        let textColor = "text-gray-4";

        if (m) {
            textColor = "text-danger";
        } else {
            textColor = "text-success";
        }

        return {
            __html: `<span class="${textColor}">${Number(p)}</span>`,
        };
    }

    function appendTradeAmount({ q }) {
        return {
            __html: Number(q),
        };
    }

    return (
        <div className={`${Styles.allOrders} rounded-12 bg-white h-100 p-2`}>
            <div className="col-12 d-flex justify-content-between align-items-center px-2 pt-2 mb-3">
                <TriangleTitle>
                    <h2 className="m-0 fw-500 text-gray-4 size-4">تاریخچه معاملات</h2>
                </TriangleTitle>
                <span className="text-gray-3 en fw-500 size-4 ">
                    {spot.split("-").join(" / ")}
                </span>
            </div>
            <div className={`${Styles.coins} w-100 px-2`}>
                <TableElement
                    responsive
                    className="w-100"
                    fixedHeader
                    header={
                        <>
                            <th className="p-1 text-end size-5 text-gray-2">{`قیمت ${spot.split("-")[1]
                                }`}</th>
                            <th className="p-1 text-end size-5 text-gray-2">{`مقدار ${spot.split("-")[0]
                                }`}</th>
                            <th className="p-1 text-start size-5 text-gray-2">زمان</th>
                        </>
                    }
                >
                    {history.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="py-2 px-1 text-end">
                                    <span
                                        className="text-gray-4"
                                        dangerouslySetInnerHTML={appendTradePrice(item)}
                                    />
                                </td>
                                <td
                                    className="py-2 px-1 text-end"
                                    dangerouslySetInnerHTML={appendTradeAmount(item)}
                                />
                                <td className="py-2 px-1 text-start">
                                    <span
                                        className="text-gray-4"
                                        dangerouslySetInnerHTML={appendTradeTime(item)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </TableElement>
            </div>
        </div>
    );
}
