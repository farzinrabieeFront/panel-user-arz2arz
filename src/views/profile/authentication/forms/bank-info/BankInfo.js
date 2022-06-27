/**internal imports */
import { useEffect, useRef, useState } from "react";
import { Toastify } from "../../../../../utils";
import { bankInfo as vaildationMethodSchema } from "../formValidation";
import { useMainApi } from "../../../../../common/hooks";
/**external imports */
import { FastField, Field, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { FiChevronLeft, FiChevronRight } from "react-icons/all";
/**components imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import { InputElement } from "../../../../../common/element/formik-inputs";
import BankInfoImg from "../../../../../assets/images/auth-bank.png";
import BankInput from "../../../../../common/element/formik-inputs/bank-input/BankInput";

export default function BankInfo({ next, prev }) {
  const formikRef = useRef();
  const { urls, get, post, patch, loading } = useMainApi()
  const [cardData, setCardData] = useState({});

  useEffect(fetchData, []);

  async function fetchData() {
    try {
      const { data } =
        await get(urls.Auth_BankAccount);

      setCardData(data.bankAccount);
    } catch (error) {
      if (error.message) Toastify.error(error.message);
    }
  };

  const submitDataHandler = async (vals) => {
    const _body = {};

    try {
      for (const key in vals)
        if (vals[key])
          if (cardData && "_id" in cardData) {
            if (key === "bank") {
              if (vals.bank !== cardData.bank._id)
                _body.bank = vals.bank
            } else if (vals[key] !== cardData[key])
              _body[key] = vals[key];
          } else _body[key] = vals[key]

      if (Object.keys(_body).length) {
        cardData
          ? await patch(urls.Auth_BankAccount, _body)
          : await post(urls.Auth_BankAccount, _body);
      }

      next();
    } catch (error) {
      if (error.invalidFields.length)
        for (const field of error.invalidFields) {
          let { msg, param } = field;

          formikRef.current.setFieldError(param, msg);
        }
      else Toastify.error(error.message);
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      enableReinitialize={true}
      validationSchema={vaildationMethodSchema}
      initialValues={{
        bank: cardData?.bank?._id || "",
        card: cardData?.card || "",
        sheba: cardData?.sheba || "",
      }}
      onSubmit={submitDataHandler}
    >
      {({ values, setFieldValue }) => (
        <Form className="row align-items-stretch justify-content-between">
          <Col className="p-0">
            <Row className="justify-content-between flex-column-reverse flex-lg-row">
              <Col lg={8} md={12}>
                <Row>
                  <Col md={6} className="mb-2">
                    <Field as={BankInput} label="نام بانک" name="bank" />
                  </Col>
                  <Col md={6} className="mb-4">
                    <FastField
                      maxLength={19}
                      inputMode="numeric"
                      label="شماره کارت"
                      placeholder="شماره کارت خود را وارد کنید"
                      className="ltr"
                      name="card"
                      value={values.card.replace(/(\d{4})/g, "$1 ").trim()}
                      onChange={(e) =>
                        setFieldValue("card", e.target.value.replace(/ /g, ""))
                      }
                      as={InputElement}
                    />
                  </Col>
                  <Col md={6}>
                    <FastField
                      label="شماره شبا"
                      placeholder="شماره شبا کارت خود را وارد کنید"
                      inputMode="numeric"
                      maxLength={24}
                      prepend={
                        <span className="text-gray-2 size-4 fw-500 px-2 en border-right-gray">
                          IR
                        </span>
                      }
                      value={values.sheba}
                      // value={values.sheba.replace(/(\d{4})/g, "$1 ").trim()}
                      onChange={(e) =>
                        setFieldValue(
                          "sheba",
                          e.target.value.replaceAll(" ", "")
                        )
                      }
                      name="sheba"
                      as={InputElement}
                    />
                  </Col>
                </Row>
              </Col>

              <Col lg={3} className="mb-4">
                <div className="p-3 d-flex flex-sm-column   bg-hover rounded-20 w-100 h-100">
                  <div className="center-content mb-3">
                    <img src={BankInfoImg} width={154} height={154} />
                  </div>
                  <div className="d-flex justify-content-center flex-column align-items-start align-items-sm-center px-3 px-lg-0">
                    <h2 className="fw-700 size-3 mb-3 text-blue ">
                      اطلاعات مالی
                    </h2>
                    <p className="text-gray-3 size-5 mb-0 fw-500 ">
                      اضافه کردن کارت بانکی در این مرحله اجباری نیست و فقط برای
                      سهولت کارت تو مراحل بعدی توصیه میشه
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col xs={12} className="mt-5">
            <Row className="justify-content-between mt-4">
              <Col xs={6} className="text-end">
                <CustomizedButton
                  outlined
                  rightIcon={<FiChevronRight size={20} />}
                  className="size-4 "
                  size="xs"
                  variant="blue"
                  onClick={prev}
                >
                  مرحله قبل
                </CustomizedButton>
              </Col>
              <Col xs={6} className="text-start">
                <CustomizedButton
                  type="submit"
                  leftIcon={<FiChevronLeft size={20} />}
                  size="xs"
                  className="size-4 "
                  variant="blue"
                  loading={loading}
                >
                  مرحله بعد
                </CustomizedButton>
              </Col>
            </Row>
          </Col>
        </Form>
      )}
    </Formik>
  );
}
