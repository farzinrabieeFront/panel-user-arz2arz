/** internal imports */
import { useState } from "react";
import Styles from "./Account.module.scss";
import { Toastify, CardConvert, ShebaConvert } from "../../../../../utils";
import { useMainApi } from "../../../../../common/hooks";
/** extrenal imports */
import {
    BsCheckAll,
    BsX,
    BsCheck,
    BsExclamationCircle,
    BsThreeDotsVertical,
    FiChevronLeft,
    TiWarning,
    FiEdit2,
} from "react-icons/all";
/** component imports */
import CustomizedModal from "../../../../../components/modal/Modal";
import DropDown from "../../../../../components/dropdown/dropdown/DropDown";
import CustomizedButton from "../../../../../components/form/button/Button";
import { Badge } from "react-bootstrap";

const statusList = {
    approved: {
        variant: "success",
        title: "تایید شده",
        icon: <BsCheckAll size={18} />,
    },
    pending: {
        variant: "warning",
        title: "در انتظار تایید",
        icon: <BsCheck size={18} />,
    },
    rejected: {
        variant: "danger",
        title: "رد شده",
        icon: <BsExclamationCircle size={16} />,
    },
    InActive: { variant: "gray", title: "غیر فعال", icon: <BsX size={18} /> },
};

export default function Account({ data: dataCard = {}, refreshList, onEdit }) {
    const [showRejectDetail, setShowRejectDetail] = useState(false);
    const { urls, get, del } = useMainApi()

    async function deleteCardReq() {
        try {
            const _url = urls.BankAccount.replace('_id', dataCard._id)
            const res = await del(_url);
            if (res.message) Toastify.success(res.message);
            refreshList();
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    async function changeStatus() {
        try {
            const _url = urls.ChangeStatusBankAccount.replace('_id', dataCard._id)
            const res = await get(_url);
            if (res.message) Toastify.success(res.message);
            refreshList();
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return [
        <div className={Styles.card}>
            <div className="z-index-99 position-relative w-100 h-100">
                <div className="w-100 d-flex justify-content-between">
                    <div className="p-3 d-flex align-items-stretch">
                        {dataCard.bank?.logo ? (
                            <img
                                src={`https://main.arz2arz.net/api/v1/bankLogo/images/${dataCard.bank?.logo}`}
                                width={64}
                                height={64}
                            />
                        ) : null}
                        <div className="me-3 d-flex flex-column justify-content-between">
                            <span className="text-gray-4 fw-700 size-3">
                                {dataCard.bank?.name}
                            </span>
                            <span>
                                <Badge
                                    className={`no-min-width size-5 px-2 py-1`}
                                    bg={statusList[dataCard.isActive ? dataCard.verified : 'InActive'].variant || "light"} >
                                    <span className='px-1'>
                                        {statusList[dataCard.isActive ? dataCard.verified : 'InActive'].icon}
                                    </span>
                                    {statusList[dataCard.isActive ? dataCard.verified : 'InActive'].title}
                                </Badge>
                            </span>
                        </div>
                    </div>

                    <div>
                        {dataCard.verified !== "pending" ? (
                            <DropDown
                                className="text-start"
                                title={
                                    <span className="d-flex text-gray-3 pointer p-3">
                                        <BsThreeDotsVertical size={22} />
                                    </span>
                                }
                            >
                                {dataCard.verified === "rejected" ? (
                                    <>
                                        <p onClick={onEdit}>ویرایش</p>
                                        <p onClick={deleteCardReq}>حذف</p>
                                    </>
                                ) : dataCard.verified === "approved" ? (
                                    <p onClick={changeStatus}>
                                        {dataCard.isActive ? " غیرفعال کن" : "فعال کن"}
                                    </p>
                                ) : null}
                            </DropDown>
                        ) : null}

                        {dataCard.verified === "rejected" ? (
                            <span
                                onClick={() => setShowRejectDetail(true)}
                                className="pointer center-content text-danger size-5 fw-500 px-3"
                            >
                                چرا رد شد؟ <FiChevronLeft className="me-1" size={18} />
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="ltr px-3">
                    <span
                        className={`${Styles.spacing} text-gray-4 fw-500 size-4 ltr en`}
                    >
                        {CardConvert(dataCard.card)}
                    </span>
                </div>
                <div className="mt-2 ltr px-3 pb-3">
                    <span className="text-gray-2 size-4 fw-500 px-2 en border-right-gray me-2">
                        IR
                    </span>
                    <span
                        className={`${Styles.spacing} text-gray-4 fw-500 size-4 ltr en`}
                    >
                        {ShebaConvert(dataCard.sheba)}
                    </span>
                </div>
            </div>
        </div>,
        showRejectDetail ? (
            <CustomizedModal
                show={showRejectDetail}
                onHide={() => setShowRejectDetail(false)}
                keyboard={true}
                backdrop="static"
                contentClassName={Styles.modal}
                centered
                bodyClassName="p-4"
                title="چرا کارت بانکی من رد شد؟"
            >
                <div className=" ">
                    <span className="text-danger ms-2">
                        <TiWarning size={30} />
                    </span>
                    <span className="text-gray-4 size-3 fw-500">
                        {dataCard.adminMessage}
                    </span>
                </div>
                <div className="mt-4 text-start">
                    <CustomizedButton
                        outlined
                        rightIcon={<FiEdit2 />}
                        type="submit"
                        className="size-4 main-btn "
                        size="xs"
                        onClick={() => {
                            setShowRejectDetail(false);
                            onEdit();
                        }}
                        variant="blue"
                    >
                        ویرایش کارت
                    </CustomizedButton>
                </div>
            </CustomizedModal>
        ) : null,
    ];
}
