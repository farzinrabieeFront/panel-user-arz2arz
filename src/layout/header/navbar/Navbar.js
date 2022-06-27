import React from "react";
import Styles from "./Navbar.module.scss";
import { RiShieldUserLine, RiHistoryFill, RiCoupon3Line, RiAppsFill, RiFundsLine } from "react-icons/all";
import ListItem from "./items/Item";
const NavbarMenu = ({ isSideClose }) => {
  return (
    <ul className={`mb-0 ${Styles.navbarList} py-3 px-3 text-regular is-size-5 fw-300`}>
      <ListItem
        title="داشبورد"
        url="/"
        active
        isSideClose={isSideClose}
        icon={() => <RiAppsFill size={26} className="pointer " />}
      />
      <ListItem
        className={Styles.none}
        title="معاملات"
        isSideClose={isSideClose}
        icon={() => <RiFundsLine size={26} className="pointer " />}
        subItem={[
          { title: 'اتوماتیک', url: '/trade/automatic' },
          { title: 'خرید و فروش', url: '/trade/buy&sell' },
          { title: 'تبدیل ارز', url: '/trade/exchange' },
        ]}
      />

      <ListItem
        title="تاریخچه"
        isSideClose={isSideClose}
        icon={() => <RiHistoryFill size={26} className="pointer " />}
        subItem={[
          { title: 'معاملات', url: '/orders-history' },
          { title: 'واریز و برداشت', url: '/transactions-history' },
        ]}
      />
      <ListItem
        title="امنیت پنل"
        isSideClose={isSideClose}
        url="/my/security"
        icon={() => <RiShieldUserLine size={26} className="pointer " />}
      />
      <ListItem
        title="تیکت پشتیبانی"
        isSideClose={isSideClose}
        url="/ticket"
        icon={() => <RiCoupon3Line size={26} className="pointer " />}
      />
    </ul>
  );
};

export default NavbarMenu;
