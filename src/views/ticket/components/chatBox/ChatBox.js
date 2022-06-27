import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import TextAreaElement from "../../../../common/element/formik-inputs/text-area/Textarea";
import CustomizedButton from "../../../../components/form/button/Button";
import Wrapper from "../../../../components/wrapper/Wrapper";
import { ticketServices } from "../../../../services";
import { DateConvert, Toastify } from "../../../../utils";
import Styles from "./ChatBox.module.scss";
import { RiAttachment2, BiSend, HiOutlineTrash } from "react-icons/all";

import femaleUserImg from "../../../../assets/images/female-user.svg";
import userImg from "../../../../assets/images/user.svg";
import supportAvatar from "../../../../assets/images/icon-ticket.svg";
import useMainApi from "../../../../common/hooks/useMainApi";

const ChatBox = ({ id, refreshList }) => {
    const messageInput = useRef();
    const { urls, get, post } = useMainApi()
    const [uploadedImage, setUploadedImage] = useState("");
    const [ticketData, setTicketData] = useState({});
    const [displayChat, setDisplayChat] = useState(false);
    const [messagesList, setMessagesList] = useState([]);

    const { customerIdentity } = useSelector((state) => state.user);

    useEffect(() => {
        if (id) {
            setTimeout(() => {
                setDisplayChat(true);
            }, 1000);
            singleTicket();
        } else {
            setTicketData({});
            setDisplayChat(false);
        }
    }, [id]);

    useEffect(() => {
        if (ticketData.image) ImageRequest();
    }, [ticketData]);

    const singleTicket = async () => {
        try {
            const _url = urls.Ticket.replace('_id', id)
            const res = await get(_url);
            setTicketData(res.data);
            setMessagesList(res.data.messages);
        } catch (error) {
            Toastify.error(error.message);
        } finally {
        }
    };

    const closeTicket = async () => {
        try {
            const _url = urls.CloseTicket.replace('_id', id)
            await get(_url);
            refreshList();
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const sendMessage = async () => {
        const _formData = new FormData();
        _formData.append(`message`, messageInput.current.value);
        _formData.append(`ticket`, id);
        uploadedImage && _formData.append(`image`, uploadedImage);

        try {
            const res = await post(urls.TicketReply, _formData);
            setUploadedImage("");
            messageInput.current.value = "";
            singleTicket(id);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    const ImageRequest = async () => {
        try {
            const _url = urls.TicketImage.replace('_id', ticketData.image.fieldID)
                .replace('_name', ticketData.image.imageUrl)
            const res = await get(_url);
            console.log(res);
        } catch (error) {
            Toastify.error(error.message);
        }
    };

    return (
        <Wrapper
            className={`${!id && Styles.chatWrapper} ${id && Styles.activeChat} mr-4`}
        >
            {ticketData._id && displayChat ? (
                <div className="d-flex flex-column size-5 fw-400 text-gray-2 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <span>تیکت شماره {ticketData.ticketID} _ </span>
                            <span className="d-inline-block">
                                {DateConvert.getTime(ticketData.createdAt)}
                                <span className="mx-1"></span>
                                {DateConvert.toShamsiDate(ticketData.createdAt)}
                            </span>
                        </div>
                        {ticketData.status !== "بسته شده" ? (
                            <CustomizedButton
                                className={`${Styles.btn} size-5 fw-700 main-btn py-0 px-2`}
                                size="xs"
                                outlined
                                variant="light"
                                onClick={() => {
                                    setTicketData({ ...ticketData, status: "بسته شده" });
                                    closeTicket(ticketData._id);
                                }}
                                type="submit"
                            >
                                بستن تیکت
                            </CustomizedButton>
                        ) : null}
                    </div>
                    <div>
                        موضوع:
                        <span className="mx-1"></span>
                        <span className="text-gray-4 fw-500">
                            {ticketData.category?.title}
                        </span>
                    </div>
                    <div
                        className="mt-1
            "
                    >
                        عنوان:<span className="mx-1"></span>
                        <span className="text-gray-4 fw-500">{ticketData.title}</span>
                    </div>
                    <Wrapper className={`${Styles.chatBox} h-100 mt-3 bg-light`}>
                        <div className="flex-grow-1">
                            <ul className="p-0">
                                {/* {ticketData.image?.fieldID && (
                  <img
                    src={
                      typeof value === "string"
                        ? `https://main.arz2arz.net/${descImg}`
                        : URL.createObjectURL(descImg)
                    }
                    alt=""
                  />
                )} */}
                                <li className="d-flex align-items-start mb-3">
                                    {customerIdentity?.gender === "female" ? (
                                        <img
                                            className={`${Styles.messageAvatar} bg-blue-light p-1`}
                                            src={femaleUserImg}
                                        />
                                    ) : (
                                        <img
                                            className={`${Styles.messageAvatar} bg-blue-light p-1`}
                                            src={userImg}
                                        />
                                    )}
                                    <div className="w-100 mr-3">
                                        <div
                                            className={`${Styles.message} w-100 p-3 size-4 bg-blue-light text-gray-5`}
                                        >
                                            {ticketData.description}
                                        </div>
                                        <div className="mt-1 ltr">
                                            {new Date(ticketData.createdAt).toLocaleTimeString(
                                                "en-US",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </div>
                                    </div>
                                </li>
                                {messagesList.map((item, index) => {
                                    return item.role === "user" ? (
                                        <li className="d-flex align-items-start mb-3">
                                            {customerIdentity?.gender === "female" ? (
                                                <img
                                                    className={`${Styles.messageAvatar} bg-blue-light p-1`}
                                                    src={femaleUserImg}
                                                />
                                            ) : (
                                                <img
                                                    className={`${Styles.messageAvatar} bg-blue-light p-1`}
                                                    src={userImg}
                                                />
                                            )}
                                            <div className="w-100 mr-3">
                                                <div
                                                    className={`${Styles.message} w-100 p-3 size-4 bg-blue-light text-gray-5`}
                                                >
                                                    {item.message}
                                                </div>
                                                <div className="mt-1 ltr">
                                                    {new Date(item.createdAt).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ) : (
                                        <li className="d-flex align-items-start mb-3">
                                            <div className="w-100 ml-3">
                                                <div
                                                    className={`${Styles.message} w-100 p-3 size-4 bg-white text-gray-5`}
                                                >
                                                    {item.message}
                                                </div>
                                                <div className="mt-1 ltr">
                                                    {new Date(item.createdAt).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                            <img
                                                className={`${Styles.messageAvatar} bg-white p-1`}
                                                src={supportAvatar}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        {/* Chat input */}
                        {ticketData.status !== "بسته شده" ? (
                            <div className={`${Styles.sendMsgWrapper}`}>
                                {uploadedImage ? (
                                    <div className={Styles.uploadedFiles}>
                                        <div className={Styles.files}>
                                            {/* <img src={URL.createObjectURL(uploadedImage)} /> */}
                                            <span
                                                className={Styles.delete}
                                                onClick={() => setUploadedImage("")}
                                            >
                                                <HiOutlineTrash />
                                            </span>
                                        </div>
                                    </div>
                                ) : null}

                                <div className={Styles.sendMsg}>
                                    <div className={Styles.textarea}>
                                        <TextAreaElement
                                            rows={1}
                                            maxRows={5}
                                            placeholder="پیام خود را بنویسید..."
                                            ref={messageInput}
                                        />
                                    </div>
                                    <div className={Styles.btns}>
                                        <span className={`${Styles.icon} ${Styles.attachFiles}`}>
                                            {uploadedImage.length < 3 ? (
                                                <input
                                                    type="file"
                                                    name="images"
                                                    className={`${Styles.input} pointer `}
                                                    onChange={(e) => {
                                                        setUploadedImage(() => e.target.files[0]);
                                                    }}
                                                />
                                            ) : null}
                                            <RiAttachment2 />
                                        </span>
                                        <span
                                            className={`${Styles.icon} ${Styles.rotate}`}
                                            onClick={() =>
                                                messageInput.current.value && sendMessage()
                                            }
                                        >
                                            <BiSend />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </Wrapper>
                </div>
            ) : null}
        </Wrapper>
    );
};

export default ChatBox;
