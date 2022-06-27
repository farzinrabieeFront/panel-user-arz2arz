import React, { useEffect, useState } from 'react';
import { IoAlertCircle, IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoCloseOutline } from 'react-icons/all';

import Styles from './Toast.module.scss';

import { ToastContainer, toast } from "react-toastify";
import useSound from 'use-sound';
import NotifSound from "../../../assets/audios/point-blank-589.mp3";

const status_list = {
    info: <IoInformationCircle size={20} className="ms-2 text-blue" />,
    warning: <IoAlertCircle size={20} className="ms-2 text-orange" />,
    success: <IoCheckmarkCircle size={20} className="ms-2 text-success" />,
    error: <IoCloseCircle size={20} className="ms-2 text-danger" />,
}

const CustomizedToast = (props) => {

    const [audio] = useState(new Audio(NotifSound));

    useEffect(() => {
        const sound = window.localStorage.getItem("notificationSound")
        if (sound === "on") {
            audio.play()
        }
      
    }, [props])

    // const playSound = () => {
    //     play()
    // }
    return (
        <div className={Styles.toast}>
            <div className='d-flex justify-content-between'>
                <div>
                    <span>
                        {status_list[props.toastProps.bodyStyle.status]}
                    </span>
                    <span className='size-4 text-gray-4'>{props.toastProps.bodyStyle.title}</span>
                </div>
            </div>
            <div className='px-1 mt-2'>
                <p className='size-5 text-gray-3 mb-0'>
                    {props.toastProps.bodyStyle.description}
                </p>
            </div>
            {/* <div className='text-end mt-2'>
                <span className='size-5 text-gray-2'>20 دقیقه پیش</span>
            </div> */}
        </div>
    )


}

export default CustomizedToast