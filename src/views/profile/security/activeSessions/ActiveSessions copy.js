/** internal imports */
import { useState, useEffect } from "react";
import { DateConvert, Toastify } from "../../../../utils";
import { useMainApi } from "../../../../common/hooks";
/** extenal imports */
import UAParser from "ua-parser-js";
import { FiTrash2 } from "react-icons/all";
/** component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import TableElement from "../../../../common/element/table/Table";
import DeleteConfirmation from "../../../../common/element/modals/delete-confirmation/DeleteConfirmation";

const ActiveSessions = () => {
  const { urls, get, del, loading } = useMainApi()
  const [showDelModal, setShowDelModal] = useState(false);
  const [devices, setDevices] = useState([]);
  const [countDevices, setCountDevices] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const perPage = 6;

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
  };

  async function revokeSessionItem(id) {
    try {
      const _url = urls.RevokeSession.replace('_id', id)
      const { message } = await del(_url);
      Toastify.success(message);
      getDevices();
    } catch (error) {
      Toastify.error(error.message);
    }
  };

  return [
    <div className="wrapper mb-3">
      <TriangleTitle className="mb-3">
        <h2 className="text-gray-4 size-3 fw-500 mb-0">مدیریت دستگاه ها</h2>
      </TriangleTitle>

      <TableElement
        responsive
        loading={loading}
        header={[
          <th>سیستم عامل</th>,
          <th>IP</th>,
          <th>آخرین زمان اتصال</th>,
          <th className="text-center">خروج از دستگاه</th>
        ]}
        totalRecords={countDevices}
        pageLimit={perPage}
        isPaiginate
        striped
        handleChangePage={setPageNumber}
      >
        {devices.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                {UAParser(item.agent).os.name +
                  " " +
                  UAParser(item.agent).os.version}
              </td>
              <td>{item.ip}</td>
              <td>
                <span className="d-inline-block FaNum">
                  {DateConvert.toShamsiDate(new Date(item.createdAt))}
                </span>
                <span className="text-gray-1 d-inline-block mx-2"></span>
                <span className="d-inline-block FaNum">
                  {DateConvert.getTime(new Date(item.createdAt))}
                </span>
              </td>
              <td className="text-center">
                {item.currentSession ? null : (
                  <span
                    className="pointer text-gray-2"
                    onClick={() => setShowDelModal(item._id)}
                  >
                    <FiTrash2 size={20} />
                  </span>
                )}
              </td>
            </tr>
          );
        })}
      </TableElement>
    </div>
    ,
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
    ) : null
  ]

};

export default ActiveSessions;
