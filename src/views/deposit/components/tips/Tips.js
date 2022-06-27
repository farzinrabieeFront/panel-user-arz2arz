import React from "react";
import Styles from "./Tips.module.scss";
import CustomizedTips from "../../../../components/tips/Tips";
import { IoAlertCircleOutline } from "react-icons/all";
import VideoPlayer from "../../../../common/widgets/videoPlayer/VideoPlayer";

import SpotDepositeVideo from "../../../../assets/videos/a2z-tutorial-deposit-coin.mp4";
import FiatDepositeVideo from "../../../../assets/videos/a2z-tutorial-deposit-TMN.mp4";
import { Alert } from "react-bootstrap";

const Tips = ({ type }) => {
    const tipsData = {
        fiat: [
            <Alert variant="info" className="mb-3">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-blue" />
                    حداقل مقدار واریزی 500 هزار تومنه.
                </span>
            </Alert>,
            <Alert variant="info">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-blue" />
                    فقط با کارت‌هایی میتونی واریز داشته باشی که در بخش کارت‌های
                    بانکی تایید شده باشن.
                </span>
            </Alert>
        ],
        spot: [
            <Alert variant="warning" className="mb-3">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-orange" />
                    به این آدرس فقط رمزارز Bitcoin/BTC واریز نمایید. ارسال کوین یا
                    توکن غیر از این آدرس ممکن است سبب از دست رفتن سرمایه شما شود.
                </span>
            </Alert>,
            <Alert variant="info" className="mb-3">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-blue" />
                    پس از تمام واریز، به پیام‌های متنی و ایمیل‌هایی که برای شما
                    ارسال می‌کنیم توجه کنید.
                </span>
            </Alert>,
            <Alert variant="info">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-blue" />
                    تا زمانی که شبکه تایید نشود، مقدار معادل دارایی شما به طور موقت
                    برای برداشت در دسترس نخواهد بود.
                </span>
            </Alert>

        ]
    }

    return (
        <div className="d-flex flex-column-reverse flex-md-column w-100">
            <VideoPlayer
                type={type}
                src={type === "fiat" ? FiatDepositeVideo : SpotDepositeVideo}
            />

            <div className="w-100 mb-4">
                {tipsData[type]}
            </div>
        </div>
    );
};

export default Tips;
