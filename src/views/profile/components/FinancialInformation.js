/** internal imports */
import { useEffect, useState } from "react";
import { ShebaConvert, Toastify } from "../../../utils";
import { useMainApi } from "../../../common/hooks";
/** external imports */
import { Col, Row } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import classNames from "classnames";
/** component imports */
import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import { NewInput } from "../../../common/element/formik-inputs";

const formClasses = classNames('row', ' align-items-stretch', ' justify-content-between', 'px-4')
const inputClasses = classNames('fw-500')


export default function FinancialInformation() {
  const [accountsList, setAccountsList] = useState([]);
  const { urls, get } = useMainApi()

  useEffect(getAccountsHandler, []);

  async function getAccountsHandler() {
    try {
      const _params = {
        perPage: 20,
        pageNumber: 1,
      };
      const { data } = await get(urls.BankAccounts, { _params });
      setAccountsList(data.result);
    } catch (error) {
      Toastify.error(error.message)
    }
  };

  return (
    <div className="wrapper">
      <TriangleTitle className="mb-3">اطلاعات مالی</TriangleTitle>
      <Formik enableReinitialize={true}>
        <Form className={formClasses}>
          <Col sm={12} className="p-0">
            {accountsList.map((itm, ind) => (
              <Row className="justify-content-between mt-3">
                <Col sm={4} xs={12} className="mb-2">
                  <Field as={NewInput}
                    label="نام بانک"
                    name="name"
                    tradeInput
                    className={inputClasses}
                    readOnly
                    value={itm?.bank?.name}
                  />
                </Col>

                <Col sm={4} xs={12} className="mb-2">
                  <Field as={NewInput}
                    label="شماره کارت"
                    name="card"
                    tradeInput
                    className={inputClasses}
                    readOnly
                    value={itm?.card?.match(/\d{4}/g).join(" ")}
                  />
                </Col>

                <Col sm={4} xs={12} className="mb-2">
                  <Field as={NewInput}
                    label="شماره شبا"
                    name="sheba"
                    tradeInput
                    className={inputClasses}
                    readOnly
                    value={ShebaConvert(itm?.sheba)}
                    prepend={
                      <span className="text-gray-2 size-4 fw-500 px-2 en border-right-gray">
                        IR
                      </span>
                    }
                  />
                </Col>

                {ind < accountsList.length - 1 ? <div className="px-3">
                  <hr />
                </div> : null}
              </Row>
            ))}
          </Col>
        </Form>
      </Formik>
    </div>
  );
};

