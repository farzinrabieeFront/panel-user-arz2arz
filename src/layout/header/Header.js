import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Styles from "./Header.module.scss";
import { Col, Container, Offcanvas } from "react-bootstrap";
import {
  BiBell,
  BiMoon,
  RiLogoutCircleRLine,
  FaChevronLeft,
  FiLock,
  FiSettings,
  FiUser,
  IoInformationCircle,
  AiFillCaretDown,
  IoCheckmarkCircle,
  IoAlertCircle,
  RiFundsLine,
  AiOutlinePushpin,
  BiWallet,
  BiCreditCard,
  RiHistoryLine,
  IoCloseCircle,
  BiMenuAltRight,
  GrClose,
} from "react-icons/all";
import { useAuth } from "../../context/AuthProvider";
import a2zLogo from "../../assets/images/arzTpArz_logo-w.png";
import Dropdown from "../../components/drop-down/Dropdown";
import DataHeader from "./components/DataHeader";
import CustomizedSwitch from "../../components/switch/CustomizedSwitch";
import CustomizedButton from "../../components/form/button/Button";
import { DateConvert, Toastify } from "../../utils";
import { cookieServices } from "../../services";
import NotificationsModal from "../../common/element/modals/notifications/NotificationsModal";
import Cookies from "universal-cookie";
import NoData from "../../components/no-data/NoData";
import { useSelector } from "react-redux";
import { useNotification } from "../../context/NotificationServises";
import useMainApi from "../../common/hooks/useMainApi";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "./mobile-menu/components/navbar/Navbar";

const status_list = {
  info: <IoInformationCircle size={20} className="ms-2 text-blue" />,
  warning: <IoAlertCircle size={20} className="ms-2 text-orange" />,
  success: <IoCheckmarkCircle size={20} className="ms-2 text-success" />,
  error: <IoCloseCircle size={20} className="ms-2 text-danger" />,
};

const Header = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { customer } = useSelector((state) => state.user);
  const { notification } = useNotification();
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState();
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifsCount, setUnreadNotifsCount] = useState(0);
  const [playSound, setPlaySound] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [stateClose, setStateClose] = useState(false);
  const { urls, get } = useMainApi();
  useEffect(() => {
    if (
      cookieServices.get("accessToken") &&
      cookieServices.get("refreshToken")
    ) {
      getUnreadNotifications();
    }
  }, [notification]);
  const handleCloseDropDown = () => {
    setStateClose(true);
  };

  const getUnreadNotifications = async () => {
    // try {
    //   const _params = {
    //     perPage: 6,
    //     pageNumber: 1,
    //     read: false,
    //   };
    //   const res = await get(urls.Notifications, { _params });
    //   setNotifications(res.data.result);
    //   setUnreadNotifsCount(res.data.count);
    // } catch (error) {
    //   Toastify.error(error.message);
    // }
  };

  return (
    <Container
      fluid
      className={`${Styles.header} d-flex align-items-center bg-dark px-3 py-2`}
    >
      <div className="d-flex col-12">
        <Col className="d-flex d-xl-none" xs={4}>
          <span
            className={`${Styles.menuButton} text-gray-0 p-2`}
            onClick={() => setShowMenu(true)}
          >
            <BiMenuAltRight size={30} />
          </span>
        </Col>
        <Col
          xs={4}
          xl="4"
          className="d-flex justify-content-center justify-content-xl-start"
        >
          <div className="d-flex align-items-center">
            <div className={`${Styles.logo} ${Styles.after} ps-4`}>
              <Link to="/" className="d-flex align-items-center">
                <img src={a2zLogo} alt="صرافی آنلاین ارز تو ارز" />
              </Link>
            </div>
          </div>
          <div className="d-none d-xl-flex align-items-center pe-4">
            <ul className="m-0 p-0 d-flex">
              <li>
                <Link
                  className={`${
                    pathname.includes("/trade/")
                      ? "text-blue fw-500"
                      : "text-white"
                  } ps-4 size-4`}
                  to="/trade/BTC-USDT"
                >
                  معاملات
                </Link>
              </li>
              <li>
                <Link
                  className={`${
                    pathname.includes("/fiat/")
                      ? "text-blue fw-500"
                      : "text-white"
                  } ps-4 size-4`}
                  to="/fiat/USDT"
                >
                  خرید و فروش ارز
                </Link>
              </li>

              <li>
                <Dropdown
                  size={"300px"}
                  title="کیف پول"
                  pathnameActive="/wallet/"
                >
                  <div className={`${Styles.wallet} d-flex flex-column`}>
                    <Link
                      to="/my/wallet/overview"
                      className={`${
                        pathname === "/my/wallet/overview" ? Styles.active : ""
                      } size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <BiWallet size={20} className="text-gray-2 ms-2" />
                      نمای کلی
                    </Link>
                    <Link
                      to="/my/wallet/deposit/fiat"
                      className={`${
                        pathname === "/my/wallet/deposit/fiat"
                          ? Styles.active
                          : ""
                      } size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <i
                        className={`${Styles.alignedIcon} icon-deposit text-gray-2 ms-2`}
                      ></i>
                      واریز
                    </Link>
                    <Link
                      to="/my/wallet/withdraw/fiat"
                      className={`${
                        pathname === "/my/wallet/withdraw/fiat"
                          ? Styles.active
                          : ""
                      } size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <i
                        className={`${Styles.alignedIcon} icon-withdraw text-gray-2 ms-2`}
                      ></i>
                      برداشت
                    </Link>
                    <Link
                      to="/my/bank-accounts"
                      className={`${
                        pathname === "/my/bank-accounts" ? Styles.active : ""
                      } size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <BiCreditCard size={20} className="text-gray-2 ms-2" />
                      حساب های بانکی
                    </Link>
                    <Link
                      to="/my/wallet/history/deposit-fiat"
                      className={`${
                        pathname === "/my/wallet/history/deposit-fiat"
                          ? Styles.active
                          : ""
                      } size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <RiHistoryLine size={20} className="text-gray-2 ms-2" />
                      تاریخچه تراکنش‌ها
                    </Link>
                  </div>
                </Dropdown>
              </li>
              <li>
                <Dropdown
                  size={"200px"}
                  title="سفارش‌ها"
                  pathnameActive="/orders/"
                >
                  <div className={`${Styles.wallet} d-flex flex-column`}>
                    <Link
                      to="/my/orders/spot"
                      state={{ type: "openOrders" }}
                      className={`${
                        pathname === "orders" && state?.type === "openOrders"
                          ? Styles.active
                          : ""
                      } size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <RiFundsLine size={20} className="text-gray-2 ms-2" />
                      سفارش‌های باز
                    </Link>
                    <Link
                      to="/my/orders/spot"
                      state={{ type: "allOrders" }}
                      className={`${
                        pathname === "orders" && state?.type === "allOrders"
                          ? Styles.active
                          : ""
                      } size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <RiHistoryLine size={20} className="text-gray-2 ms-2" />
                      تاریخچه سفارش‌ها
                    </Link>
                  </div>
                </Dropdown>
              </li>
            </ul>
          </div>
        </Col>

        <Col xs={4} xl="8" className="d-flex flex-row-reverse ">
          <div className={`${Styles.before} d-flex align-items-center`}>
            <ul className="m-0 p-0 d-flex flex-row-reverse">
              <li>
                <div className="d-none d-xl-flex">
                  <Dropdown size={"200px"} title={<FiUser size={20} />}>
                    <div className={`${Styles.wallet} d-flex flex-column`}>
                      {/* <span
                      className={`${
                        pathname === "" ? Styles.active : ""
                      } mb-1 size-4 text-gray-3 d-flex align-items-center`}
                    >
                      <FiUser size={20} className="text-gray-2 ms-2" />
                      پروفایل
                    </span> */}
                      <Link
                        to="/my/security"
                        className={`${
                          pathname === "/my/security" ? Styles.active : ""
                        } mb-1 size-4 text-gray-3 d-flex align-items-center`}
                      >
                        <FiLock size={20} className="text-gray-2 ms-2" />
                        امنیت
                      </Link>
                      <Link
                        to="/notifications"
                        className={`${
                          pathname === "/notifications" ? Styles.active : ""
                        } mb-1 size-4 text-gray-3 d-flex align-items-center`}
                      >
                        <BiBell size={20} className="text-gray-2 ms-2" />
                        اعلان‌ها
                      </Link>

                      <span
                        onClick={logout}
                        className={`${
                          pathname === "" ? Styles.active : ""
                        } size-4 text-gray-3 d-flex align-items-center`}
                      >
                        {" "}
                        <RiLogoutCircleRLine
                          size={20}
                          className="text-gray-2 ms-2"
                        />
                        خروج از حساب
                      </span>
                    </div>
                  </Dropdown>
                </div>
              </li>
              <li>
                <Dropdown
                  setStateClose={setStateClose}
                  stateClose={stateClose}
                  title={
                    <span className={Styles.notifIcon}>
                      <BiBell size={20} />
                      {unreadNotifsCount === 0 ? null : (
                        <small
                          className={`${Styles.notifCount} en fw-500 size-6`}
                        >
                          {unreadNotifsCount}
                        </small>
                      )}
                    </span>
                  }
                >
                  <div className={`${Styles.notifBox} p-2`}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="d-flex align-items-center fw-500 size-4 text-gray-4">
                        <BiBell className="text-blue ms-1" size={20} /> اعلانات
                      </span>
                      <div className="d-flex align-items-center">
                        <CustomizedSwitch
                          className="me-4"
                          handleChange={() => setPlaySound((prev) => !prev)}
                          checked={playSound}
                          label="پخش صدا"
                        />
                        <GrClose
                          className="me-4 d-flex d-sm-none"
                          onClick={handleCloseDropDown}
                        />
                      </div>
                    </div>
                    <ul className="m-0 p-0">
                      {customer.isVerified ? null : (
                        <>
                          <li
                            className={`${Styles.list} ${Styles.read} pointer mb-2 p-2 d-flex justify-content-between align-items-center`}
                          >
                            <div>
                              <div className="d-flex align-items-center">
                                <span className={Styles.svg}>
                                  {status_list["warning"]}
                                </span>

                                <span
                                  className={`${Styles.text} me-2 text-gray-4 size-4 mb-0`}
                                >
                                  فرایند احراز هویتت رو هنوز تکمیل نکردی.
                                </span>
                              </div>
                              <div className="mt-1">
                                <span
                                  className={`${Styles.text} text-gray-2 size-5`}
                                >
                                  <AiOutlinePushpin
                                    size={18}
                                    className="ms-2"
                                  />
                                  با تکمیل احراز هویت، از تمام امکانات ارز تو
                                  ارز استفاده کن
                                </span>
                              </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                              <div className="text-gray-3 size-5"> 09:20</div>
                              <div className="text-gray-3 size-5">امروز</div>
                            </div>
                          </li>

                          <li
                            className={`${Styles.list} ${Styles.read} pointer mb-2 p-2 d-flex justify-content-between align-items-center`}
                          >
                            <div>
                              <div className="d-flex align-items-center">
                                <span className={Styles.svg}>
                                  {status_list["warning"]}
                                </span>

                                <span
                                  className={`${Styles.text} me-2 text-gray-4 size-4 mb-0`}
                                >
                                  فرایند احراز هویتت رو هنوز تکمیل نکردی.
                                </span>
                              </div>
                              <div className="mt-1">
                                <span
                                  className={`${Styles.text} text-gray-2 size-5`}
                                >
                                  <AiOutlinePushpin
                                    size={18}
                                    className="ms-2"
                                  />
                                  با تکمیل احراز هویت، از تمام امکانات ارز تو
                                  ارز استفاده کن
                                </span>
                              </div>
                            </div>
                            <div className="d-flex flex-column justify-content-between">
                              <div className="text-gray-3 size-5"> 09:20</div>
                              <div className="text-gray-3 size-5">امروز</div>
                            </div>
                          </li>
                        </>
                      )}

                      {customer.hasBankAccount ? null : (
                        <li
                          className={`${Styles.list} ${Styles.read} pointer mb-2 p-2 d-flex justify-content-between align-items-center`}
                        >
                          <div>
                            <div className="d-flex align-items-center">
                              <span className={Styles.svg}>
                                {status_list["warning"]}
                              </span>

                              <span
                                className={`${Styles.text} me-2 text-gray-4 size-4 mb-0`}
                              >
                                کارت بانکیت رو هنوز اضافه نکردی.
                              </span>
                            </div>
                            <div className="mt-1">
                              <span
                                className={`${Styles.text} text-gray-2 size-5`}
                              >
                                <AiOutlinePushpin size={18} className="ms-2" />
                                برای انجام تراکنش‌های واریز و برداشت تومنی کارت
                                بانکیت رو اضافه کن.
                              </span>
                            </div>
                          </div>
                          <div className="d-flex flex-column justify-content-between">
                            <div className="text-gray-3 size-5"> 09:20</div>
                            <div className="text-gray-3 size-5">امروز</div>
                          </div>
                        </li>
                      )}
                      {notifications.length ? (
                        notifications.map((item, index) => {
                          return (
                            <li
                              key={index}
                              className={`${Styles.list} ${
                                item.read ? Styles.read : ""
                              } pointer mb-2 p-2 d-flex justify-content-between align-items-center`}
                              onClick={() => {
                                setShowModal(item._id);
                              }}
                            >
                              <div className="d-flex ps-2">
                                <span className={Styles.svg}>
                                  {status_list[item.status]}
                                </span>
                                <span className="d-flex flex-column pe-2">
                                  <span
                                    className={`${Styles.text} text-gray-4 size-4 mb-1`}
                                  >
                                    {item.title}
                                  </span>
                                  <span
                                    className={`${Styles.text} text-gray-2 size-5`}
                                  >
                                    {item.description}{" "}
                                  </span>
                                </span>
                              </div>
                              <div className="d-flex flex-column">
                                <span className="text-gray-3 size-5 mb-1 text-start">
                                  {DateConvert.getTime(item.createdAt)}
                                </span>
                                <span className="text-gray-3 size-5 text-start">
                                  {DateConvert.toShamsiDate(item.createdAt)}
                                </span>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <>
                          {customer.isVerified && customer.hasBankAccount ? (
                            <div
                              className={`${Styles.noNotification} d-flex justify-content-center w-100`}
                            >
                              <NoData title="اعلان جدیدی برای نمایش وجود ندارد." />
                            </div>
                          ) : null}
                        </>
                      )}
                    </ul>
                    <div className="w-100 mt-3">
                      <CustomizedButton
                        leftIcon={<FaChevronLeft size={16} />}
                        outlined
                        isFullWidth
                        className="size-4 fw-500 minHei‍‍ght-auto py-2"
                        size="md"
                        variant="blue"
                        type="submit"
                        onClick={() => navigate("/notifications")}
                      >
                        مشاهده همه
                      </CustomizedButton>
                    </div>
                    {showModal ? (
                      <NotificationsModal
                        show={showModal}
                        onHide={() => {
                          setShowModal();
                          getUnreadNotifications();
                        }}
                        // reLoadList={getUnreadNotifications}

                        id={showModal}
                      />
                    ) : null}
                  </div>
                </Dropdown>
              </li>
            </ul>
          </div>
          <DataHeader />
        </Col>
      </div>
      <Offcanvas
        id={"sidebarCanvas"}
        className={`${Styles.canvas} mobile-menu-canvas`}
        placement="end"
        show={showMenu}
        onHide={() => setShowMenu(false)}
      >
        <Offcanvas.Body>
          <Sidebar isSideClose={false} closeMobile={() => setShowMenu(false)} />
        </Offcanvas.Body>
      </Offcanvas>
      <Navbar />
    </Container>
  );
};

export default Header;
