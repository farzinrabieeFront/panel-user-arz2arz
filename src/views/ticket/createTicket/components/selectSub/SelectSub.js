import { useEffect, useState } from "react";
import CustomizedTips from "../../../../../components/tips/Tips";
import { RiErrorWarningLine, IoIosArrowBack } from "react-icons/all";
import Styles from "../../CreateTicket.module.scss";
import { ticketServices } from "../../../../../services";
import { Toastify } from "../../../../../utils";
import options from "./Icons";
import useMainApi from "../../../../../common/hooks/useMainApi";
// import CustomizedButton from "../../../../../components/form/button/Button";

const SelectSub = ({ subject, setSubject }) => {
    const [categoryList, setCategoryList] = useState({});
    const [hover, setHover] = useState("");
    const { urls, get } = useMainApi()
    
    useEffect(getCategoryList, []);

    const getCategoryList = async () => {
        try {
            const _params = {
                pageNumber: 1,
                perPage: 20,
            };
            const res = await get(urls.TicketCateogries, { _params });
            setCategoryList(res.data.result);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const renderSubjects = () => {
        const subs = [];

        for (const key in categoryList) {
            subs.push(
                <li
                    key={key}
                    className={`${Styles.options} ${subject.title === categoryList[key].title ? Styles.selected : ""
                        } d-flex align-items-center w-100 my-3 p-3 pointer`}
                    onClick={() => {
                        !(subject._id === categoryList[key]._id) &&
                            setSubject({
                                _id: categoryList[key]._id,
                                title: categoryList[key].title,
                            });
                    }}
                    onMouseEnter={() => {
                        setHover(categoryList[key].title);
                    }}
                    onMouseLeave={() => {
                        setHover("");
                    }}
                >
                    {(subject.title === categoryList[key].title &&
                        options[categoryList[key].title]?.activeIcon) ||
                        (hover === categoryList[key].title &&
                            options[categoryList[key].title]?.hoverIcon) ||
                        options[categoryList[key].title]?.icon}
                    <div className="d-flex flex-column mr-4">
                        <h2 className="size-4 text-gray-4">{categoryList[key].title}</h2>
                        <p className="size-5 mb-0 text-gray-3">{categoryList[key].description}</p>
                    </div>
                </li>
            );
        }

        return subs;
    };

    return (
        <>
            <h2 className="text-blue size-3 fw-500 mb-0">انتخاب موضوع</h2>
            <CustomizedTips
                variant={"info"}
                className="text-gray-4 size-5 fw-400 mt-3"
            >
                <RiErrorWarningLine size={16} className="text-blue" />
                قبل از ارسال تیکت بخش سوالات متداول رو بررسی کن شاید پاسخ سوالت رو پیدا
                کردی.
            </CustomizedTips>

            <ul className="mt-2 p-0">{renderSubjects()}</ul>
        </>
    );
};

export default SelectSub;
