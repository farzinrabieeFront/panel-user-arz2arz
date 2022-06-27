import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { BiSupport, RiAttachment2, BiSend, HiOutlineTrash } from "react-icons/all";
import Styles from './Chat.module.scss';
import femaleUserImg from "../../../../assets/images/female-user.svg";
import userImg from "../../../../assets/images/user.svg";
import { useSelector } from 'react-redux';
import tips from "../../../../assets/images/tips.jpg"
import TextAreaElement from "../../../../common/element/formik-inputs/text-area/Textarea";

const Chat = () => {
    const { customerIdentity } = useSelector((state) => state.user);
    const [uploadedImage, setUploadedImage] = useState([]);

    const handleRemoveImage = (id) => {
        let list = uploadedImage.filter((item, index) => index !== id)
        setUploadedImage(list)
    }
    return (
        <div className={`${Styles.container} bg-light rounded-12`}>
            <div className={Styles.chatWrapper}>
                <div className={`${Styles.rowsMsg} d-flex flex-wrap`}>
                    <Col xs={12} className={`${Styles.columnMsg} mb-8`}>
                        <div className={`${Styles.message} ${Styles.customer}`}>
                            <div className={Styles.avatar}>
                                {customerIdentity?.gender === "female" ?
                                    <img src={femaleUserImg} />
                                    :
                                    <img src={userImg} />
                                }
                            </div>
                            <div className={Styles.description}>
                                <p className='text-gray-4 size-5'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و </p>
                                <p className='mb-0 size-5 text-start'>
                                    <span className="d-inline-flex ltr ">
                                        <span className='FaNum'>1400/12/26</span>
                                        <span className="mx-1"></span>
                                        <span className='FaNum'>08:00</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} className={`${Styles.columnMsg} mb-8`}>
                        <div className={`${Styles.message} ${Styles.admin}`}>
                            <div className={Styles.avatar}>
                                <span className='center-content h-100 text-blue'><BiSupport size={22} /></span>
                            </div>
                            <div className={Styles.description}>
                                <p className='text-gray-4 size-5'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و </p>
                                <p className='mb-0 size-5 text-start'>
                                    <span className="d-inline-flex ltr ">
                                        <span className='FaNum'>1400/12/26</span>
                                        <span className="mx-1"></span>
                                        <span className='FaNum'>08:00</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} className={`${Styles.columnMsg} mb-8`}>
                        <div className={`${Styles.message} ${Styles.customer}`}>
                            <div className={Styles.avatar}>
                                {customerIdentity?.gender === "female" ?
                                    <img src={femaleUserImg} />
                                    :
                                    <img src={userImg} />
                                }
                            </div>
                            <div className={Styles.description}>
                                <p className='text-gray-4 size-5'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                                    <img src={tips} />
                                </p>

                                <p className='mb-0 size-5 text-start'>
                                    <span className="d-inline-flex ltr ">
                                        <span className='FaNum'>1400/12/26</span>
                                        <span className="mx-1"></span>
                                        <span className='FaNum'>08:00</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} className={`${Styles.columnMsg} mb-8`}>
                        <div className={`${Styles.message} ${Styles.admin}`}>
                            <div className={Styles.avatar}>
                                <span className='center-content h-100 text-blue'><BiSupport size={22} /></span>
                            </div>
                            <div className={Styles.description}>
                                <p className='text-gray-4 size-5'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
                                    <img src={tips} />
                                </p>
                                <p className='mb-0 size-5 text-start'>
                                    <span className="d-inline-flex ltr ">
                                        <span className='FaNum'>1400/12/26</span>
                                        <span className="mx-1"></span>
                                        <span className='FaNum'>08:00</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                </div>
            </div>
            <div className={Styles.sendMsgWrapper}>
                {uploadedImage.length ?
                    <div className={Styles.uploadedFiles}>
                        {uploadedImage.map((item, index) => {
                            return (
                                <div key={index} className={Styles.files}>
                                    <img src={URL.createObjectURL(item)} />
                                    <span className={Styles.delete} onClick={() => handleRemoveImage(index)}><HiOutlineTrash /></span>
                                </div>
                            );
                        })}
                    </div>
                    :
                    null
                }


                <div className={Styles.sendMsg}>
                    <div className={Styles.textarea}><TextAreaElement rows={1} maxRows={5} placeholder="پیام خود را بنویسید..." /></div>
                    <div className={Styles.btns}>
                        <span className={`${Styles.icon} ${Styles.attachFiles}`}>
                            {uploadedImage.length < 3 ? (
                                <input
                                    type="file"
                                    name="images"
                                    className={`${Styles.input} pointer `}
                                    onChange={(e) => {
                                        setUploadedImage((prev) => [
                                            ...prev,
                                            e.target.files[0],
                                        ]);
                                    }}
                                />
                            ) : null
                            }
                            <RiAttachment2 />
                        </span>
                        <span className={`${Styles.icon} ${Styles.rotate}`}><BiSend /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat