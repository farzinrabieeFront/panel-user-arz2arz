/** internal imports */
import { useCallback, useEffect, useRef, useState } from "react";
import { Toastify } from "../../../../../utils";
import { useMainApi } from "../../../../../common/hooks";
import AuthHoc from "../../../../../common/hoc/AuthHoc";
import CanWithdrawHoc from "../../../../../common/hoc/CanWithdrawHoc";
/** external imports */
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Col } from "react-bootstrap";
import { FaChevronLeft, RiErrorWarningLine } from "react-icons/all";
import { useSelector } from "react-redux";
import * as math from "mathjs";
import * as yup from "yup";
/** component imports */
import { CheckRadio, SelectCoin, AmountInput, NewInput, SelectNetwork } from "../../../../../common/element/formik-inputs";
import CustomizedButton from "../../../../../components/form/button/Button";
import TwoStepAuthentication from "../two-step-authentication/TwoStepAuthentication";
import AddressInput from "../../adress-input/AddressInput";

function SpotWithdraw({ balances, refreshHistory }) {
    const formikRef = useRef();
    const navigate = useNavigate();
    const { spot } = useParams();
    const { urls, loading, get, post } = useMainApi()
    const { config, exchange } = useSelector((state) => state);
    const { withdrawEnabled, configs } = config;
    const { WITHDRAW: internalFee } = exchange.fees;
    const [coinInfo, setCoinInfo] = useState({});
    const [networkInfo, setNetworkInfo] = useState({});
    const [internalTransfer, setInternalTransfer] = useState(false);
    const [internalTransferLimit, setInternalTransferLimit] = useState({});
    const [internalAddress, setInternalAddress] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [internalFeeAmount, setInternalFeeAmount] = useState(0);
    const [withdrawBody, setWithdrawBody] = useState({});
    const [withdrawResponse, setWithdrawResponse] = useState({});
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [receivedAmount, setReceivedAmount] = useState(0);
    const [networkList, setNetworkList] = useState([]);

    useEffect(() => vaildationMethod(formikRef.current.values), [configs]);

    useEffect(() => {
        setNetworkList(configs[spot].networks)
        setNetworkInfo(configs[spot].networks?.find(
            (item) => item.isDefault
        ));
        formikRef.current.setFieldValue('network', configs[spot].networks?.find((item) => item.isDefault).network)
    }, [spot]);

    const vaildationMethod = (vals) => {
        if (spot !== vals.symbol) {
            // navigate(`/my/wallet/withdraw/spot/${vals.symbol}`);
        } else if (networkInfo.network !== vals.network) {
            const _network_info = configs[spot].networks?.find(
                (item) => item.network === vals.network
            )

            setNetworkInfo(_network_info);
            const _minimum = math.evaluate(`${Number(_network_info.withdrawMin)} + (${Number(_network_info.withdrawMin)} * ${Number(internalFee)}%)`)
            const _minimum_decimal_count = _minimum.toString().split('.')[1]?.length - 1 || 0
            setMinimumAmount(math.ceil(_minimum, _minimum_decimal_count))
        }
        console.log(networkInfo);

        if (Number(vals.amount)) {
            const internal_fee_amount = math.evaluate(
                `${Number(vals.amount)} * ${Number(internalFee)}%`
            );

            const total_fee = math.add(
                internal_fee_amount,
                Number(networkInfo.withdrawFee)
            );

            const recieve_amount = vals.internal
                ? Number(vals.amount)
                : math.subtract(Number(vals.amount), total_fee);

            setInternalFeeAmount(internal_fee_amount);
            setReceivedAmount(recieve_amount);
        } else {
            setInternalFeeAmount(0);
            setReceivedAmount(0);
        }
    };

    const vaildationMethodSchema = () => {
        const { symbol } = formikRef.current.values;

        const schema = {
            amount: yup
                .number("فقط عدد لاتین وارد کنید.")
                .required("این فیلد الزامی است.")
                .min(
                    internalTransfer ? 0.00000001 : minimumAmount,
                    `حداقل مقدار مجاز برداشت ${internalTransfer ? 0.00000001 : minimumAmount + " " + symbol
                    } است`
                )
                .max(
                    internalTransfer ? 99999999 : networkInfo.withdrawMax,
                    `حداکثر مقدار مجاز پرداختی برابر ${internalTransfer ? 99999999 : networkInfo.withdrawMax + " " + symbol
                    } است`
                )
                .lessThan(
                    Number(balances[symbol]?.balance || 0),
                    "مبلغ برداشتی نمی تواد بیشتر از دارایی شما باشد"
                ),
        };

        if (internalTransfer) {
            schema.email = yup
                .string()
                .required("این فیلد الزامی است.")
                .email("فرمت ایمیل وارد شده اشتباه است.")
        } else {
            schema.address = yup
                .string()
                .required("این فیلد الزامی است.")
                .matches(networkInfo.addressRegex, {
                    message: "فرمت آدرس وارد شده درست نیست.",
                    excludeEmptyString: false,
                })


            if (networkInfo.sameAddress) {
                schema.addressTag = yup
                    .string()
                    .required("این فیلد الزامی است.")
                    .matches(networkInfo.memoRegex, {
                        message: "فرمت تگ ممو وارد شده درست نیست.",
                        excludeEmptyString: false,
                    })
            }
        }

        return yup.object().shape(schema);
    };

    const addressCheckerHandler = async (vals) => { };

    const renderForm = (values) => {
        const internalForm =
            <>
                <Col xs={12} className="mb-2">
                    <Field
                        as={AmountInput}
                        label="مقدار برداشتی"
                        name="amount"
                        symbol={values.symbol}
                        sliderVariant="#00BABA"
                        maxDecimal={8}
                        maxValue={balances[values.symbol]?.balance || 0}
                        minValue={0}
                    />
                </Col>
                <Col xs={12}>
                    <Field
                        as={NewInput}
                        label="ایمیل گیرنده"
                        name="email"
                        placeholder="example@gmail.com"
                    />
                </Col>
            </>

        const externalForm =
            <>
                <Col xs={12} className="mb-4">
                    <Field as={SelectNetwork}
                        symbol={values.symbol}
                        name="network"
                        type="Withdraw"
                        options={networkList}
                        fee
                    />
                </Col>

                <Col xs={12} className="mb-4">
                    <Field as={AddressInput}
                        name="address"
                        symbol={values.symbol}
                        network={values.network}
                        setMemo={(memo) => formikRef.current.setFieldValue('memo', memo)}
                        label="کیف پول"
                    />
                </Col>

                {networkInfo?.sameAddress ? (
                    <Col xs={12} className="mb-3">
                        <Field as={NewInput} name="addressTag" label="آدرس تگ ممو" />
                    </Col>
                ) : null}

                <Col xs={12} className="mb-2">
                    <Field as={AmountInput}
                        label="مقدار برداشتی"
                        name="amount"
                        symbol={values.symbol}
                        limit={{
                            label: "حداقل برداشت",
                            value: minimumAmount,
                        }}
                        sliderVariant="#00BABA"
                        maxDecimal={8}
                        maxValue={balances[values.symbol]?.balance || 0}
                        minValue={0}
                        guidText={
                            <span className="text-gray-1 size-5 fw-500 d-flex align-items-center mt-1">
                                <RiErrorWarningLine size={17} className="text-orange ms-1" />
                                <span className="size-5 text-gray-3">کارمزد صرافی :</span>
                                <span className="ltr mx-1">
                                    <span className="size-5 text-gray-3 fw-500 en">
                                        {Number(internalFeeAmount || 0)
                                            .toFixed(8)
                                            .replace(/(\.\d+?)0+\b/g, "$1")}
                                    </span>
                                    <span className="size-5 text-gray-2 fw-500 en ms-1">
                                        {values.symbol}
                                    </span>
                                </span>
                            </span>
                        }
                    />
                </Col>
            </>

        // <Col xs={12} className="mb-4">
        //     <Field
        //         as={AddressNewInput}
        //         label="کیف پول"
        //         name="address"
        //         symbol={values.symbol}
        //         network={values.network}
        //         setMemo={(memo) =>
        //             formikRef.current.setFieldValue("addressTag", memo)
        //         }
        //         onInput={(evt) =>
        //             addressCheckerHandler({ address: evt.target.value })
        //         }
        //         internal={values.address && internalAddress}
        //     />
        // </Col>

        return values.internal ? internalForm : externalForm;
    };

    const withdrawHandler = useCallback(
        async function (confirmSources) {
            // try {
            //     const { internal, ...vals } = withdrawBody // internal use
            //     const _body = { ...vals, confirmSources };
            //     const _url = internalTransfer ? urls.InternalSpotWithdraw : urls.SpotWithdraw
            //     const res = await post(_url, _body);
            //     Toastify.success(res.message);


            //     if (internalTransfer) {
            //         setWithdrawResponse({
            //             confirmSources: res.data.confirmSources,
            //             resendOTPNonce: res.data.resendOTPNonce,
            //             transfer: res.data.transfer
            //         });
            //     } else {
            //         setWithdrawResponse({
            //             confirmSources: res.data.confirmSources,
            //             resendOTPNonce: res.data.resendOTPNonce,
            //             withdraw: res.data.withdraw
            //         });
            //     }

            // } catch (error) {
            //     Toastify.error(error.message);
            // }
        },
        [withdrawBody],
    );

    const resendOtpHandler = useCallback(
        async function (confirmSource) {
            try {
                const _body = {
                    withdraw: withdrawResponse.withdraw,
                    resendNonce: withdrawResponse.resendOTPNonce,
                    confirmSource,
                };
                const _url = internalTransfer ?
                    urls.ResendOtpInternalSpotWithdraw : urls.ResendOtpSpotWithdraw
                const res = await post(_url, _body);
                Toastify.success(res.message);

                const new_res = {
                    resendOTPNonce: res.data.resendOTPNonce,
                    withdraw: res.data.withdraw,
                    confirmSources: {
                        ...withdrawResponse.confirmSources,
                        [confirmSource]: {
                            nonce: res.data.nonce,
                            expiryDate: res.data.expiryDate
                        },
                    },
                };

                setWithdrawResponse(new_res);
            } catch (error) {
                // console.log(error, error.message);
                Toastify.error(error.message);
            }
        },
        [withdrawResponse],
    );

    const verifyWithdrawHandler = useCallback(
        async function (confirmSources) {
            try {
                const _body = { confirmSources: {} };

                if (internalTransfer) {
                    _body.transfer = withdrawResponse.transfer;
                } else {
                    _body.withdraw = withdrawResponse.withdraw;
                }

                for (const key in confirmSources) {
                    _body.confirmSources[key] = {
                        nonce: withdrawResponse.confirmSources[key].nonce,
                        otp: confirmSources[key]
                    }
                }
                const _url = internalTransfer ?
                    urls.VerifyInternalSpotWithdraw : urls.VerifySpotWithdraw
                const res = await post(_url, _body);
                Toastify.success(res.message);

                refreshHistory();
                setShowModal(false);
                setWithdrawBody({});
                setWithdrawResponse({});
                // formikRef.current.resetForm({ })
            } catch (error) {
                Toastify.error(error.message);
            }
        },
        [withdrawResponse],
    );

    const factor =
        <>
            <div className="bg-hover rounded-12 d-flex align-items-start px-3 py-2 mb-2 text-gray-4 size-3">
                <RiErrorWarningLine size={40} className="text-blue ms-1 pb-3" />
                <p className="m-0">
                    مقدار
                    <span className="m-2 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
                        {withdrawBody.amount}
                    </span>
                    <span className="m-2">{coinInfo.faName}</span>
                    {internalTransfer ? (
                        <>
                            به ایمیل
                            <span className="m-2 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
                                {withdrawBody.email}
                            </span>
                        </>
                    ) : (
                        <>
                            {" "}
                            <span className="m-2 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
                                {withdrawBody.symbol}
                            </span>
                            در شبکه
                            <span className="m-2 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
                                {withdrawBody.network}
                            </span>
                            به آدرس
                            <span className="m-2 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
                                {withdrawBody.address}
                            </span>
                            {withdrawBody.memo ? (
                                <>
                                    با تگ ممو
                                    <span className="m-2 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
                                        {withdrawBody.memo}
                                    </span>
                                </>
                            ) : null}
                        </>
                    )}
                    ارسال خواهد شد.
                </p>
            </div>

            <div className="d-flex bg-warning align-items-start rounded-12 p-3 mb-3 size-3">
                <RiErrorWarningLine size={40} className="text-orange ms-1 pb-3" />
                <span className="text-gray-4">
                    از صحت آدرس کیف پول گیرنده اطمینان کامل پیدا کن، اشتباه بودن آدرس
                    میتونه باعث از دست رفتن سرمایت باشه
                </span>
            </div>
        </>

    return [
        <Formik
            innerRef={formikRef}
            // enableReinitialize
            validateonChange={true}
            initialValues={{
                symbol: spot || withdrawEnabled[0],
                network: configs[spot]?.networks?.find(
                    (item) => item.isDefault
                ).network,
                internal: false,
            }}
            validationSchema={vaildationMethodSchema}
            validate={vaildationMethod}
            onSubmit={(vals) => {
                setWithdrawBody(vals);
                setShowModal(true);
            }}
        >
            {({ dirty, isValid, values, setFieldValue, resetForm }) => (
                <Form className="d-flex flex-wrap justify-content-center rounded-20 bordered p-md-7 p-3">
                    <Col xs={12} className="mb-3">
                        <Field
                            as={SelectCoin}
                            label="نام ارز"
                            name="symbol"
                            showBalance
                            options={withdrawEnabled}
                            balance={balances[values.symbol]?.balance || 0}
                            setAmount={(amount) => setFieldValue("amount", amount)}
                        />
                    </Col>

                    <Col xs={12} className="mb-3">
                        <Field as={CheckRadio}
                            name="internal"
                            type="switch"
                            label="انتقال درون صرافی ( کارمزد صفر )"
                        />
                    </Col>

                    {renderForm(values)}

                    <Col xs={12}>
                        <div className="d-flex justify-content-between mb-1 px-1">
                            <label className="text-gray-2 size-5">
                                <span className="text-gray-3 fw-500 mx-1">
                                    مقدار دریافتی {values.symbol}
                                </span>
                                {internalTransfer ? null : " با کسر کارمزد"}
                            </label>
                        </div>
                        <NewInput
                            name="get_amount"
                            prepend={
                                <span className="size-5 text-gray-1 en fw-500">
                                    {values.symbol}
                                </span>
                            }
                            className="fw-500 size-4 en"
                            readOnly
                            value={receivedAmount > 0 ? math.fix(receivedAmount, 8) : 0}
                        />
                    </Col>

                    <Col xs={12} className="mt-3">
                        <CustomizedButton
                            isFullWidth
                            leftIcon={<FaChevronLeft size={20} />}
                            type="submit"
                            className="tradeBtn size-3 fw-700 py-1"
                            size="sm"
                            variant="blue"
                            // disabled={!(isValid && dirty)}
                            loading={loading}
                        >
                            برداشت
                            <span className="fw-700 me-2">{values.symbol}</span>
                        </CustomizedButton>
                    </Col>
                </Form>
            )}
        </Formik>,
        showModal ? (
            <TwoStepAuthentication
                show={showModal}
                header={factor}
                title="برداشت ارزی"
                sendOtpHandler={withdrawHandler}
                verifyOtpHandler={verifyWithdrawHandler}
                resendOtpHandler={resendOtpHandler}
                dataOtp={withdrawResponse}
                onHide={() => setShowModal(false)}
            />
        ) : null,
    ];
}

export default AuthHoc(CanWithdrawHoc(SpotWithdraw), "برداشت تومانی / ارزی");

{/**

        // if (symbol !== coinInfo.symbol) {
        //     navigate(`/withdraw/spot/${symbol}`);
        //     setCoinInfo(configs[symbol]);

        //     const default_network = configs[symbol]?.networks?.find(
        //         (item) => item.isDefault
        //     );
        //     setNetworkInfo(default_network);

        //     const { withdrawMin, withdrawMax } = default_network;

        //     let min_internal_fee = math.evaluate(
        //         `${Number(withdrawMin)} * ${Number(internalFee)}%`
        //     );

        //     setMinimumAmount(
        //         math.evaluate(`${Number(withdrawMin)} + (${min_internal_fee} )`)
        //     );
        //     setMaximumAmount(withdrawMax);
        // } else if (network && network !== networkInfo?.network) {
        //     const current_network = coinInfo?.networks?.find(
        //         (item) => item.network === network
        //     );
        //     setNetworkInfo(current_network);

        //     const { withdrawMin, withdrawMax } = current_network;

        //     const min_internal_fee = math.evaluate(
        //         `${Number(withdrawMin)} * ${Number(internalFee)}%`
        //     );
        //     console.log(min_internal_fee);
        //     setMinimumAmount(
        //         math.evaluate(`${Number(withdrawMin)} + (${min_internal_fee} )`)
        //     );
        //     setMaximumAmount(withdrawMax);
        // }

        // if (Number(amount)) {
        //     const internal_fee_amount = math.evaluate(
        //         `${Number(amount)} * ${Number(internalFee)}%`
        //     );

        //     const total_fee = math.add(
        //         internal_fee_amount,
        //         Number(networkInfo.withdrawFee)
        //     );

        //     const recieve_amount = internalTransfer
        //         ? Number(amount)
        //         : math.subtract(Number(amount), total_fee);

        //     setInternalFeeAmount(internal_fee_amount);
        //     setReceivedAmount(recieve_amount);
        // } else {
        //     setInternalFeeAmount(0);
        //     setReceivedAmount(0);
        // }
*/}
