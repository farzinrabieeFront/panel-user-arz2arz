/** internal imports */
import { DateConvert, Toastify } from "../../../../utils";
import { useOrder } from "../../../../context/OrderServises";
import Styles from "./HistoryTrade.module.scss";
import { useMainApi, useCoreApi } from "../../../../common/hooks";

/** package imports */
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { Col } from "react-bootstrap";
import {
    BiChevronLeft,
    HiArrowNarrowLeft,
    BsCheckAll,
    BsX,
    IoIosArrowBack,
    BsCheck,
} from "react-icons/all";
import { Link, useParams } from "react-router-dom";
import * as math from "mathjs";
/** component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import LimitOrdersTable from "../../../../tables/limit-orders/LimitOrdersTable";
import MarketOrdersTable from "../../../../tables/market-orders/MarketOrdersTable";
import CustomizedSwitch from "../../../../components/switch/CustomizedSwitch";
import CustomizedButton from "../../../../components/form/button/Button";
import { useNotification } from "../../../../context/NotificationServises";



function HistoryTrade(props, ref) {
    const { spot } = useParams();
    const { openOrders } = useOrder();
    const { notification } = useNotification();
    const [type, setType] = useState("open-orders");
    const [marketFilter, setMarlketFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeItem, setActiveItem] = useState();
    const [history, setHistory] = useState([]);
    const { urls, get, post } = useMainApi();
    const perPage = 5;

    useEffect(() => {
        setMarlketFilter(false);
    }, [spot]);

    useEffect(() => {
        setLoading(true);
        getHistoryHandler(marketFilter);
    }, [spot, marketFilter, notification, type]);

    const closeOrderHandler = async (vals) => {
        try {
            const _body = {
                marketId: vals,
            };
            const res = await post(urls.CloseLimitOrder, _body);
            Toastify.success(res.message);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    useImperativeHandle(
        ref,
        () => ({
            refreshHistoryHandler() {
                getHistoryHandler(marketFilter);
            },
        }),
        []
    );

    const getHistoryHandler = async (filter = false) => {
        try {
            const _params = {
                perPage,
                pageNumber: 1,
                status: "CLOSED",
            };

            if (type === "open-orders") _params.status = "OPEN";

            if (filter) _params.pairedSymbol = spot.split("-").join("");

            const res = await get(urls.SpotOrders, { _params });
            setHistory(res.data.result);
        } catch (error) {
            Toastify.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${Styles.tradeHistory} rounded-12 bg-white h-100 p-2`}>
            <div className="col-12 px-2 pt-2 mb-3">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-md-start col-12 col-md-7">
                        <TriangleTitle>
                            <h2 className="text-gray-4 mb-0 fw-700 size-4  ms-3 ms-sm-5">
                                سفارش ها
                            </h2>
                        </TriangleTitle>

                        <div className="d-flex align-items-center col-12 col-md-8 justify-content-start mt-md-0 mr-md-0 mr-1 mt-3">
                            <CustomizedButton
                                variant={type === "open-orders" ? "blue" : "light"}
                                className={`${Styles.tabBtn} size-5 fw-500`}
                                size="sm"
                                onClick={() => setType("open-orders")}
                            >
                                سفارش‌های باز
                            </CustomizedButton>
                            <CustomizedButton
                                variant={type === "trade-orders" ? "blue" : "light"}
                                className={`${Styles.tabBtn} size-5 fw-500 me-4`}
                                size="sm"
                                onClick={() => setType("trade-orders")}
                            >
                                تاریخچه سفارش‌ها
                            </CustomizedButton>
                        </div>
                    </div>
                    {history.length ? (
                        <div className="d-flex align-items-center col-12 col-md-5 justify-content-between justify-content-md-end mt-md-0 mt-3">
                            <div className="ms-5 center-content">
                                <CustomizedSwitch
                                    label={`فقط ${spot.split("-").join("/")}`}
                                    handleChange={() => {
                                        setMarlketFilter((prev) => !prev);
                                    }}
                                    id="market-filter"
                                    checked={marketFilter}
                                />
                            </div>
                            <Link
                                to={`/my/orders/spot`}
                                className="size-5 center-content text-blue"
                            >
                                همه سفارش ها <BiChevronLeft className="me-1" size="19  " />
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className={`${Styles.coins} w-100 px-2`}>
                <Col lg={12}>
                    {type === "open-orders" ? (
                        <LimitOrdersTable
                            data={history}
                            loading={loading}
                        />
                    ) : (
                        <MarketOrdersTable
                            data={history}
                            loading={loading}
                        />
                    )}
                </Col>
            </div>
        </div>
    );
}

export default forwardRef(HistoryTrade);
