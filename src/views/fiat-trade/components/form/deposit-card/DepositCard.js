import { FastField, Field, Form, Formik } from "formik";
import React from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputElement, {
  amountFilter,
} from "../../../../../common/element/formik-inputs/input/Input";
import RadioGroupElement from "../../../../../common/element/formik-inputs/radio-group/RadioGroup";
import CustomizedButton from "../../../../../components/form/button/Button";
import CustomizedModal from "../../../../../components/modal/Modal";

export default function DepositCard({ show, amount, onClose }) {
  const navigate = useNavigate();
  const { lowest: internalLowestLimit, highest: internalHighestLimit } =
    useSelector(
      (state) => state.exchange?.limits?.exchangeLimits?.fiatDeposit
    ) || {};

  return (
    <CustomizedModal
      show={show}
      onHide={onClose}
      keyboard={true}
      backdrop="static"
      bodyClassName="p-4"
      centered
      size="md"
      title="افزایش اعتبار حساب کاربری"
    >
      <Formik
        initialValues={{
          amount,
        }}
        enableReinitialize={true}
        onSubmit={({ amount }) => {
          console.log(amount);
          navigate("/my/wallet/deposit/fiat", {
            state: {
              amount: Number(amount),
            },
          });
        }}
      >
        {({ setFieldValue }) => {
          return (
            <Form className="row align-items-center p-2">
              <Col xs={12} className="my-3">
                <div className="d-flex justify-content-between px-1 mb-1">
                  <label className="fw-500 size-5 text-gray-3">
                    مقدار افزایش موجودی
                  </label>
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
                </div>

                <FastField
                  as={InputElement}
                  type="tel"
                  inputMode="numeric"
                  name="amount"
                  prepend={
                    <span className="text-gray-1 size-5 fw-500">تومان</span>
                  }
                  className="fw-500 en"
                  maxLength={15}
                  amountString
                  currencyFormat
                  onKeyPress={amountFilter}
                  onKeyDown={(evt) => {
                    let ASCIICode = evt.which ? evt.which : evt.keyCode;

                    if (ASCIICode === 110 || ASCIICode === 190) {
                      evt.preventDefault();
                    }
                  }}
                  onPaste={(evt) => {
                    let clipboardData, pastedData;
                    evt.stopPropagation();

                    clipboardData = evt.clipboardData || window.clipboardData;
                    pastedData = clipboardData.getData("Text");

                    if (!new RegExp(/^[\d.]+$/, "g").test(pastedData)) {
                      evt.preventDefault();
                    } else if (!new RegExp(/^[\d]+$/, "g").test(pastedData)) {
                      evt.preventDefault();
                      setFieldValue("amount", pastedData.split(".")[0]);
                    }
                  }}
                />
              </Col>

              <Col xs={12} className="mb-3">
                <FastField
                  name="amount"
                  list={[
                    { label: "3 میلیون تومان", value: 3000000 },
                    { label: "5 میلیون تومان", value: 5000000 },
                    { label: "10 میلیون تومان", value: 10000000 },
                  ]}
                  labelClassName="text-gray-3"
                  radioClassName="pl-8 my-2 col-12"
                  as={RadioGroupElement}
                />
              </Col>

              <Col xs={6} className="mt-5">
                <CustomizedButton
                  className="is-size-5 w-50 py-3 rounded-12 fw-700 px-4 w-100"
                  size="sm"
                  variant="light"
                  outlined
                  onClick={onClose}
                >
                  انصراف
                </CustomizedButton>
              </Col>

              <Col xs={6} className="mt-5">
                <CustomizedButton
                  type="submit"
                  className="is-size-5 w-50 py-3 rounded-12 fw-700 w-100"
                  size="sm"
                  variant="blue"
                >
                  پرداخت
                </CustomizedButton>
              </Col>
            </Form>
          );
        }}
      </Formik>
    </CustomizedModal>
  );
}
