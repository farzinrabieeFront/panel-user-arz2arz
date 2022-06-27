/** internal imports */
import Styles from "./Trade.module.scss";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
/** external imports */
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
/** component imports */
import TradingviewWidget from "./components/tradingview/TradingviewWidget";
import OrderForms from "./components/order-forms/OrderForms";
import ProgressBar from "./components/progress-bar/ProgressBar";
import Prices from "./components/prices/Prices";
import HistoryTrade from "./components/history-trade/HistoryTrade";
import AllOrderHistory from "./components/all-order-history/AllOrderHistory";
import Markets from "./components/markets/Markets";

function Trade(props, ref) {
    const historyRef = useRef();
    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const scroll = document.querySelector("#root");
        scroll.scrollIntoView({ top: 0, behavior: "smooth", block: "start" });
        // window.scrollTo({
        //   top: 0,
        //   behavior: "smooth",
        // });
    }, [pathname]);

    useImperativeHandle(
        ref,
        () => ({
            testFunc(a) {
                console.log("useNotification", a);
            },
        }),
        []
    );

    const refreshHistoryHandler = () =>
        historyRef.current.refreshHistoryHandler();

    const tableTabs = [
        { title: "بازار" },
        { title: "سفارش ها" },
        { title: "تاریخچه معاملات" },
    ];

    return (
        <div className={`${Styles.tradePage}`}>
            <div className={`${Styles.gridItem} ${Styles.orderform}`}>
                <OrderForms refreshHistory={refreshHistoryHandler} />
            </div>

            <div className={`${Styles.gridItem} ${Styles.prices}`}>
                <Prices />
            </div>

            <div className={`${Styles.gridItem} ${Styles.tradingView}`}>
                <TradingviewWidget />
            </div>

            <div className={`${Styles.gridItem} ${Styles.progressBar}`}>
                <ProgressBar />
            </div>

            <div className={`${Styles.mobileWrapper}`}>
                <div
                    className={`${Styles.gridItem} ${Styles.tabs} d-flex align-items-center justify-content-md-start d-lg-none size-3 fw-500 text-gray-3 mt-4 pr-5`}
                >
                    {tableTabs.map((item, index) => (
                        <span
                            key={index}
                            className={`${activeTab === index && Styles.active} pointer`}
                            onClick={() => {
                                setActiveTab(index);
                            }}
                        >
                            {item.title}
                        </span>
                    ))}
                </div>

                <div
                    className={`${Styles.gridItem} ${Styles.market} d-${activeTab === 0 ? "block" : "none"
                        } d-lg-block`}
                >
                    <Markets />
                </div>

                <div
                    className={`${Styles.gridItem} ${Styles.orderHistory} d-${activeTab === 1 ? "block" : "none"
                        } d-lg-block`}
                >
                    <HistoryTrade ref={historyRef} />
                </div>

                <div
                    className={`${Styles.gridItem} ${Styles.allOrderHistory} d-${activeTab === 2 ? "block" : "none"
                        } d-lg-block`}
                >
                    <AllOrderHistory />
                </div>
            </div>
        </div>
    );
}

export default forwardRef(Trade);
