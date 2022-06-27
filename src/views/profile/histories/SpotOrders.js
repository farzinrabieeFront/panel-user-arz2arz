import { useEffect, useState } from "react";
import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import { Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import CustomizedButton from "../../../components/form/button/Button";
import Styles from './Transactions.module.scss'
import MarketOrderHistory from "./components/MarketOrderHistory";
import LimitOrderHistory from "./components/LimitOrderHistory";
import Tabs from "../../../common/element/tabs/Tabs";

export default function SpotOrders(props) {
    function tableSwitch() {
        switch (props.params.type) {
            case 'tradeorders':
                return <MarketOrderHistory />
            case 'openorders':
                return <LimitOrderHistory />
            default:
                return <MarketOrderHistory />
        }
    }

    return (
        <div className="wrapper h-100">
            <TriangleTitle>
                <h2 className="text-gray-4 size-3 fw-500 mb-0">تاریخچه سفارش‌ها</h2>
            </TriangleTitle>
            <Row className={`justify-content-between align-items-end mb-3 `}>
                <Col md={6} className="mb-3 mb-md-0">
                    <Tabs data={[
                        { to: "/my/orders/spot/openorders", title: "سفارش‌های باز" },
                        { to: "/my/orders/spot/tradeorders", title: "تاریخچه سفارش‌ها" },
                    ]} />
                </Col>

                {tableSwitch()}
            </Row>
        </div>
    );
}

