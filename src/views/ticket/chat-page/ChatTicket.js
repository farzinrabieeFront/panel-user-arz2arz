import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./ChatTicketPage.module.scss";
import { Badge, Col, Dropdown, Row } from "react-bootstrap";
import {
    HiDotsHorizontal,
    ImAttachment,
    MdSend,
    IoMdClose,
    RiUser2Line,
    IoMdAdd
} from "react-icons/all";
import { Scrollbar } from "react-scrollbars-custom";
import { Form, Formik, FastField } from "formik";
import { ticketServices } from "../../../services";
import { DateConvert, Toastify } from "../../../utils";

//components
import CustomizedButton from "../../../components/form/button/Button";
import CustomizedModal from "../../../components/modal/Modal";
import TextAreaElement from "../../../common/element/formik-inputs/text-area/Textarea";
import Wrapper from "../../../components/wrapper/Wrapper";
import TriangleTitle from "../../../components/triangle-title/TriangleTitle";
import Chat from "./components/Chat";
import TableElement from "../../../common/element/table/Table";
import useMainApi from "../../../common/hooks/useMainApi";
const ticket_status = {
    pending: { variant: "warning", title: "در انتظار پاسخ" },
    asnwered: { variant: "success", title: "پاسخ داده شده" },
    closed: { variant: "secondary", title: "بسته شده" },
}
// import TextareaAutosize from 'react-textarea-autosize';

export default function ChatTicketPage() {

    const { ticketId: id } = useParams();
    const navigate = useNavigate();
    const { urls, get, post } = useMainApi()
    const [currentPage, setCurrentPage] = useState(1);
    const [ticketMessage, setTicketMessage] = useState({});
    const [uploadedImage, setUploadedImage] = useState([]);
    const [ticketList, setTicketList] = useState([]);
    const [ticketCount, setTicketCount] = useState(0);
    const [messageValue, setMessageValue] = useState();
    const [images, setImages] = useState({});
    const [pageNumber, setPageNumber] = useState(1);
    const [test, setTest] = useState();

    useEffect(() => {
        if (id) {
            // getTicketMessage(id);
            handleGetTicketsList()
        }
    }, [currentPage]);

    const handleGetTicketsList = async () => {
        try {
            const _params = {
                pageNumber: pageNumber,
                perPage: 20,
            };
            const res = await get(urls.Tickets, { _params });
            setTicketList(res.data.result);
            setTicketCount(res.data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    // get ticketMessage
    const getTicketMessage = async (id) => {
        try {
            const _url = urls.Ticket.replace('_id', id)
            const res = await get(_url);
            setTicketMessage(res.data);

            // ImageRequest(data.data);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const ImageRequest = async (data) => {
        let id_t = "6177e0cd2fc9051887212af5";
        let imageUrl = "1635246285528-Baby Girl Flower Print Rompers.jpg";
        try {
            const _url = urls.TicketImage.replace('_id', id_t)
                .replace('_name', imageUrl)
            const res = await get(_url);

            setTest(
                `data:image/png;base64,${btoa(unescape(encodeURIComponent(data)))}`
            );
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    // create ticketMessage
    const createTicketMessage = async (vals) => {
        const _formData = new FormData();

        uploadedImage.forEach((image) => {
            _formData.append(`images`, image);
        });

        for (let key in vals) {
            _formData.append(key, vals[key]);
        }
        _formData.append("ticket", id);

        try {
            const res = await post(
                urls.TicketReply, _formData
            );
            getTicketMessage(id);
            setUploadedImage([]);
            // setMessageValue()
            // console.log(messageValue);
        } catch (error) {
            Toastify.error(error.message);
        }
    };





    return (
        <Row className="align-items-stretch">
            {ticketList.length ?
                <Col lg={6} xs={12}>
                    <Wrapper className="d-none d-lg-block h-100">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <TriangleTitle>
                                <h2 className="text-gray-4 size-3 fw-500 mb-0">
                                    تیکت‌های اخیر
                                </h2>
                            </TriangleTitle>
                            <CustomizedButton
                                rightIcon={<IoMdAdd size={16} />}
                                className={`${Styles.historyBtn} size-5 fw-500`}
                                size="xs"
                                outlined
                                variant="blue"
                                onClick={() => navigate("/create-ticket")}
                                type="submit"
                            >
                                ثبت تیکت جدید
                            </CustomizedButton>
                        </div>
                        <TableElement
                            header={
                                <>
                                    <th>شناسه</th>
                                    <th>موضوع</th>
                                    <th>عنوان</th>
                                    <th>آخرین تاریخ بروزرسانی</th>
                                    <th>وضعیت</th>
                                </>
                            }
                            totalRecords={ticketCount}
                            pageLimit={12}
                            handleChangePage={(page) => setPageNumber(page)}
                            className="text-end"
                            isPaiginate
                            responsive
                            striped
                        >

                            {ticketList.map((item, index) => {
                                return (
                                    <tr key={index} className="pointer">
                                        <td><span className="text-gray-4">{item.tickettId}</span></td>
                                        <td><span className="text-gray-4">{item.category}</span></td>
                                        <td><span className="text-gray-4">{item.title}</span></td>
                                        <td>
                                            <span className="text-gray-4 d-inline-block FaNum">
                                                {DateConvert.getTime(item.createdAt)}
                                                <span className="mx-1"></span>
                                                {DateConvert.toShamsiDate(item.createdAt)}
                                            </span>
                                        </td>
                                        <td>
                                            <Badge
                                                className="no-min-width size-5"
                                                bg={ticket_status[item.status]?.variant || "light"}
                                            >
                                                <span className='px-1'>{ticket_status[item.status]?.icon}</span>
                                                {ticket_status[item.status]?.title}
                                            </Badge>
                                        </td>
                                    </tr>
                                )
                            })}

                        </TableElement>
                    </Wrapper>
                </Col>
                : null
            }

            <Col lg={ticketList.length ? 6 : 12} xs={12}>
                <Wrapper className="h-100">
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
                        <div className="text-gray-2 size-5">
                            <span >تیکت شماره 4126781</span>
                            <span className="mx-2">-</span>
                            <span className="d-inline-flex ltr">
                                <span>08:00</span>
                                <span className="mx-1"></span>
                                <span>1400/12/26</span>
                            </span>
                        </div>
                        <div className="d-none d-sm-block">
                            <CustomizedButton
                                outlined
                                variant="light"
                                className={`${Styles.historyBtn} size-5 fw-500`}
                            >
                                بستن تیکت
                            </CustomizedButton>
                        </div>
                        <div className="col-12 mt-1">
                            <span className="text-gray-2 size-5 ms-2">موضوع:</span>{""}
                            <span className="fw-500 text-gray-4 size-5">احراز هویت</span>
                        </div>
                        <div className="col-12 mt-1">
                            <span className="text-gray-2 size-5 ms-2">عنوان:</span>{""}
                            <span className="fw-500 text-gray-4 size-5">مشکل در فرایند احراز هویت</span>
                        </div>
                    </div>
                    <Chat />
                </Wrapper>
            </Col>
        </Row>
    );
}
