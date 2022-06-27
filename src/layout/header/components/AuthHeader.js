import React  from 'react';
import Styles from "../Header.module.scss";
import { FaUserLock } from "react-icons/all";
import CustomizedButton from '../../../components/form/button/Button';
 

const AuthHeader = () => {
   
    return (
        <div className="ps-4 d-flex align-items-center">
            <div className={`${Styles.rspButton} d-flex ps-4 align-items-center`}>
                <CustomizedButton
                    rightIcon={<FaUserLock size={16} />}
                    outlined
                    className="size-5 py-1 minHeight-auto fw-700 line-height-normal ms-1"
                    size="xs"
                    variant="blue"
                    type="submit"
                >
                    تکمیل احراز هویت
                </CustomizedButton>
                <span className="text-gray-05 mx-2 size-5">وضعیت احراز هویت:</span>
                <span className={`${Styles.dangerbadge} py-1 px-2 ltr size-5 fw-500`}>
                    احراز نشده
                </span>
            </div>
            <div className={`${Styles.before} d-flex align-items-center px-4`}>
                <span className="text-gray-05 mx-2 size-5">موجودی تومانی:</span>
                <div className={`${Styles.badge} py-1 px-2 ltr size-4`}>
                    <span className="text-white en">0</span>
                </div>
            </div>
            <div className={`${Styles.before} d-flex align-items-center pe-4`}>
                <span className="text-gray-05 ms-2 size-5">کیف پول ارزی:</span>
                <div className={`${Styles.badge} center-content py-1 px-2 ltr size-4`}>
                    <span className="text-white en">0</span>
                </div>
            </div>
        </div>
    )
};

export default AuthHeader;
