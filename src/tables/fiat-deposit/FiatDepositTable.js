/** internal imports */
import { useState } from "react";
import { DateConvert } from "../../utils";
import Styles from '../Tables.module.scss';
/** external imports */
import { IoIosArrowBack } from "react-icons/all";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
/** component imports */
import NewTable, { TableAccordion, TableCell, TableRow, StatusBadge } from '../../common/element/new-table/NewTable';
import CopyToClipboard from "../../components/copy-to-clipboard/CopyToClipboard";

const cols = [
    {
        headerName: "تاریخ و ساعت",
        className: "mx-4 mx-md-0",
    },
    {
        headerName: "مقدار واریزی",
        after: <span className="d-none d-md-flex">(تومان)</span>,
        className: "px-4",
    },
    {
        headerName: "وضعیت",
        className: "d-md-none pe-5",
    },
    {
        headerName: "کد پیگیری",
        className: "d-none d-md-flex",
    },
    {
        headerName: "شماره کارت",
        className: "d-none d-md-flex",
    },
    {
        headerName: "بانک",
        className: "d-none d-md-flex",
    },
    {
        headerName: "شناسه پرداخت",
        className: "d-none d-md-flex",
    },
    {
        headerName: "وضعیت",
        className: "d-none d-md-flex",
    },
];

export default function FiatDepositTable({ data,
    ...props }) {
    const [activeItem, setActiveItem] = useState();

    return (
        <NewTable
            headerItems={cols}
            {...props}
        >
            {data.map((item, index) => (
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
                        <TableCell xs="5" sm="4" md="6" className="fw-400 FaNum">
                            <IoIosArrowBack
                                size={16}
                                className={`${Styles.dropdownIc} text-gray-2 d-md-none`}
                            />
                            <div className="d-flex flex-wrap flex-md-nowrap justify-content-start">
                                <span className="px-2 w-100 text-center">
                                    {DateConvert.toShamsiDate(item.createdAt)}
                                </span>
                                <span className=" w-100 text-center">
                                    {DateConvert.getTime(item.createdAt)}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell
                            xs="5"
                            md="6"
                            className="d-flex justify-content-md-center"
                        >
                            <span className="d-md-none text-start text-gray-2 ms-1">
                                تومان
                            </span>
                            <span className="text-md-start text-gray-4 en">
                                {Number(item.amount || 0).toLocaleString()}
                            </span>
                        </TableCell>
                        <TableCell xs="2" md="0" className="d-md-none">
                            <StatusBadge status={item.status} />
                        </TableCell>
                    </TableAccordion>
                    <TableAccordion
                        xs="12"
                        md="9"
                        className={`${Styles.dropdown} flex-wrap my-2`}
                    >
                        <TableCell
                            xs="6"
                            md="2"
                            className="justify-content-md-end"
                            data-label="کد پیگیری"
                        >
                            {item.trackingCode ? (
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip className="en size-5" id="txId">
                                            {item.trackingCode}
                                        </Tooltip>
                                    }
                                >
                                    <CopyToClipboard data={item.trackingCode}>
                                        {item.trackingCode.slice(0, 5) +
                                            "..." +
                                            item.trackingCode.slice(-5)}
                                    </CopyToClipboard>
                                </OverlayTrigger>
                            ) : null}
                        </TableCell>
                        <TableCell
                            xs="6"
                            md="3"
                            className="justify-content-md-center"
                            data-label="شماره کارت"
                        >
                            <span className="ltr d-inline-block">
                                {item.bankAccount?.card?.slice(0, 5) +
                                    "****" +
                                    item.bankAccount?.card?.slice(-5)}
                            </span>
                        </TableCell>
                        <TableCell
                            xs="6"
                            md="2"
                            className="justify-content-md-start"
                            data-label="بانک"
                        >
                            {item.bankAccount?.bank?.name}
                        </TableCell>
                        <TableCell
                            xs="6"
                            md="2"
                            className="justify-content-md-start"
                            data-label="شناسه"
                        >
                            <span className="w-75 text-md-center">{item.refId || "شناسه ندارد"}</span>
                        </TableCell>
                        <TableCell xs="6" md="3" className="justify-content-md-start">
                            <StatusBadge iconClassName="d-none" status={item.status} />
                        </TableCell>
                    </TableAccordion>
                </TableRow>
            ))}
        </NewTable>
    );
}

