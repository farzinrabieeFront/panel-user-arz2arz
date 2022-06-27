import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { tabTitlesHandler } from "./tabTitles";
import PublicRoute from "./PublicRoute";
import LayoutPanel from "../layout/Layout";
import SocketConnection from "../context/SocketConnection";
import NotificationServises from "../context/NotificationServises";
import OrderServises from "../context/OrderServises";
import PrivateRoutes from "./PrivateRoutes";
import Loading from "../components/loading/Loading";

const Login = lazy(() => import("../views/auth-forms/login/Login"));
const Register = lazy(() => import("../views/auth-forms/register/Register"));
const SelectAuthMethod = lazy(() =>
    import("../views/auth-forms/select-auth-method/SelectAuthMethod")
);
const ForgotPass = lazy(() =>
    import("../views/auth-forms/forgot-pass/ForgotPass")
);
const AouthOtp = lazy(() => import("../views/auth-forms/otp/AouthOtp"));
const ResetPass = lazy(() =>
    import("../views/auth-forms/reset-pass/ResetPass")
);

export default function Routing() {
    let { pathname } = useLocation();

    useEffect(() => {
        let scroll = document.querySelector("#root");
        scroll.scrollIntoView({ top: 0, behavior: "smooth", block: "start" });
        // tabTitlesHandler(pathname);
    }, [pathname]);

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/">
                    <Route path="login" element={<PublicRoute component={Login} />} />
                    <Route
                        path="register"
                        element={<PublicRoute component={Register} />}
                    />
                    <Route
                        path="forgetPassword"
                        element={<PublicRoute component={ForgotPass} />}
                    />
                    <Route
                        path=":type/select-2fa-method"
                        element={<PublicRoute component={SelectAuthMethod} home />}
                    />
                    <Route
                        path=":type/confirm-otp"
                        element={<PublicRoute component={AouthOtp} />}
                    />
                    <Route
                        path="/reset-password"
                        element={<PublicRoute component={ResetPass} />}
                    />
                    <Route index element={<Navigate replace to="/my/wallet/overview" />} />{" "}
                    <Route
                        path="*"
                        element={
                            <SocketConnection>
                                <NotificationServises>
                                    <OrderServises>
                                        <LayoutPanel>
                                            <PrivateRoutes />
                                        </LayoutPanel>
                                    </OrderServises>
                                </NotificationServises>
                            </SocketConnection>
                        }
                    />
                </Route>
            </Routes>
        </Suspense>
    );
}
