/** internal imports */
import { useState } from "react";
import { DateConvert } from "../../utils";
import Styles from '../Tables.module.scss';
/** external imports */
import { IoIosArrowBack } from "react-icons/all";
import * as math from "mathjs";
/** component imports */
import NewTable, { TableAccordion, TableCell, TableRow, StatusBadge } from '../../common/element/new-table/NewTable';

const cols = [
    {
        headerName: "ارز",
        xs: "3",
        md: "1",
        className: "px-0 pe-4 pe-md-3",
    },
    {
        headerName: "جهت",
        xs: "3",
        md: "1",
        className: "px-md-0",
    },
    {
        headerName: "تاریخ و ساعت",
        xs: "4",
        md: "1",
        className: "pe-md-0",
    },
    {
        headerName: "وضعیت",
        xs: "3",
        md: "1",
        className: "d-md-none pe-sm-5",
    },
    {
        headerName: "مقدار پرداختی",
        className: "d-none d-md-flex justify-content-md-center",
    },
    {
        headerName: "مقدار دریافتی",
        className: "d-none d-md-flex justify-content-md-center",
    },
    {
        headerName: "قیمت ارز مرجع",
        className: "d-none d-md-flex justify-content-md-center",
    },

    {
        headerName: "کارمزد",
        className: "d-none d-md-flex",
    },
    {
        headerName: "شناسه سفارش",
        className: "d-none d-md-flex justify-content-md-center",
    },
    {
        headerName: "وضعیت",
        className: "d-none d-md-flex justify-content-md-center",
    },
];

export default function FiatOrdersTable({ data,
    ...props }) {
    const [activeItem, setActiveItem] = useState();

    return (
        <NewTable
            headerItems={cols}
            {...props}
        >
            {data.map((item, index) => {
                const base_amount =
                    item.side === "BUY"
                        ? Number(item.baseAmount).toLocaleString()
                        : Number(item.baseAmount)
                            .toFixed(8)
                            .replace(/(\.\d+?)0+\b/g, "$1");

                const quate_amount =
                    item.side === "BUY"
                        ? Number(item.quoteAmount)
                            .toFixed(8)
                            .replace(/(\.\d+?)0+\b/g, "$1")
                        : Number(item.quoteAmount).toLocaleString();

                const base_asset = item.side === "BUY" ? "تومان" : item.spotAsset;

                const quate_asset = item.side === "BUY" ? item.spotAsset : "تومان";

                const fee = math
                    .add(Number(item.internalFee || 0), Number(item.TradesFee || 0))
                    .toFixed(item.side === "BUY" ? 8 : 0)
                    .replace(/(\.\d+?)0+\b/g, "$1");

                return (
                    <TableRow
                        key={index}
                        className={`${Styles.tr} ${activeItem === index && Styles.active
                            } text-gray-4`}
                    >
                        <TableAccordion
                            xs="12"
                            md="3"
                            className={`${Styles.shownItems} px-0`}
                            activeDropdown={() => {
                                activeItem === index ? setActiveItem() : setActiveItem(index);
                            }}
                        >
                            <TableCell xs="3" md="4" className="fw-400 justify-content-start">
                                <IoIosArrowBack
                                    size={16}
                                    className={`${Styles.dropdownIc} text-gray-2 d-md-none`}
                                />
                                <div className="w-100 d-flex flex-wrap flex-md-nowrap justify-content-start pe-3">
                                    <span className="size-5 fw-500 text-gray-4 en">
                                        {item.spotAsset}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell
                                xs="3"
                                md="4"
                                className="d-flex justify-content-md-start"
                            >
                                {item.side === "SELL" ?
                                    <span className="text-danger">فروش</span>
                                    : <span className="text-success">خرید</span>}
                            </TableCell>
                            <TableCell
                                xs="3"
                                md="4"
                                className="d-flex flex-wrap justify-content-md-center"
                            >
                                <span className="size-5 text-gray-4">
                                    {DateConvert.toShamsiDate(item.createdAt)}
                                </span>
                                <span className="size-5 text-gray-4 me-2">
                                    {DateConvert.getTime(item.createdAt)}
                                </span>
                            </TableCell>
                            <TableCell
                                xs="2"
                                md="0"
                                className="d-md-none justify-content-end"
                            >
                                <StatusBadge status={item.status} />
                                {/* <span className={`text-${status_market[item.status]?.variant}`}>
                                    {status_market[item.status]?.icon}
                                </span> */}
                            </TableCell>
                        </TableAccordion>
                        <TableAccordion
                            xs="12"
                            md="9"
                            className={`${Styles.dropdown} flex-wrap my-2 pe-4`}
                        >
                            <TableCell
                                xs="6"
                                md="2"
                                className="justify-content-md-around"
                                data-label="مقدار پرداختی"
                            >
                                <span
                                    className={`${item.side === "BUY" ? "" : "en"
                                        } text-gray-2 size-5 ms-1 text-center`}
                                >
                                    {base_asset}
                                </span>
                                <span className="text-start ps-3 size-5 text-gray-4 en">
                                    {base_amount}
                                </span>
                            </TableCell>
                            <TableCell
                                xs="6"
                                md="2"
                                className="justify-content-md-around"
                                data-label="مقدار دریافتی"
                            >
                                {item.quoteAmount ? (
                                    <>
                                        <span
                                            className={`${item.side === "BUY" ? "" : "en"
                                                } text-gray-2 size-5 ms-1`}
                                        >
                                            {quate_asset}
                                        </span>
                                        <span className="text-start ps-3 text-gray-4 me-1">
                                            {quate_amount}
                                        </span>
                                    </>
                                ) : null}
                            </TableCell>
                            <TableCell
                                xs="6"
                                md="2"
                                className="justify-content-md-start pe-md-2"
                                data-label="قیمت ارز مرجع"
                            >
                                {Number(item.usdPrice || 0).toLocaleString()}
                            </TableCell>
                            <TableCell
                                xs="6"
                                sm="1"
                                md="2"
                                className="justify-content-md-start"
                                data-label="کارمزد"
                            >
                                <span
                                    className={`${item.side === "BUY" ? "" : "en"
                                        } text-gray-2 size-5 ms-1`}
                                >
                                    {item.side === "SELL" ? "تومان" : item.spotAsset}
                                </span>
                                <span className="text-gray-4 me-lg-1">{fee}</span>
                            </TableCell>
                            <TableCell
                                xs="6"
                                md="1"
                                className="justify-content-md-start pe-md-2"
                                data-label="شناسه سفارش"
                            >
                                <span className="w-50 text-md-start">{item.marketId}</span>
                            </TableCell>
                            <TableCell xs="6" md="3" className="justify-content-md-end">
                                <StatusBadge status={item.status} />

                            </TableCell>
                        </TableAccordion>
                    </TableRow>
                );
            })}
        </NewTable>
    );
}

