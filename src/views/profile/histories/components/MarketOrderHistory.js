/** internal import */
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { Toastify } from "../../../../utils";
import { useMainApi } from "../../../../common/hooks";
/** external import */
import { Field, Form, Formik } from "formik";
import { Col } from "react-bootstrap";
/** component import */
import DatepickerElement from "../../../../common/element/formik-inputs/datepicker/Datepicker";
import MarketOrdersTable from "../../../../tables/market-orders/MarketOrdersTable";

const MarketOrderHistory = () => {
    const formikRef = useRef(null);
    const { urls, get, loading } = useMainApi();

    const [pageNumber, setPageNumber] = useState(1);
    const [history, setHistory] = useState([]);
    const [countHistory, setCountHistory] = useState(0);
    const perPage = 13;

    useEffect(getFiatMarketHistory, [pageNumber]);

    async function getFiatMarketHistory(vals) {
        let { startAt, endAt } = formikRef.current?.values;

        if (vals) {
            startAt = vals.startAt;
            endAt = vals.endAt;
        }

        try {
            const _params = {
                perPage,
                pageNumber,
                status: "CLOSED",
                startAt: new Date(startAt).setHours(0, 0, 0, 0),
                endAt: new Date(endAt).setHours(23, 59, 59, 59),
            };

            const { data } = await get(urls.SpotOrders, { _params });

            setHistory(data.result);
            setCountHistory(data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    return (
        <Fragment>
            <Col lg={6} md={12}>
                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        startAt: new Date().setMonth(new Date().getMonth() - 3),
                        endAt: new Date().getTime(),
                    }}
                    validate={(vals) => {
                        setPageNumber(1);
                        getFiatMarketHistory(vals);
                    }}
                >
                    <Form className="row d-flex align-items-center justify-content-end">
                        <Col lg={5} xs={6}>
                            <Field
                                label="???? ??????????"
                                name="startAt"
                                as={DatepickerElement}
                                small
                            />
                        </Col>
                        <Col lg={5} xs={6}>
                            <Field
                                label="???? ??????????"
                                name="endAt"
                                as={DatepickerElement}
                                small
                            />
                        </Col>
                    </Form>
                </Formik>
            </Col>

            <MarketOrdersTable
                data={history}
                loading={loading}
                isPaiginate
                totalRecords={countHistory}
                pageLimit={perPage}
                pageNumber={pageNumber}
                handleChangePage={setPageNumber} />
        </Fragment>
    )
};

export default memo(MarketOrderHistory);
