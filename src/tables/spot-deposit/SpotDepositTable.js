/** internal imports */
import { useState } from "react";
import { DateConvert } from "../../utils";
import Styles from '../Tables.module.scss';
/** external imports */
import { IoIosArrowBack } from "react-icons/all";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
/** component imports */
import NewTable, { TableAccordion, TableCell, TableRow, StatusBadge } from '../../common/element/new-table/NewTable';
import CopyToClipboard from "../../components/copy-to-clipboard/CopyToClipboard";

const cols = [
    { headerName: "نام ارز", className: "mx-4 mx-md-0" },
    { headerName: "شبکه", className: "d-none d-md-flex me-4" },
    { headerName: "تاریخ و ساعت", className: "mx-5 mx-md-0" },
    { headerName: "وضعیت", className: "d-md-none" },
    { headerName: "مقدار برداشتی", className: "d-none d-md-flex" },
    { headerName: "شناسه واریز", className: "d-none d-md-flex" },
    { headerName: "آدرس مبدا", className: "d-none d-md-flex" },
    { headerName: "وضعیت", className: "d-none d-md-flex" },
];

export default function SpotDepositTable({ data,
    ...props }) {
    const { configs } = useSelector((state) => state.config);
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
                        md="5"
                        className={`${Styles.shownItems} px-0`}
                        activeDropdown={() => {
                            activeItem === index ? setActiveItem() : setActiveItem(index);
                        }}
                    >
                        <TableCell xs="6" md="5" className="fw-400 FaNum me-md-3">
                            <IoIosArrowBack
                                size={16}
                                className={`${Styles.dropdownIc} text-gray-2 d-md-none`}
                            />
                            <span className="d-flex align-items-center me-2 me-md-0">
                                {configs[item.currency?.symbol]?.icon ? (
                                    <img
                                        alt={item.currency?.symbol}
                                        width={24}
                                        height={24}
                                        src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${configs[item.currency?.symbol]?.icon
                                            }`}
                                    />
                                ) : null}
                                <span className="mr-2 d-flex flex-column">
                                    <span className="text-gray-4 fw-500">
                                        {item.currency?.symbol}
                                    </span>
                                    <span className="text-gray-2 fw-400">
                                        {configs[item.currency?.symbol]?.name} (
                                        {configs[item.currency?.symbol]?.faName})
                                    </span>
                                </span>
                            </span>
                        </TableCell>
                        <TableCell md="3" className="d-none d-md-flex">
                            <span className="text-gray-4">{item.blockchain?.network}</span>
                        </TableCell>
                        <TableCell xs="4" sm="5" md="6" className="fw-400 FaNum">
                            <div className="d-flex flex-wrap flex-md-nowrap justify-content-sm-center px-2">
                                <span className="px-1">
                                    {DateConvert.toShamsiDate(item.createdAt)}
                                </span>
                                <span className="px-1">
                                    {DateConvert.getTime(item.createdAt)}
                                </span>
                            </div>
                        </TableCell>
                        <TableCell xs="2" md="0" className="d-md-none">
                            <StatusBadge status={"CONFIRMED"} />
                        </TableCell>
                    </TableAccordion>
                    <TableAccordion
                        xs="12"
                        md="7"
                        className={`${Styles.dropdown} flex-wrap my-2`}
                    >
                        <TableCell
                            data-label="مقدار برداشتی"
                            xs="5"
                            md="2"
                            className="justify-content-md-end"
                        >
                            <span className="text-gray-4 en">{item.inAmount}</span>
                        </TableCell>
                        <TableCell data-label="شبکه" xs="6" className="d-flex d-md-none">
                            <span className="text-gray-4">{item.blockchain?.network}</span>
                        </TableCell>
                        <TableCell
                            data-label="شناسه"
                            xs="5"
                            md="3"
                            className="justify-content-md-end"
                        >
                            {item.incomeTxId ? (
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip className="en" id="txId">
                                            {item.incomeTxId}
                                        </Tooltip>
                                    }
                                >
                                    <CopyToClipboard data={item.incomeTxId}>
                                        {item.incomeTxId.slice(0, 5) +
                                            "..." +
                                            item.incomeTxId.slice(-5)}
                                    </CopyToClipboard>
                                </OverlayTrigger>
                            ) : null}
                        </TableCell>
                        <TableCell
                            data-label="آدرس"
                            xs="6"
                            md="4"
                            className="justify-content-md-center"
                        >
                            {item.toAddress ? (
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip className="en" id="txId">
                                            {item.toAddress}
                                        </Tooltip>
                                    }
                                >
                                    <CopyToClipboard data={item.toAddress}>
                                        {item.toAddress.slice(0, 5) +
                                            "..." +
                                            item.toAddress.slice(-5)}
                                    </CopyToClipboard>
                                </OverlayTrigger>
                            ) : null}
                        </TableCell>
                        <TableCell xs="8" md="3" className="justify-content-md-start">
                            <StatusBadge iconClassName="d-none" status={"CONFIRMED"} />
                        </TableCell>
                    </TableAccordion>
                </TableRow>
            ))}
        </NewTable>
    );
}

