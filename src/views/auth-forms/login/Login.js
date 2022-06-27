/** internal imports */
import Styles from "../Auth.module.scss";
import { useAuth } from "../../../context/AuthProvider";
import { loginSchema } from "../authValidator";
/** external imports */
import { Col } from "react-bootstrap";
import { FaChevronLeft, AiOutlineMail, AiOutlineLock } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
import { Link } from "react-router-dom";
/** component imports */
import AuthTemplate from "../../../components/auth/template/Template";
import { NewInput } from "../../../common/element/formik-inputs";
import CustomizedButton from "../../../components/form/button/Button";

export default function Login() {
    const { loading, loginHandler } = useAuth();

    return (
        <AuthTemplate
            type="login"
            className="d-flex flex-wrap align-content-center"
        >
            <div className="w-100 mb-5">
                <h1 className="fw-700 h4 mb-0 text-center text-blue">
                    ورود به ارز تو ارز
                </h1>
            </div>

            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={loginSchema}
                onSubmit={loginHandler}
            >
                {({ isValid, dirty }) => (
                    <Form
                        className={`${Styles.formInput} d-flex flex-wrap align-items-end`}
                    >
                        <Col xs={12} className="mb-4">
                            <FastField
                                as={NewInput}
                                type="email"
                                name="email"
                                label="ایمیل"
                                preIcon={<AiOutlineMail size={24} />}
                            />
                        </Col>

                        <Col xs={12} className="mb-3">
                            <FastField
                                as={NewInput}
                                type="password"
                                name="password"
                                label="رمز عبور"
                                preIcon={<AiOutlineLock size={24} />}
                            />
                        </Col>

                        <Col xs={12} className="text-center mb-4">
                            <Link
                                to="/forgetPassword"
                                className="text-gray-3 size-5 pointer"
                            >
                                رمز عبورت رو فراموش کردی؟
                            </Link>
                        </Col>

                        <Col xs={12} className="mb-4">
                            <CustomizedButton
                                type="submit"
                                size="lg"
                                variant="blue"
                                isFullWidth
                                className="size-3 fw-700"
                                leftIcon={<FaChevronLeft size={20} />}
                                disabled={!(isValid && dirty)}
                                loading={loading}
                            >
                                ورود به ارز تو ارز
                            </CustomizedButton>
                        </Col>

                        <Col xs={12}>
                            <Link
                                className="size-3 rounded-10 p-2 fw-700 center-content w-100 btn btn-outline-blue btn-lg"
                                to="/register"
                            >
                                ثبت نام
                            </Link>
                        </Col>
                    </Form>
                )}
            </Formik>
        </AuthTemplate>
    );
}
