/**internal imports */
import { useEffect, useState } from "react";
import Styles from "./OrderForms.module.scss";
import { useOrder } from "../../../../context/OrderServises";
/**external imports */
import { useNavigate, useParams, useLocation } from "react-router";
import { Col, Row } from "react-bootstrap";
import * as math from "mathjs";
import { HiPlus } from "react-icons/all";
/**component imports */
import Buy from "../form/buy/Buy";
import Sell from "../form/sell/Sell";
import FiatWalletIcon from "../../../../assets/images/wallet-icon.svg";
import CustomizedButton from "../../../../components/form/button/Button";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";

export default function MarketForms({ refreshHistory }) {
  const navigate = useNavigate();
  const { spot } = useParams();
  const { pathname } = useLocation();
  const { balance, prices, refCurrency } = useOrder();

  const [type, setType] = useState("buy");
  const [fiatBalances, setFiatBalances] = useState({});
  const [spotBalances, setSpotBalances] = useState({});

  useEffect(() => {
    if ("fiatWallets" in balance) setFiatBalances(balance.fiatWallets);
    if ("spotWallets" in balance) setSpotBalances(balance.spotWallets);
  }, [balance]);

  return [
    <div className="w-100 mb-4">
      <TriangleTitle>
        <h2 className="text-gray-4 mb-0 fw-500 size-3">
          خرید و فروش ارز <span className="text-gray-2">(Fiat trade)</span>
        </h2>
      </TriangleTitle>
    </div>,
    <div className="w-100 d-flex justify-content-center flex-wrap mb-4 flex-row-reverse">
      <Col
        md={6}
        sm={8}
        xs={12}
        className="px-lg-4 px-0 px-md-2 pt-md-5 mt-md-4 mb-3 mb-md-0"
      >
        <div
          className={`bg-hover mb-4 p-3 rounded-20 d-flex align-items-center`}
        >
          <span className={Styles.icon}>
            <img src={FiatWalletIcon} width={96} height={96} />
          </span>
          <div
            className={`me-4 d-flex flex-column flex-wrap justify-content-between`}
          >
            <h2 className="text-blue size-3 mb-2">موجودی حساب</h2>
            <div className="d-flex align-items-center">
              <span
                className="fw-700 text-gray-4 size-0 en pointer"
                onClick={() => {
                  if (type === "buy")
                    navigate(pathname, {
                      state: {
                        amount: Number(fiatBalances.IRT?.balance || 0).toFixed(
                          0
                        ),
                      },
                    });
                }}
              >
                {Number(
                  Number(fiatBalances.IRT?.balance || 0).toFixed(0)
                ).toLocaleString()}
              </span>
              <span className="fw-500 size-4 text-gray-3 me-2">تومان</span>
            </div>
            <div>
              <CustomizedButton
                rightIcon={<HiPlus size={20} />}
                outlined
                className="mt-3 size-5 py-2 minHeight-auto fw-700"
                size="xs"
                variant="blue"
                onClick={() => navigate("/my/wallet/deposit/fiat")}
              >
                افزایش موجودی
              </CustomizedButton>
            </div>
          </div>
        </div>

        <div className="bg-hover w-100 p-3 rounded-20 d-flex align-items-center justify-content-between">
          {type === "buy" ? (
            <>
              <span className="text-success size-3 fw-500">
                قیمت هر واحد خرید {spot}
              </span>
              <span className="d-flex align-items-center ltr mt-2">
                <span className="size-3 fw-500 text-gray-4">
                  {spot !== "USDT"
                    ? math
                        .multiply(
                          Number(prices[`${spot}USDT`] || 0),
                          Number(refCurrency.USD?.sellPrice || 0)
                        )
                        .toLocaleString()
                    : Number(refCurrency.USD?.sellPrice || 0).toLocaleString()}
                </span>
                <span className="size-5 text-gray-3 ms-2">تومان</span>
              </span>
            </>
          ) : (
            <>
              <span className="text-danger size-3 fw-500">
                قیمت هر واحد فروش {spot}
              </span>
              <span className="d-flex align-items-center ltr mt-2">
                <span className="size-3 fw-500 text-gray-4">
                  {spot !== "USDT"
                    ? math
                        .multiply(
                          Number(prices[`${spot}USDT`] || 0),
                          Number(refCurrency.USD?.buyPrice || 0)
                        )
                        .toLocaleString()
                    : Number(refCurrency.USD?.buyPrice || 0).toLocaleString()}
                </span>
                <span className="size-5 text-gray-3 ms-2">تومان</span>
              </span>
            </>
          )}
        </div>
      </Col>

      <Col md="6" className="d-flex flex-wrap mt-2">
        <Col xs={6} className="px-lg-4 px-2">
          <div
            className={`${Styles.tab} ${
              type === "buy"
                ? "bg-success btn-success text-white"
                : "bg-light text-gray-4"
            } pointer p-2 text-center rounded-12 bordered`}
            onClick={() => setType("buy")}
          >
            <span className="size-3 fw-500">خرید ارز</span>
          </div>
        </Col>

        <Col xs={6} className="px-lg-4 px-2">
          <div
            className={`${Styles.tab} ${
              type === "sell"
                ? "bg-danger btn-danger text-white"
                : "bg-light text-gray-4"
            } pointer p-2 text-center rounded-12 bordered`}
            onClick={() => setType("sell")}
          >
            <span className="size-3 fw-500">فروش ارز</span>
          </div>
        </Col>
        <Col xs={12} className="px-lg-4 px-0 px-md-2 mb-md-0 my-4">
          {type === "buy" ? (
            <Buy
              balance={fiatBalances}
              spotBalance={spotBalances}
              refreshHistory={refreshHistory}
            />
          ) : (
            <Sell spotBalance={spotBalances} refreshHistory={refreshHistory} />
          )}
        </Col>
      </Col>
    </div>,
  ];
}
