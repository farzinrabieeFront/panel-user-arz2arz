import { ReactComponent as Auth } from "../../../../../assets/svgs/ticketSubs/icon-authentication.svg";
import { ReactComponent as Transaction } from "../../../../../assets/svgs/ticketSubs/icon-transfer.svg";
import { ReactComponent as Fiat } from "../../../../../assets/svgs/ticketSubs/icon-fiat.svg";
import { ReactComponent as Trade } from "../../../../../assets/svgs/ticketSubs/icon-trade.svg";
import { ReactComponent as Person } from "../../../../../assets/svgs/ticketSubs/icon-person.svg";
import { ReactComponent as Question } from "../../../../../assets/svgs/ticketSubs/icon-question.svg";

const options = {
  "احراز هویت": {
    icon: <Auth stroke="#959DB0" />,
    hoverIcon: <Auth stroke="#00BABA" />,
    activeIcon: <Auth stroke="#FFFFFF" />,
  },
  "تراکنش ها": {
    icon: <Transaction fill="#959DB0" />,
    hoverIcon: <Transaction fill="#00BABA" />,
    activeIcon: <Transaction fill="#FFFFFF" />,
  },
  "خرید و فروش ارز": {
    icon: <Fiat fill="#959DB0" />,
    hoverIcon: <Fiat fill="#00BABA" />,
    activeIcon: <Fiat fill="#FFFFFF" />,
  },
  "سفارش گذاری و معاملات": {
    icon: <Trade fill="#959DB0" />,
    hoverIcon: <Trade fill="#00BABA" />,
    activeIcon: <Trade fill="#FFFFFF" />,
  },
  "حساب کاربری": {
    icon: <Person stroke="#959DB0" />,
    hoverIcon: <Person stroke="#00BABA" />,
    activeIcon: <Person stroke="#FFFFFF" />,
  },
  "موارد دیگر": {
    icon: <Question fill="#959DB0" />,
    hoverIcon: <Question fill="#00BABA" />,
    activeIcon: <Question fill="#FFFFFF" />,
  },
};

export default options;
