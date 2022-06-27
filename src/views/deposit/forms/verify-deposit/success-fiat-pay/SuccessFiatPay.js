/**internal imports */
import successIcon from "../../../../../assets/svgs/success-svg.svg";
import Styles from '../VerifyDeposit.module.scss'
import { DateConvert } from "../../../../../utils";
/**external imports */
import { useNavigate } from "react-router-dom";
/**component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import CustomizedModal from "../../../../../components/modal/Modal";

export default function SuccessFiatPay({ show, onHide, data }) {
  const navigate = useNavigate();

  return (
    <CustomizedModal
      show={show}
      onHide={onHide}
      contentClassName={Styles.modal}
      bodyClassName={Styles.verifyDeposit}
      keyboard={true}
      backdrop="static"
      centered
    >
      <img src={successIcon} alt="" />
      <h2 className="text-success py-3 mb-4">پرداخت موفق</h2>
      <ul className="row p-2">
        <li className="col-12 d-flex justify-content-between align-items-center mb-3">
          <div className="text-gray-3 size-5">شناسه پرداخت</div>
          <div className="text-gray-4 size-4 fw-500 en"> {data.refId} </div>
        </li>
        <li className="col-12 d-flex justify-content-between align-items-center mb-3">
          <div className="text-gray-3 size-5">کد پیگیری</div>
          <div className="text-gray-4 size-4 fw-500 en"> {data.txId}</div>
        </li>
        <li className="col-12 d-flex justify-content-between align-items-center mb-3">
          <div className="text-gray-3 size-5">مقدار پرداختی</div>
          <div className="text-gray-4 size-4 fw-500 en">
            {new Number(data.amount ? data.amount : 0).toLocaleString()}
          </div>
        </li>
        <li className="col-12 d-flex justify-content-between align-items-center">
          <div className="text-gray-3 size-5">زمان</div>
          <div >
            <span className="d-inline-block text-gray-4 size-4 fw-500">
              {DateConvert.getTime(data.time)}
            </span>
            <span className="text-gray-4 size-4 fw-500 d-inline-block mx-2">|</span>
            <span className="d-inline-block text-gray-4 size-4 fw-500">
              {DateConvert.toShamsiDate(data.time)}
            </span>
          </div>
        </li>
      </ul>

      <div className="w-100 my-3">
        <CustomizedButton
          isFullWidth
          type="submit"
          className=" size-3 fw-700 py-1"
          size="sm"
          variant="blue"
          onClick={() => navigate('/my/wallet/overview')}
        >
          بازگشت به کیف پول
        </CustomizedButton>
      </div>
      <div className="w-100">
        <CustomizedButton
          isFullWidth
          outlined
          type="submit"
          className=" size-3 fw-700 py-1"
          size="sm"
          variant="blue"
          onClick={onHide}
        >
          بستن
        </CustomizedButton>
      </div>
    </CustomizedModal>
  );
}
