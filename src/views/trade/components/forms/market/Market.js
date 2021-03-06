/** internal import */
import { useState, useEffect, useRef, memo } from "react";
import { useOrder } from "../../../../../context/OrderServises";
import { Toastify } from "../../../../../utils";
import { orderServices } from "../../../../../services";
import { useCoreApi } from "../../../../../common/hooks";

/** external import */
import { Form, Formik, Field } from "formik";
import { Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/all";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { create, all } from "mathjs";
import * as yup from "yup";

/** components import */
import {
    InputElement,
    AmountInput,
    MarketInput,
} from "../../../../../common/element/formik-inputs";
import CustomizedButton from "../../../../../components/form/button/Button";
import useTrade from "../../../../../common/hooks/useTrade";

const math = create(all, {
    number: "BigNumber",
    preciaion: 64,
});

function Market({ refreshHistory }) {
    const formikRef = useRef(null);
    const navigate = useNavigate();
    const { spot } = useParams();
    const { state } = useLocation();
    const { prices, balance } = useOrder();
    const { urls, post } = useCoreApi()
    const { market, exchange } = useSelector((state) => state);
    const { marketInfo } = market;
    const { MARKET: internalFee = 0 } = exchange.fees;
    const [loading, setLoading] = useState(false);
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [maximumAmount, setMaximumAmount] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [maximumDecimalAmount, setMaximumDecimalAmount] = useState(0);
    const [baseAssetBalance, setBaseAssetBalance] = useState(0);
    const [base, setBase] = useState("");
    const [quote, setQuote] = useState("");

    useEffect(() => {
        formikRef.current.resetForm();
    }, [spot]);

    useEffect(() => {
        if (Object.keys(marketInfo).length && Object.keys(prices).length) {
            vaildationMethod(formikRef.current.values);
        }
    }, [prices, marketInfo]);

    const vaildationMethod = ({ type, amount, market }) => {
        if (market !== spot.split("-").join(""))
            navigate(
                [marketInfo[market].baseAsset, marketInfo[market].quoteAsset].join("-"),
                { state: { type } }
            );

        if (type !== state?.type) navigate(spot, { state: { type } });

        let spotWallets = balance.spotWallets || {},
            market_price = Number(prices[market] || 0),
            {
                LOT_SIZE_minQty = 0,
                LOT_SIZE_maxQty = 0,
                MIN_NOTIONAL = 0,
                fee = 0,
                baseAsset = "",
                quoteAsset = "",
            } = marketInfo[market] || {};

        // calculate lowest amount
        const lowest =
            type === "sell"
                ? math.divide(Number(MIN_NOTIONAL), market_price)
                : Number(MIN_NOTIONAL);
        if (lowest && lowest !== Infinity && lowest !== minimumAmount)
            setMinimumAmount(lowest);

        // calculate highest amount
        const highest =
            type === "sell"
                ? Number(LOT_SIZE_maxQty)
                : math.multiply(Number(LOT_SIZE_maxQty), market_price);
        if (highest && highest !== Infinity && highest !== maximumAmount)
            setMaximumAmount(highest);

        // calculate max decimal amount
        if (type === "sell" && LOT_SIZE_minQty) {
            LOT_SIZE_minQty.split(".")[1]
                .split("")
                .forEach((num, i) => {
                    if (num !== "0") {
                        setMaximumDecimalAmount(i + 1);
                        return;
                    }
                });
        } else setMaximumDecimalAmount(8);

        // calculate recieve and fee amount
        if (Number(amount) && market_price) {
            let quote_amount = 0;

            quote_amount =
                type === "sell"
                    ? math.multiply(Number(amount), market_price)
                    : math.divide(Number(amount), market_price);

            const total_fee = math.add(
                math.divide(Number(internalFee), 100),
                Number(fee)
            );

            const fee_amount = math.multiply(quote_amount, total_fee);
            const recieve_amount = math.subtract(quote_amount, fee_amount);

            setTotalFee(fee_amount);
            setReceivedAmount(recieve_amount);
        } else {
            setTotalFee(0);
            setReceivedAmount(0);
        }

        setBaseAssetBalance(Number(spotWallets[base]?.balance || 0));

        setBase(type === "sell" ? baseAsset : quoteAsset);
        setQuote(type === "sell" ? quoteAsset : baseAsset);
    };

    const vaildationMethodSchema = () => {
        let schema = {
            amount: yup
                .number("?????? ?????? ?????????? ???????? ????????.")
                .required("?????? ???????? ???????????? ??????.")
                .min(
                    minimumAmount,
                    `?????????? ?????????? ???????? ?????????? ${base} ${math
                        .ceil(minimumAmount, maximumDecimalAmount)
                        .toString()} ??????`
                )
                .max(
                    maximumAmount,
                    `???????????? ?????????? ???????? ?????????????? ?????????? ${maximumAmount.toLocaleString()} ${base} ??????`
                )
                .lessThan(baseAssetBalance, "???????????? ?????????? ???????? ????????"),
        };

        return yup.object().shape(schema);
    };

    const onSubmit = async ({ amount, type, market }, formActions) => {
        try {
            const _body = {
                baseAsset: base,
                quoteAsset: quote,
                amount,
            };

            const res = await post(urls.MarketOrder, _body);
            Toastify.success(res.message);
            formActions.resetForm({
                values: {
                    type,
                    amount: "",
                    market,
                },
            });
        } catch (error) {
            Toastify.error(error.message);
        } finally {
            refreshHistory();
        }
    };

    return (
        <Formik
            innerRef={formikRef}
            enableReinitialize
            validateonChange
            initialValues={{
                type: state?.type || "sell",
                amount: "",
                market: spot.split("-").join(""),
            }}
            validationSchema={vaildationMethodSchema}
            validate={vaildationMethod}
            onSubmit={onSubmit}
            onReset={() => {
                setTotalFee(0);
                setReceivedAmount(0);
            }}
        >
            {({ isValid, dirty, values, setFieldValue }) => (
                <Form className="d-flex flex-wrap justify-content-center align-items-stretch px-2 py-3">
                    <Col xs={12} className="px-1 mb-4 pb-1">
                        <Field as={MarketInput}
                            name="market"
                            labelClassName="size-5 text-gray-3"
                            type={values.type}
                            userBalances={balance.spotWallets}
                            changeTypeHandler={(type) => {
                                setFieldValue("type", type);
                            }}
                            setAmount={(amount) =>
                                setFieldValue("amount", math.fix(amount, maximumDecimalAmount))
                            }
                        />
                    </Col>

                    <Col xs={12} className="px-1 mb-2">
                        <InputElement
                            label="????????"
                            name="requestedPrice"
                            tradeInput
                            prepend={
                                <span className="size-5 fw-500 text-gray-1 en">
                                    {spot.split("-").join(" / ")}
                                </span>
                            }
                            className="en fw-500"
                            readOnly
                            value={prices[values.market]?.toString() || "0"}
                        />
                    </Col>

                    <Col xs={12} className="px-1 mb-2">
                        <Field
                            as={AmountInput}
                            label="??????????"
                            name="amount"
                            symbol={base}
                            limit={{
                                label: "?????????? ??????????",
                                value: minimumAmount,
                            }}
                            sliderVariant="#00BABA"
                            maxDecimal={maximumDecimalAmount}
                            maxValue={baseAssetBalance}
                            minValue={0}
                        />
                    </Col>

                    <Col xs={12} className="px-1 mb-2">
                        <div className="d-flex justify-content-between px-1">
                            <div>
                                <span className="size-5 text-gray-2">??????</span>{" "}
                                <span className="size-5 en fw-500 text-gray-3">{quote}</span>{" "}
                                <span className="size-5 text-gray-2">???? ?????? ????????????</span>
                            </div>

                            <div className="d-flex align-items-center ">
                                <span className="size-5 text-gray-2">???????????? : </span>
                                <span className="size-5 en text-gray-2 text-gray-2 mx-1">
                                    {quote}
                                </span>
                                <span className="en size-5 text-gray-4">
                                    {parseFloat(totalFee)
                                        .toFixed(8)
                                        .replace(/(\.\d+?)0+\b/g, "$1")
                                        .toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <InputElement
                            name="get_amount"
                            tradeInput
                            className="en fw-500"
                            prepend={
                                <span className="size-5 fw-500 text-gray-1 en">{quote}</span>
                            }
                            readOnly
                            value={receivedAmount ? receivedAmount.toFixed(8) : 0}
                        />
                    </Col>

                    <Col xs={12} className="px-1">
                        <div className="d-flex justify-content-end">
                            <CustomizedButton
                                isFullWidth
                                leftIcon={<FaChevronLeft size={20} />}
                                type="submit"
                                className="tradeBtn size-3 fw-400 py-1"
                                size="sm"
                                variant="blue"
                                disabled={!(isValid && dirty)}
                                loading={loading}
                            >
                                ????????????
                                <span className="en fw-600 me-2">
                                    {values.type === "sell"
                                        ? spot.split("-")[1]
                                        : spot.split("-")[0]}
                                </span>
                            </CustomizedButton>
                        </div>
                    </Col>
                </Form>
            )}
        </Formik>
    );
}

export default memo(Market);
