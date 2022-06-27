/** internal imports */
import { memo, useEffect, useRef, useState } from "react";
import { Toastify, CardConvert } from "../../../../utils";
import { useMainApi } from "../../../../common/hooks";
import WalletIcon from "../../../../assets/images/wallet-icon.svg";
import Styles from "./FiatDeposit.module.scss";
/** external imports */
import { Col, Row } from "react-bootstrap";
import { FaChevronLeft, HiPlus } from "react-icons/all";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Formik, FastField, Field } from "formik";
import classNames from "classnames";
import * as yup from "yup";
/** components import */
import { NewInput, RadioInput, SelectInput } from "../../../../common/element/formik-inputs";
import CustomizedButton from "../../../../components/form/button/Button";
import VerifyDeposit from "../verify-deposit/VerifyDeposit";

const FiatDeposit = ({ balances, refreshHistory }) => {
  const formikRef = useRef(null);
  const { state } = useLocation();
  const { loading, urls, get, post } = useMainApi();
  const [cardsList, setCardsList] = useState([]);

  const { lowest: internalLowestLimit, highest: internalHighestLimit } =
    useSelector(
      (state) => state.exchange?.limits?.exchangeLimits?.fiatDeposit
    ) || {};


  useEffect(getCardsHandler, []);

  async function getCardsHandler() {
    try {
      const { data } = await get(urls.BankAccounts);

      let cards = [];
      for (const item of data.result) {
        const isdisabled = !item.isActive || item.isBanned || item.verified !== "approved"

        cards.push({
          _id: item._id,
          card: item.card,
          sheba: item.sheba,
          bank: item.bank.name,
          logo: item.bank.logo,
          isdisabled
        });

      }

      cards.push({})
      setCardsList(cards);
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
        `حداقل مقدار مجاز واریز ${Number(
          internalLowestLimit || 0
        ).toLocaleString()} تومان است`
      )
      .max(
        internalHighestLimit,
        `حداکثر مقدار مجاز واریزی برابر ${Number(
          internalHighestLimit || 0
        ).toLocaleString()} تومان  است`
      ),
    bankAccount: yup.string().required("این فیلد الزامی است."),
  });

  function formatOptionSelect(vals) {
    if ('_id' in vals) {
      return (
        <div className={`h-100 d-flex align-items-center justify-content-between fw-500 size-4 text-gray-4 px-2`}>
          <span>
            <img
              src={`https://main.arz2arz.net/api/v1/bankLogo/images/${vals.logo}`}
              width={24}
              height={24}
            />
            <span className={classNames("me-2")}>{vals.bank}</span>
          </span>
          <span className={classNames("me-1", "en", "ltr", "text-gray-3")}>
            {CardConvert(vals.card)}
          </span>
        </div>
      )
    } else {
      return <Link to="/my/bank-accounts">
        <div className="d-flex align-items-center h-100 px-3 text-blue size-4 fw-500 pointer ">
          <HiPlus size={16} className="ms-1" />
          افزودن کارت جدید
        </div>
      </Link>
    }
  }

  async function depositHandler(body) {
    try {
      const { redirectUrl } = await post(urls.FiatDeposit, body);

      window.open(redirectUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  async function onRetryDepositHandler(txId) {
    try {
      const { redirectUrl } = await post(urls.RetryFiatDeposit, {
        txId,
      });

      window.open(redirectUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const balanceCard = <Col
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
      <div className="fw-700 size-3 text-gray-2">موجودی حساب</div>
    </div>
    <div className="d-flex align-items-center">
      <span className="fw-700 size-1 text-gray-4 en me-1">
        {Number(
          Number(balances?.IRT?.balance || 0).toFixed(0)
        ).toLocaleString()}
      </span>
      <span className="fw-500 size-4 text-gray-3 me-1">تومان</span>
    </div>
  </Col>

  return [
    <Formik
      innerRef={formikRef}
      initialValues={{
        amount: state?.amount ? state.amount : "",
        bankAccount: "",
        symbol: "IRT",
      }}
      validateonChange={true}
      validationSchema={vaildationMethodSchema}
      onSubmit={depositHandler}
    >
      {({ isValid, dirty, setFieldValue }) => {
        return (
          <Form className="d-flex flex-wrap justify-content-center rounded-20 bordered p-md-7 p-3">

            {balanceCard}

            <Col xs={12} className="mt-3">
              <Field
                as={NewInput}
                name="amount"
                label="مقدار واریزی"
                digit
                unit="IRT"
                limit={
                  <div className="d-flex align-items-center pointer">
                    <span className="size-5 text-gray-2 ms-1">
                      حداقل واریز :
                    </span>
                    <span
                      className="size-5 text-gray-2"
                      onClick={() =>
                        setFieldValue("amount", internalLowestLimit)
                      }
                    >
                      تومان
                      <span className="size-5 me-1 text-gray-4">
                        {Number(internalLowestLimit).toLocaleString()}
                      </span>
                    </span>
                  </div>
                }
              />
            </Col>

            <Col xs={12} className="my-2">
              <Row className="justify-content-between px-2">
                <Col lg={6} className="px-1 mb-1">
                  <FastField as={RadioInput} name="amount"
                    label="3 میلیون" labelValue="3000000" />
                </Col>
                <Col lg={6} className="px-1 mb-1">
                  <FastField as={RadioInput} name="amount"
                    label="5 میلیون" labelValue="5000000" />
                </Col>
                <Col lg={6} className="px-1">
                  <FastField as={RadioInput} name="amount"
                    label="10 میلیون" labelValue="10000000" />
                </Col>
                <Col lg={6} className="px-1">
                  <FastField as={RadioInput} name="amount"
                    label="20 میلیون" labelValue="20000000" />
                </Col>
              </Row>
            </Col>

            <Col xs={12} className="mt-3 mb-2">
              <Field
                as={SelectInput}
                name="bankAccount"
                optionLabel="bank"
                optionValue="_id"
                optionDisable="isdisabled"
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
              />
            </Col>

            <Col xs={12} className="mt-3">
              <CustomizedButton
                isFullWidth
                leftIcon={<FaChevronLeft size={20} />}
                type="submit"
                className="tradeBtn size-3 fw-700 py-1"
                size="sm"
                disabled={!(isValid && dirty)}
                loading={loading}
                variant="blue"
              >
                واریز
              </CustomizedButton>
            </Col>
          </Form>
        );
      }}
    </Formik >
    ,
    <VerifyDeposit
      onRetry={onRetryDepositHandler}
      refreshHistory={() => {
        formikRef.current?.resetForm({});
        refreshHistory();
      }}
    />
  ]
};

export default memo(FiatDeposit);