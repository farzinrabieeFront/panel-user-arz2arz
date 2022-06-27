/** internal imports */
import { useAuth } from "../../../context/AuthProvider";
import { useEffect, useRef } from "react";
import Styles from "../Auth.module.scss";
/** external imports */
import { Row, Col } from "react-bootstrap";
import { FaChevronLeft, AiOutlineMail } from "react-icons/all";
import { Formik, Form, FastField } from "formik";
/** component imports */
import AuthTemplate from "../../../components/auth/template/Template";
import { NewInput } from "../../../common/element/formik-inputs";
import CustomizedButton from "../../../components/form/button/Button";

export default function ForgotPass() {
    const { loading, forgotPassHandler } = useAuth();

    return (
        <AuthTemplate className="p-3 row flex-wrapp align-content-center">
            <div className="w-100 mb-5">
                <h1 className="fw-700 h4 mb-0 text-center text-blue">
                    فراموشی رمز عبور
                </h1>
            </div>

            <div className="w-100">
                <Formik
                    initialValues={{ email: "" }}
                    onSubmit={forgotPassHandler}
                >
                    {({ isValid, dirty }) => (
                        <Form
                            className={`${Styles.formInput} d-flex flex-wrap align-items-end`}
                        >
                            <Col xs={12} className="mb-3">
                                <FastField
                                    as={NewInput}
                                    name="email"
                                    label="ایمیل"
                                    type="email"
                                    preIcon={<AiOutlineMail size={24} />}
                                />
                            </Col>

                            <Col xs={12}>
                                <CustomizedButton
                                    isFullWidth
                                    leftIcon={<FaChevronLeft size={20} />}
                                    type="submit"
                                    className="size-3 fw-700"
                                    size="lg"
                                    variant="blue"
                                    disabled={!(isValid && dirty)}
                                    loading={loading}
                                >
                                    ارسال کد
                                </CustomizedButton>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </div>
        </AuthTemplate>
    );
}
