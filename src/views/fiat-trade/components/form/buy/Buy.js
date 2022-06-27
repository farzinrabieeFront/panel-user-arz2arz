/**internal imports */
import { useEffect, useRef, useState } from "react";
import { orderServices } from "../../../../../services";
import { Toastify } from "../../../../../utils";
import { useOrder } from "../../../../../context/OrderServises";
/**external imports */
import { Form, Formik, Field } from "formik";
import { Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/all";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import * as math from "mathjs";
import * as yup from "yup";
/**component imports */
import { InputElement, AmountInput, SelectCoin } from "../../../../../common/element/formik-inputs";
import CustomizedButton from "../../../../../components/form/button/Button";
import DepositCard from "../deposit-card/DepositCard";
import useCoreApi from "../../../../../common/hooks/useCoreApi";

export default function Buy({ balance, spotBalance, refreshHistory }) {
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef(null);
    const { spot } = useParams();
    const { prices, refCurrency } = useOrder();
    const { urls, post } = useCoreApi()
    const { market, exchange } = useSelector((state) => state);
    const { marketInfo } = market;
    const { FIAT: internalFee = 0 } = exchange.fees;
    const { fiatBuy: internalLimit = {} } = exchange.limits.orderLimits;

    const [loading, setLoading] = useState(false);
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [maximumAmount, setMaximumAmount] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [maximumDecimalAmount, setMaximumDecimalAmount] = useState(0);
    const [showAccountRechargeCard, setShowAccountRechargeCard] = useState(false);

    useEffect(() => {
        if (location.state?.amount)
            formikRef.current.setFieldValue("amount", location.state.amount);
    }, [location]);

    useEffect(() => {
        if (Object.keys(marketInfo).length && Object.keys(prices).length) {
            vaildationMethod(formikRef.current.values);
        }
    }, [prices, marketInfo]);

    const vaildationMethod = ({ amount, spotAsset }) => {
        if (spotAsset !== spot) {
            navigate(`/fiat/${spotAsset}`);
            setReceivedAmount(0);
            setMaximumDecimalAmount(0);
        }

        const usd_price = Number(refCurrency.USD?.sellPrice || 0),
            market_price = Number(prices[`${spotAsset}USDT`] || 0),
            {
                LOT_SIZE_minQty = 0,
                LOT_SIZE_maxQty = 0,
                MIN_NOTIONAL = 0,
                fee = 0,
            } = marketInfo[`${spotAsset}USDT`] || {};

        // calculate lowest amount
        const lowest =
            spotAsset === "USDT"
                ? math.multiply(Number(internalLimit?.lowest || 0), usd_price)
                : math.max(
                    math.multiply(Number(internalLimit.lowest || 0), usd_price),
                    math.multiply(Number(MIN_NOTIONAL), usd_price)
                );
        if (lowest && lowest !== Infinity && lowest !== minimumAmount)
            setMinimumAmount(lowest);

        // calculate highest amount
        const highest =
            spotAsset === "USDT"
                ? math.multiply(Number(internalLimit.highest || 0), usd_price)
                : math.min(
                    math.multiply(Number(internalLimit.highest || 0), usd_price),
                    math.multiply(Number(LOT_SIZE_maxQty), usd_price)
                );
        if (highest && highest !== Infinity && highest !== maximumAmount)
            setMaximumAmount(highest);

        // calculate max decimal amount
        if (spotAsset !== "USDT") {
            LOT_SIZE_minQty?.split(".")[1]
                .split("")
                .forEach((num, i) => {
                    if (num !== "0") {
                        setMaximumDecimalAmount(i + 1);
                        return;
                    }
                });
        } else setMaximumDecimalAmount(2);

        // calculate recieve and fee amount
        if (Number(amount) && usd_price) {
            let spot_amount = 0;
            const usdt_amount = math.divide(Number(amount), usd_price);

            if (spotAsset !== "USDT")
                spot_amount = math.divide(usdt_amount, market_price);
            else spot_amount = usdt_amount;

            const total_fee = math.add(
                math.divide(Number(internalFee), 100),
                Number(fee)
            );
            const fee_amount = math.multiply(spot_amount, total_fee);
            const recieve_amount = math.subtract(spot_amount, fee_amount);

            setTotalFee(fee_amount);
            setReceivedAmount(recieve_amount);
            console.log({ total_fee, spot_amount, fee_amount, recieve_amount, fee, internalFee: math.divide(Number(internalFee), 100) });
        } else {
            setTotalFee(0);
            setReceivedAmount(0);
        }
    };

    const vaildationMethodSchema = () => {
        let schema = {
            amount: yup
                .number("فقط عدد لاتین وارد کنید.")
                .required("این فیلد الزامی است.")
                .min(
                    minimumAmount,
                    `حداقل مقدار مجاز پرداختی برابر ${math
                        .fix(minimumAmount, maximumDecimalAmount)
                        .toLocaleString()} تومان است`
                )
                .max(
                    maximumAmount,
                    `حداکثر مقدار مجاز پرداختی برابر ${maximumAmount.toLocaleString()} تومان است`
                ),
            // .lessThan(Number(balance?.IRT?.balance || 0), "موجودی حسابت کافی نیست"),
        };

        return yup.object().shape(schema);
    };

    const onSubmit = async (vals) => {
        if (math.larger(Number(vals.amount), Number(balance.IRT?.balance || 0))) {
            setShowAccountRechargeCard(true);
        } else {
            try {
                const res = await post(urls.FiatOrders);
                Toastify.success(res.message);
                formikRef.current.resetForm({})
            } catch (error) {
                Toastify.error(error.message);
            } finally {
                refreshHistory();
            }
        }
    };

    return [
        <Formik
            innerRef={formikRef}
            enableReinitialize={true}
            validateonChange={true}
            initialValues={{
                amount: "",
                side: "BUY",
                spotAsset: spot,
            }}
            onReset={() => {
                setTotalFee(0)
                setReceivedAmount(0)
            }}
            validationSchema={vaildationMethodSchema}
            validate={vaildationMethod}
            onSubmit={onSubmit}
        >
            {({ isValid, dirty, values }) => (
                <Form className="d-flex flex-column align-items-end rounded-20 bordered p-md-7 p-3">
                    <Col xs={12} className="mb-4">
                        <Field
                            as={SelectCoin}
                            label="نام ارز"
                            name="spotAsset"
                            showBalance
                            options={['USDT', ...Object.keys(marketInfo).filter(key => {
                                if (marketInfo[key].quoteAsset === "USDT")
                                    if (
                                        marketInfo[key].spotTradingAllowed &&
                                        marketInfo[key].status === "TRADING"
                                    )
                                        return key
                            }).map(market => market.replace("USDT", ""))]}
                            balance={spotBalance[values.spotAsset]?.balance || 0}
                        />
                    </Col>

                    <Col xs={12} className="mb-4">
                        <Field
                            as={AmountInput}
                            label="مقدار پرداختی"
                            name="amount"
                            symbol=" تومان"
                            limit={{
                                label: "حداقل مقدار خرید",
                                value: minimumAmount,
                            }}
                            sliderVariant="#00BABA"
                            maxDecimal={0}
                            maxValue={balance.IRT?.balance || 0}
                            minValue={0}
                            amountString
                            hiddenSymbolLabel
                        />
                    </Col>

                    <Col xs={12} className="mb-4">
                        <div className="d-flex justify-content-between mb-1 px-1">
                            <label className="text-gray-2 size-5">
                                <span className="text-gray-3 fw-500 ms-1">
                                    مقدار دریافتی {values.spotAsset}
                                </span>
                                با کسر کارمزد
                            </label>
                            <div className="d-flex align-items-center">
                                <span className="size-5 text-gray-2"> کارمزد : </span>
                                <span className="size-5 en mx-1 text-gray-2">
                                    {values.spotAsset}
                                </span>
                                <span className="size-5 en text-gray-4">
                                    {parseFloat(totalFee)
                                        .toFixed(8)
                                        .replace(/(\.\d+?)0+\b/g, "$1")
                                        .toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <InputElement
                            name="get_amount"
                            type="tel"
                            prepend={
                                <span className="size-5 text-gray-1 en fw-500">
                                    {values.spotAsset}
                                </span>
                            }
                            className="fw-500 size-4 en"
                            readOnly
                            value={receivedAmount ? receivedAmount.toFixed(8) : 0}
                        />
                    </Col>

                    <Col xs={12}>
                        <div className="d-flex justify-content-end">
                            <CustomizedButton
                                isFullWidth
                                leftIcon={<FaChevronLeft size={20} />}
                                type="submit"
                                className="fw-700 size-3"
                                size="sm"
                                variant="success"
                                disabled={!(isValid && dirty)}
                                loading={loading}
                            >
                                خرید <span className="en">{values.spotAsset}</span>
                            </CustomizedButton>
                        </div>
                    </Col>
                </Form>
            )}
        </Formik>,
        showAccountRechargeCard ? (
            <DepositCard
                show={showAccountRechargeCard}
                amount={formikRef.current?.values?.amount || 0}
                onClose={() => setShowAccountRechargeCard(false)}
            />
        ) : null,
    ];
}