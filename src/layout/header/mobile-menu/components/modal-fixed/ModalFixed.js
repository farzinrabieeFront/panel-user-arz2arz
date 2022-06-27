import React, { useState } from 'react';
import Styles from './ModalFixed.module.scss';
import { RiExchangeFundsLine, RiCloseFill } from 'react-icons/all';
import { Alert } from 'react-bootstrap';

const ModalFixed = ({ setOpenModal, openModal }) => {

    return (
        <div className={`${Styles.ModalFixed} ${openModal ? Styles.show : ""}`}>
            <div className={`${Styles.header} text-center text-white p-3 bg-blue`}>
                <span className="h6">شروع معاملات</span>
                <span className={Styles.close} onClick={() => setOpenModal(false)}><RiCloseFill size={30} /></span>
            </div>
            <div className="py-4 px-3">
                <div className={Styles.links}>
                    <ul className="mb-0 text-right">
                        <li className="px-3 py-3 d-flex align-items-center justify-content-between">خرید و فروش ارز</li>
                        <li className="px-3 py-3 d-flex align-items-center justify-content-between">معاملات اتوماتیک </li>
                        <li className="px-3 py-3 d-flex align-items-center justify-content-between">معاملات تبدیل ارز</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ModalFixed
