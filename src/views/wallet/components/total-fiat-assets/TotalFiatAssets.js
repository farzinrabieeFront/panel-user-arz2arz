/** internal imports */
import Styles from "./TotalFiatAssets.module.scss";
import WalletIcon from "../../../../assets/images/wallet-icon.svg";
/** external imports */
import { HiPlus } from "react-icons/all";
import { useNavigate } from "react-router-dom";
/** component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import CustomizedButton from "../../../../components/form/button/Button";

export default function TotalFiatAssets({ balance }) {
    const navigate = useNavigate();

    return (
        <div className="wrapper p-3 h-100">
            <div className={Styles.fiatWallet}>
                <div className={Styles.title}>
                    <TriangleTitle>
                        <h2 className="text-gray-4 mb-0 fw-500 size-4">
                            موجودی حساب تومنی
                        </h2>
                    </TriangleTitle>
                </div>
                <div className={Styles.btn}>
                    <CustomizedButton
                        rightIcon={<HiPlus size={20} />}
                        outlined
                        className="size-5 py-1 minHeight-auto fw-700"
                        size="xs"
                        variant="blue"
                        onClick={() => navigate("/my/wallet/deposit/fiat")}
                    >
                        افزایش موجودی
                    </CustomizedButton>
                </div>

                <div
                    className={`${Styles.balance} d-flex align-items-center justify-content-center justify-content-sm-end`}
                >
                    <span className="text-gray-3 size-4 ms-2">تومان</span>
                    <span className="text-gray-4 h4 mb-0 en fw-500">
                        {Number(Number(balance || 0).toFixed(0)).toLocaleString()}
                    </span>
                    <span className="text-gray-4 me-3">
                        <img src={WalletIcon} width={64} height={64} />
                    </span>
                </div>
            </div>
        </div>
    );
};


