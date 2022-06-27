/** internal imports */
import { Fragment, memo, useEffect, useRef, useState } from "react";
import { useMainApi } from "../../../../common/hooks";
import { Toastify } from "../../../../utils";
/** external imports */
import { Col } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
/** component imports */
import ConfirmModal from "../../../../components/confirm-modal/ConfirmModal";
import SelectElement from "../../../../common/element/formik-inputs/select/Select";
import DatepickerElement from "../../../../common/element/formik-inputs/datepicker/Datepicker";
import FiatWithdrawTable from "../../../../tables/fiat-withdraw/FiatWithdrawTable";

const statusOptions = [
    { value: "", label: "همه" },
    { value: "CONFIRMED", label: "انجام شده" },
    { value: "PENDING", label: "در حال انجام" },
    { value: "CANCELED", label: "لغو شده" },
    { value: "REJECTED", label: "رد شده" },
];

const FiatWithdrawHistory = () => {
    const formikRef = useRef(null);
    const { urls, get, patch, loading } = useMainApi();
    const [history, setHistory] = useState([]);
    const [countHistory, setCountHistory] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [canceleWithdraw, setCanceleWithdraw] = useState();
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

            if (vals?.status) _params.status = vals.status;

            const { data } = await get(urls.FiatWithdraw, { _params });
            setHistory(data.result);
            setCountHistory(data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    async function canceleWithdrawHandler(vals) {
        try {
            const _body = {
                trackingCode: vals,
            };
            const { message } = await patch(urls.CancelFiatWithdraw, _body);
            Toastify.success(message);
            setCanceleWithdraw();
            getHistoryHandler();
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
                                label="وضعیت"
                                name="status"
                                placeholder="همه"
                                options={statusOptions}
                                as={SelectElement}
                                optionValue="value"
                                small
                            />
                        </Col>
                        <Col xs={4}>
                            <Field
                                label="از تاریخ"
                                name="startAt"
                                as={DatepickerElement}
                                small
                            />
                        </Col>
                        <Col xs={4}>
                            <Field
                                label="تا تاریخ"
                                name="endAt"
                                as={DatepickerElement}
                                small
                            />
                        </Col>
                    </Form>
                </Formik>
            </Col>

            <FiatWithdrawTable
                data={history}
                loading={loading}
                isPaiginate
                totalRecords={countHistory}
                pageLimit={perPage}
                pageNumber={pageNumber}
                handleChangePage={setPageNumber}
                setCanceleWithdraw={setCanceleWithdraw} />

            {canceleWithdraw ? (
                <ConfirmModal
                    show={canceleWithdraw}
                    onHide={() => setCanceleWithdraw()}
                    onConfirm={() => canceleWithdrawHandler(canceleWithdraw)}
                >
                    <span className="text-gray-3 size-4">
                        آیا از لغو این درخواست برداشت تومانی اطمینان دارید؟
                    </span>
                </ConfirmModal>
            ) : null}
        </Fragment>
    )
};

export default memo(FiatWithdrawHistory);
