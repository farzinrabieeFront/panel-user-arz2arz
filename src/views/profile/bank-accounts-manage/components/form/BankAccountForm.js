/** internal imports */
import { useRef, useState } from "react";
import { Toastify } from "../../../../../utils";
import { useMainApi } from "../../../../../common/hooks";
/** external imports */
import { Form, Formik, FastField, Field } from "formik";
import { IoMdCheckmark } from "react-icons/all";
import { Col } from "react-bootstrap";
/** component imports */
import CustomizedModal from "../../../../../components/modal/Modal";
import BankInput from "../../../../../common/element/formik-inputs/bank-input/BankInput";
import { NewInput } from "../../../../../common/element/formik-inputs";
import CustomizedButton from "../../../../../components/form/button/Button";

export default function BankAccountForm({ show, onHide, data: cardData = {} }) {
  const formikRef = useRef();
  const { urls, post, patch, loading } = useMainApi()


  async function submitDataHandler(vals) {
    const _body = {};
    try {
      for (const key in vals)
        if (vals[key])
          if (cardData && "_id" in cardData) {
            if (key === "bank") {
              if (vals.bank !== cardData.bank._id)
                _body.bank = vals.bank
            } else if (vals[key] !== cardData[key])
              _body[key] = vals[key]
          } else _body[key] = vals[key];

      if (Object.keys(_body).length) {
        const _url = cardData && "_id" in cardData ?
          urls.BankAccount.replace("_id", cardData._id) : urls.BankAccounts

        cardData && "_id" in cardData
          ? await patch(_url)
          : await post(_url);
      }
      onHide();
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
    <CustomizedModal
      {...{ show, onHide }}
      keyboard={true}
      backdrop="static"
      bodyClassName="p-4"
      centered
      title="افزودن کارت جدید"
      size="md"
    >
      <Formik
        innerRef={formikRef}
        initialValues={{
          card: cardData.card || "",
          sheba: cardData.sheba || "",
          bank: cardData.bank?._id || "",
        }}
        enableReinitialize={true}
        onSubmit={submitDataHandler}
      >
        {({ dirty, values, setFieldValue }) => (
          <Form className="d-flex flex-wrap justify-content-center">
            <Col xs={12} className="mb-2">
              <Field as={BankInput} label="نام بانک" name="bank" />
            </Col>

            <Col xs={12} className="mb-2">
              <FastField
                maxLength={19}
                type="tel"
                label="شماره کارت"
                className="ltr"
                name="card"
                as={NewInput}
                value={values.card.replace(/(\d{4})/g, "$1 ").trim()}
                onChange={(e) => setFieldValue('card', e.target.value.replace(/ /g, ""))}
              />
            </Col>

            <Col xs={12} className="mb-2">
              <FastField
                label="شماره شبا"
                maxLength={24}
                prepend={
                  <span className="text-gray-2 size-4 fw-500 px-2 en border-right-gray">
                    IR
                  </span>
                }
                name="sheba"
                as={NewInput}
              />
            </Col>

            <Col xs={12} className="mt-3 text-start">
              <CustomizedButton
                isFullWidth
                type="submit"
                className="size-3 fw-500"
                size="xs"
                rightIcon={<IoMdCheckmark size={20} />}
                variant="blue"
                disabled={loading || !dirty}
                loading={loading}
              >
                تایید
              </CustomizedButton>
            </Col>
          </Form>
        )}
      </Formik>
    </CustomizedModal>
  );
}
