import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoCloseCircle,
  IoInformationCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/all";
import CustomizedModal from "../../../../components/modal/Modal";
import { Toastify } from "../../../../utils";
import useMainApi from "../../../hooks/useMainApi";
import Styles from "./NotificationsModal.module.scss";

const status_list = {
  info: <IoInformationCircle size={20} className="ms-2 text-blue" />,
  warning: <IoAlertCircle size={20} className="ms-2 text-orange" />,
  success: <IoCheckmarkCircle size={20} className="ms-2 text-success" />,
  error: <IoCloseCircle size={20} className="ms-2 text-danger" />,
  failed: <IoCloseCircle size={20} className="ms-2 text-danger" />,
};
const NotificationsModal = ({
  show,
  onHide,
  id,
  next,
  prev,
  disableNext,
  disablePrev,
  reLoadList,
}) => {
  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState({});
  const { urls, get } = useMainApi();
  const getNotification = async () => {
    try {
      const _url = urls.Notification.replace("_id", id);
      const res = await get(_url);
      setData(res.data);
      // reLoadList()
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  useEffect(getNotification, [id]);

  return (
    <CustomizedModal
      show={show}
      onHide={(evn) => {
        onHide();
        // evn.stopPropagation()
        // evn.preventDefault()
      }}
      keyboard={true}
      backdrop="static"
      bodyClassName="p-4"
      centered
      size="md"
      title="جزئیات پیام"
    >
      <div>
        {isloading ? (
          <ContentLoader viewBox="0 0 380 80">
            <rect x="361" y="0" rx="100" ry="100" width="16" height="16" />
            <rect x="50" y="2" rx="4" ry="4" width="300" height="13" />
            <rect x="10" y="29" rx="4" ry="4" width="340" height="8" />
            <rect x="30" y="47" rx="4" ry="4" width="320" height="8" />
            <rect x="60" y="65" rx="4" ry="4" width="290" height="8" />
          </ContentLoader>
        ) : (
          <div className="d-flex align-items-start mb-2">
            <span>{status_list[data.status]}</span>
            <div className="d-flex flex-column">
              <span className="size-3 fw-500 text-gray-4 mb-3">
                {data.title}
              </span>
              <p className="size-4 fw-500 text-gray-3">{data.description}</p>
            </div>
          </div>
        )}

        {prev || next ? (
          <Row className="d-flex align-items-center justify-content-between">
            <Col
              xs={2}
              className={`${Styles.prevNextBtn} ${
                disablePrev ? Styles.disabled : ""
              } d-flex align-items-center py-3`}
              onClick={() => {
                if (!disablePrev) prev();
              }}
            >
              <FiChevronRight size={18} className="ms-2" />
              <span className="size-5 fw-500">قبلی</span>
            </Col>
            <Col
              xs={2}
              className={`${Styles.prevNextBtn} ${
                disableNext ? Styles.disabled : ""
              } d-flex align-items-center justify-content-end py-3`}
              onClick={() => {
                if (!disableNext) next();
              }}
            >
              <span className="size-5 fw-500">بعدی</span>
              <FiChevronLeft size={18} className="me-2" />
            </Col>
          </Row>
        ) : null}
      </div>
    </CustomizedModal>
  );
};

export default NotificationsModal;
