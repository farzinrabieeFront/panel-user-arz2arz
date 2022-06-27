import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Profile from "../views/profile/Profile";

const AuthenticationPages = lazy(() =>
    import("../views/profile/authentication/Authentication")
);
const SecurityPage = lazy(() => import("../views/profile/security/Security"));
const NotificationsPage = lazy(() =>
    import("../views/notifications/Notifications")
);
const BankAccountsManage = lazy(() =>
    import("../views/profile/bank-accounts-manage/BankAccountsManage")
);
const WalletPage = lazy(() => import("../views/wallet/Wallet"));
const SpotOrders = lazy(() => import("../views/profile/histories/SpotOrders"));
const FiatOrders = lazy(() => import("../views/profile/histories/FiatOrders"));
const FiatTrade = lazy(() => import("../views/fiat-trade/FiatTrade"));
const WithdrawPage = lazy(() => import("../views/withdraw/Withdraw"));
const DepositPage = lazy(() => import("../views/deposit/Deposit"));
const Transactions = lazy(() =>
    import("../views/profile/histories/Transactions")
);
const TradePage = lazy(() => import("../views/trade/Trade"));
const NoFoundComponent = lazy(() => import("../views/not-found/NotFound"));

const TicketsPage = lazy(() => import("../views/ticket/Ticket"));
const TicketForm = lazy(() =>
    import("../views/ticket/createTicket/CreateTicket")
);
const ChatTicketPage = lazy(() =>
    import("../views/ticket/chat-page/ChatTicket")
);

export default function PrivateRoutes() {
    let element = useRoutes([
        {
            path: "/my/profile",
            element: <PrivateRoute component={Profile} />,
        },
        {
            path: "/authentication",
            element: <PrivateRoute component={AuthenticationPages} />,
        },
        {
            path: "/my/security",
            element: <PrivateRoute component={SecurityPage} />,
        },
        {
            path: "/notifications",
            element: <PrivateRoute component={NotificationsPage} />,
        },
        {
            path: "/my/bank-accounts",
            element: <PrivateRoute component={BankAccountsManage} />,
        },
        {
            path: "/my/wallet/overview",
            element: <PrivateRoute component={WalletPage} />,
        },
        {
            path: "/my/orders/spot",
            children: [
                {
                    path: ":type",
                    element: <PrivateRoute component={SpotOrders} />,
                },
                {
                    path: "",
                    element: <Navigate replace to="/my/orders/spot/tradeorders" />,
                },
            ],
        },
        {
            path: "/my/orders/fiatorders",
            element: <PrivateRoute component={FiatOrders} />,
        },
        {
            path: "/my/wallet/history",
            children: [
                {
                    path: ":type",
                    element: <PrivateRoute component={Transactions} />,
                },
                {
                    path: "",
                    element: <Navigate replace to="/my/wallet/history/deposit-fiat" />,
                },
            ],
        },
        {
            path: "/fiat",
            children: [
                {
                    path: ":spot",
                    element: <PrivateRoute component={FiatTrade} />,
                },
                {
                    path: "",
                    element: <Navigate replace to="/fiat/USDT" />,
                },
            ],
        },
        {
            path: "/my/wallet/withdraw",
            children: [
                {
                    path: "",
                    element: <Navigate replace to="/my/wallet/withdraw/fiat" />,
                },
                {
                    path: "fiat",
                    element: <PrivateRoute component={WithdrawPage} type="fiat" />,
                },
                {
                    path: "spot",
                    children: [
                        {
                            path: ":spot",
                            element: <PrivateRoute component={WithdrawPage} type="spot" />,
                        },
                        {
                            path: "",
                            element: <Navigate replace to="/my/wallet/withdraw/spot/USDT" type="spot" />,
                        },
                    ],
                },
            ],
        },
        {
            path: "/my/wallet/deposit",
            children: [
                {
                    path: "",
                    element: <Navigate replace to="/my/wallet/deposit/fiat" />,
                },
                {
                    path: "fiat",
                    element: <PrivateRoute component={DepositPage} type="fiat" />,
                },
                {
                    path: "spot",
                    element: <PrivateRoute component={DepositPage} type="spot" />,
                    children: [
                        {
                            path: ":spot",
                            element: <PrivateRoute component={DepositPage} type="spot" />,
                        },
                        {
                            path: "",
                            element: <Navigate replace to="/my/wallet/deposit/spot/USDT" />,
                        },
                    ],
                },
            ],
        },
        {
            path: "/trade",
            element: <PrivateRoute component={TradePage} />,
            children: [
                {
                    path: ":spot",
                    element: <PrivateRoute component={TradePage} />,
                },
                {
                    path: "",
                    element: <Navigate replace to="/trade/BTC-USDT" />,
                },
            ],
        },
        {
            path: "/create-ticket",
            element: <PrivateRoute component={TicketForm} />,
        },
        {
            path: "/ticket",
            children: [
                {
                    path: ":ticketId",
                    element: <PrivateRoute component={ChatTicketPage} />,
                },
                {
                    path: "",
                    element: <PrivateRoute component={TicketsPage} />,
                },
            ],
        },
        {
            path: "*",
            element: <PrivateRoute component={NoFoundComponent} />,
        },
        // {
        //   path: "/",
        //   element: <Navigate replace to="/my/wallet/overview" />,
        // },
    ]);

    return element;
}
