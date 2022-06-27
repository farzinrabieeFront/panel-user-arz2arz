import React, { useEffect, useState } from "react";
import Styles from "../Header.module.scss";
import { IoMdAdd } from "react-icons/all";
import { useOrder } from "../../../context/OrderServises";
import { useSelector } from "react-redux";
import CustomizedButton from "../../../components/form/button/Button";
import { FiUserCheck } from "react-icons/all";
import { useNavigate } from "react-router-dom";

const DataHeader = () => {
  const { balance } = useOrder();
  const [fiatBalance, setFiatBalance] = useState();
  const [spotBalance, setSpotBalance] = useState();
  const navigate = useNavigate();
  const { isVerified } = useSelector((state) => state.user.customer);
  const { customerIdentity } = useSelector((state) => state.user);

  useEffect(() => {
    if ("fiatWallets" in balance) setFiatBalance(balance.fiatWallets);
    if ("spotWallets" in balance) setSpotBalance(balance.spotWallets);
  }, [balance]);

  return (
    <div className="ps-4  align-items-center d-none d-xl-flex">
      {isVerified ? null : customerIdentity?.verifyRequest ? null : (
        <div className={`${Styles.rspButton} d-flex ps-4 align-items-center`}>
          <CustomizedButton
            rightIcon={<FiUserCheck size={16} />}
            outlined
            className="size-5 py-1 minHeight-auto fw-700 line-height-normal ms-1"
            size="xs"
            variant="blue"
            onClick={() => navigate("/authentication")}
            type="submit"
          >
            تکمیل احراز هویت
          </CustomizedButton>
          <span className="text-gray-05 mx-2 size-5">وضعیت احراز هویت:</span>
          <span className={`${Styles.dangerbadge} py-1 px-2 ltr size-5 fw-500`}>
            احراز نشده
          </span>
        </div>
      )}
      <div className="d-flex ps-4 align-items-center">
        {fiatBalance?.IRT?.balance ? (
          <span
            className={`${Styles.plus} ms-1 btn-outline-blue pointer en size-1`}
            onClick={() => navigate("/my/wallet/deposit/fiat")}
          >
            <IoMdAdd />
          </span>
        ) : (
          <CustomizedButton
            rightIcon={<IoMdAdd size={16} />}
            outlined
            className="size-5 py-1 minHeight-auto ms-1 line-height-normal"
            size="xs"
            variant="blue"
            type="submit"
            onClick={() => navigate("/my/wallet/deposit/fiat")}
          >
            افزایش موجودی
          </CustomizedButton>
        )}
        <span className="text-gray-05 mx-2 size-5">موجودی تومانی:</span>
        <div className={`${Styles.badge} py-1 px-2 ltr size-4`}>
          <span className="text-white en">
            {Number(
              Number(fiatBalance?.IRT?.balance || 0).toFixed(0)
            ).toLocaleString()}
          </span>
          <span className="text-gray-1 ms-1">تومان</span>
        </div>
      </div>
      <div className={`${Styles.before} d-flex align-items-center pe-4`}>
        <span className="text-gray-05 ms-2 size-5">موجودی ارزی به تتر:</span>

        {/* <span className="text-gray-1 size-1 mx-2">≈</span> */}
        <div className={`${Styles.badge} py-1 px-2 ltr size-4`}>
          <span className="text-white en">
            {Number(spotBalance?.totalUSDT || 0).toLocaleString()}
            {/* {Number(Number(fiatBalance?.IRT?.balance || 0).toFixed(0)).toLocaleString()} */}
          </span>
          <span className="text-gray-1 ms-1 en">USDT</span>
        </div>
      </div>
    </div>
  );
};

export default DataHeader;
