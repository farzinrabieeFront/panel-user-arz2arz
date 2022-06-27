/** internal imports */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Styles from "./FiatWithdraw.module.scss";
import { Toastify } from "../../../../../utils";
import { useMainApi } from "../../../../../common/hooks";
import WalletIcon from "../../../../../assets/images/wallet-icon.svg";
/** internal imports */
import { Formik, Form, Field } from "formik";
import { Alert, Col } from "react-bootstrap";
import { FaChevronLeft, RiErrorWarningLine, HiPlus } from "react-icons/all";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as yup from "yup";
/** component imports */
import {
  AmountInput,
  SelectInput,
} from "../../../../../common/element/formik-inputs";
import CustomizedButton from "../../../../../components/form/button/Button";
import TwoStepAuthentication from "../two-step-authentication/TwoStepAuthentication";
import CanWithdrawHoc from "../../../../../common/hoc/CanWithdrawHoc";

const FiatWithdraw = ({ balances, refreshHistory }) => {
  const formikRef = useRef();
  const { urls, loading, get, post } = useMainApi();
  const { lowest: internalLowestLimit, highest: internalHighestLimit } =
    useSelector(
      (state) => state.exchange?.limits?.exchangeLimits?.fiatWithdraw
    ) || {};

  const [cardsList, setCardsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [withdrawBody, setWithdrawBody] = useState({});
  const [withdrawResponse, setWithdrawResponse] = useState({});

  useEffect(getCardsHandler, []);
  useEffect(() => setWithdrawResponse({}), [withdrawBody]);

  async function getCardsHandler() {
    try {
      const { data } = await get(urls.BankAccounts);
      data.result.push({});
      setCardsList(data.result);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  const vaildationMethodSchema = yup.object().shape({
    amount: yup
      .number("فقط عدد لاتین وارد کنید.")
      .required("این فیلد الزامی است.")
      .min(
        internalLowestLimit,
        `حداقل مقدار مجاز برداشت ${Number(
          internalLowestLimit || 0
        ).toLocaleString()} تومان است`
      )
      .max(
        internalHighestLimit,
        `حداکثر مقدار مجاز پرداختی برابر ${Number(
          internalHighestLimit || 0
        ).toLocaleString()} تومان است`
      )
      .lessThan(
        Number(balances?.IRT?.balance || 0),
        "مبلغ برداشتی نمی تواد بیشتر از دارایی شما باشد"
      ),
    bankAccount: yup.string().required("این فیلد الزامی است."),
  });

  const withdrawHandler = useCallback(
    async function (confirmSources) {
      try {
        const _body = { ...withdrawBody, confirmSources };
        const res = await post(urls.FiatWithdraw, _body);
        Toastify.success(res.message);
        setWithdrawResponse({
          confirmSources: res.data.confirmSources,
          resendOTPNonce: res.data.resendOTPNonce,
          withdraw: res.data.withdraw,
        });
      } catch (error) {
        Toastify.error(error.message);
      }
    },
    [withdrawBody]
  );

  const resendOtpHandler = useCallback(
    async function (confirmSource) {
      try {
        const _body = {
          withdraw: withdrawResponse.withdraw,
          resendNonce: withdrawResponse.resendOTPNonce,
          confirmSource,
        };
        const res = await post(urls.ResendOtpFiatWithdraw, _body);
        Toastify.success(res.message);
        const new_res = {
          resendOTPNonce: res.data.resendOTPNonce,
          withdraw: res.data.withdraw,
          confirmSources: {
            ...withdrawResponse.confirmSources,
            [confirmSource]: {
              nonce: res.data.nonce,
              expiryDate: res.data.expiryDate,
            },
          },
        };

        setWithdrawResponse(new_res);
      } catch (error) {
        console.log(error, error.message);
        Toastify.error(error.message);
      }
    },
    [withdrawResponse]
  );

  const verifyWithdrawHandler = useCallback(
    async function (confirmSources) {
      try {
        const _body = {
          withdraw: withdrawResponse.withdraw,
          confirmSources: {},
        };

        for (const key in confirmSources) {
          _body.confirmSources[key] = {
            nonce: withdrawResponse.confirmSources[key].nonce,
            otp: confirmSources[key],
          };
        }
        const res = await post(urls.VerifyFiatWithdraw, _body);
        Toastify.success(res.message);

        refreshHistory();
        setShowModal(false);
        setWithdrawBody({});
        setWithdrawResponse({});
        formikRef.current.resetForm({});
      } catch (error) {
        Toastify.error(error.message);
      }
    },
    [withdrawResponse]
  );

  const headerModal = useMemo(
    () => [
      <Alert
        variant="info"
        className=" d-flex align-items-start px-3 py-2 mb-2 text-gray-4 size-4"
      >
        <RiErrorWarningLine size={26} className="text-blue ms-1 pt-2" />
        <p className="m-0">
          مبلغ
          <span className="mx-2 my-1 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
            {withdrawBody.amount?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </span>
          <span className="my-1">تومان به شماره کارت</span>
          <span className="mx-2 my-1 px-2 text-blue rounded-6 fw-500 d-inline-block en bg-white">
            {cardsList
              .find((item) => withdrawBody.bankAccount?.match(item._id))
              ?.card?.replace(/(\d{4})/g, "$1 ")}
          </span>
          بانک
          <span className="mx-2 my-1 px-2 text-blue rounded-6 fw-500 d-inline-block bg-white">
            {
              cardsList.find((item) =>
                withdrawBody.bankAccount?.match(item._id)
              )?.bank.name
            }
          </span>
          واریز خواهد شد.
        </p>
      </Alert>,
      <Alert
        variant="info"
        className="d-flex align-items-start p-3 mb-3 size-4"
      >
        <RiErrorWarningLine size={17} className="text-blue ms-1" />
        درخواست برداشت شما بعد از 24 ساعت به حساب شما واریز می شود.
      </Alert>,
    ],
    [withdrawBody]
  );

  const balanceCard = (
    <Col
      xs={12}
      className="mb-4 d-flex align-items-center justify-content-between"
    >
      <div className="d-flex align-items-center">
        <img
          className={`${Styles.walletIcon} ms-2`}
          src={WalletIcon}
          width={56}
          height={56}
        />
        <span className="fw-700 size-3 text-gray-2 me-2">موجودی حساب</span>
      </div>
      <div className="d-flex align-items-center">
        <span
          className="fw-700 size-1 text-gray-4 en me-1 pointer"
          onClick={
            () =>
              formikRef.current.setFieldValue(
                "amount",
                Number(balances?.IRT?.balance || 0).toFixed(0)
              )
            // setFieldValue(
            //     "amount",
            //     Number(balances?.IRT?.balance || 0).toFixed(0)
            // )
          }
        >
          {Number(
            Number(balances?.IRT?.balance || 0).toFixed(0)
          ).toLocaleString()}
        </span>
        <span className="fw-500 size-4 text-gray-3 me-1">تومان</span>
      </div>
    </Col>
  );

  const formatOptionSelect = useCallback((option) => {
    if ("_id" in option) {
      return (
        <div className="h-100 d-flex align-items-center justify-content-between fw-500 size-4 text-gray-4 px-2">
          <span>
            <img
              src={`https://main.arz2arz.net/api/v1/bankLogo/images/${option.bank.logo}`}
              width={24}
              height={24}
            />
            <span className="me-2">{option.bank.name}</span>
            <span className="me-2 size-5 fw-400">
              {option.verified.match("pending")
                ? "( در حال بررسی )"
                : option.verified.match("rejected")
                ? "( رد شده )"
                : option.verified.match("approved") && !option.isActive
                ? "( غیرفعال )"
                : option.isBanned
                ? "( مسدود شده )"
                : null}
            </span>
          </span>
          <span className="me-1 en ltr text-gray-3">
            {option.card.replace(/(\d{4})/g, "$1 ")}
          </span>
        </div>
      );
    } else {
      return (
        <Link to="/my/bank-accounts">
          <div className="d-flex align-items-center h-100 px-3 text-blue size-4 fw-500 pointer ">
            <HiPlus size={16} className="ms-1" />
            افزودن کارت جدید
          </div>
        </Link>
      );
    }
  }, []);

  return [
    <Formik
      innerRef={formikRef}
      validateonChange={true}
      initialValues={{
        amount: "",
        bankAccount: "",
      }}
      validate={() => {
        setWithdrawBody({});
      }}
      validationSchema={vaildationMethodSchema}
      onSubmit={(vals) => {
        setShowModal(true);
        setWithdrawBody(vals);
      }}
    >
      {({ isValid, dirty }) => (
        <Form className="d-flex flex-wrap justify-content-center rounded-20 bordered p-md-7 p-3">
          {balanceCard}

          <Col xs={12} className="my-3">
            <Field
              as={AmountInput}
              label="مقدار برداشتی"
              name="amount"
              symbol=" تومان"
              limit={{
                label: "حداقل مقدار برداشت",
                value: internalLowestLimit,
              }}
              sliderVariant="#00BABA"
              maxDecimal={0}
              maxValue={balances.IRT?.balance || 0}
              minValue={0}
              amountString
              hiddenSymbolLabel
            />
          </Col>

          <Col xs={12} className="mb-2">
            <Field
              as={SelectInput}
              name="bankAccount"
              optionLabel="bank"
              optionValue="_id"
              label="شماره کارت"
              options={cardsList}
              placeholder="کارت مورد نظر را انتخاب کنید."
              formatOptionLabel={formatOptionSelect}
              isLoading={loading}
              isClearable={true}
              noOptionsMessage={(vals) => (
                <div className="d-flex align-items-center h-100 px-3 text-blue size-4 fw-500 pointer ">
                  <Link to="/my/bank-accounts">
                    <HiPlus size={16} className="ms-1" />
                    افزودن کارت جدید
                  </Link>
                </div>
              )}
              onDisable={(option) =>
                !option.isActive ||
                option.isBanned ||
                option.verified !== "approved"
              }
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
              disabled={!(isValid && dirty)}
              loading={loading}
            >
              برداشت
            </CustomizedButton>
          </Col>
        </Form>
      )}
    </Formik>,
    showModal ? (
      <TwoStepAuthentication
        show={showModal}
        header={headerModal}
        title="برداشت تومانی"
        sendOtpHandler={withdrawHandler}
        verifyOtpHandler={verifyWithdrawHandler}
        resendOtpHandler={resendOtpHandler}
        dataOtp={withdrawResponse}
        onHide={() => {
          setShowModal(false);
          // setWithdrawResponse({})
        }}
      />
    ) : null,
  ];
};

export default CanWithdrawHoc(FiatWithdraw, "برداشت تومانی / ارزی");
