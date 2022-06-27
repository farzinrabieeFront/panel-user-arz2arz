import React, { useEffect, useState } from "react";
import Styles from "./Navbar.module.scss";
import {
    FiUser,
    RiExchangeDollarLine,
    RiFundsLine,
    IoWalletOutline,
    FiLock,
    IoMdNotificationsOutline,
    BsBoxArrowRight,
    BsHeadset,
} from "react-icons/all";
import { useLocation, useNavigate } from "react-router-dom";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../../context/AuthProvider";
import ProfileModal from "./components/ProfileModal";

const Navbar = () => {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////state
    const { customer, customerIdentity } = useSelector((state) => state.user);
    const [show, setShow] = useState(false);
    const [widthPage, setWidthPage] = useState(0);
    const { pathname } = useLocation();
    const { logout } = useAuth();

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////hook
    const navigate = useNavigate();
    useEffect(() => {
        setShow(false);
    }, [pathname]);
    useEffect(() => {
        window.addEventListener("resize", () => {
            let ChangeWidth = document.body.offsetWidth;
            setWidthPage(ChangeWidth);
        });
    }, []);

    useEffect(() => {
        if (widthPage > 991) {
            setShow(false);
        }
    }, [widthPage]);

    // useEffect(() => {
    //   let scroll = document.querySelector("#root");
    //   scroll.scrollIntoView({ top: 0, behavior: "smooth", block: "start" });
    // }, [show]);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////functions
    const handleClick = (path) => {
        if (path === "profileMobile") {
            setShow((prevState) => !prevState);
        } else {
            setShow(false);
            navigate(path);
        }
    };

    const handleClickBoxesRouter = (link, id) => {
        if (id === 5) {
            logout();
            return;
        }
        navigate(link);
    };
    const handleClickMore = () => {
        if (pathname !== "/my/wallet/deposit/fiat") {
            navigate("./my/wallet/deposit/fiat");
        } else {
            setShow(false);
        }
    };

    return (
        <div className={`${Styles.navbar} flex-wrap`} id="far">
            {dataNavbar.map((itm, ind) => (
                <Col xs={3}>
                    <div
                        onClick={() => handleClick(itm.link)}
                        key={ind}
                        className={` ${itm.link === "profileMobile" && show ? Styles.active : ""
                            } ${!show && pathname.includes(itm.include ? itm.include : itm.link)
                                ? Styles.active
                                : ""
                            } p-2 center-content flex-column pointer`}
                    >
                        <RiFundsLine size={28} className="text-gray-2" />
                        <span className="text-gray-3 size-5 mt-1">{itm.title}</span>
                    </div>
                </Col>
            ))}

            {/*<Col xs={3}>*/}
            {/*  <Link*/}
            {/*    to="/my/wallet/overview"*/}
            {/*    className={`${*/}
            {/*      !show && pathname === "/my/wallet/overview" ? Styles.active : ""*/}
            {/*    } p-2 center-content flex-column`}*/}
            {/*  >*/}
            {/*    <IoWalletOutline size={28} className="text-gray-2" />*/}
            {/*    <span className="text-gray-3 size-5 mt-1">کیف پول</span>*/}
            {/*  </Link>*/}
            {/*</Col>*/}
            {/*<Col xs={3}>*/}
            {/*  <Link*/}
            {/*    to="/trade/BTC-USDT"*/}
            {/*    className={`${*/}
            {/*      !show && pathname.includes("/trade/") ? Styles.active : ""*/}
            {/*    } p-2 center-content flex-column`}*/}
            {/*  >*/}
            {/*    <RiFundsLine size={28} className="text-gray-2" />*/}
            {/*    <span className="text-gray-3 size-5 mt-1">معاملات</span>*/}
            {/*  </Link>*/}
            {/*</Col>*/}
            {/*<Col xs={3}>*/}
            {/*  <Link*/}
            {/*    to="/fiat/BTC"*/}
            {/*    className={`${*/}
            {/*      !show && pathname.includes("/fiat-trade/") ? Styles.active : ""*/}
            {/*    } p-2 center-content flex-column`}*/}
            {/*  >*/}
            {/*    <RiExchangeDollarLine size={28} className="text-gray-2" />*/}
            {/*    <span className="text-gray-3 size-5 mt-1">خرید و فروش</span>*/}
            {/*  </Link>*/}
            {/*</Col>*/}
            {/*<Col xs={3}>*/}
            {/*  <span*/}
            {/*    onClick={handleShow}*/}
            {/*    className={`${show && Styles.active} p-2 center-content flex-column`}*/}
            {/*  >*/}
            {/*    <FiUser size={28} className="text-gray-2" />*/}
            {/*    <span className="text-gray-3 size-5 mt-1">پروفایل</span>*/}
            {/*  </span>*/}
            {/*</Col>*/}

            <ProfileModal
                data1={data1}
                handleClickBoxesRouter={handleClickBoxesRouter}
                show={show}
                setShow={setShow}
                customer={customer}
                customerIdentity={customerIdentity}
                handleClickMore={handleClickMore}
            />
        </div>
    );
};

export default Navbar;
let data1 = [
    {
        id: 1,
        title: "مشخصات",
        icon: <FiUser className="text-gray-1" />,
        link: "/my/profile",
    },
    {
        id: 2,
        title: "امنیت",
        icon: <FiLock className="text-gray-1" />,
        link: "/my/security",
    },
    {
        id: 3,
        title: "اعلانات",
        icon: <IoMdNotificationsOutline className="text-gray-1" />,
        link: "/notifications",
    },
    {
        id: 4,
        title: "تیکت پشتیبانی",
        icon: <BsHeadset className="text-gray-1" />,
        link: "/ticket",
    },

    {
        id: 5,
        title: "خروج از حساب",
        icon: <BsBoxArrowRight />,
    },
];

let dataNavbar = [
    {
        title: "کیف پول",
        link: "/my/wallet/overview",
        icon: <IoWalletOutline size={28} className="text-gray-2" />,
    },
    {
        title: "معاملات",
        link: "/trade/BTC-USDT",
        include: "/trade/",
        icon: <RiFundsLine size={28} className="text-gray-2" />,
    },
    {
        title: "خرید و فروش",
        link: "/fiat/BTC",
        include: "/fiat-trade",
        icon: <RiExchangeDollarLine size={28} className="text-gray-2" />,
    },
    {
        title: "پروفایل",
        link: "profileMobile",
        icon: <FiUser size={28} className="text-gray-2" />,
    },
];

//  <div className={Styles.navbar}>
//             <div className='p-3 d-flex flex-wrap'>
//                 <div></div>
//             </div>
//         </div>
