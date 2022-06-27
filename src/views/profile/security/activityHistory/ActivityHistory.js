/** internal imports */
import { useEffect, useState } from "react";
import Styles from "../Security.module.scss";
import { useMainApi } from "../../../../common/hooks";
import { DateConvert, Toastify } from "../../../../utils";
/** extenal imports */
import { Badge, Col, Row } from "react-bootstrap";
import { UAParser } from "ua-parser-js";
import { BsCheckAll, BsX, IoIosArrowBack } from "react-icons/all";
/** component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import CustomizedButton from "../../../../components/form/button/Button";

import NewTable, {
    TableAccordion,
    TableCell,
    TableRow,
} from "../../../../common/element/new-table/NewTable";

const ActivityHistory = () => {
    const { urls, get, loading } = useMainApi();
    const [toggleActivity, setToggleActivity] = useState(true);
    const [activities, setActivities] = useState([]);
    const [countActivities, setCountActivities] = useState();
    const [activeItem, setActiveItem] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const cols = [
        {
            headerName: "تاریخ و ساعت",
            xs: "4",
            md: "2",
            className: "ps-0 me-5 me-md-0",
        },
        {
            headerName: "سیستم عامل",
            xs: "4",
            md: "2",
            className: "justify-content-md-center pe-4",
        },
        {
            headerName: "مرورگر",
            md: "3",
            className: "d-none d-md-flex pe-5",
        },
        {
            headerName: "IP",
            md: "2",
            className: "d-none d-md-flex px-md-2",
        },
        {
            headerName:
                activities[0]?.action === "loginActivity" ? "وضعیت" : "نوع عملیات",
            className: `${activities[0]?.action === "loginActivity" ? "" : "d-none"
                } d-md-flex pe-md-2`,
        },
    ];

    useEffect(() => {
        toggleActivity ? getLoginActivities() : getSecurityActivities();
    }, [pageNumber]);

    useEffect(() => {
        toggleActivity ? getLoginActivities() : getSecurityActivities();
        setPageNumber(1);
    }, [toggleActivity]);

    const perPage = 6;
    async function getLoginActivities() {
        try {
            const _params = {
                perPage,
                pageNumber,
            };

            const { data } = await get(urls.LoginActivities, { _params });
            setActivities(data.result);
            setCountActivities(data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    async function getSecurityActivities() {
        try {
            const _params = {
                perPage: 6,
                pageNumber,
            };

            const { data } = await get(urls.SecurityActivities, { _params });
            setActivities(data.result);
            setCountActivities(data.count);
        } catch (error) {
            Toastify.error(error.message);
        }
    }

    return (
        <div className="wrapper mb-3">
            <Row className="mb-3">
                <Col
                    xs="12"
                    md="2"
                    className="d-flex align-items-center ps-0 mb-3 mb-md-0"
                >
                    <TriangleTitle>
                        <h2 className="text-gray-4 size-3 fw-500 mb-0">سابقه فعالیت</h2>
                    </TriangleTitle>
                </Col>

                <Col xs="12" md="4" className="px-4 px-md-0">
                    <CustomizedButton
                        className={`${Styles.tabBtn} size-5 fw-500 ml-4`}
                        variant={toggleActivity ? "blue" : "light"}
                        onClick={() => setToggleActivity(true)}
                    >
                        سابقه ورود
                    </CustomizedButton>
                    <CustomizedButton
                        className={`${Styles.tabBtn} size-5 fw-500`}
                        variant={toggleActivity ? "light" : "blue"}
                        onClick={() => setToggleActivity(false)}
                    >
                        تغییرات امنیتی
                    </CustomizedButton>
                </Col>
            </Row>

            <NewTable
                headerItems={cols}
                loading={loading}
                isPaiginate
                pageLimit={perPage}
                pageNumber={pageNumber}
                totalRecords={countActivities}
                handleChangePage={setPageNumber}
            >
                {activities.map((item, index) => (
                    <TableRow
                        key={index}
                        className={`${Styles.tr} ${activeItem === index && Styles.active
                            } text-gray-4`}
                    >
                        <TableAccordion
                            xs="12"
                            md="4"
                            className={`${Styles.shownItems}`}
                            activeDropdown={() => {
                                activeItem === index ? setActiveItem() : setActiveItem(index);
                            }}
                        >
                            <TableCell xs="6" md="8" className="fw-400 justify-content-start">
                                <IoIosArrowBack
                                    size={16}
                                    className={`${Styles.dropdownIc} text-gray-2 d-md-none`}
                                />
                                <div className="d-flex flex-wrap flex-md-nowrap justify-content-start">
                                    <span className="px-2 w-100 text-center">
                                        {DateConvert.toShamsiDate(item.createdAt)}
                                    </span>
                                    <span className=" w-100 text-center">
                                        {DateConvert.getTime(item.createdAt)}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell
                                xs="3"
                                md="4"
                                className="d-flex justify-content-md-start"
                            >
                                {UAParser(item.agent).os.name +
                                    " " +
                                    UAParser(item.agent).os.version}
                            </TableCell>
                            <TableCell
                                xs="3"
                                md="0"
                                className="d-md-none justify-content-center"
                            >
                                {item.action === "loginActivity" ? (
                                    <span
                                        className={`text-${item.status ? "success" : "danger"}`}
                                    >
                                        {item.status ? <BsCheckAll size={18} /> : <BsX size={18} />}
                                    </span>
                                ) : null}
                            </TableCell>
                        </TableAccordion>
                        <TableAccordion
                            xs="12"
                            md="8"
                            className={`${Styles.dropdown} flex-wrap my-2`}
                        >
                            <TableCell
                                xs="6"
                                md="4"
                                className="justify-content-md-start pe-md-4"
                                data-label="مرورگر"
                            >
                                {UAParser(item.agent).browser.name || "-"}
                            </TableCell>
                            <TableCell
                                xs="6"
                                md="3"
                                className="justify-content-md-start pe-md-4"
                                data-label="IP"
                            >
                                {item.ip?.slice(7) || "-"}
                            </TableCell>
                            <TableCell
                                xs="8"
                                md="5"
                                className="justify-content-md-start pe-md-4"
                                data-label={
                                    item.action === "loginActivity" ? "وضعیت" : "نوع فعالیت"
                                }
                            >
                                {item.action === "loginActivity" ? (
                                    <Badge
                                        pill
                                        bg={item.status ? "success" : "danger"}
                                    >
                                        <span className='px-1'>
                                            {item.status ? <BsCheckAll size={18} /> : <BsX size={18} />}
                                        </span>
                                        {item.status ? "موفق" : "ناموفق"}
                                    </Badge>
                                ) : (
                                    <span className={`${Styles.action} w-100`}>
                                        {item.message}
                                    </span>
                                )}
                            </TableCell>
                        </TableAccordion>
                    </TableRow>
                ))}
            </NewTable>
        </div>
    );
};

export default ActivityHistory;
