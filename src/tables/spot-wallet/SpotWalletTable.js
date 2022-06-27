/** internal imports */
import { Fragment, useState } from "react";
import Styles from '../Tables.module.scss';
import ApproximateICon from "../../assets/svgs/approximateIcon.svg";
/** external imports */
import { RiCopperCoinLine, BiChevronLeft } from "react-icons/all";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import * as math from "mathjs";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
/** component imports */
import NewTable, { TableCell, TableRow } from '../../common/element/new-table/NewTable';
import CircleProgress from "../../components/circle-process/CircleProgress";
import TradeDropDown from "./TradeDropDown";
import DetailAsset from "./DetailAsset";

const cols = [
    {
        headerName: "رمز ارز",
        className: "d-none d-sm-flex pe-2",
        sm: 3,
    },
    {
        headerName: "موجودی کل",
        className: "d-none d-sm-flex",
        md: 2,
        sm: 3,
    },
    {
        headerName: "در حال معامله",
        className: "d-none d-md-flex",
        lg: 1,
        md: 2,
    },
    {
        headerName: "قابل استفاده",
        className: "d-none d-sm-flex",
        lg: 1,
        sm: 2,
    },
    {
        headerName: "بازده",
        className: "d-none d-lg-flex p-0",
        lg: 1,
        md: 1,
    },
    {
        headerName: "وزن",
        className: "d-none d-sm-flex",
        lg: 1,
        md: 2,
        sm: 2,
    },
    {
        headerName: "عملیات",
        className: "d-none d-lg-flex",
        lg: 3,
    },
];

export default function SpotWalletTable({ data, ...props }) {
    const navigate = useNavigate();
    const [showDetail, setShowDetail] = useState(false);
    const [item, setItem] = useState({});

    function handleShowDetailModal(itemTable) {
        setShowDetail(true);
        setItem(itemTable);
    }

    return (
        <Fragment>
            <NewTable
                headerItems={cols}
                {...props}
            >
                {data.map((asset, i) => {
                    return (
                        <TableRow className="p-3 p-md-0" key={i}>
                            <TableCell xs={6} sm={3} className="mb-3 mb-md-0">
                                <span className="d-flex align-items-center pe-md-2">
                                    {asset.icon ? (
                                        <img
                                            width={24}
                                            height={24}
                                            alt={asset.symbol}
                                            className={Styles.currencyImg}
                                            src={`https://main.arz2arz.net/api/v1/spotCurrency/images/${asset.icon}`}
                                        />
                                    ) : (
                                        <RiCopperCoinLine size={30} className="text-gray-1" />
                                    )}

                                    <span className="d-flex mr-2 flex-column">
                                        <span className="text-gray-4 size-5 fw-500 en">
                                            {asset.symbol}
                                        </span>
                                        <span className={`${Styles.textElipsis}`}>
                                            <span className="en size-5 ms-1">{`${asset.name} `}</span>
                                            {asset.faName ? (
                                                <span className="size-5">({asset.faName})</span>
                                            ) : null}
                                        </span>
                                    </span>
                                </span>
                            </TableCell>

                            <TableCell
                                xs={6}
                                sm={3}
                                md={2}
                                className="flex-column align-items-end align-items-sm-start mb-3 mb-md-0"
                            >
                                <div className="text-gray-4 fw-400 en mb-1">
                                    {math
                                        .ceil(Number(asset.wallet?.balance || 0), 8)
                                        .toString()
                                        .padEnd(9, "0")}
                                </div>
                                <div>
                                    <span className="mx-1 text-gray-4">
                                        {math.ceil(Number(asset.wallet?.balanceToUSDT || 0), 3)}
                                    </span>
                                    <span className="text-gray-2">USDT</span>
                                    <img src={ApproximateICon} alt="" />
                                </div>
                            </TableCell>

                            <TableCell md={2} lg={1} className="d-none d-md-flex">
                                {asset.wallet?.onOrder ? (
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip className="size-5" id={`tooltip-right`}>
                                                <div className="p-2">
                                                    <div className="text-start">
                                                        <span className="me-2 t">
                                                            {math.ceil(Number(asset.wallet?.onOrderToUSDT), 8)}
                                                        </span>
                                                        <span>USDT</span>
                                                    </div>
                                                    <div className="text-start">
                                                        <span className="me-2">
                                                            {math.ceil(Number(asset.wallet?.balanceToBTC), 8)}
                                                        </span>
                                                        <span>BTC</span>
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <span className="text-gray-4 en">
                                            {math.ceil(Number(asset.wallet?.onOrder), 8)}
                                        </span>
                                    </OverlayTrigger>
                                ) : (
                                    <span className="text-gray-4 en">{Number("0").toFixed(8)}</span>
                                )}
                            </TableCell>

                            <TableCell sm={2} lg={1} className="d-none d-sm-flex">
                                {asset.wallet?.balance ? (
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={
                                            <Tooltip className="size-5" id={`tooltip-right`}>
                                                <div className="p-2">
                                                    <div className="text-start">
                                                        <span className="me-2">
                                                            {math.ceil(Number(asset.wallet?.balanceToUSDT), 8)}
                                                        </span>
                                                        <span>USDT</span>
                                                    </div>
                                                    <div className="text-start">
                                                        <span className="me-2">
                                                            {math.ceil(Number(asset.wallet?.balanceToBTC), 8)}
                                                        </span>
                                                        <span>BTC</span>
                                                    </div>
                                                </div>
                                            </Tooltip>
                                        }
                                    >
                                        <span className="pointer text-gray-4 en">
                                            {math.ceil(Number(asset.wallet?.balance), 8)}
                                        </span>
                                    </OverlayTrigger>
                                ) : (
                                    <span className="pointer text-gray-4 en">
                                        {Number("0").toFixed(8)}
                                    </span>
                                )}
                            </TableCell>

                            <TableCell lg={1} className="d-none d-lg-flex flex-column ">
                                <span className="text-gray-4 en">0.004</span>
                                <span className="text-success mt-1 en ltr">+4.5%</span>
                            </TableCell>

                            <TableCell xs={6} sm={2} md={2} lg={1}>
                                <CircleProgress
                                    percent={Number(asset.wallet?.cake || 0).toFixed(0)}
                                />
                                <span className="me-2 text-gray-4 size-5 en ltr">
                                    {math.fix(Number(asset.wallet?.cake || 0), 0)}%
                                </span>
                            </TableCell>

                            <TableCell
                                xs={6}
                                sm={2}
                                md={1}
                                lg={3}
                                className="justify-content-end justify-content-lg-start"
                            >
                                <ul
                                    className={`${Styles.operations} p-0 m-0 d-none d-lg-flex align-items-center justify-content-start`}
                                >
                                    <li
                                        className="ms-3 text-blue pointer "
                                        onClick={() => {
                                            navigate(`/fiat/${asset.symbol}`);
                                        }}
                                    >
                                        خرید/فروش
                                    </li>
                                    <li
                                        className={classNames(`ms-3 text-blue `, {
                                            "pointer text-blue":
                                                asset.depositIsSupport && asset.depositAllEnable,
                                            "text-blue-light":
                                                !asset.depositIsSupport || !asset.depositAllEnable,
                                        })}
                                        onClick={() => {
                                            if (asset.depositIsSupport && asset.depositAllEnable)
                                                navigate(`/deposit/spot/${asset.symbol}`);
                                        }}
                                    >
                                        واریز
                                    </li>
                                    <li
                                        className={classNames(`ms-3 text-blue `, {
                                            "pointer text-blue":
                                                asset.withdrawAllEnable && asset.withdrawIsSupport,
                                            "text-blue-light":
                                                !asset.withdrawAllEnable || !asset.withdrawIsSupport,
                                        })}
                                        onClick={() => {
                                            if (asset.withdrawAllEnable && asset.withdrawIsSupport)
                                                navigate(`/my/wallet/withdraw/spot/${asset.symbol}`);
                                        }}
                                    >
                                        برداشت
                                    </li>


                                    {asset.trading ? (
                                        <TradeDropDown asset={asset.symbol} />
                                    ) : (
                                        <li className="text-blue-light ms   -3">معامله</li>
                                    )}

                                </ul>

                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip className="d-none d-md-block">جزییات</Tooltip>}
                                >
                                    <div
                                        onClick={() => handleShowDetailModal(asset)}
                                        className="pe-3 text-blue pointer"
                                    >
                                        <span className="d-lg-none">جزییات</span>
                                        <BiChevronLeft fontSize={20} />
                                    </div>
                                </OverlayTrigger>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </NewTable>

            {showDetail ? <DetailAsset show={showDetail} onHide={() => setShowDetail(false)} data={item} /> : null}
        </Fragment>
    );
}