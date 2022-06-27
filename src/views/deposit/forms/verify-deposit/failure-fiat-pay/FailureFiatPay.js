/**internal imports */
import Styles from '../VerifyDeposit.module.scss'
import failIcon from "../../../../../assets/svgs/fail-svg.svg";
/**component imports */
import CustomizedButton from "../../../../../components/form/button/Button";
import CustomizedModal from "../../../../../components/modal/Modal";

export default function FailureFiatPay({ show, onHide, data, onRetry }) {
  return (
    <CustomizedModal
      show={show}
      onHide={onHide}
      keyboard={true}
      backdrop="static"
      contentClassName={Styles.modal}
      bodyClassName={Styles.verifyDeposit}
      centered
    >
      <img src={failIcon} alt="" />
      <h2 className="text-danger py-3 mb-4">
        پرداخت ناموفق
      </h2>
      <div className="text-center size-5 mb-3 text-gray-3">
        سفارش شما با کد پیگیری
        <div className="text-center fw-700 text-blue is-size-5 my-1">
          {data.txId}
        </div>
        ثبت شد.
        <div className="text-center mt-2">
          در صورت تمایل میتوانید درخواست خود را دوباره ارسال کنید
        </div>
      </div>

      <div className="w-100 my-3">
        <CustomizedButton
          isFullWidth
          onClick={() => {
            onRetry();
            onHide();
          }}
          type="submit"
          className=" size-3 fw-700 py-1"
          size="sm"
          variant="danger"
        >
          تلاش دوباره
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
