import React from "react";
import Styles from "./WalletCard.module.scss";
import PieChartComp from "../pie-chart/PieChart";
import { BiWallet } from "react-icons/all";

const WalletCard = ({fiatBalances,spotBalances}) => {
  return (
    <div className="w-100 d-flex flex-wrap flex-row-reverse justify-content-center align-items-stretch pt-2">
      
      
      
      <div className={`${Styles.chartBox} col-12 col-md-6 p-0 d-flex flex-wrap align-items-center `}>
        <div className={Styles.chart}>
          <PieChartComp
            data={[44, 55, 13, 33, 50]}
            colors={["#4D5FB8", "#F6BDD0", "#868DAC", "#50B7F0", "#E5EBFF"]}
            labels={["بیت کوین", "لایت کوین", "تتر", "ریپل", "دیگر رمز ارز ها"]}
          />
        </div>
        <ul className={`${Styles.list} d-flex flex-wrap pe-3 mb-0`}>
          <li className={`${Styles.currencyListItems} col-12 col-sm-6 p-2 d-flex align-items-center justify-content-between`}>
            <span data-color="blue" data-type="currency" className={`${Styles.currencyName} d-flex align-items-center `}>
              <span className="size-4  text-gray-2">
                BTC
                <span className="size-5 d-block text-gray-1">بیت کوین</span>
              </span>
            </span>
            <span className="size-4  text-gray-1 ">۰.۲۷۶
              <span className="size-4  d-block text-blue ltr">+25%</span>
            </span>
          </li>
          <li className={`${Styles.currencyListItems} col-12 col-sm-6 p-2 d-flex align-items-center justify-content-between`}>
            <span
              data-color="pink"
              data-type="currency"
              className={`${Styles.currencyName} d-flex align-items-center`}
            >
              <span className="size-4  text-gray-2">
                LTC
                <span className="size-5 d-block text-gray-1">لایت کوین</span>
              </span>
            </span>
            <span className="size-4  text-gray-1 ">۰.۲۷۶
              <span className="size-4  d-block text-blue ltr">+25%</span>
            </span>
          </li>

          <li className={`${Styles.currencyListItems} col-12 col-sm-6 p-2 d-flex align-items-center justify-content-between`}>
            <span
              data-color="cyan"
              data-type="currency"
              className={`${Styles.currencyName} d-flex align-items-center`}
            >
              <span className="size-4  text-gray-2">
                XRP
                <span className="size-5 d-block text-gray-1">ریپل</span>
              </span>
            </span>
            <span className="size-4  text-gray-1 ">۰.۲۷۶
              <span className="size-4  d-block text-blue ltr">+25%</span>
            </span>
          </li>
          <li className={`${Styles.currencyListItems} col-12 col-sm-6 p-2 d-flex align-items-center justify-content-between`}>
            <span
              data-color="gray"
              data-type="currency"
              className={`${Styles.currencyName} d-flex align-items-center`}
            >
              <span className="size-4  text-gray-2">

                <span className="size-5 d-block text-gray-1">دیگر رمز ارزها</span>
              </span>
            </span>
            <span className="size-4  text-gray-1 ">۰.۲۷۶
              <span className="size-4  d-block text-blue ltr">+25%</span>
            </span>
          </li>
        </ul>
      </div>


      <div className="col-12 col-md-6 p-0 ">
       
        <div className="d-flex flex-wrap">


        <div className="col-12 px-0 d-flex flex-wrap justify-content-between align-items-center">
            <div className="mb-2 col-12 px-0"><span className="size-5 fw-500 text-gray-1">موجودی کیف پول</span></div>
            
            
            <div className="d-flex align-items-center col-sm-8 col-12 p-0">
              <div className={`${Styles.currencyPic}  d-flex align-items-center justify-content-center`}>
                <BiWallet size={30}/>
              </div>
              <div className="d-flex flex-column align-items-start col-9">
                <span className="d-flex flex-row-reverse justify-content-center align-items-center">
                  <span className="fw-900 text-gray-2 is-size-4 mr-1">$556,654.55 </span>  <span className="fw-700 size-5 text-gray-1">تتر</span>
                </span>
                <span className="d-flex flex-row-reverse justify-content-center align-items-center">
                  <span className="fw-700 is-size-4 text-gray-2 mr-1">~ </span><span className="fw-700 size-4  text-gray-2 mr-1">۵۵۶,۶۵۴.۵۶۵ </span><span className="fw-700 size-5 mr-1 text-gray-1">ریال</span>
                </span>
              </div>
            </div>

          </div>

          <div className="mt-3 col-12 px-0 d-flex flex-wrap justify-content-between align-items-center">
            <div className="mb-2 col-12 px-0"><span className="size-5 fw-500 text-gray-1">موجودی ریالی</span></div>
            
            
            <div className="d-flex align-items-center  col-8 p-0">
              <div className={`${Styles.currencyPic} ${Styles.rialPic}  d-flex align-items-center justify-content-center`}>
                <span className="icon-rial"></span>
              </div>
              <div className="d-flex flex-column align-items-start col-9">
                <span className="d-flex flex-row-reverse justify-content-center align-items-center">
                  <span className="fw-900 text-gray-2 is-size-4 mr-1">$556,654.55 </span>  <span className="fw-700 size-5 text-gray-1">تتر</span>
                </span>
                <span className="d-flex flex-row-reverse justify-content-center align-items-center">
                  <span className="fw-700 is-size-4 text-gray-2 mr-1">~ </span><span className="fw-700 size-4  text-gray-2 mr-1">۵۵۶,۶۵۴.۵۶۵ </span><span className="fw-700 size-5 mr-1 text-gray-1">ریال</span>
                </span>
              </div>
            </div>


            <div className=" d-flex justify-content-end align-items-center col-4 p-0">
              <div className="d-flex flex-column align-items-center mx-3 pointer">
                <span className={`${Styles.depositIC} d-inline-flex justify-content-center align-items-center`}> <span className="icon-deposit text-blue"></span> </span>
                <span className="size-5 mt-1 text-blue">واریز </span>
              </div>
              <div className="d-flex flex-column align-items-center mx-3 pointer">
                <span className={`${Styles.withdrawIC} d-inline-flex justify-content-center align-items-center`}> <span className="icon-withdraw text-danger"></span> </span>
                <span className="text-danger size-5 mt-1">برداشت </span>
              </div>
            </div>
          </div>

          <div className="mt-3 col-12 px-0 d-flex flex-wrap justify-content-between align-items-center">
            <div className="mb-2 col-12 px-0"><span className="size-5 fw-500 text-gray-1">موجودی ارزی</span></div>
            <div className="d-flex align-items-center col-8 p-0">
              <div className={`${Styles.currencyPic} ${Styles.dollarPic} d-flex align-items-center justify-content-center`}>
                <span className="icon-dollar"></span>
              </div>
              <div className="d-flex flex-column align-items-start col-9">
                <span className="d-flex flex-row-reverse justify-content-center align-items-center">
                  <span className="fw-900 text-gray-2 is-size-4 mr-1">$556,654.55 </span>  <span className="fw-700 size-5 text-gray-1">تتر</span>
                </span>
                <span className="d-flex flex-row-reverse justify-content-center align-items-center">
                  <span className="fw-700 is-size-4 text-gray-2 mr-1">~ </span><span className="fw-700 size-4  text-gray-2 mr-1">۵۵۶,۶۵۴.۵۶۵ </span><span className="fw-700 size-5 mr-1 text-gray-1">ریال</span>
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-end  col-4 p-0 align-items-center ">
              <div className="d-flex flex-column align-items-center mx-3 pointer">
                <span className={`${Styles.depositIC} d-inline-flex justify-content-center align-items-center`}> <span className="icon-deposit text-blue"></span> </span>
                <span className="text-blue size-5 mt-1">واریز </span>
              </div>
              <div className="d-flex flex-column align-items-center mx-3 pointer">
                <span className={`${Styles.withdrawIC} d-inline-flex justify-content-center align-items-center`}> <span className="icon-withdraw text-danger"></span> </span>
                <span className="text-danger size-5 mt-1">برداشت </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default WalletCard;
