/** internal imports */
import { useState } from "react";
import { DateConvert } from "../../utils";
import Styles from "../Tables.module.scss";
/** external imports */
import {
  IoIosArrowBack,
  HiArrowNarrowLeft,
  FiChevronLeft,
} from "react-icons/all";
/** component imports */
import NewTable, {
  TableAccordion,
  TableCell,
  TableRow,
  StatusBadge,
} from "../../common/element/new-table/NewTable";

const cols = [
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
    headerName: "قیمت",
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
];

export default function MarketOrdersTable({ data, ...props }) {
  const [activeItem, setActiveItem] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState();

  return (
    <NewTable headerItems={cols} {...props}>
      {data.map((item, index) => (
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
            <TableCell xs={4} md="3">
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
            <TableCell xs="2" md="0" className="d-md-none">
              <StatusBadge badgeClassName="d-none" status={item.status} />
            </TableCell>
          </TableAccordion>
          <TableAccordion
            xs="12"
            md="8"
            className={`${Styles.dropdown} flex-wrap my-2 px-0`}
          >
            <TableCell
              data-label="نوع"
              xs="5"
              md="1"
              lg={2}
              className="justify-content-md-start"
            >
              {item.type === "MARKET" ? (
                <span className="text-gray-4">
                  تبدیل{" "}
                  <span className="en d-none d-lg-inline-block">(Market)</span>
                </span>
              ) : (
                <span className="text-gray-4">
                  اتوماتیک{" "}
                  <span className="en d-none d-lg-inline-block">(Limit)</span>
                </span>
              )}
            </TableCell>
            <TableCell
              data-label="مقدار نهایی پرداختی"
              xs="5"
              md="2"
              className="justify-content-start me-md-4 me-lg-0"
            >
              <span className="text-gray-2 ms-1">{item.baseAsset}</span>
              <span className="text-gray-4">
                {Number(item.baseAmount).toFixed(8)}
              </span>
            </TableCell>
            <TableCell
              data-label="قیمت"
              xs="5"
              md="1"
              className="justify-content-md-cventer pe-md-4"
            >
              <span className="text-gray-4">
                {Number(item.finalPrice).toFixed(8) || "-"}
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
            <TableCell xs="8" md="2" className="justify-content-md-center">
              <StatusBadge
                iconClassName="d-none d-md-flex d-lg-none"
                badgeClassName="d-flex d-md-none d-lg-flex"
                status={item.status}
              />
            </TableCell>
            <TableCell
              xs="4"
              md="1"
              className="justify-content-center text-blue pointer"
              onClick={() => {
                setOpenModal(true);
                setOrderId(item._id);
              }}
            >
              <span className="d-md-none">جزئیات</span>
              <FiChevronLeft size={20} />
            </TableCell>
          </TableAccordion>
        </TableRow>
      ))}
    </NewTable>
  );
}
