import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiCoinStack, BiCreditCard } from "react-icons/all";

import Tips from "./components/tips/Tips";
import FiatWithdraw from "./components/forms/fiat/FiatWithdraw";
import SpotWithdraw from "./components/forms/spot/SpotWithdraw";

import Styles from "./Withdraw.module.scss";

import CanWithdrawHoc from "../../common/hoc/CanWithdrawHoc";
import SpotWithdrawForm from "../../forms/spot-withdraw/SpotWithdrawForm";

const InnerWithdraw = ({
    type,
    fiatBalances,
    spotBalances,
    refreshHistoryHandler,
}) => {
    return (
        <>
            <div className={`${Styles.formTabs} w-100 d-flex flex-wrap mb-4`}>
                <Col md={3} xs={6} className="px-lg-4 px-2">
                    <Link
                        to="/my/wallet/withdraw/fiat"
                        className={`${Styles.tab} ${type === "fiat" ? Styles.active : ""
                            } p-2 center-content`}
                    >
                        <span className="text-gray-3">
                            <BiCreditCard size={23} className="ms-2" />
                        </span>
                        <span className="text-gray-4 size-3 fw-500">برداشت تومانی</span>
                    </Link>
                </Col>

                <Col md={3} xs={6} className="px-lg-4 px-2">
                    <Link
                        to="/my/wallet/withdraw/spot"
                        className={`${Styles.tab} ${type === "spot" ? Styles.active : ""
                            } p-2 center-content`}
                    >
                        <span>
                            <BiCoinStack size={23} className="ms-2" />
                        </span>
                        <span className="text-gray-4 size-3 fw-500">برداشت ارزی</span>
                    </Link>
                </Col>
            </div>

            <div className="d-flex flex-wrap">
                <Col md={6} xs={12} className="px-lg-4 px-0 px-md-2 mb-md-0 mb-3">
                    {type === "fiat" ? (
                        <FiatWithdraw
                            balances={fiatBalances}
                            refreshHistory={refreshHistoryHandler}
                        />
                    ) : (
                        <SpotWithdraw
                            balances={spotBalances}
                            refreshHistory={refreshHistoryHandler}
                        />
                    )}
                </Col>
                <Col md={6} xs={12} className="px-lg-4 px-0 px-md-2">
                    <Tips type={type} />
                </Col>
            </div>
        </>
    );
};

export default CanWithdrawHoc(InnerWithdraw);
