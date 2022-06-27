/** internal imports */
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { useMainApi } from "../../../../common/hooks";
import { Toastify } from "../../../../utils";
/** external imports */
import { Col } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
/** component imports */
import DatepickerElement from "../../../../common/element/formik-inputs/datepicker/Datepicker";
import SpotDepositTable from "../../../../tables/spot-deposit/SpotDepositTable";



const SpotDepositHistory = () => {
    const formikRef = useRef(null);
    const { urls, get, loading } = useMainApi();
    const [pageNumber, setPageNumber] = useState(1);
    const [spotHistory, setSpotHistory] = useState([]);
    const [countHistory, setCountHistory] = useState(0);
    const [activeItem, setActiveItem] = useState();
    const perPage = 13;

    useEffect(getHistoryHandler, [pageNumber]);

    async function getHistoryHandler(vals) {
        let { startAt, endAt } = formikRef.current?.values;

        if (vals) {
            startAt = vals.startAt;
            endAt = vals.endAt;
        }

        try {
            const _params = {
                perPage,
                pageNumber,
                startAt: new Date(startAt).setHours(0, 0, 0, 0),
                endAt: new Date(endAt).setHours(23, 59, 59, 59),
            };

            const { data } = await get(urls.SpotDeposit, { _params });
            setCountHistory(data.count);
            setSpotHistory(data.result);
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
                        getHistoryHandler(vals);
                    }}
                >
                    {({ dirty }) => {
                        return (
                            <Form className="row d-flex align-items-center justify-content-end">
                                <Col lg={5} xs={6}>
                                    <Field
                                        label="از تاریخ"
                                        name="startAt"
                                        as={DatepickerElement}
                                        small
                                    />
                                </Col>
                                <Col lg={5} xs={6}>
                                    <Field
                                        label="تا تاریخ"
                                        name="endAt"
                                        as={DatepickerElement}
                                        small
                                    />
                                </Col>
                            </Form>
                        );
                    }}
                </Formik>
            </Col>

            <SpotDepositTable
                data={spotHistory}
                loading={loading}
                isPaiginate
                totalRecords={countHistory}
                pageLimit={perPage}
                pageNumber={pageNumber}
                handleChangePage={setPageNumber} />
        </Fragment>
    )
};

export default memo(SpotDepositHistory);
