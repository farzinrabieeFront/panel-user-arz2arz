/** internal imports */
import { IoAlertCircleOutline } from "react-icons/all";
import { Alert, Col } from "react-bootstrap";
/** component imports */
import FiatWithdrawVideo from "../../../../assets/videos/a2z-tutorial-withdraw-TMN.mp4";
import SpotWithdrawVideo from "../../../../assets/videos/a2z-tutorial-withdraw-coin.mp4";
import VideoPlayer from "../../../../common/widgets/videoPlayer/VideoPlayer";

export default function Tips({ type }) {
    const tipsData = {
        fiat: [
            <Alert variant="warning">
                <p className="size-5 text-gray-4 mb-2">
                    <IoAlertCircleOutline size={17} className="text-orange ms-1" />
                    بعد از تایید درخواست، دیگه امکان لغو وجود نداره.
                </p>

                <p className="size-5 text-gray-4 mb-2">
                    <IoAlertCircleOutline size={17} className="text-orange ms-1" />
                    برای تایید مبلغ برداشت، نیاز به 2 تایید از سمت شبکه به حساب مقصد
                    هست.
                </p>

                <p className="size-5 text-gray-4 mb-0">
                    <IoAlertCircleOutline size={17} className="text-orange ms-1" />
                    حداکثر میتونی در یک شبانه روز مبلغ صد میلیون تومان برداشت تومانی
                    داشته باشی.
                </p>
            </Alert>
        ],
        spot: [
            <Alert variant="warning" className="mb-3">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-orange ms-1" />
                    از صحت آدرس کیف پول گیرنده اطمینان کامل پیدا کن. اشتباه بودن
                    آدرس میتونه باعث از دست رفتن سرمایت بشه.
                </span>
            </Alert>
            ,
            <Alert variant="info" className="mb-3">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-blue ms-1" />
                    بعد از تایید درخواست، دیگه امکان لغو وجود نداره.
                </span>
            </Alert>
            ,
            <Alert variant="info" className="mb-3">
                <span className="size-5 text-gray-4">
                    <IoAlertCircleOutline size={17} className="text-blue ms-1" />
                    برای تایید مبلغ برداشت، نیاز به 2 تایید از سمت شبکه به حساب مقصد
                    هست.
                </span>
            </Alert>
        ]
    }

    return (
        <div className="w-100 d-flex flex-column-reverse flex-md-row flex-wrap">
            <Col xs="12">
                <VideoPlayer
                    type={type}
                    src={type === "fiat" ? FiatWithdrawVideo : SpotWithdrawVideo}
                />
            </Col>

            <Col xs="12">
                {tipsData[type]}
            </Col>
        </div>
    );
};