import { Link, useNavigate } from "react-router-dom";
import {
  IoMdAdd,
  BsCheckAll,
  BsX,
  BsCheck,
  MdKeyboardArrowLeft,
  MdOutlineDoubleArrow,
} from "react-icons/all";

import DateConvert from "../../../../utils/date";

import Styles from "../../Ticket.module.scss";
import NoData from "../../../../components/no-data/NoData";
import TableElement from "../../../../common/element/table/Table";
import Wrapper from "../../../../components/wrapper/Wrapper";
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import CustomizedButton from "../../../../components/form/button/Button";
import { useEffect, useState } from "react";

const ticket_status = {
  "درانتظار پاسخ": { variant: "warning", title: "در انتظار پاسخ" },
  "پاسخ داده شده": { variant: "success", title: "پاسخ داده شده" },
  "بسته شده": { variant: "secondary", title: "بسته شده" },
};

const TicketList = ({
  ticketList,
  ticketCount,
  setPageNumber,
  selectedTicket,
  setSelectedTicket,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [selectedTicket]);

  return (
    <Wrapper
      className={`${Styles.wrapper} ${selectedTicket ? "w-50" : "w-100"}`}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <TriangleTitle>
          <h2 className="text-gray-4 size-3 fw-500 mb-0">تیکت پشتیبانی</h2>
        </TriangleTitle>
        <div>
          <CustomizedButton
            loading={loading}
            rightIcon={<IoMdAdd size={20} />}
            className={`${Styles.btn} size-5 fw-700 main-btn py-0`}
            size="xs"
            outlined
            variant="blue"
            onClick={() => navigate("/create-ticket", {})}
            type="submit"
          >
            ثبت تیکت جدید
          </CustomizedButton>
          {selectedTicket ? (
            <CustomizedButton
              className={`${Styles.btn} size-4 fw-700 main-btn py-0 px-2 mr-2`}
              size="xs"
              outlined
              variant="blue"
              onClick={() => {
                setSelectedTicket("");
                setLoading(true);
              }}
              type="submit"
            >
              <MdOutlineDoubleArrow size={20} className="rotate-180" />
            </CustomizedButton>
          ) : null}
        </div>
      </div>
      <TableElement
        header={
          <>
            <th className={`${selectedTicket  ? "d-none" : ""}`}>شناسه</th>
            <th className={`${selectedTicket  ? "d-none" : ""}`}>موضوع</th>
            <th>تاریخ</th>
            <th>عنوان</th>
            <th>وضعیت</th>
          </>
        }
        totalRecords={ticketCount}
        pageLimit={6}
        handleChangePage={(page) => setPageNumber(page)}
        className="text-end overflow-hidden"
        isPaiginate
        responsive
        striped
      >
        {ticketList.length ? (
          ticketList.map((item, index) => {
            return (
              <tr
                key={index}
                className={`${
                  selectedTicket === item._id && Styles.selected
                } pointer`}
                onClick={() => {
                  setSelectedTicket(item._id);
                }}
              >
                <td className={`${selectedTicket ? "d-none" : ""}`}>
                  <span className="text-gray-4">{item.ticketID}</span>
                </td>
                <td className={`${selectedTicket ? "d-none" : ""}`}>
                  <span className="text-gray-4">{item.category?.title}</span>
                </td>
                <td>
                  <span className="text-gray-4 d-inline-block FaNum">
                    {DateConvert.getTime(item.createdAt)}
                    <span className="mx-1"></span>
                    {DateConvert.toShamsiDate(item.createdAt)}
                  </span>
                </td>
                <td>
                  <span className="text-gray-4">{item.title}</span>
                </td>
                <td>
                  <span
                    className={`badge bg-${
                      selectedTicket === item._id
                        ? "blue"
                        : ticket_status[item.status]?.variant || "light"
                    } text-${
                      selectedTicket === item._id
                        ? "light"
                        : ticket_status[item.status]?.variant || "light"
                    }  no-min-width px-2 py-1 rounded-pill size-5`}
                  >
                    {ticket_status[item.status]?.title}
                  </span>
                </td>
                <td className={`${selectedTicket ? "d-none" : ""}`}>
                  <MdKeyboardArrowLeft size={24} />
                </td>
              </tr>
            );
          })
        ) : (
          <tr className="bg-white">
            <td colSpan="5">
              <NoData title="تیکت جدیدی برای نمایش وجود ندارد." />
            </td>
          </tr>
        )}
      </TableElement>
    </Wrapper>
  );
};

export default TicketList;
