/** internal imports */
import { useEffect, useRef, useState } from "react";
import Styles from "./Deposit.module.scss";
import { useOrder } from "../../context/OrderServises";

/** external imports */
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiCreditCard, BiCoinStack } from "react-icons/all";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";

/** component imports */
import Wrapper from "../../components/wrapper/Wrapper";
import Tips from "./components/tips/Tips";
import TriangleTitle from "../../components/triangle-title/TriangleTitle";
import FiatDeposit from "./forms/fiat/FiatDeposit";
import SpotDeposit from "./forms/spot/SpotDeposit";
import DepositHistory from "./components/histories/DepositHistory";
import AuthHoc from "../../common/hoc/AuthHoc";

const Deposit = (props) => {
  const historyRef = useRef();
  const navigate = useNavigate();
  const { spot } = useParams();
  const { balance } = useOrder();

  const { depositEnabled } = useSelector((state) => state.config);

  const [fiatBalances, setFiatBalances] = useState({});
  const [spotBalances, setSpotBalances] = useState({});

  useEffect(() => {
    if (props.type === "spot")
      if (!spot) navigate(`/deposit/spot/${depositEnabled[0]}`);
  }, []);

  useEffect(() => {
    if ("fiatWallets" in balance) setFiatBalances(balance.fiatWallets);
    if ("spotWallets" in balance) setSpotBalances(balance.spotWallets);
  }, [balance]);

  const refreshHistoryHandler = () => {
    historyRef.current.refreshHistoryHandler();
  };

  return [
    <Wrapper className="p-4 mb-3">
      <div className="w-100 mb-4">
        <TriangleTitle>
          <h2 className="text-gray-4 mb-0 fw-500 size-3">
            واریز تومانی / ارزی <span className="text-gray-2">(Deposit)</span>
          </h2>
        </TriangleTitle>
      </div>

      <div className={`${Styles.formTabs} w-100 d-flex flex-wrap mb-4`}>
        <Col md={3} xs={6} className="px-lg-4 px-2">
          <Link
            to="/my/wallet/deposit/fiat"
            className={`${Styles.tab} ${
              props.type === "fiat" ? Styles.active : ""
            } p-2 center-content`}
          >
            <span className="text-gray-3">
              <BiCreditCard size={23} className="ms-2" />
            </span>
            <span className="text-gray-4 size-3 fw-500">واریز تومانی</span>
          </Link>
        </Col>

        <Col md={3} xs={6} className="px-lg-4 px-2">
          <Link
            to="/deposit/spot/USDT"
            className={`${Styles.tab} ${
              props.type === "spot" ? Styles.active : ""
            } p-2 center-content`}
          >
            <span>
              <BiCoinStack size={23} className="ms-2" />
            </span>
            <span className="text-gray-4 size-3 fw-500">واریز ارزی</span>
          </Link>
        </Col>
      </div>

      <div className="d-flex flex-wrap">
        <Col md={6} xs={12} className="px-lg-4 px-0 px-md-2 mb-md-0 mb-3">
          {props.type === "fiat" ? (
            <FiatDeposit
              balances={fiatBalances}
              refreshHistory={refreshHistoryHandler}
            />
          ) : (
            <SpotDeposit spotBalance={spotBalances} />
          )}
        </Col>

        <Col md={6} xs={12} className="px-lg-4 px-0 px-md-2">
          <Tips type={props.type} />
        </Col>
      </div>
    </Wrapper>,
    <Wrapper className="p-0 p-md-4 overflow-hidden">
      <DepositHistory type={props.type}  ref={historyRef}/>
    </Wrapper>,
  ];
};

export default AuthHoc(
  Deposit,
  "واریز تومانی / ارزی داشته باشی",
  "واریز تومانی / ارزی"
);
