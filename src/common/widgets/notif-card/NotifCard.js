import React from "react";
import Styles from "./NotifCard.module.scss";
import {
  MdFormatQuote,
  HiOutlineSpeakerphone,
  FaWhatsapp,
} from "react-icons/all";
import CustomizedButton from "../../../components/form/button/Button";
import icon from "../../../assets/images/a2z-special-icon-4.png"
export default function NotifCard({ children, className }) {
  return (
    <div
      className={`${Styles.notifCard} h-100 p-4 bg-white rounded-10 shadow-card`}
    >
      <h2 className="is-size-4 mb-3 fw-900 text-blue">توجه </h2>
      <p className="size-4  mb-4 text-blue">برای امنیت دارایی شما، لطفاً به اطلاعات زیر توجه کنید!</p>
      <ul className={`${Styles.notiList} pe-4 ps-0 mb-0 fw-700 `}>
        {children}
        <div className="d-flex justify-content-between align-items-center">
          <span className="size-5 fw-300 mb-0" data-label="3 .">
            شما تنها مجاز به تراکنش با کارت‌های تایید شده در بخش حساب های بانکی هستید
          </span>
        
          <img src={icon} />
        </div>
      </ul>
    </div>
  );
}
