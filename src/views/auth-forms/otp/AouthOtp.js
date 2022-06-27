/** internal imports */
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import Styles from "../Auth.module.scss";
/** extenal imports */
import { Col } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { FaChevronLeft } from "react-icons/all";
/** component imports */
import AuthTemplate from "../../../components/auth/template/Template";
import CustomizedButton from "../../../components/form/button/Button";
import OTPInputElement from "../../../common/element/formik-inputs/otp-input/OTPInput";

export default function AouthOtp(props) {
    const formikRef = useRef(null);
    const { loading, confirmHandler, resendOTPHandler } = useAuth();
    const [data, setData] = useState({});

    useEffect(() => {
        if (!('auth' in sessionStorage)) props.navigate(`/${props.params.type}`)
        else {
            const authData = JSON.parse(sessionStorage.getItem('auth'))

            if (!authData.otpNonce && !authData.nonce) props.navigate(`/${props.params.type}`)

            setData(authData)
        }
    }, []);


    return (
        <AuthTemplate
            type="login"
            className="px-4 py-5 py-lg-3 d-flex flex-wrap align-content-center"
        >
            <div className="w-100 mb-5">
                <h1 className="fw-700 h4 mb-0 text-center text-blue">ارسال کد تایید</h1>
            </div>

            <div className="w-100">
                <Formik
                    innerRef={formikRef}
                    initialValues={{ otpText: "" }}
                    onSubmit={confirmHandler}
                >
                    {({ isValid, dirty }) => (
                        <Form
                            className={`${Styles.formInput} d-flex flex-wrap align-items-end`}
                        >
                            <Col xs={12} className="my-5">
                                <Field
                                    as={OTPInputElement}
                                    name="otpText"
                                    {...data.expiryDate ? { expiryDate: data.expiryDate } : {}}
                                    type={data.sendMethod}
                                    onResendClick={() => {
                                        resendOTPHandler();
                                        formikRef.current.resetForm();
                                    }}
                                />
                            </Col>

                            <Col xs={12} className='mt-5'>
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
                                    {props.params.type === "forgetPassword" ?
                                        "تایید کد" :
                                        "ورود به ارز تو ارز"}

                                </CustomizedButton>
                            </Col>
                        </Form>
                    )}
                </Formik>
            </div>
        </AuthTemplate>
    );
}
