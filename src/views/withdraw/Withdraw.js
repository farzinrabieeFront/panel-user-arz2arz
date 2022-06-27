/** internal imports */
import { Fragment, useEffect, useRef, useState } from "react";
import { useOrder } from "../../context/OrderServises";
/** external imports */
import { useSelector } from "react-redux";
/** component imports */
import Wrapper from "../../components/wrapper/Wrapper";
import TriangleTitle from "../../components/triangle-title/TriangleTitle";
import AuthHoc from "../../common/hoc/AuthHoc";
import InnerWithdraw from "./InnerWithdraw";
import WithdrawHistory from "./components/histories/WithdrawHistory";

const Withdraw = (props) => {
    const { withdrawEnabled } = useSelector((state) => state.config);
    const historyRef = useRef();
    const { balance } = useOrder();
    const spot = props.params.spot;

    const [fiatBalances, setFiatBalances] = useState({});
    const [spotBalances, setSpotBalances] = useState({});

    useEffect(() => {
        if (props.type === "spot")
            if (!spot) props.navigate(`/my/wallet/withdraw/spot/${withdrawEnabled[0]}`);
    }, []);

    useEffect(() => {
        if ("fiatWallets" in balance) setFiatBalances(balance.fiatWallets);
        if ("spotWallets" in balance) setSpotBalances(balance.spotWallets);
    }, [balance]);

    const refreshHistoryHandler = () =>
        historyRef.current.refreshHistoryHandler();

    return (
        <Fragment>
            <Wrapper className="p-4 mb-3">
                <TriangleTitle className="w-100 mb-4">
                    <h2 className="text-gray-4 mb-0 fw-500 size-3">
                        برداشت تومانی / ارزی
                        <span className="text-gray-2 mx-1">(Withdraw)</span>
                    </h2>
                </TriangleTitle>

                <InnerWithdraw
                    type={props.type}
                    fiatBalances={fiatBalances}
                    spotBalances={spotBalances}
                    refreshHistoryHandler={refreshHistoryHandler}
                />
            </Wrapper>

            <Wrapper className="p-0 p-md-4 overflow-hidden">
                <WithdrawHistory type={props.type} ref={historyRef} />
            </Wrapper>
        </Fragment>
    );
};

export default AuthHoc(
    Withdraw,
    "برداشت تومانی / ارزی داشته باشی",
    "برداشت تومانی / ارزی"
);
