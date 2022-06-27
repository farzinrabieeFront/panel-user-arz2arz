import React from 'react';
import Styles from "../Header.module.scss";
import { IoMdAdd } from "react-icons/all";
import CustomizedButton from '../../../components/form/button/Button';

const FiatHeader = () => {
    return (
        <div className="ps-4 d-flex align-items-center">
            <div className="d-flex ps-4 align-items-center">
                <CustomizedButton
                    rightIcon={<IoMdAdd size={16} />}
                    outlined
                    className="size-5 py-1 minHeight-auto ms-1 line-height-normal"
                    size="xs"
                    variant="blue"
                    type="submit"
                >
                    افزایش موجودی
                </CustomizedButton>
                <span className="text-gray-05 mx-2 size-5">موجودی تومانی:</span>
                <div className={`${Styles.badge} py-1 px-2 ltr size-4`}>
                    <span className="text-white en">0</span>
                </div>
            </div>
            <div className={`${Styles.before} d-flex align-items-center pe-4`}>
                <span className="text-gray-05 ms-2 size-5">کیف پول ارزی:</span>
                <div className={`${Styles.badge} center-content py-1 px-2 ltr size-4`}>
                    <span className="text-white en">50,200,000</span>
                    <span className="text-gray-1 ms-1">تومان</span>
                </div>
                <span className="text-gray-1 size-1 mx-2">≈</span>
                <div className={`${Styles.badge} py-1 px-2 ltr size-4`}>
                    <span className="text-white en">50,200,000</span>
                    <span className="text-gray-1 ms-1 en">USDT</span>
                </div>
            </div>
        </div>
    )
};

export default FiatHeader;
