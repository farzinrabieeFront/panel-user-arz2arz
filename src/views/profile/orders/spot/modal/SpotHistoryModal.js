import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { HiArrowNarrowLeft } from "react-icons/all";
import TableElement from "../../../../../common/element/table/Table";
import * as math from "mathjs";
import CustomizedModal from "../../../../../components/modal/Modal";
import TriangleTitle from "../../../../../components/triangle-title/TriangleTitle";
import { orderServices } from "../../../../../services";
import { DateConvert, Toastify } from "../../../../../utils";
import useMainApi from "../../../../../common/hooks/useMainApi";

const SpotHistoryModal = ({ show, onHide, id, title }) => {
    const [orderData, setOrderData] = useState({});
    const [tradeData, setTradeData] = useState({});
    const { urls, get } = useMainApi()

    useEffect(getSpotMarketHistory, []);

    const getSpotMarketHistory = async () => {
        try {
            const _url = urls.SpotOrder.replace('_id', id)
            const res = await get(_url);
            const { trades, ...others } = res.data
            setOrderData(others);
            setTradeData(trades)
        } catch (error) {
            Toastify.error(error.message);
        }
    };



    return (
        <CustomizedModal show={show} onHide={onHide} title="جزئیات سفارش" size="lg">
            <div className="px-0 px-md-4">

                <Row>
                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className="text-gray-2 size-5 mb-2">جفت ارز</span>
                        <span className="d-flex align-items-center">
                            <span className="size-5 en text-gray-4">
                                {orderData.baseAsset}
                            </span>
                            <HiArrowNarrowLeft className="text-gray-1 mx-1" size={14} />
                            <span className="size-5 en text-gray-4">
                                {orderData.quoteAsset}
                            </span>
                        </span>
                    </Col>
                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className="text-gray-2 size-5 mb-2">تاریخ سفارش</span>
                        <span className="size-5 FaNum text-gray-4 d-inline-block">
                            {DateConvert.getTime(orderData?.createdAt)}
                            <span className="mx-1"></span>
                            {DateConvert.toShamsiDate(orderData?.createdAt)}
                        </span>
                    </Col>
                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className="text-gray-2 size-5 mb-2">نوع سفارش</span>
                        {orderData.type === "MARKET" ? (
                            <span className="size-5 text-gray-4">
                                تبدیل <span className="en">(Market)</span>
                            </span>
                        ) : (
                            <span className="size-5 text-gray-4">
                                اتوماتیک <span className="en">(Limit)</span>
                            </span>
                        )}
                    </Col>
                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className="text-gray-2 size-5 mb-2">شناسه سفارش</span>
                        <span className="size-5 text-gray-4 en">{orderData.marketId}</span>
                    </Col>

                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className='text-gray-2 size-5 mb-2'>مقدار نهایی پرداختی</span>

                        <span className="size-5 text-gray-4 en">
                            {Number(orderData?.filledQty || 0).toFixed(8)}
                            <span className="text-gray-2 ms-1">{orderData.baseAsset}</span>
                        </span>
                    </Col>
                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className="text-gray-2 size-5 mb-2">قیمت معامله</span>
                        <span className="size-5 text-gray-4 en">
                            {Number(orderData?.finalPrice || 0).toFixed(8)}
                        </span>
                    </Col>
                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className="text-gray-2 size-5 mb-2">مقدار نهایی دریافتی</span>
                        <span className="size-5 text-gray-4 en">
                            {Number(orderData?.filledQuoteQty || 0).toFixed(8)}
                            <span className="text-gray-2 ms-1">{orderData.quoteAsset}</span>
                        </span>
                    </Col>
                    <Col md={3} xs={6} className="d-flex flex-column mb-4">
                        <span className="text-gray-2 size-5 mb-2">کارمزد کل</span>
                        <span className="size-5 text-gray-4 en">
                            {math
                                .add(
                                    Number(orderData?.internalFee || 0),
                                    Number(orderData?.TradesFee || 0)
                                )
                                .toFixed(8)}
                            <span className="text-gray-2 ms-1">USDT</span>
                        </span>
                    </Col>
                </Row>
            </div>

            {
                tradeData.length ?
                    <div className='mt-2'>
                        <div className='mb-3'>
                            <TriangleTitle>
                                <h2 className="text-gray-4 size-4 fw-500 mb-0">ریز معامله ها</h2>
                            </TriangleTitle>
                        </div>

                        <TableElement
                            responsive
                            striped
                            header={
                                <>
                                    <th>زمان معامله</th>
                                    <th>قیمت معامله</th>
                                    <th>حجم پرداختی</th>
                                    <th>حجم دریافتی</th>
                                    <th>کارمزد</th>
                                </>
                            }
                        >
                            {tradeData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span className='size-5 FaNum text-gray-4 d-inline-block'>{DateConvert.getTime(item.applyTime)}
                                                <span className='mx-1'></span>
                                                {DateConvert.toShamsiDate(item.applyTime)}
                                            </span>
                                        </td>
                                        <td><span className='text-gray-4'>{Number(item?.binPrice || 0).toFixed(8)}</span></td>
                                        <td>
                                            <span className='size-5 text-gray-4 en'>{Number(item?.baseAmount || 0).toFixed(8)}
                                                <span className='text-gray-2 ms-1'>{orderData.baseAsset}</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className='size-5 text-gray-4 en'>{Number(item?.quoteAmount || 0).toFixed(8)}
                                                <span className='text-gray-2 ms-1'>{orderData.quoteAsset}</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className='size-5 text-gray-4 en'>{Number(item?.binCommission || 0).toFixed(8)}
                                                <span className='text-gray-2 ms-1'>{item.commissionAsset}</span>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </TableElement>
                    </div>
                    : null
            }

        </CustomizedModal >
    );
};

export default SpotHistoryModal;
