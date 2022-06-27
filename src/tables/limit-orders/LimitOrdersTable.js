/** internal imports */
import { useState } from "react";
import { DateConvert, Toastify } from "../../utils";
import Styles from "../Tables.module.scss";
/** external imports */
import { IoIosArrowBack, HiArrowNarrowLeft, BsX } from "react-icons/all";
/** component imports */
import NewTable, {
  TableAccordion,
  TableCell,
  TableRow,
  StatusBadge,
} from "../../common/element/new-table/NewTable";
import { useCoreApi } from "../../common/hooks";

const cols = [
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
];

export default function LimitOrdersTable({ data, ...props }) {
  const { urls, post, loading } = useCoreApi();
  const [activeItem, setActiveItem] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState();
  const [canceledOrder, setCanceledOrder] = useState();

  async function closeOrderHandler(vals) {
    try {
      const _body = {
        marketId: vals,
      };
      const { message } = await post(urls.CloseLimitOrder, _body);

      Toastify.success(message);
      setCanceledOrder();
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return (
    <NewTable headerItems={cols} {...props}>
      {data?.map((item, index) => (
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
              <StatusBadge status={item.status} />
              {/* <span
                                className={`text-${openStatus[item.status]?.variant
                                    } text-nowrap size-5`}
                            >
                                {openStatus[item.status]?.title}
                            </span> */}
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
                {Number(item.baseAmount).toFixed(8) || "-"}
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
              data-label="قیمت"
              xs="6"
              md="3"
              className="justify-content-md-start pe-md-4 me-md-4"
            >
              <span className="text-gray-2 ms-1">{item.quoteAsset}</span>
              <span className="text-gray-4">
                {Number(item.finalPrice).toFixed(8)}
              </span>
            </TableCell>
            <TableCell xs="6" md="2" className="justify-content-md-center">
              <StatusBadge
                iconClassName="d-none d-md-flex d-lg-none"
                badgeClassName="d-flex d-sm-none d-md-flex"
                status={item.status}
              />
            </TableCell>
            <TableCell xs="8" md="2" className="justify-content-md-center">
              <span
                onClick={() => closeOrderHandler(item.marketId)}
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
  );
}
