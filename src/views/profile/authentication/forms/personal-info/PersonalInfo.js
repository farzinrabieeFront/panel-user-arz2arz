/**internal imports */
import { useRef } from "react";
import PersonalInfoImg from "../../../../../assets/images/auth-info.png";
import { Toastify } from "../../../../../utils";
import { personalInfoSchema } from "../formValidation";
import { useMainApi } from "../../../../../common/hooks";
/**external imports */
import { FastField, Form, Formik } from "formik";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FiChevronLeft } from "react-icons/all";
/**components imports */
import InputElement, {
  amountFilter,
} from "../../../../../common/element/formik-inputs/input/Input";
import CustomizedButton from "../../../../../components/form/button/Button";
import DatepickerElement from "../../../../../common/element/formik-inputs/datepicker/Datepicker";
import RadioGroupElement from "../../../../../common/element/formik-inputs/radio-group/RadioGroup";

export default function PersonalInfo({ next }) {
  const formikRef = useRef();
  const { customerIdentity } = useSelector(state => state.user)
  const { urls, post, patch, loading } = useMainApi()

  async function submitDataHandler(vals) {
    try {
      const body = {};
      for (const key in vals) {
        if (vals[key])
          if (customerIdentity && "_id" in customerIdentity) {
            if (vals[key] !== customerIdentity[key])
              body[key] = vals[key]
          } else body[key] = vals[key]
      }

      if (Object.keys(body).length) {
        customerIdentity
          ? await patch(urls.Identity, body)
          : await post(urls.Identity, body);
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
      validationSchema={personalInfoSchema}
      initialValues={{
        firstName: customerIdentity?.firstName || "",
        lastName: customerIdentity?.lastName || "",
        gender: customerIdentity?.gender || "",
        nationalCode: customerIdentity?.nationalCode || "",
        city: customerIdentity?.city || "",
        birthDate: customerIdentity?.birthDate || "",
      }}
      onSubmit={submitDataHandler}
    >
      {({ isValid }) => (
        <Form className="row align-items-stretch justify-content-between">
          <Col sm={12} className="p-0">
            <Row className="justify-content-between flex-column-reverse flex-lg-row">
              <Col lg={8} md={12}>
                <Row>
                  <Col sm={6} xs={12} className="mb-4">
                    <FastField
                      label="نام"
                      name="firstName"
                      size="lg"
                      placeholder="نام خود را وارد کنید"
                      labelClassName="text-gray-3"
                      className="text-gray-4 size-4 "
                      as={InputElement}
                    />
                  </Col>

                  <Col sm={6} xs={12} className="mb-4">
                    <FastField
                      label="نام خانوادگی"
                      name="lastName"
                      size="lg"
                      placeholder="نام خانوادگی خود را وارد کنید"
                      labelClassName="text-gray-3"
                      className="text-gray-4 size-4 "
                      as={InputElement}
                    />
                  </Col>

                  <Col sm={6} xs={12} className="mb-4">
                    <FastField
                      label="کدملی"
                      name="nationalCode"
                      type="tel"
                      placeholder="مثال :‌ 0012345678"
                      size="lg"
                      labelClassName="text-gray-3"
                      className="text-gray-4 size-4 "
                      as={InputElement}
                      maxLength={10}
                      onKeyPress={(evt) => {
                        amountFilter(evt);
                      }}
                    />
                  </Col>

                  <Col sm={6} xs={12} className="mb-4">
                    <FastField
                      label="تاریخ تولد"
                      name="birthDate"
                      as={DatepickerElement}
                    />
                  </Col>

                  <Col sm={6} xs={12}>
                    <FastField
                      label="شهر محل زندگی"
                      name="city"
                      placeholder="مثال : تهران"
                      type="text"
                      size="lg"
                      labelClassName="text-gray-3"
                      className="text-gray-4 size-4 "
                      as={InputElement}
                    />
                  </Col>

                  <Col sm={6} xs={12} className="mb-3">
                    <div className="d-flex flex-wrap">
                      <FastField
                        label="جنسیت"
                        name="gender"
                        list={[
                          { label: "آقا", value: "male" },
                          { label: "خانم", value: "female" },
                        ]}
                        radioClassName="mt-2"
                        columnClassName="mt-2 mb-3"
                        as={RadioGroupElement}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col sm={12} lg={3} className="mb-4">
                <div className="p-3 d-flex flex-sm-column   bg-hover rounded-20 w-100 h-100">
                  <div className="center-content mb-lg-3 mb-0">
                    <img src={PersonalInfoImg} width={154} height={154} />
                  </div>
                  <div className="d-flex justify-content-center flex-column align-items-start align-items-sm-center px-3 px-lg-0">
                    <h2 className="fw-700 size-3 mb-3 text-blue ">
                      اطلاعات هویتی
                    </h2>
                    <p className="text-gray-3 size-5 mb-0 fw-500 ">
                      برای دسترسی به همه امکانات ارز ۲ ارز لازمه همه مراحل احراز
                      هویت رو کامل کنی
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          <Col xs={12} className="mt-5">
            <Row className="justify-content-end">
              <Col lg={3} md={6} xs={12} className="text-start">
                <CustomizedButton
                  type="submit"
                  leftIcon={<FiChevronLeft size={20} />}
                  size="xs"
                  className="size-4"
                  variant="blue"
                  disabled={!isValid}
                  loading={loading}
                  style={{ minWidth: "120px" }}
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
