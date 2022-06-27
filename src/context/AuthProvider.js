import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Toastify } from "../utils";
import useMainApi from "../common/hooks/useMainApi";
import useRedux from "../common/hooks/useRedux";

const AuthContext = React.createContext();

function AuthProvider(props) {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { urls, loading, post, del } = useMainApi();
    const { getUserData, getExchangeData, getConfigData, getMarketData, reset } = useRedux();
    const [, setCookie, removeCookie] = useCookies([
        "accessToken",
        "refreshToken",
    ]);

    useEffect(() => {
        // getInitialData();
    }, []);

    const registerHandler = async ({ email, password }) => {
        try {
            const { data, message } = await post(urls.Register, { email, password });

            Toastify.success(message);
            sessionStorage.setItem("auth", JSON.stringify({ ...data, email }));

            navigate(`/register/confirm-otp`);
        } catch (error) {
            // if(error.invalidFields)
            Toastify.error(error.message);
        }
    };

    const loginHandler = async ({ email, password }) => {
        try {
            const res = await post(urls.Login, { email, password });

            Toastify.success(res.message);
            sessionStorage.setItem("auth", JSON.stringify(res.data));

            navigate(`/login/select-2fa-method`);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const forgotPassHandler = async ({ email }) => {
        try {
            const { data, message } = await post(urls.ForgotPass, { email });

            Toastify.success(message);
            sessionStorage.setItem("auth", JSON.stringify(data));

            navigate(`/forgetPassword/select-2fa-method`);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const selectMethodHandler = ({ confirmSource }) => {
        const type = pathname.split("/")[1];

        if (confirmSource !== "google") generateOTPHandler({ confirmSource });
        else navigate(`/${type}/confirm-otp`);
    };

    const generateOTPHandler = async ({ confirmSource }) => {
        const type = pathname.split("/")[1];
        const url =
            urls[type.charAt(0).toUpperCase() + type.slice(1) + "GenerateOtp"];

        const { nonce, email } = JSON.parse(sessionStorage.getItem("auth"));
        try {
            const { data, message } = await post(url, {
                nonce,
                email,
                confirmSource,
            });
            Toastify.success(message);

            const { expiryDate, nonce: otpNonce, resendOTPNonce, sendMethod } = data;
            const new_session = {
                email,
                otpNonce,
                resendOTPNonce,
                sendMethod,
                expiryDate,
            };
            sessionStorage.setItem("auth", JSON.stringify(new_session));

            navigate(`/${type}/confirm-otp`);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const resendOTPHandler = async () => {
        const type = pathname.split("/")[1];
        const url =
            urls[type.charAt(0).toUpperCase() + type.slice(1) + "ResendOtp"];

        const {
            resendOTPNonce: nonce,
            email,
            sendMethod: confirmSource,
        } = JSON.parse(sessionStorage.getItem("auth"));

        try {
            const _body = { nonce, email };
            const _params = { resendOTP: true };
            if (type !== "register") _body.confirmSource = confirmSource;

            const { data, message } = await post(url, _body, { _params });
            Toastify.success(message);

            const { expiryDate, nonce: otpNonce, resendOTPNonce, sendMethod } = data;
            const new_session = {
                email,
                otpNonce,
                resendOTPNonce,
                sendMethod,
                expiryDate,
            };
            sessionStorage.setItem("auth", JSON.stringify(new_session));
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const confirmHandler = ({ otpText }) => {
        const { sendMethod } = JSON.parse(sessionStorage.getItem("auth"));

        if (sendMethod) confirmOTPHandler({ otpText });
        else confirmGoogleHandler({ otpText });
    };

    const confirmOTPHandler = async ({ otpText }) => {
        const type = pathname.split("/")[1];
        const url =
            urls[type.charAt(0).toUpperCase() + type.slice(1) + "ConfirmOtp"];
        const {
            otpNonce,
            nonce,
            email,
            sendMethod: confirmSource,
        } = JSON.parse(sessionStorage.getItem("auth"));

        try {
            let _body = {
                nonce: type === "register" ? nonce : otpNonce,
                email,
                otpText,
            };
            if (type !== "register") _body = { ..._body, confirmSource };

            const { data, message } = await post(url, _body);

            if (type !== "forgetPassword") {
                Toastify.success(message);
                setCookiesHandler(data);
            } else {
                const { nonce, email } = data;

                const new_session = { email, nonce };
                sessionStorage.setItem("auth", JSON.stringify(new_session));

                navigate(`/reset-password`);
            }
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const confirmGoogleHandler = async ({ otpText }) => {
        const type = pathname.split("/")[1];
        const url =
            urls[type.charAt(0).toUpperCase() + type.slice(1) + "ConfirmGoogle"];
        const { nonce, email } = JSON.parse(sessionStorage.getItem("auth"));

        try {
            const { data, message } = await post(url, { nonce, email, otpText });
            Toastify.success(message);
            setCookiesHandler(data);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const resetPassHandler = async ({ password }) => {
        const { nonce, email } = JSON.parse(sessionStorage.getItem("auth"));

        try {
            const { message } = await post(urls.UpdatePassword, {
                nonce,
                email,
                password,
            });
            Toastify.success(message);

            sessionStorage.removeItem("auth");
            navigate(`/login`);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const logout = async () => {
        try {
            const { message } = await del(urls.Logout);
            await removeCookiesHandler();
            Toastify.success(message);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const setCookiesHandler = async ({ access_token, refresh_token }) => {
        sessionStorage.removeItem("auth");

        let coockieOptions = { path: "/" };
        if (process.env.NODE_ENV && process.env.NODE_ENV !== "development")
            coockieOptions = { domain: "arz2arz.net" };

        // await setCookie("accessToken", access_token, coockieOptions);
        // await setCookie("refreshToken", refresh_token, coockieOptions);
        await setCookie("accessToken", access_token, coockieOptions);
        await setCookie("refreshToken", refresh_token, coockieOptions);

        getInitialData();

        navigate(`/my/wallet/overview`);
    };

    const removeCookiesHandler = async () => {
        let coockieOptions = { path: "/" };
        if (process.env.NODE_ENV && process.env.NODE_ENV !== "development")
            coockieOptions = { domain: "arz2arz.net" };

        await removeCookie("accessToken", coockieOptions);
        await removeCookie("refreshToken", coockieOptions);

        navigate(`/login`);

        reset();
    };

    const getInitialData = () => {
        Promise.all([
            getUserData(),
            getExchangeData(),
            getConfigData(),
            getMarketData(),
        ]);
    };

    return (
        <AuthContext.Provider
            value={{
                loading,
                loginHandler,
                registerHandler,
                forgotPassHandler,
                selectMethodHandler,
                resendOTPHandler,
                confirmHandler,
                resetPassHandler,
                logout,
            }}
            {...props}
        >
            {props.children}
        </AuthContext.Provider>
    );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
