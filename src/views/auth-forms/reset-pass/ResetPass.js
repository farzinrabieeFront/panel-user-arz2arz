/** internal imports */
import { useAuth } from "../../../context/AuthProvider";
import { useRef } from "react";
import Styles from "../Auth.module.scss";
/** external imports */
import { Col } from "react-bootstrap";
import { AiOutlineLock, FaChevronLeft } from "react-icons/all";
import { Form, Formik, FastField } from "formik";
/** component imports */
import AuthTemplate from "../../../components/auth/template/Template";
import { NewInput } from "../../../common/element/formik-inputs";
import CustomizedButton from "../../../components/form/button/Button";
import PasswordConditions from "../../../common/widgets/password-conditions/PasswordConditions";
import PassStrenght from "../../../common/widgets/pass-strenght/PassStrenght";

export default function ResetPass() {
    const { loading, resetPassHandler } = useAuth();

    return (
        <AuthTemplate
            type="register"
            className="d-flex flex-wrap align-content-center"
        >
            <div className="w-100 mb-5">
                <h1 className="fw-700 h4 mb-0 text-center text-blue">تغییر رمز عبور</h1>
            </div>

            <div className="w-100">
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={resetPassHandler}
                >
                    {({ isValid, dirty, values }) => (
                        <Form
                            className={`${Styles.formInput} d-flex flex-wrap align-items-end`}
                        >
                            <Col xs={12} className="mb-3">
                                <FastField
                                    as={NewInput}
                                    name="password"
                                    preIcon={<AiOutlineLock size={24} />}
                                    type="password"
                                    label="رمز عبور"
                                />
                            </Col>

                            <Col xs={12} className="mb-3">
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

                            <Col xs={12} className="lmb-2">
                                <PasswordConditions
                                    password={values.password || values.confirmPassword}
                                />
                            </Col>

                            <Col xs={12}>
                                <CustomizedButton
                                    type="submit"
                                    size="lg"
                                    variant="blue"
                                    isFullWidth
                                    className="size-3 fw-700"
                                    disabled={!(isValid && dirty)}
                                    leftIcon={<FaChevronLeft size={20} />}
                                    {...loading}
                                >
                                    تایید و ادامه
                                </CustomizedButton>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </div>
        </AuthTemplate>
    );
}
