/** internal imports */
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { useMainApi } from "../../../../common/hooks";
import { Toastify } from "../../../../utils";
/** external imports */
import { Field, Form, Formik } from "formik";
import { Col } from "react-bootstrap";
/** component imports */
import DatepickerElement from "../../../../common/element/formik-inputs/datepicker/Datepicker";
import SelectElement from "../../../../common/element/formik-inputs/select/Select";
import FiatDepositTable from "../../../../tables/fiat-deposit/FiatDepositTable";

const statusOptions = [
    { value: "", label: "همه" },
    { value: "CONFIRMED", label: "انجام شده" },
    { value: "PENDING", label: "در حال انجام" },
    { value: "CANCELED", label: "لغو شده" },
    { value: "REJECTED", label: "رد شده" },
];

const FiatDepositHistory = () => {
    const formikRef = useRef(null);
    const { urls, get, loading } = useMainApi();
    const [history, setHistory] = useState([]);
    const [countHistory, setCountHistory] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const perPage = 13;

    useEffect(getHistoryHandler, [pageNumber]);

    async function getHistoryHandler(vals) {
        let { startAt, endAt } = formikRef.current?.values;

        if (vals) {
            // status = vals.status;
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

            if (vals?.status) _params.status = vals.status;

            const { data } = await get(urls.FiatDeposit, { _params });
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
                        status: "",
                        startAt: new Date().setMonth(new Date().getMonth() - 3),
                        endAt: new Date().getTime(),
                    }}
                    validate={(vals) => {
                        setPageNumber(1);
                        getHistoryHandler(vals);
                    }}
                >
                    <Form className="row d-flex align-items-center justify-content-end">
                        <Col xs={4}>
                            <Field
                                as={SelectElement}
                                name="status"
                                options={statusOptions}
                                label="وضعیت"
                                placeholder="همه"
                                optionValue="value"
                                small
                            />
                        </Col>
                        <Col xs={4}>
                            <Field
                                as={DatepickerElement}
                                name="startAt"
                                label="از تاریخ"
                                small
                            />
                        </Col>
                        <Col xs={4}>
                            <Field
                                as={DatepickerElement}
                                name="endAt"
                                label="تا تاریخ"
                                small
                            />
                        </Col>
                    </Form>
                </Formik>
            </Col>

            <FiatDepositTable
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

export default memo(FiatDepositHistory);