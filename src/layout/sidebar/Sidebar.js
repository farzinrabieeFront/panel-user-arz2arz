/**internal imports */
import Styles from "./Sidebar.module.scss";
import femaleUserImg from "../../assets/images/female-user.svg";
import userImg from "../../assets/images/user.svg";

/**external imports */
import {
  BiWallet,
  RiFundsLine,
  RiHistoryLine,
  BiCreditCard,
  RiExchangeDollarFill,
  IoClose,
  FiUserCheck,
  BiSupport,
  RiShieldUserLine,
  BiBell,
  RiUser2Line,
} from "react-icons/all";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**component imports */
import CustomizedButton from "../../components/form/button/Button";
import NavItem from "./nav-item/NavItem";

export default function Sidebar({ closeMobile }) {
  const navigate = useNavigate();

  const { customer, customerIdentity, perecent } = useSelector(
    (state) => state.user
  );

  return (
    <div className={`${Styles.wrapper} bg-white rounded-12 py-3 card-shadow`}>
      <div className="d-flex flex-wrap align-items-center px-3 position-relative">
        <div className={Styles.icon}>
          {customerIdentity?.gender === "female" ? (
            <img src={femaleUserImg} />
          ) : (
            <img src={userImg} />
          )}
        </div>
        <div className="d-flex flex-column me-2">
          <span className={`${Styles.nameInfo} size-4 fw-500 text-gray-3`}>
            {customerIdentity &&
            customerIdentity.firstName &&
            customerIdentity.lastName
              ? customerIdentity.firstName + " " + customerIdentity.lastName
              : "کاربر مهمان"}
          </span>
          <span className={`${Styles.nameInfo} size-5 mt-1 text-gray-2`}>
            {customer.email ? (
              <>
                {customer?.email?.slice(0, 5)}***
                {customer?.email?.slice(-10)}
              </>
            ) : (
              "ip : 213.201.196.158"
            )}
          </span>
        </div>

        <span onClick={closeMobile} className={Styles.closeMobileBtn}>
          <IoClose className="text-gray-3" size={20} />
        </span>
      </div>
      {customer.isVerified ? null : customerIdentity?.verifyRequest ? (
        <div className="px-3 mt-3">
          <div className={`${Styles.authProgress}`}>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-gray-2 size-5">وضعیت احراز هویت:</span>
              <span className="bg-warning text-orange px-2 py-1 rounded-6 size-5">
                در انتظار تایید
              </span>
            </div>
          </div>
        </div>
      ) : customerIdentity?.verified === "rejected" ? (
        <div className="px-3 mt-3">
          <div className={`${Styles.authProgress}`}>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-gray-2 size-5">وضعیت احراز هویت:</span>
              <span className="bg-danger text-white px-2 py-1 rounded-6 size-5">
                رد شده
              </span>
            </div>
          </div>
          <CustomizedButton
            // rightIcon={<FiUserCheck size={16} />}
            outlined
            isFullWidth
            className={`${Styles.authBtn} size-4 fw-500`}
            size="xs"
            variant="danger"
            onClick={() => navigate("/authentication")}
            type="submit"
          >
            <FiUserCheck size={17} className="ms-2" />
            اصلاح احراز هویت
          </CustomizedButton>
        </div>
      ) : (
        <div className="px-3 mt-3">
          <div className={`${Styles.authProgress}`}>
            <div className="d-flex justify-content-between">
              <span className="text-gray-2 size-5">وضعیت احراز هویت:</span>
              <span className="en fw-500 size-5 text-blue">{perecent}%</span>
            </div>
            <div className={Styles.progress}>
              <div style={{ width: `${perecent}%` }}></div>
            </div>
          </div>
          <CustomizedButton
            // rightIcon={<FiUserCheck size={16} />}
            outlined
            isFullWidth
            className={`${Styles.authBtn} size-4 fw-500`}
            size="xs"
            variant="blue"
            onClick={() => navigate("/authentication")}
            type="submit"
          >
            <FiUserCheck size={17} className="ms-2" />
            تکمیل احراز هویت
          </CustomizedButton>
        </div>
      )}

      <div className="px-3 w-100">
        <hr className={`${Styles.border} mb-2`} />
      </div>

      <ul className="m-0 py-0 px-2">
        <NavItem
          title="کیف پول"
          subItem={[
            {
              title: "نمای کلی",
              url: "/my/wallet/overview",
              active: "/my/wallet/overview",
              Icon: <BiWallet size={20} />,
            },
            {
              title: "واریز",
              url: "/my/wallet/deposit/fiat",
              active: "/deposit",
              Icon: <span className="icon-deposit size-3"></span>,
            },
            {
              title: "برداشت",
              url: "/my/wallet/withdraw/fiat",
              active: "/withdraw",
              Icon: <span className="icon-withdraw size-3"></span>,
            },
            {
              title: "حساب های بانکی",
              url: "/my/bank-accounts",
              active: "/my/bank-accounts",
              Icon: <BiCreditCard size={20} />,
            },
            {
              title: "تاریخچه تراکنش ها",
              url: "/my/wallet/history/deposit-fiat",
              active: "/my/wallet/history",
              Icon: <RiHistoryLine size={20} />,
            },
          ]}
        />
        <div className="px-3 w-100">
          <hr className={`${Styles.border} my-2`} />
        </div>
        <NavItem
          title="صرافی"
          subItem={[
            {
              title: "معاملات",
              url: "/trade/BTC-USDT",
              active: "/trade/BTC-USDT",
              Icon: <RiFundsLine size={20} />,
            },
            {
              title: "خرید و فروش ارز",
              url: "/fiat/USDT",
              active: "/fiat/USDT",
              Icon: <RiExchangeDollarFill size={20} />,
            },
            {
              title: "تاریخچه سفارش‌ها",
              url: "/my/orders/spot",
              active: "/my/orders/spot",
              state: "openOrders",
              Icon: <RiHistoryLine size={20} />,
            },
            {
              title: "تاریخچه خرید و فروش ارز",
              url: "/my/orders/fiatorders",
              active: "/my/orders/fiatorders",
              Icon: <RiHistoryLine size={20} />,
            },
          ]}
        />
        <div className="px-3 w-100">
          <hr className={`${Styles.border} my-2`} />
        </div>
        {/* <NavItem
          title="پشتیبانی"
          subItem={[
            {
              title: "ارسال تیکت",
              url: "/ticket",
              Icon: <BiSupport size={20} />,
            },
            {
              title: "تاریخچه تیکت ها",
              url: "/support",
              Icon: <RiHistoryLine size={20} />,
            },
          ]}
        /> */}
        <NavItem
          title="حساب کاربری"
          subItem={[
            {
              title: "مشخصات",
              url: "/my/profile",
              active: "/my/profile",
              Icon: <RiUser2Line size={20} />,
            },
            {
              title: "امنیت",
              url: "/my/security",
              active: "/my/security",
              Icon: <RiShieldUserLine size={20} />,
            },
            {
              title: "تیکت پشتیبانی",
              url: "/ticket",
              active: "/ticket",
              Icon: <BiSupport size={20} />,
            },
            {
              title: "اعلانات",
              url: "/notifications",
              active: "/notifications",
              Icon: <BiBell size={20} />,
            },

            // {
            //   title: "سوابق ورود  ",
            //   url: "/security/login-activity",
            //   Icon: <RiHistoryLine size={20} />,
            // },
            // {
            //   title: "تنظیمات",
            //   url: "/setting",
            //   Icon: <RiUserSettingsLine size={20} />,
            // },
            // {
            //   title: "پشتیبانی",
            //   url: "/support",
            //   Icon: <BiSupport size={20} />,
            // },
            // {
            //   title: "خروج از حساب",
            //   url: "/logout",
            //   Icon: <RiLogoutCircleRLine size={20} />,
            // },
          ]}
        />
        
      </ul>
    </div>
  );
}
