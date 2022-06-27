const defaultTitle = "صرافی آنلاین ارز تو ارز";
const titleMap = [
  { path: "/login", title: defaultTitle + " | ورود" },
  { path: "/register", title: defaultTitle + " | ثبت نام" },
  { path: "/forgetPassword", title: defaultTitle + " | فراموشی رمزعبور" },
  { path: "/authentication", title: defaultTitle + " | احراز هویت" },
  { path: "/wallet", title: defaultTitle + " | کیف پول" },
  { path: "/deposit", title: defaultTitle + " | واریز" },
  { path: "/withdraw", title: defaultTitle + " | برداشت" },
  { path: "/my/bank-accounts", title: defaultTitle + " | حساب های بانکی" },
  { path: "/my/wallet/history", title: defaultTitle + " | تاریخچه تراکنش‌ها" },
  { path: "/trade", title: defaultTitle + " | معاملات" },
  { path: "/fiat-trade", title: defaultTitle + " | خرید و فروش ارز" },
  { path: "/spot-orders", title: defaultTitle + " | تاریخچه سفارش‌ها" },
  {
    path: "/fiat-orders",
    title: defaultTitle + " | تاریخچه خرید و فروش ارز",
  },
  { path: "/my/security", title: defaultTitle + " | امنیت" },
  { path: "/notifications", title: defaultTitle + " | اعلانات" },
  { path: "/ticket", title: defaultTitle + " | تیکت" },
];

export function tabTitlesHandler(pathname = "") {
  const { title = "" } = titleMap.find(({ path }) => pathname.includes(path));
  console.log(title);
  if (pathname && title) {
    document.title = title;
  }
}
