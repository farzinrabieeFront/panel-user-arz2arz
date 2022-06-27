/** internal import */
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { Toastify } from "../../../../utils";
import { useMainApi } from "../../../../common/hooks";
/** external import */
import { Field, Form, Formik } from "formik";
import { Col } from "react-bootstrap";
/** component import */
import DatepickerElement from "../../../../common/element/formik-inputs/datepicker/Datepicker";
import LimitOrdersTable from "../../../../tables/limit-orders/LimitOrdersTable";

const LimitOrderHistory = () => {
    const { urls, get, loading } = useMainApi();
    const [pageNumber, setPageNumber] = useState(1);
    const [history, setHistory] = useState([]);
    const [countHistory, setCountHistory] = useState(0);
    const perPage = 13;

    useEffect(getFiatMarketHistory, [pageNumber]);

    async function getFiatMarketHistory() {
        try {
            const _params = {
                perPage,
                pageNumber,
                status: "OPEN",
            };

            const { data } = await get(urls.SpotOrders, { _params });

            setHistory(data.result);
            setCountHistory(data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    return (
        <LimitOrdersTable
            data={history}
            loading={loading}
            isPaiginate
            totalRecords={countHistory}
            pageLimit={perPage}
            pageNumber={pageNumber}
            handleChangePage={setPageNumber} />

    )
};

export default memo(LimitOrderHistory);
