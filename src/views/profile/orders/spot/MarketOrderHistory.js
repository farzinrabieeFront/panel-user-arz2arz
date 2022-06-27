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
  IoIosArrowBack,
} from "react-icons/all";
import { Link, useLocation } from "react-router-dom";
/** component import */
import CustomizedButton from "../../../../components/form/button/Button";
import DatepickerElement from "../../../../common/element/formik-inputs/datepicker/Datepicker";
import SpotHistoryModal from "./modal/SpotHistoryModal";
import OpenOrders from "./OpenOrders";

import NewTable, {
  StatusBadge,
  TableAccordion,
  TableRow,
  TableCell,
} from "../../../../common/element/new-table/NewTable";

const MarketOrderHistory = () => {
  const { state } = useLocation();
  const formikRef = useRef(null);
  const { urls, get, loading } = useMainApi();

  const [pageNumber, setPageNumber] = useState(1);
  const [ordersType, setOrdersType] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState();
  const [activeItem, setActiveItem] = useState();
  const [totalRecord, setTotalRecord] = useState(0);
  const perPage = 13;

  const cols = {
    closed: [
      { headerName: "جفت ارز", className: "ps-md-0 me-2", xs: 6, md: 2 },
      { headerName: "تاریخ سفارش", className: "p-0", xs: 4, md: 2 },
      { headerName: "وضعیت", className: "d-md-none p-0", xs: 2, md: 2 },
      { headerName: "نوع", className: "d-none d-md-flex", md: 1 },
      {
        headerName: "مقدار نهایی پرداختی",
        className: "d-none d-md-flex pe-md-4",
        md: 1,
      },
      {
        headerName: "قیمت معامله",
        className: "d-none d-md-flex me-md-5 pe-md-5",
        md: 1,
      },
      {
        headerName: "مقدار نهایی دریافتی ",
        className: "d-none d-md-flex me-md-5 pe-md-3",
        md: 2,
      },
      {
        headerName: "وضعیت",
        className: "d-none d-md-flex me-lg-0 pe-lg-0 justify-content-center",
        md: 1,
      },
    ],
    open: [
      { headerName: "جفت ارز", className: "ps-md-0 pe-3", xs: 6, md: 2 },
      {
        headerName: "تاریخ سفارش",
        className: "me-md-2",
        xs: 4,
        md: 2,
      },
      {
        headerName: "وضعیت",
        className: "d-md-none",
        xs: 2,
        md: 0,
      },
      {
        headerName: "مقدار پرداختی کل",
        className: "d-none d-md-flex justify-content-start pe-md-0",
        md: 2,
      },
      {
        headerName: "انجام شده",
        className: "d-none d-md-flex justify-content-start",
        md: 1,
      },
      {
        headerName: "قیمت",
        className: "d-none d-md-flex me-md-5",
        md: 2,
      },
      {
        headerName: "وضعیت",
        className: "d-none d-md-flex justify-content-start",
        xs: 2,
        md: 1,
      },
      {
        headerName: "عملیات",
        className: "d-none d-md-flex pe-md-5",
        xs: 2,
        md: 2,
      },
    ],
  };

  let openStatus = {
    NEW: { variant: "warning", title: "سفارش باز" },
    PENDING: {
      variant: "warning",
      title: "در حال بررسی",
    },
  };

  useEffect(getSpotMarketHistory, [pageNumber, ordersType]);

  useEffect(() => {
    if (state?.type) {
      setOrdersType(state.type);
    } else {
      setOrdersTsetOpenModalype("openOrders");
    }
  }, [state]);

  async function getSpotMarketHistory(vals) {
    try {
      const _params = {
        perPage,
        pageNumber,
        status: "OPEN",
      };

      if (ordersType === "allOrders") {
        let { startAt, endAt } = formikRef?.current?.values;

        if (vals) {
          startAt = vals.startAt;
          endAt = vals.endAt;
        }

        _params.status = "CLOSED";
        _params.startAt = new Date(startAt).setHours(0, 0, 0, 0);
        _params.endAt = new Date(endAt).setHours(23, 59, 59, 59);
      }

      const { data } = await get(urls.SpotOrders, { _params });

      setOrderHistory(data.result);
      setTotalRecord(data.count);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return [
    <Row className={`justify-content-between align-items-end mb-3 mt-4`}>
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
            initialValues={{
              startAt: new Date().setMonth(new Date().getMonth() - 3),
              endAt: new Date().getTime(),
            }}
            validate={(vals) => {
              setPageNumber(1);
              getSpotMarketHistory(vals);
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
    </Row>,
    ordersType === "openOrders" ? (
      <NewTable
        headerItems={cols.open}
        loading={loading}
        isPaiginate
        pageLimit={perPage}
        pageNumber={pageNumber}
        totalRecords={totalRecord}
        handleChangePage={setPageNumber}
      >
        {orderHistory?.map((item, index) => (
          <TableRow
            key={index}
            className={`${Styles.tr} ${
              activeItem === index && Styles.active
            } text-gray-4`}
          >
            <TableAccordion
              xs="12"
              md="4"
              className={`${Styles.shownItems} px-0`}
              activeDropdown={() => {
                activeItem === index ? setActiveItem() : setActiveItem(index);
              }}
            >
              <TableCell xs={6} md="6" className="fw-400 FaNum pe-md-3">
                <IoIosArrowBack
                  size={16}
                  className={`${Styles.dropdownIc} text-gray-2 d-md-none ms-3`}
                />
                <span className="d-flex align-items-center">
                  <span className="en text-gray-4">{item.baseAsset}</span>
                  <HiArrowNarrowLeft className="text-gray-1 mx-1" size={14} />
                  <span className="en text-gray-4">{item.quoteAsset}</span>
                </span>
              </TableCell>
              <TableCell xs={2} md="3">
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-start">
                  <span className="w-100">
                    {DateConvert.toShamsiDate(item.createdAt)}
                  </span>
                  <span className="mx-1"></span>
                  <span className="w-100">
                    {DateConvert.getTime(item.createdAt)}
                  </span>
                </div>
              </TableCell>
              <TableCell
                xs="4"
                md="0"
                className="d-md-none justify-content-center"
              >
                <span
                  className={`text-${
                    openStatus[item.status]?.variant
                  } text-nowrap size-5`}
                >
                  {openStatus[item.status]?.title}
                </span>
              </TableCell>
            </TableAccordion>
            <TableAccordion
              xs="12"
              md="8"
              className={`${Styles.dropdown} flex-wrap my-2 px-md-0`}
            >
              <TableCell
                data-label="مقدار پرداختی کل"
                xs="6"
                md="3"
                className="justify-content-start me-sm-5 me-md-4 me-lg-0"
              >
                <span className="text-gray-2 ms-1">{item.baseAsset}</span>
                <span className="text-gray-4">
                  {Number(item.finalPrice).toFixed(8) || "-"}
                </span>
              </TableCell>
              <TableCell
                data-label="انجام شده"
                xs="6"
                md="1"
                className="justify-content-md-start"
              >
                <span className="text-gray-4 ltr">
                  {`${Number(item.filledQuoteQty).toFixed(0)} %` || "-"}
                </span>
              </TableCell>
              <TableCell
                data-label="مقدار نهایی دریافتی"
                xs="6"
                md="3"
                className="justify-content-md-start pe-md-4 me-md-5"
              >
                <span className="text-gray-2 ms-1">{item.quoteAsset}</span>
                <span className="text-gray-4">
                  {Number(item.quoteAmount).toFixed(8)}
                </span>
              </TableCell>
              <TableCell xs="6" md="2" className="justify-content-md-center">
                <StatusBadge
                  iconClassName="d-none d-md-flex d-lg-none"
                  badgeClassName="d-flex d-md-none d-lg-flex"
                  status={item.status}
                />
              </TableCell>
              <TableCell xs="8" md="2" className="justify-content-md-center">
                <span
                  // onClick={() => closeOrderHandler(item.marketId)}
                  className="text-gray-2 pointer"
                >
                  <BsX size={18} />
                  لغو سفارش
                </span>{" "}
              </TableCell>
            </TableAccordion>
          </TableRow>
        ))}
      </NewTable>
    ) : (
      <></>
      // <NewTable
      //     headerItems={cols.closed}
      //     loading={loading}
      //     isPaiginate
      //     pageLimit={perPage}
      //     pageNumber={pageNumber}
      //     totalRecords={totalRecord}
      //     handleChangePage={setPageNumber}
      // >
      //     {orderHistory.map((item, index) => (
      //         <TableRow
      //             key={index}
      //             className={`${Styles.tr} ${activeItem === index && Styles.active
      //                 } text-gray-4`}
      //         >
      //             <TableAccordion
      //                 xs="12"
      //                 md="4"
      //                 className={`${Styles.shownItems} px-0`}
      //                 activeDropdown={() => {
      //                     activeItem === index ? setActiveItem() : setActiveItem(index);
      //                 }}
      //             >
      //                 <TableCell xs={6} md="6" className="fw-400 FaNum pe-md-3">
      //                     <IoIosArrowBack
      //                         size={16}
      //                         className={`${Styles.dropdownIc} text-gray-2 d-md-none ms-3`}
      //                     />
      //                     <span className="d-flex align-items-center">
      //                         <span className="en text-gray-4">{item.baseAsset}</span>
      //                         <HiArrowNarrowLeft className="text-gray-1 mx-1" size={14} />
      //                         <span className="en text-gray-4">{item.quoteAsset}</span>
      //                     </span>
      //                 </TableCell>
      //                 <TableCell xs={4} md="3">
      //                     <div className="d-flex flex-wrap flex-md-nowrap justify-content-start">
      //                         <span className="w-100">
      //                             {DateConvert.toShamsiDate(item.createdAt)}
      //                         </span>
      //                         <span className="mx-1"></span>
      //                         <span className="w-100">
      //                             {DateConvert.getTime(item.createdAt)}
      //                         </span>
      //                     </div>
      //                 </TableCell>
      //                 <TableCell xs="2" md="0" className="d-md-none">
      //                     <StatusBadge badgeClassName="d-none" status={item.status} />
      //                 </TableCell>
      //             </TableAccordion>
      //             <TableAccordion
      //                 xs="12"
      //                 md="8"
      //                 className={`${Styles.dropdown} flex-wrap my-2 px-0`}
      //             >
      //                 <TableCell
      //                     data-label="نوع"
      //                     xs="5"
      //                     md="1"
      //                     lg={2}
      //                     className="justify-content-md-start"
      //                 >
      //                     {item.type === "MARKET" ? (
      //                         <span className="text-gray-4">
      //                             تبدیل{" "}
      //                             <span className="en d-none d-lg-inline-block">
      //                                 (Market)
      //                             </span>
      //                         </span>
      //                     ) : (
      //                         <span className="text-gray-4">
      //                             اتوماتیک{" "}
      //                             <span className="en d-none d-lg-inline-block">(Limit)</span>
      //                         </span>
      //                     )}
      //                 </TableCell>
      //                 <TableCell
      //                     data-label="مقدار نهایی پرداختی"
      //                     xs="5"
      //                     md="2"
      //                     className="justify-content-start me-sm-5 me-md-4 me-lg-0"
      //                 >
      //                     <span className="text-gray-2 ms-1">{item.baseAsset}</span>
      //                     <span className="text-gray-4">
      //                         {Number(item.baseAmount).toFixed(8)}
      //                     </span>
      //                 </TableCell>
      //                 <TableCell
      //                     data-label="قیمت معامله"
      //                     xs="5"
      //                     md="1"
      //                     className="justify-content-md-cventer pe-md-4"
      //                 >
      //                     <span className="text-gray-4">
      //                         {Number(item.finalPrice).toFixed(8) || "-"}
      //                     </span>
      //                 </TableCell>
      //                 <TableCell
      //                     data-label="مقدار نهایی دریافتی"
      //                     xs="6"
      //                     md="3"
      //                     className="justify-content-md-start pe-md-4 me-md-5"
      //                 >
      //                     <span className="text-gray-2 ms-1">{item.quoteAsset}</span>
      //                     <span className="text-gray-4">
      //                         {Number(item.quoteAmount).toFixed(8)}
      //                     </span>
      //                 </TableCell>
      //                 <TableCell xs="8" md="2" className="justify-content-md-center">
      //                     <StatusBadge
      //                         iconClassName="d-none d-md-flex d-lg-none"
      //                         badgeClassName="d-flex d-md-none d-lg-flex"
      //                         status={item.status}
      //                     />
      //                 </TableCell>
      //                 <TableCell
      //                     xs="4"
      //                     md="1"
      //                     className="justify-content-center text-blue pointer"
      //                     onClick={() => {
      //                         setOpenModal(true);
      //                         setOrderId(item._id);
      //                     }}
      //                 >
      //                     <span className="d-md-none">جزئیات</span>
      //                     <FiChevronLeft size={20} />
      //                 </TableCell>
      //             </TableAccordion>
      //         </TableRow>
      //     ))}
      // </NewTable>
    ),
    openModal ? (
      <SpotHistoryModal
        show={openModal}
        id={orderId}
        onHide={() => setOpenModal()}
      />
    ) : null,
  ];
};

export default memo(MarketOrderHistory);
