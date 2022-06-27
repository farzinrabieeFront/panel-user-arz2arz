/** internal imports */
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider";
import Styles from "./SelectAuthMethod.module.scss";
import SmsEnableIcon from "../../../assets/svgs/2fa-methods/enable-large-sms.svg";
import SmsDisableIcon from "../../../assets/svgs/2fa-methods/disable-large-sms.svg";
import GoogleEnableIcon from "../../../assets/svgs/2fa-methods/enable-large-google.svg";
import GoogleDisableIcon from "../../../assets/svgs/2fa-methods/disable-large-google.svg";
import EmailEnableIcon from "../../../assets/svgs/2fa-methods/enable-large-email.svg";
import EmailDisableIcon from "../../../assets/svgs/2fa-methods/disable-large-email.svg";
import CallEnableIcon from "../../../assets/svgs/2fa-methods/enable-large-call.svg";
import CallDisableIcon from "../../../assets/svgs/2fa-methods/disable-large-call.svg";
/** external imports */
import { FaChevronLeft } from "react-icons/all";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
/** component imports */
import AuthTemplate from "../../../components/auth/template/Template";
import CustomizedButton from "../../../components/form/button/Button";

const data = {
    sms: {
        title: "پیامک",
        enable_icon: SmsEnableIcon,
        disable_icon: SmsDisableIcon,
    },
    call: {
        title: "تماس صوتی",
        enable_icon: CallEnableIcon,
        disable_icon: CallDisableIcon,
    },
    email: {
        title: "ایمیل",
        enable_icon: EmailEnableIcon,
        disable_icon: EmailDisableIcon,
    },
    google: {
        title: "رمزساز گوگل",
        enable_icon: GoogleEnableIcon,
        disable_icon: GoogleDisableIcon,
    },
};

export default function SelectAuthMethod(props) {
    const { selectMethodHandler, loading } = useAuth();
    const [methods, setMethods] = useState([]);
    const [confirmSource, setConfirmSource] = useState("");

    useEffect(() => {
        if (!('auth' in sessionStorage)) props.navigate(`/${props.params.type}`)
        else {
            const authData = JSON.parse(sessionStorage.getItem("auth"));

            if (!authData.towFactorAuthSources || !authData.nonce)
                props.navigate(`/${props.params.type}`);

            setMethods(authData.towFactorAuthSources);
        }
    }, []);

    const renderMethods = () => {
        let methodsNode = [];

        for (const key in methods) {
            const active = methods[key];
            const selected = confirmSource === key;

            const { enable_icon, disable_icon, title } = data[key];

            if (!confirmSource) if (active) setConfirmSource(key);

            const methodClasses = classNames(
                "d-flex flex-md-column flex-row-reverse align-items-center justify-content-md-around justify-content-between w-100 py-3 px-4",
                Styles.methods,
                active && Styles.active,
                selected && Styles.selected
            );
            if (!(props.params.type === "forgetPassword" && key === "google")) {
                methodsNode.push(
                    <Col xs={12} md={6} className="d-flex py-2 p-md-2" key={key}>
                        <div
                            className={methodClasses}
                            onClick={() => active && setConfirmSource(key)}
                        >
                            <img
                                src={active ? enable_icon : disable_icon}
                                className="mb-md-3"
                            />
                            <span className={`text-gray-4 text-center fw-500 size-2`}>
                                {title}
                            </span>
                        </div>
                    </Col>
                );
            }
        }

        return methodsNode;
    };

    return (
        <AuthTemplate type="login" className="d-flex align-items-cnter flex-wrap ">
            <div className="w-100 mb-5">
                <h1 className="fw-700 h5 mb-0 text-center text-blue">
                    انتخاب روش ارسال کد
                </h1>
            </div>

            <Row className="align-items-stretch justify-content-center ">
                <Col
                    xs={12}
                    md={10}
                    className="d-flex flex-wrap mx-auto justify-content-between"
                >
                    {renderMethods()}
                </Col>

                <Col xs={12} md={10} className="mt-5">
                    <CustomizedButton
                        isFullWidth
                        leftIcon={<FaChevronLeft size={20} />}
                        type="submit"
                        className="size-3 fw-700"
                        size="lg"
                        variant="blue"
                        onClick={() => selectMethodHandler({ confirmSource })}
                        {...loading}
                    >
                        ارسال کد تایید
                    </CustomizedButton>
                </Col>

                {props.params.type === "forgetPassword" ? (
                    <Col xs={12} md={10} className="my-3">
                        <Link
                            className="size-3 rounded-10 p-2 fw-700 center-content w-100 btn btn-outline-blue btn-lg"
                            to={`/${props.params.type}`}
                        >
                            بازگشت
                        </Link>
                    </Col>
                ) : null}

            </Row>
        </AuthTemplate>
    );
}
