/** internal imports */
import { useEffect, useState, memo, useRef } from "react";

/** external imports */
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaChevronLeft, RiErrorWarningLine } from "react-icons/all";
import { Field, Formik, Form } from "formik";
import { useHistory } from "react-router-dom";

/**component imports */
import CustomizedModal from "../../../../../components/modal/Modal";
import CustomizedButton from "../../../../../components/form/button/Button";
import OTPInputElement from "../../../../../common/element/formik-inputs/otp-input/OTPInput";
import Select2faMethods from "../../../../../common/widgets/select-2fa-methods/Select2faMethods";

function TwoStepAuthentication({
    show,
    onHide,
    title,
    header: Header,
    dataOtp = {},
    sendOtpHandler,
    verifyOtpHandler,
    resendOtpHandler,
    loading,
}) {
    const formikRef = useRef(null);
    const [enableWithdraw, setEnableWithdraw] = useState(false);
    const { twoFactorAuthentication } = useSelector((state) => state.user.customer);

    useEffect(() => {
        console.log({ dataOtp });
    }, [dataOtp]);

    useEffect(() => {
        let active_methods_count = 0;

        for (const key in twoFactorAuthentication)
            if (twoFactorAuthentication[key].enabled) active_methods_count++;

        if (active_methods_count > 1) setEnableWithdraw(true);
        else setEnableWithdraw(false);

    }, [twoFactorAuthentication]);

    const renderInputs = () => {
        const Inputs = [];

        for (const key in dataOtp.confirmSources) {
            if (key !== "google") {
                if (dataOtp.confirmSources[key]?.expiryDate &&
                    dataOtp.confirmSources[key]?.nonce) {
                    Inputs.push(
                        <Col xs={12} key={key}>
                            <Field
                                as={OTPInputElement}
                                type={key}
                                name={key}
                                expiryDate={dataOtp.confirmSources[key].expiryDate}
                                onResendClick={() => {
                                    resendOtpHandler(key);
                                    formikRef.current.setFieldValue(key, "");
                                }}
                            />
                        </Col>
                    );
                }
            } else if (dataOtp.confirmSources[key])
                Inputs.push(
                    <Col xs={12} key={key}>
                        <Field
                            as={OTPInputElement}
                            type={key}
                            name={key}
                            onResendClick={() => {
                                resendOtpHandler(key);
                                formikRef.current.setFieldValue(key, "");
                            }}
                        />
                    </Col>
                );
        }

        return Inputs;
    };

    return (
        <CustomizedModal
            show={show}
            onHide={onHide}
            keyboard={true}
            backdrop="static"
            bodyClassName="p-4"
            centered
            size="md"
            title={title}
        >
            {Header}
            {dataOtp.withdraw ?
                <Formik
                    innerRef={formikRef}
                    initialValues={{}}
                    onSubmit={verifyOtpHandler}
                >
                    {({ isValid, dirty, setFieldValue, values }) => (
                        <Form className={` d-flex flex-wrap align-items-end mt-5`}>
                            {renderInputs()}

                            <Col xs={12} className="mt-3">
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
                                    تایید
                                </CustomizedButton>
                            </Col>
                        </Form>
                    )}
                </Formik>
                : <>
                    {enableWithdraw ? (
                        <div className="text-center text-blue fw-500 my-4 pt-2 pb-1 size-3">
                            انتخاب روش های ارسال کد تایید (حداقل ۲ روش)
                        </div>
                    ) : (
                        <div className="center-content align-items-start text-danger fw-500 my-4 pt-2 pb-1 size-3">
                            <RiErrorWarningLine size={20} className="mt-1 ms-1" />
                            <div>
                                <div className="text-center">
                                    برای برداشت ارزی/تومانی حداقل باید 2 روش
                                </div>
                                <div className="text-center">تایید هویت رو فعال کرده باشی</div>
                            </div>
                        </div>
                    )}

                    <Select2faMethods
                        isMulti
                        onSubmit={(methods) => sendOtpHandler(methods)}
                    />
                </>}
        </CustomizedModal>
    );
}

export default memo(TwoStepAuthentication);

{/**




    {!("confirmSources" in dataOtp) ? (
                <Formik
                    innerRef={formikRef}
                    initialValues={{}}
                    onSubmit={verifyOtpHandler}
                >
                    {({ isValid, dirty, setFieldValue, values }) => (
                        <Form className={` d-flex flex-wrap align-items-end mt-5`}>
                            {renderInputs()}
                            <Col xs={12} className="mt-3">
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
                                    تایید
                                </CustomizedButton>
                            </Col>
                        </Form>
                    )}
                </Formik>
            ) : [
                enableWithdraw ? (
                    <div className="text-center text-blue fw-500 mb-3 size-2">
                        انتخاب روش های ارسال کد تایید (حداقل ۲ روش)
                    </div>
                ) : (
                    <div className="center-content align-items-start text-danger fw-500 mb-3 size-2">
                        <RiErrorWarningLine size={20} className="mt-1 ms-1" />
                        <div>
                            <div className="text-center">
                                برای برداشت ارزی/تومانی حداقل باید 2 روش
                            </div>
                            <div className="text-center">تایید هویت رو فعال کرده باشی</div>
                        </div>
                    </div>
                ),
                <Select2faMethods
                    isMulti
                    onSubmit={(methods) => sendOtpHandler(methods)}
                />,
            ]}
*/}