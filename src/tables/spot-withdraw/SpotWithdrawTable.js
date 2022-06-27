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
    {
        headerName: "نام ارز",
        className: "mx-4 mx-md-0",
    },
    {
        headerName: "شبکه",
        className: "d-none d-md-flex",
    },
    {
        headerName: "تاریخ و ساعت",
        className: "me-5 me-md-0",
    },
    {
        headerName: "وضعیت",
        className: "d-md-none pe-5",
    },
    {
        headerName: "مقدار برداشتی",
        className: "d-none d-md-flex",
    },
    {
        headerName: "شناسه",
        className: "d-none d-md-flex",
    },

    {
        headerName: "آدرس",
        className: "d-none d-md-flex",
    },
    {
        headerName: "وضعیت",
        className: "d-none d-md-flex",
    },
];

export default function SpotWithdrawTable({ data,
    ...props }) {
    const { configs } = useSelector((state) => state.config);
    const [activeItem, setActiveItem] = useState();

    return (
        <NewTable
            headerItems={cols}
            {...props}
        >
            {data.map((item, i) => (
                <TableRow
                    key={i}
                    className={`${Styles.tr} ${activeItem === i && Styles.active
                        } text-gray-4`}
                >
                    <TableAccordion
                        xs="12"
                        md="5"
                        className={`${Styles.shownItems} px-0`}
                        activeDropdown={() => {
                            activeItem === i ? setActiveItem() : setActiveItem(i);
                        }}
                    >
                        <TableCell xs="6" md="5" className="fw-400 FaNum">
                            <IoIosArrowBack
                                size={16}
                                className={`${Styles.dropdownIc} text-gray-2 d-md-none`}
                            />
                            <span className="d-flex align-items-center me-2 me-md-0">
                                {configs[item.symbol]?.icon ? (
                                    <img
                                        alt={item.symbol}
                                        width={24}
                                        height={24}
                                        src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${configs[item.symbol]?.icon
                                            }`}
                                    />
                                ) : null}
                                <span className="mr-2 d-flex flex-column">
                                    <span className="text-gray-4 fw-500">{item.symbol}</span>
                                    <span className="text-gray-2 fw-400">
                                        {configs[item.symbol]?.name} ({configs[item.symbol]?.faName}
                                        )
                                    </span>
                                </span>
                            </span>
                        </TableCell>
                        <TableCell md="3" className="d-none d-md-flex">
                            <span className="text-gray-4">{item.network}</span>
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
                            <StatusBadge badgeClassName="d-none" status={item.status} />
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
                            {item.symbol}
                            <span className="text-gray-4 size-5 en me-2">{item.amount}</span>
                        </TableCell>
                        <TableCell data-label="شبکه" xs="6" className="d-flex d-md-none">
                            <span className="text-gray-4">{item.network}</span>
                        </TableCell>
                        <TableCell
                            data-label="شناسه"
                            xs="5"
                            md="3"
                            className="justify-content-md-end"
                        >
                            {item.internalId || "-"}
                        </TableCell>
                        <TableCell
                            data-label="آدرس"
                            xs="6"
                            md="4"
                            className="justify-content-md-center"
                        >
                            {item.address ? (
                                <OverlayTrigger
                                    placement="right"
                                    overlay={
                                        <Tooltip className="en" id="txId">
                                            {item.address}
                                        </Tooltip>
                                    }
                                >
                                    <CopyToClipboard data={item.address}>
                                        {item.address.slice(0, 5) + "..." + item.address.slice(-5)}
                                    </CopyToClipboard>
                                </OverlayTrigger>
                            ) : null}
                        </TableCell>
                        <TableCell xs="8" md="3" className="justify-content-md-start">
                            <StatusBadge status={item.status} />
                        </TableCell>
                    </TableAccordion>
                </TableRow>
            ))}
        </NewTable>
    );
}

