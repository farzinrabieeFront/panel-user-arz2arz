import { useEffect, useState } from "react";
//packages
import {
  HiOutlineMailOpen,
  IoCheckmarkCircle,
  IoAlertCircle,
  IoCloseCircle,
  IoInformationCircle,
  BsDot,
} from "react-icons/all";
import useSound from "use-sound";
//components
import TriangleTitle from "../../components/triangle-title/TriangleTitle";
import Wrapper from "../../components/wrapper/Wrapper";
import CustomizedSwitch from "../../components/switch/CustomizedSwitch";
import CustomizedButton from "../../components/form/button/Button";
import Styles from "./Notifications.module.scss";
import { DateConvert, Toastify } from "../../utils";
import NotificationsModal from "../../common/element/modals/notifications/NotificationsModal";
import NotifSound from "../../assets/audios/point-blank-589.mp3";

import useMainApi from "../../common/hooks/useMainApi";
import NewTable, {
  TableRow,
  TableCell,
} from "../../common/element/new-table/NewTable";
// import { useNotification } from "../../context/NotificationServises";

const status_list = {
  info: <IoInformationCircle size={16} className="ms-2 text-blue" />,
  warning: <IoAlertCircle size={16} className="ms-2 text-orange" />,
  success: <IoCheckmarkCircle size={16} className="ms-2 text-success" />,
  failed: <IoCloseCircle size={16} className="ms-2 text-danger" />,
  error: <IoCloseCircle size={16} className="ms-2 text-danger" />,
};
let perPage = 15;

const NotificationsPage = () => {
  const [play] = useSound(NotifSound);
  const { urls, get, post, loading } = useMainApi();
  const [showModal, setShowModal] = useState();
  const [playSound, setPlaySound] = useState(true);
  const [flag, setFlag] = useState(false);

  // const { notification } = useNotification();
  const [activeIndex, setActiveIndex] = useState();
  const [notifIdLists, setNotifIdLists] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [unreadList, setUnreadList] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "ارز تو ارز | اعلانات";
    getNotifications();
  }, [pageNumber]);
  useEffect(() => {
    if (pageNumber === 1) {
      getNotifications();
    } else {
      setPageNumber(1);
    }
  }, [unreadList]);

  useEffect(() => {
    let defaultSoundStatus = localStorage.getItem("notificationSound");
    if (defaultSoundStatus) {
      setPlaySound(defaultSoundStatus === "on");
    } else {
      if (playSound) {
        localStorage.setItem("notificationSound", "on");
      } else {
        localStorage.setItem("notificationSound", "off");
      }
    }
  }, []);

  useEffect(() => {
    if (playSound) {
      localStorage.setItem("notificationSound", "on");
    } else {
      localStorage.setItem("notificationSound", "off");
    }
  }, [playSound]);

  const getNotifications = async () => {
    try {
      const _params = {
        perPage,
        pageNumber,
      };
      if (unreadList) _params.read = false;

      const res = await get(urls.Notifications, { _params });
      setNotifications(res.data.result);
      setNotificationsCount(res.data.count);
      let notifId = [];
      for (const item of res.data.result) {
        notifId.push(item._id);
      }
      setNotifIdLists(notifId);
    } catch (error) {
      Toastify.error(error.message);
    }
  };
  // const getUnreadNotifications = async () => {
  //   try {
  //     const _params = {
  //       perPage,
  //       pageNumber,
  //       read: false,
  //     };
  //     const res = await get(urls.Notifications, { _params });
  //     setUnreads(res.data.result);
  //     setUnreadsCount(res.data.count);
  //     let notifId = [];
  //     for (const item of res.data.result) {
  //       notifId.push(item._id);
  //     }
  //     setNotifIdLists(notifId);
  //   } catch (error) {
  //     Toastify.error(error.message);
  //   }
  // };

  const readAll = async () => {
    try {
      const res = await post(urls.ReadAllNotifications);
      Toastify.success(res.message);
      getNotifications();
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return (
    <Wrapper>
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <TriangleTitle>
          <h2 className="text-gray-4 mb-0 fw-500 size-3">اعلانات</h2>
        </TriangleTitle>

        <div className="d-flex align-items-center justify-content-end">
          {/* <CustomizedSwitch
            handleChange={() => setEmailOn((prev) => !prev)}
            checked={emailOn}
            className="d-none d-md-block"
            label="اطلاع رسانی با ایمیل"
          /> */}
          <CustomizedSwitch
            className="me-4"
            handleChange={() => setPlaySound((prev) => !prev)}
            checked={playSound}
            label="پخش صدا"
          />
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <div className="d-flex align-items-center justify-content-start">
          <CustomizedButton
            variant={`${unreadList ? "light" : "blue"}`}
            className={`${Styles.tabBtn} size-5 fw-500 ms-3`}
            onClick={() => {
              // getNotifications();
              setUnreadList(false);
            }}
          >
            همه
          </CustomizedButton>
          <CustomizedButton
            variant={`${unreadList ? "blue" : "light"}`}
            className={`${Styles.tabBtn} size-5 fw-500`}
            onClick={() => {
              // getUnreadNotifications();

              setUnreadList(true);
            }}
          >
            خوانده نشده
          </CustomizedButton>
        </div>

        <CustomizedButton
          outlined
          rightIcon={<HiOutlineMailOpen size={18} />}
          variant="light"
          className={`${Styles.tabBtn} size-5 fw-500`}
          onClick={readAll}
        >
          خواندن همه
        </CustomizedButton>
      </div>
      <NewTable
        isPaiginate
        headerItems={cols}
        loading={loading}
        handleChangePage={(page) => setPageNumber(page)}
        totalRecords={notificationsCount}
        pageLimit={perPage}
        pageNumber={pageNumber}
      >
        {notifications.map((item, index) => {
          return (
            <>
              <TableRow
                className={`${Styles.items} ${!item.read && Styles.unRead} p-2`}
                onClick={() => {
                  setShowModal(item._id);
                  setActiveIndex(index);
                }}
              >
                <TableCell xs={12} md={4}>
                  <div className="d-flex align-items-center justify-content-between  mb-md-0 mb-2 w-100">
                    <h2
                      className={`${Styles.description} size-5 text-gray-4 mb-0`}
                    >
                      {status_list[item.status]}
                      {item.title}
                    </h2>
                    {!item.read && (
                      <div
                        className={`${Styles.dotIcon} d-flex d-md-none`}
                      ></div>
                    )}
                  </div>
                </TableCell>
                <TableCell xs={12} md={6}>
                  <p
                    className={`${Styles.description} text-gray-3 size-5 fw-500 mb-0`}
                  >
                    {item.description}{" "}
                  </p>
                </TableCell>
                <TableCell
                  xs={12}
                  md={2}
                  className="justify-content-end justify-content-md-start"
                >
                  <div className="text-start text-md-end mt-md-0 mt-2">
                    <span className="text-gray-3 size-5 ms-3">
                      {DateConvert.getTime(item.createdAt)}
                    </span>{" "}
                    <span className="text-gray-3 size-5">
                      {DateConvert.toShamsiDate(item.createdAt)}
                    </span>
                  </div>
                  {!item.read && (
                    <div
                      className={`${Styles.dotIcon} d-none me-4 d-md-flex`}
                    ></div>
                  )}
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </NewTable>

      {showModal ? (
        <NotificationsModal
          // reLoadList={unreadList ? getUnreadNotifications : getNotifications}
          show={showModal}
          onHide={() => {
            setShowModal();
            getNotifications();
          }}
          id={notifIdLists[activeIndex]}
          next={() => setActiveIndex((prev) => prev + 1)}
          prev={() => setActiveIndex((prev) => prev - 1)}
          disableNext={!(activeIndex < notificationsCount - 1)}
          disablePrev={!(activeIndex > 0)}
        />
      ) : null}
    </Wrapper>
  );
};
const cols = [
  {
    headerName: "عنوان",
    xs: "4",
    md: "4",
    className: "px-md-0 d-md-flex d-none me-2",
  },
  {
    headerName: "توضیحات",
    xs: "6",
    md: "6",
    className: "px-md-0 d-md-flex d-none",
  },
  {
    headerName: "تاریخ",
    xs: "2",
    md: "2",
    className: "px-md-0 d-md-flex d-none",
  },
];
export default NotificationsPage;
