/** internal import */
import { useMemo, useState } from "react";
import Styles from "./OrderForms.module.scss";
/** components import */
import Market from "../forms/market/Market";
import Limit from "../forms/limit/Limit";

export default function OrderForms({ refreshHistory }) {
    const [activeTab, setActiveTab] = useState("market");

    const memoizedValue = useMemo(() => {
        if (activeTab === "limit")
            return <Limit refreshHistory={refreshHistory} />
        else return <Market refreshHistory={refreshHistory} />
    }, [activeTab, refreshHistory]);


    return (
        <div className={`${Styles.orderForms} rounded-12 bg-white h-100`}>
            <div className={`${Styles.orderTab} row`}>
                <div className="col-6">
                    <div
                        className={`${Styles.marketTab} ${activeTab === "market" && Styles.active} text-center pointer w-100`}
                    >
                        <div
                            onClick={() => setActiveTab("market")}
                            className={`${activeTab === "market" ? Styles.active : ""} text-center py-2`}
                        >
                            <span className="fw-700 size-4">تبدیل</span>
                            <span className="fw-700 en size-4 me-1">( Market )</span>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <div
                        className={`${Styles.limitTab} ${activeTab === "limit" && Styles.active} text-center pointer w-100`}
                    >
                        <div
                            onClick={() => setActiveTab("limit")}
                            className={`${activeTab === "limit" ? Styles.active : ""} text-center py-2`}
                        >
                            <span className="fw-700 size-4">اتوماتیک</span>
                            <span className="fw-700 size-4 en me-1">( Limit )</span>
                        </div>
                    </div>
                </div>
            </div>

            {memoizedValue}
        </div>
    );
}
