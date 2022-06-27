/**internal import */
import { useState, useEffect, useRef } from "react";
import { Toastify } from "../../../../../utils";
import { useOrder } from "../../../../../context/OrderServises";
/**external  import */
import { Form, Formik, Field } from "formik";
import { Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/all";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { create, all } from "mathjs";
import * as yup from "yup";
/** components import */
import { InputElement, AmountInput, MarketInput } from "../../../../../common/element/formik-inputs";
import CustomizedButton from "../../../../../components/form/button/Button";
import useCoreApi from "../../../../../common/hooks/useCoreApi";

const math = create(all, {
    number: "BigNumber",
    preciaion: 64,
});

export default function Limit({ refreshHistory }) {
    const formikRef = useRef(null);
    const { spot } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { prices, balance } = useOrder();
    const { urls, post } = useCoreApi()
    const { market, exchange } = useSelector((state) => state);
    const { marketInfo } = market;
    const { LIMIT: internalFee = 0 } = exchange.fees;

    const [loading, setLoading] = useState(false);
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [maximumAmount, setMaximumAmount] = useState(0);
    const [minimumReqPrice, setMinimumReqPrice] = useState(0);
    const [maximumReqPrice, setMaximumReqPrice] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [maximumDecimalAmount, setMaximumDecimalAmount] = useState(0);
    const [maximumDecimalPrice, setMaximumDecimalPrice] = useState(0);
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

    const vaildationMethod = ({ type, amount, market, requestedPrice }) => {
        if (market !== spot.split("-").join(''))
            navigate([marketInfo[market].baseAsset, marketInfo[market].quoteAsset].join('-'), { state: { type } })

        if (type !== state.type)
            navigate(spot, { state: { type } })

        const spotWallets = balance.spotWallets || {},
            market_price = Number(prices[market] || 0),
            {
                LOT_SIZE_minQty = 0,
                LOT_SIZE_maxQty = 0,
                MIN_NOTIONAL = 0,
                PRICE_FILTER_minPrice = 0,
                PERCENT_PRICE_multiplierDown = 0,
                PERCENT_PRICE_multiplierUp = 0,
                fee = 0,
                baseAsset = "",
                quoteAsset = "",
            } = marketInfo[market] || {};

        const lowest =
            type === "sell"
                ? math.divide(Number(MIN_NOTIONAL), Number(requestedPrice))
                : Number(MIN_NOTIONAL);
        if (requestedPrice) {
            if (lowest && lowest !== Infinity && lowest !== minimumAmount)
                setMinimumAmount(lowest);
        } else setMinimumAmount(0);

        const highest =
            type === "sell"
                ? Number(LOT_SIZE_maxQty)
                : math.multiply(Number(LOT_SIZE_maxQty), Number(requestedPrice));
        if (highest && highest !== Infinity && highest !== maximumAmount)
            setMaximumAmount(highest);

        const lowest_price = math.multiply(
            Number(PERCENT_PRICE_multiplierDown),
            market_price
        );
        if (
            lowest_price &&
            lowest_price !== Infinity &&
            lowest_price !== minimumReqPrice
        )
            setMinimumReqPrice(lowest_price);

        const highest_price = math.multiply(
            Number(PERCENT_PRICE_multiplierUp),
            market_price
        );
        if (
            highest_price &&
            highest_price !== Infinity &&
            highest_price !== maximumReqPrice
        )
            setMaximumReqPrice(highest_price);

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

        if (PRICE_FILTER_minPrice)
            PRICE_FILTER_minPrice.split(".")[1]
                .split("")
                .forEach((num, i) => {
                    if (num !== "0") {
                        setMaximumDecimalPrice(i + 1);
                        return;
                    }
                });

        if (Number(amount) && Number(requestedPrice)) {
            let quote_amount = 0;

            quote_amount =
                type === "sell"
                    ? math.multiply(Number(amount), Number(requestedPrice))
                    : math.divide(Number(amount), Number(requestedPrice));

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
                .number("فقط عدد لاتین وارد کنید.")
                .required("این فیلد الزامی است.")
                .min(
                    minimumAmount,
                    `حداقل مقدار مجاز برابر ${base} ${math
                        .ceil(minimumAmount, maximumDecimalAmount)
                        .toString()} است`
                )
                .max(
                    maximumAmount,
                    `حداکثر مقدار مجاز پرداختی برابر ${maximumAmount.toLocaleString()} ${base} است`
                )
                .lessThan(baseAssetBalance, "موجودی حسابت کافی نیست"),
            requestedPrice: yup
                .number("فقط عدد لاتین وارد کنید.")
                .required("این فیلد الزامی است.")
                .min(
                    minimumReqPrice,
                    `حداقل قیمت مجاز درخواستی برابر ${math
                        .fix(minimumReqPrice, maximumDecimalAmount)
                        .toLocaleString()} ${base} است`
                )
                .max(
                    maximumReqPrice,
                    `حداکثر قیمت مجاز درخواستی برابر ${maximumReqPrice.toLocaleString()} ${base} است`
                ),
        };

        return yup.object().shape(schema);
    };

    const onSubmit = async ({ amount, requestedPrice, type, market }, formActions) => {
        try {
            const _body = {
                baseAsset: base,
                quoteAsset: quote,
                amount,
                requestedPrice,
            };

            const res = await post(urls.LimitOrder, _body);

            Toastify.success(res.message);
            formActions.resetForm({
                values: {
                    type,
                    amount: "",
                    requestedPrice: "",
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
            enableReinitialize={true}
            validateonChange={true}
            initialValues={{
                type: state?.type || "sell",
                amount: "",
                market: spot.split("-").join(""),
                requestedPrice: "",
            }}
            validationSchema={vaildationMethodSchema}
            validate={vaildationMethod}
            onSubmit={onSubmit}
        >
            {({ isValid, dirty, values, setFieldValue }) => (
                <Form className="d-flex flex-wrap justify-content-center align-items-stretch px-2 py-3">
                    <Col xs={12} className="px-1 mb-4 pb-1">
                        <Field
                            as={MarketInput}
                            name="market"
                            labelClassName="size-5 text-gray-3"
                            type={values.type}
                            userBalances={balance.spotWallets}
                            changeTypeHandler={(type) => {
                                setFieldValue("type", type);
                            }}
                            setAmount={(amount) => setFieldValue('amount', math.fix(amount, maximumDecimalAmount))}
                        />
                    </Col>

                    <Col xs={12} className="px-1 mb-2">
                        <Field
                            as={InputElement}
                            label="قیمت"
                            name="requestedPrice"
                            type="tel"
                            inputMode="decimal"
                            prepend={<span className="size-5 fw-500 text-gray-1 en">{spot.split("-").join(" / ")}</span>}
                            tradeInput
                            className="en fw-500"
                            maxLength={15}
                            onKeyDown={(evt) => {
                                let current_value = math.largerEq(Number(evt.key), 0)
                                    ? [evt.target.value, evt.key].join("")
                                    : evt.target.value;

                                if (current_value.includes(".")) {
                                    if (
                                        math.larger(
                                            current_value.split(".")[1].length,
                                            maximumDecimalPrice
                                        )
                                    ) {
                                        evt.preventDefault();
                                    }
                                }
                            }}
                            onPaste={(evt) => {
                                let clipboardData, pastedData;
                                evt.stopPropagation();

                                clipboardData = evt.clipboardData || window.clipboardData;
                                pastedData = clipboardData.getData("Text");

                                if (!new RegExp(/^[\d.]+$/, "g").test(pastedData)) {
                                    evt.preventDefault();
                                } else if (math.largerEq(pastedData.split(".").length, 2)) {
                                    evt.preventDefault();
                                    setFieldValue(
                                        "amount",
                                        pastedData.split(".").slice(0, 2).join(".")
                                    );
                                }
                            }}
                        />
                    </Col>

                    <Col xs={12} className="px-1 mb-2">
                        <Field
                            as={AmountInput}
                            label="مقدار"
                            name="amount"
                            symbol={base}
                            limit={{
                                label: "حداقل مقدار",
                                value: minimumAmount,
                            }}
                            sliderVariant="#00BABA"
                            maxDecimal={maximumDecimalAmount}
                            maxValue={baseAssetBalance}
                            minValue={0}
                        />
                    </Col>

                    <Col xs={12} className="px-1 mb-2">
                        <div className="d-flex justify-content-between  ween px-1">
                            <div>
                                <span className="size-5 text-gray-2">جمع</span>
                                <span className="size-5 en fw-500 text-gray-3">{quote}</span>
                                <span className="size-5 text-gray-2"> با کسر کارمزد</span>
                            </div>

                            <div className="d-flex align-items-center ">
                                <span className="size-5 text-gray-2">کارمزد : </span>
                                <span className="size-5 en text-gray-2 text-gray-2 mx-1">
                                    {quote}
                                </span>
                                <span className="size-5 en text-gray-4">
                                    {Number(totalFee)
                                        .toFixed(0)
                                        .toString()
                                        .replace(/(\.\d+?)0+\b/g, "$1")
                                        .toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <InputElement
                            name="get_amount"
                            tradeInput
                            prepend={
                                <span className="size-5 fw-500 text-gray-1 en">{quote}</span>
                            }
                            readOnly
                            className="en fw-500"
                            value={receivedAmount ? receivedAmount.toFixed(8) : 0}
                        />
                    </Col>

                    <Col xs={12} className="px-1">
                        <div className="d-flex justify-content-end">
                            <CustomizedButton
                                isFullWidth
                                type="submit"
                                leftIcon={<FaChevronLeft size={20} />}
                                className="tradeBtn size-3 fw-700"
                                size="sm"
                                variant="blue"
                                disabled={!(isValid && dirty)}
                                loading={loading}
                            >
                                دریافت
                                <span className="en fw-700 me-2">{quote}</span>
                            </CustomizedButton>
                        </div>
                    </Col>
                </Form>
            )}
        </Formik>
    );
}
