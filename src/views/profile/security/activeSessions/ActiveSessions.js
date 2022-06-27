/** internal imports */
import { useState, useEffect } from "react";
import { DateConvert, Toastify } from "../../../../utils";
import { useMainApi } from "../../../../common/hooks";
/** extenal imports */
import UAParser from "ua-parser-js";
import { IoIosArrowBack, FiTrash2 } from "react-icons/all";
/** component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import DeleteConfirmation from "../../../../common/element/modals/delete-confirmation/DeleteConfirmation";
import Styles from "./ActiveSessions.module.scss";

import NewTable, {
  TableAccordion,
  TableCell,
  TableRow,
} from "../../../../common/element/new-table/NewTable";

const ActiveSessions = () => {
  const { urls, get, del, loading } = useMainApi();
  const [showDelModal, setShowDelModal] = useState(false);
  const [activeItem, setActiveItem] = useState();
  const [devices, setDevices] = useState([]);
  const [countDevices, setCountDevices] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 6;

  const cols = [
    {
      headerName: "سیستم عامل",
      xs: "6",
      md: "3",
      className: "pe-3 pe-md-2",
    },
    {
      headerName: "آخرین زمان اتصال",
      md: "3",
      className: "pe-2",
    },
    {
      headerName: "IP",
      xs: "4",
      md: "3",
      className: "d-none d-md-flex",
    },
    {
      headerName: "خروج از دستگاه",
      md: "3",
      className: "d-none d-md-flex pe-lg-5 pe-4",
    },
  ];

  useEffect(getDevices, [pageNumber]);

  async function getDevices() {
    try {
      const _params = {
        perPage,
        pageNumber,
        isRevoked: false,
      };

      const { data } = await get(urls.Sessions, { _params });
      setDevices(data.result);
      setCountDevices(data.count);
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  async function revokeSessionItem(id) {
    try {
      const _url = urls.RevokeSession.replace("_id", id);
      const { message } = await del(_url);
      Toastify.success(message);
      getDevices();
    } catch (error) {
      Toastify.error(error.message);
    }
  }

  return [
    <div className="wrapper mb-3">
      <TriangleTitle className="mb-3">
        <h2 className="text-gray-4 size-3 fw-500 mb-0">مدیریت دستگاه ها</h2>
      </TriangleTitle>

      <NewTable
        headerItems={cols}
        loading={loading}
        isPaiginate
        pageLimit={perPage}
        pageNumber={pageNumber}
        totalRecords={countDevices}
        handleChangePage={setPageNumber}
      >
        {devices.map((item, index) => (
          <TableRow
            key={index}
            className={`${Styles.tr} ${
              activeItem === index && Styles.active
            } text-gray-4`}
          >
            <TableAccordion
              xs="12"
              md="6"
              className={`${Styles.shownItems}`}
              activeDropdown={() => {
                activeItem === index ? setActiveItem() : setActiveItem(index);
              }}
            >
              <TableCell
                xs="6"
                md="6"
                className="fw-400 justify-content-start"
                data-label="سیستم عامل"
              >
                <IoIosArrowBack
                  size={12}
                  className={`${Styles.dropdownIc} text-gray-2 d-md-none`}
                />
                {UAParser(item.agent).os.name +
                  " " +
                  UAParser(item.agent).os.version}
              </TableCell>
              <TableCell
                xs="3"
                md="4"
                className="d-flex justify-content-md-start"
                data-label="آخرین زمان اتصال"
              >
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-start">
                  <span className="w-100">
                    {DateConvert.toShamsiDate(item.createdAt)}
                  </span>
                  <span className="mx-1"></span>
                  <span className="w-100">
                    {DateConvert.getTime(item.createdAt)}
                  </span>
                </div>
              </TableCell>
            </TableAccordion>
            <TableAccordion
              xs="12"
              md="6"
              className={`${Styles.dropdown} flex-wrap my-2`}
            >
              <TableCell
                xs="6"
                md="6"
                className="justify-content-md-start"
                data-label="IP"
              >
                {item.ip}
              </TableCell>
              <TableCell xs="6" md="4" className="justify-content-md-start">
                {item.currentSession ? (
                  <span className="text-success w-100 text-md-center">
                    دستگاه کنونی
                  </span>
                ) : (
                  <span className="pointer text-gray-2 w-100 text-md-center">
                    <span
                      className="ms-2 ms-md-0"
                      onClick={() => setShowDelModal(item._id)}
                    >
                      <FiTrash2 size={20} />
                    </span>
                    <span className="d-md-none">حذف دستگاه</span>
                  </span>
                )}
              </TableCell>
            </TableAccordion>
          </TableRow>
        ))}
      </NewTable>
    </div>,
    showDelModal ? (
      <DeleteConfirmation
        title="آیا با حذف دستگاه موافقید؟"
        desc="دستگاه حذف شده قابل بازیابی نیست."
        show={showDelModal}
        onHide={() => setShowDelModal(false)}
        onClick={() => {
          revokeSessionItem(showDelModal);
          setShowDelModal(false);
        }}
      />
    ) : null,
  ];
};

export default ActiveSessions;
