/** internal imports */
import { useRef } from "react";
import Styles from "../Auth.module.scss";
import { useAuth } from "../../../context/AuthProvider";
import { registerSchema } from "../authValidator";
/** external imports */
import { FaChevronLeft, AiOutlineMail, AiOutlineLock } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
/** component imports */
import { NewInput } from "../../../common/element/formik-inputs";
import AuthTemplate from "../../../components/auth/template/Template";
import CustomizedButton from "../../../components/form/button/Button";
import PasswordConditions from "../../../common/widgets/password-conditions/PasswordConditions";
import PassStrenght from "../../../common/widgets/pass-strenght/PassStrenght";

export default function Register() {
    const formikRef = useRef(null);
    const navigate = useNavigate();
    const { loading, registerHandler } = useAuth();

    return (
        <AuthTemplate
            type="register"
            className="d-flex flex-wrap align-content-center"
        >
            <div className="w-100 mb-5">
                <h1 className="fw-700 h4 mb-0 text-center text-blue">
                    ثبت نام در ارز تو ارز
                </h1>
            </div>

            <div className="w-100">
                <Formik
                    innerRef={formikRef}
                    initialValues={{
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={registerHandler}
                >
                    {({ isValid, dirty, values }) => (
                        <Form
                            className={`${Styles.formInput} d-flex flex-wrap align-items-end`}
                        >
                            <Col xs={12} className="mb-2">
                                <FastField
                                    as={NewInput}
                                    name="email"
                                    label="ایمیل"
                                    type="email"
                                    preIcon={<AiOutlineMail size={24} />}
                                />
                            </Col>

                            <Col xs={12} className="mb-2">
                                <FastField
                                    as={NewInput}
                                    name="password"
                                    label="رمز عبور"
                                    type="password"
                                    preIcon={<AiOutlineLock size={24} />}
                                />
                            </Col>

                            <Col xs={12} className="mb-2">
                                <FastField
                                    as={NewInput}
                                    name="confirmPassword"
                                    label="تکرار رمز عبور"
                                    type="password"
                                    preIcon={<AiOutlineLock size={24} />}
                                />
                            </Col>

                            <Col xs={12} className="my-2">
                                <PassStrenght password={values.password} />
                            </Col>

                            <Col xs={12} className="mb-4">
                                <PasswordConditions
                                    password={values.password || values.confirmPassword}
                                />
                            </Col>

                            <Col xs={12} className="mb-3">
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
                                    ثبت نام
                                </CustomizedButton>
                            </Col>

                            <Col xs={12}>
                                <CustomizedButton
                                    isFullWidth
                                    className="size-3 fw-700 mb-4"
                                    size="lg"
                                    variant="blue"
                                    outlined
                                    onClick={() => navigate("/login")}
                                >
                                    ورود
                                </CustomizedButton>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </div>
        </AuthTemplate>
    );
}
