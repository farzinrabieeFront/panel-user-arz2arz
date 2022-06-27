import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import {
  BiMenuAltRight,
  FaChevronLeft,
  BiBell,
  IoInformationCircle,
  AiOutlinePushpin,
  IoAlertCircle,
  IoCheckmarkCircle,
  IoCloseCircle,
  CgClose,
  GrClose,
} from "react-icons/all";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../../assets/images/arzTpArz_logo-w.png";
import NotificationsModal from "../../../common/element/modals/notifications/NotificationsModal";
import useMainApi from "../../../common/hooks/useMainApi";
import Dropdown from "../../../components/drop-down/Dropdown";
import CustomizedButton from "../../../components/form/button/Button";
import NoData from "../../../components/no-data/NoData";
import { DateConvert, Toastify } from "../../../utils";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Styles from "./MobileMenu.module.scss";
import CustomizedSwitch from "../../../components/switch/CustomizedSwitch";
import { cookieServices } from "../../../services";
import { useNotification } from "../../../context/NotificationServises";

const status_list = {
  info: <IoInformationCircle size={20} className="ms-2 text-blue" />,
  warning: <IoAlertCircle size={20} className="ms-2 text-orange" />,
  success: <IoCheckmarkCircle size={20} className="ms-2 text-success" />,
  error: <IoCloseCircle size={20} className="ms-2 text-danger" />,
};
const MobileMenu = () => {
  //////////////////////////////////////////////////////////////////////////////////////////////////state
  const [stateClose, setStateClose] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { notification } = useNotification();
  const { pathname } = useLocation();
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { customer } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState();
  const [playSound, setPlaySound] = useState(false);
  const navigate = useNavigate();
  //////////////////////////////////////////////////////////////////////////////////////////////////hoook
  const { urls, get } = useMainApi();
  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);
  useEffect(() => {
    if (
      cookieServices.get("accessToken") &&
      cookieServices.get("refreshToken")
    ) {
      getUnreadNotifications();
    }
  }, [notification]);

  //////////////////////////////////////////////////////////////////////////////////////////////////function
  const getUnreadNotifications = async () => {
    try {
      const _params = {
        perPage: 6,
        pageNumber: 1,
        read: false,
      };
      const res = await get(urls.Notifications, { _params });
      setNotifications(res.data.result);
      setUnreadNotifications(res.data.count);
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  const handleCloseDropDown = () => {
    setStateClose(true);
  };
  return (
    <div className={`${Styles.container} bg-dark p-2`}>
      <div className="d-flex justify-content-between align-items-center">
        <span
          className={`${Styles.menuButton} text-gray-0 p-2`}
          onClick={() => setShowMenu(true)}
        >
          <BiMenuAltRight size={30} />
        </span>
        <img src={Logo} className={Styles.img} />
        <span className="text-gray-0 p-2">
          <Dropdown
            setStateClose={setStateClose}
            stateClose={stateClose}
            title={
              <span className={Styles.notifIcon}>
                <BiBell size={20} className="text-gray-0" />
                {unreadNotifications === 0 ? null : (
                  <small className={`${Styles.notifCount} en fw-500 size-6`}>
                    {unreadNotifications}
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
                        <span className={`${Styles.text} text-gray-2 size-5`}>
                          <AiOutlinePushpin size={18} className="ms-2" />
                          با تکمیل احراز هویت، از تمام امکانات ارز تو ارز
                          استفاده کن
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column justify-content-between">
                      <div className="text-gray-3 size-5"> 09:20</div>
                      <div className="text-gray-3 size-5">امروز</div>
                    </div>
                  </li>
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
                        <span className={`${Styles.text} text-gray-2 size-5`}>
                          <AiOutlinePushpin size={18} className="ms-2" />
                          برای انجام تراکنش‌های واریز و برداشت تومنی کارت بانکیت
                          رو اضافه کن.
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
                      <>
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
                      </>
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
                  // reLoadList={getUnreadNotifications}
                  show={showModal}
                  onHide={() => {
                    setShowModal();
                    getUnreadNotifications();
                  }}
                  id={showModal}
                />
              ) : null}
            </div>
          </Dropdown>
          {/* <BiBell size={25} /> */}
        </span>
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
    </div>
  );
};

export default MobileMenu;
