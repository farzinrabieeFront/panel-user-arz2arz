/** internal import */
import { memo, useEffect, useRef, useState } from "react";
import { DateConvert, Toastify } from "../../../../utils";
import Styles from "./SpotOrders.module.scss";
import { useMainApi } from "../../../../common/hooks";
/** external import */
import { Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import {
    BsCheck,
    HiArrowNarrowLeft,
    BsCheckAll,
    BsX,
    FiChevronLeft,
} from "react-icons/all";
import { Link, useLocation } from "react-router-dom";
/** component import */
import CustomizedButton from "../../../../components/form/button/Button";
import DatepickerElement from "../../../../common/element/formik-inputs/datepicker/Datepicker";
import TableElement from "../../../../common/element/table/Table";
import SpotHistoryModal from "./modal/SpotHistoryModal";
import OpenOrders from "./OpenOrders";

const statusList = {
    NEW: { variant: "warning", title: "سفارش باز", icon: <BsCheck size={18} /> },
    PENDING: {
        variant: "warning",
        title: "در حال بررسی",
        icon: <BsCheck size={18} />,
    },
    CHECKING: {
        variant: "warning",
        title: "در حال بررسی",
        icon: <BsCheck size={18} />,
    },
    PARTIALLY_FILLED: {
        variant: "info",
        title: "در حال بررسی",
        icon: <BsCheck size={18} />,
    },
    PENDING_CANCEL: {
        variant: "warning",
        title: "لغو شده",
        icon: <BsX size={18} />,
    },
    FILLED: {
        variant: "success",
        title: "انجام شده",
        icon: <BsCheckAll size={18} />,
    },
    EXPIRED: {
        variant: "secondary",
        title: "منقضی شده",
        icon: <BsX size={18} />,
    },
    REJECTED: { variant: "danger", title: "رد شده", icon: <BsX size={18} /> },
    CANCELED: { variant: "danger", title: "لغو شده", icon: <BsX size={18} /> },
};

const SpotHistory = () => {
    const { state } = useLocation();
    const formikRef = useRef(null);
    const { urls, get, loading } = useMainApi()

    const [pageNumber, setPageNumber] = useState(1);
    const [ordersType, setOrdersType] = useState("");
    const [orderHistory, setOrderHistory] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [orderId, setOrderId] = useState();
    const [totalRecord, setTotalRecord] = useState(0);
    const perPage = 13;

    useEffect(getSpotMarketHistory, [pageNumber]);

    useEffect(() => {
        if (state?.type) {
            setOrdersType(state.type);
        } else {
            setOrdersType("openOrders");
        }
    }, [state]);


    async function getSpotMarketHistory(vals) {
        let { startAt,
            endAt } = formikRef.current?.values;

        if (vals) {
            startAt = vals.startAt
            endAt = vals.endAt
        }

        try {
            const _params = {
                perPage,
                pageNumber,
                startAt: new Date(startAt).setHours(0, 0, 0, 0),
                endAt: new Date(endAt).setHours(23, 59, 59, 59)
            };
            const { data } = await get(urls.SpotOrders, { _params });

            setOrderHistory(data.result);
            setTotalRecord(data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return [
        <Row
            className={`${ordersType === "openOrders" ? "mt-3 mt-md-5" : ""
                } justify-content-between align-items-end mb-3`}
        >
            <Col md={6} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center justify-content-start">
                    <Link to="/my/orders/spot" state={{ type: "openOrders" }}>
                        <CustomizedButton
                            variant={`${ordersType === "openOrders" ? "blue" : "light"}`}
                            className={`${Styles.tabBtn} size-5 fw-500 ms-3`}
                        >
                            سفارش‌های باز
                        </CustomizedButton>
                    </Link>
                    <Link to="/my/orders/spot" state={{ type: "allOrders" }}>
                        <CustomizedButton
                            variant={`${ordersType === "allOrders" ? "blue" : "light"}`}
                            className={`${Styles.tabBtn} size-5 fw-500`}
                        >
                            تاریخچه سفارش‌ها
                        </CustomizedButton>
                    </Link>
                </div>
            </Col>
            {ordersType === "openOrders" ? null : (
                <Col md={6}>
                    <Formik
                        innerRef={formikRef}
                        initialValues={{ startAt: new Date().setMonth(new Date().getMonth() - 3), endAt: new Date().getTime() }}
                        validate={(vals) => {
                            setPageNumber(1)
                            getSpotMarketHistory(vals)
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
            )}
        </Row>
        ,
        ordersType === "openOrders" ?
            <OpenOrders />
            :
            <TableElement
                responsive
                striped
                loading={loading}
                header={[
                    <th>جفت ارز</th>,
                    <th>تاریخ سفارش‌</th>,
                    <th>نوع سفارش</th>,
                    <th>مقدار نهایی پرداختی</th>,
                    <th>قیمت معامله</th>,
                    <th>مقدار دریافتی انجام شده</th>,
                    <th>وضعیت</th>,
                    <th className="text-start">جزئیات</th>
                ]}
                isPaiginate
                handleChangePage={setPageNumber}
                totalRecords={totalRecord}
                pageLimit={perPage}
            >
                {orderHistory.map((item, index) => {
                    return (
                        <tr
                            key={index}
                            className={`${Styles.trTable} pointer`}
                            onClick={() => {
                                setOpenModal(true);
                                setOrderId(item._id);
                            }}
                        >
                            <td>
                                <span className="d-flex align-items-center">
                                    <span className="en text-gray-4">{item.baseAsset}</span>
                                    <HiArrowNarrowLeft
                                        className="text-gray-1 mx-1"
                                        size={14}
                                    />
                                    <span className="en text-gray-4">{item.quoteAsset}</span>
                                </span>
                            </td>
                            <td>
                                <span className="text-gray-4 d-inline-block ">
                                    {DateConvert.getTime(item.createdAt)}
                                    <span className="mx-1"></span>
                                    {DateConvert.toShamsiDate(item.createdAt)}
                                </span>
                            </td>
                            <td>
                                {item.type === "MARKET" ? (
                                    <span className="text-gray-4">
                                        تبدیل <span className="en">(Market)</span>
                                    </span>
                                ) : (
                                    <span className="text-gray-4">
                                        اتوماتیک <span className="en">(Limit)</span>
                                    </span>
                                )}
                            </td>
                            <td className="ltr">
                                <span className="text-gray-4">
                                    {Number(item.filledQty).toFixed(8)}
                                </span>{" "}
                                {item.baseAsset}
                            </td>
                            <td>
                                <span className="text-gray-4">
                                    {Number(item.finalPrice).toFixed(8)}
                                </span>
                            </td>
                            <td className="ltr">
                                <span className="text-gray-4">
                                    {Number(item.filledQuoteQty).toFixed(8)}
                                </span>{" "}
                                {item.quoteAsset}
                            </td>
                            <td>
                                <StatusBadge badgeClassName="d-none" status={item.status} />
                            </td>
                            <td className="text-start pointer">
                                <FiChevronLeft size={20} className={Styles.modalIcon} />
                            </td>
                        </tr>
                    );
                })}
            </TableElement>
        ,
        openModal ?
            <SpotHistoryModal
                show={openModal}
                id={orderId}
                onHide={() => setOpenModal()}
            />
            : null
    ]
};

export default memo(SpotHistory);
