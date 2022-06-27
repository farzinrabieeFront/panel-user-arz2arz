/** external imports */
import { Col } from "react-bootstrap";
import { Form, Formik, Field } from "formik";
import classNames from "classnames";
/** component imports */
import { NewInput } from "../../../common/element/formik-inputs";
import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import RadioGroupElement from "../../../common/element/formik-inputs/radio-group/RadioGroup";

const formClasses = classNames(
  "row",
  " align-items-stretch",
  " justify-content-between",
  "px-3"
);
const inputClasses = classNames("fw-500");

export default function PersonalInformation({ customerIdentity }) {
  return (
    <div className="wrapper">
      <TriangleTitle className="mb-4">اطلاعات شخصی</TriangleTitle>
      <Formik enableReinitialize={true} initialValues={customerIdentity}>
        <Form className={formClasses}>
          <Col sm={4} xs={12} className="mb-4 mb-md-3">
            <Field
              as={NewInput}
              label="نام"
              name="firstName"
              className={inputClasses}
              readOnly
            />
          </Col>

          <Col sm={4} xs={12} className="mb-4 mb-md-3">
            <Field
              as={NewInput}
              label="نام خانوادگی"
              name="lastName"
              className={inputClasses}
              readOnly
            />
          </Col>

          <Col sm={4} xs={12} className="mb-4 mb-md-3">
            <Field
              as={NewInput}
              label="کد ملی"
              name="nationalCode"
              className={inputClasses}
              readOnly
            />
          </Col>

          <Col sm={4} xs={12} className="mb-4 mb-md-3">
            <Field
              as={NewInput}
              label="تاریخ تولد"
              name="birthDate"
              tradeInput
              className={inputClasses}
              readOnly
            />
          </Col>

          <Col sm={4} xs={12}>
            <Field
              as={NewInput}
              label="شهر محل زندگی"
              name="city"
              tradeInput
              className={inputClasses}
              readOnly
            />
          </Col>

          <Col sm={4} xs={12} className="mb-3">
            <div className="d-flex flex-wrap">
              <Field
                as={RadioGroupElement}
                label="جنسیت"
                name="gender"
                list={[
                  {
                    label: "آقا",
                    value: "male",
                    disabled: customerIdentity?.gender !== "male",
                  },
                  {
                    label: "خانم",
                    value: "female",
                    disabled: customerIdentity?.gender !== "female",
                  },
                ]}
                radioClassName="mt-2"
                columnClassName="mt-2 mb-3"
              />
            </div>
          </Col>
        </Form>
      </Formik>
    </div>
  );
}
