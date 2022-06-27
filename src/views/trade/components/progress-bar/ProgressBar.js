import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMainApi } from "../../../../common/hooks";
import { useOrder } from "../../../../context/OrderServises";
import { orderServices } from "../../../../services";
import { Toastify } from "../../../../utils";
import Styles from "./ProgressBar.module.scss";

export default function ProgressBar() {
    const { spot } = useParams();
    const { depthMarketCall, depthMarket } = useOrder();
    const [depthMarketInfo, setDepthMarketInfo] = useState({});
    const { urls, get } = useMainApi()
    useEffect(() => {
        getInitialTradeOrders();
        depthMarketCall(spot.split("-").join(""));
    }, [spot]);

    useEffect(() => {
        setDepthMarketInfo(depthMarket);
    }, [depthMarket]);

    const getInitialTradeOrders = async () => {
        try {
            const _params = {
                symbol: spot.split("-").join(""),
            };
            const res = await get(urls.ExchangeOrders, { _params });
            setDepthMarketInfo(res.data.depth);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    function appendAskDepth() {
        return {
            __html: `${depthMarketInfo.asksPercentage || 0}%`,
        };
    }

    function appendBidDepth() {
        return {
            __html: `${depthMarketInfo.bidsPercentage || 0}%`,
        };
    }

    return (
        <div
            className={`${Styles.progressBar} d-flex flex-column justify-content-between p-3 bg-white h-100`}
        >
            <div className="d-flex justify-content-between mb-1">
                <div className="text-success center-content">
                    <span className="size-5 fw-500">خرید</span>
                    <span
                        className="size-4 me-2 en fw-500"
                        dangerouslySetInnerHTML={appendAskDepth()}
                    >
                        {/* {depthMarketInfo.asksPercentage}% */}
                    </span>
                </div>
                <div className="text-danger center-content">
                    <span
                        className="size-4 ms-2 en fw-500"
                        dangerouslySetInnerHTML={appendBidDepth()}
                    >
                        {/* {depthMarketInfo.bidsPercentage}% */}
                    </span>
                    <span className="size-5 fw-500">فروش</span>
                </div>
            </div>
            <div className={Styles.bar}>
                <div
                    className={Styles.buy}
                    style={{ width: `${depthMarketInfo.asksPercentage}%` }}
                ></div>
                <div
                    className={Styles.sell}
                    style={{ width: `${depthMarketInfo.bidsPercentage}%` }}
                ></div>
            </div>
        </div>
    );
}
