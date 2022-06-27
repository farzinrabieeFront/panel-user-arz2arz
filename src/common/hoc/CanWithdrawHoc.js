import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlockWithdraw from "../../assets/images/block-withdraw.svg";
import CustomizedButton from "../../components/form/button/Button";

const CanWithdrawHoc = (WrappedComponent, action) => {
  return function Wrapper(props) {
    const { customer } = useSelector((state) => state.user);
    const navigate = useNavigate();

    if (customer.canWithdraw) return <WrappedComponent {...props} />;

    return (
      <>
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
          <img src={BlockWithdraw} width={293} height={223} />
        </div>
        <div className="p-5 mb-2 d-flex flex-wrap justify-content-center">
          <Col xs="12">
            <h2 className="text-gray-3 size-3 mt-5 mb-4 text-center">
              متاسفانه به صورت موقت به قابلیت برداشت دسترسی نداری
            </h2>
          </Col>
          <Col xs="12">
            <p className="text-gray-2 size-4 mb-4 text-center">
              برای رفع مشکل لطفا به تیم پشتیبانی ارز تو ارز تیکت ارسال کن
            </p>
          </Col>
          <Col xs="6" className="center-content">
            <CustomizedButton
              className="size-4 fw-700 main-btn"
              size="xs"
              variant="blue"
              // onClick={() => navigate("/authentication")}
              type="submit"
            >
              ارسال تیکت به پشتیبانی
            </CustomizedButton>
          </Col>
        </div>
      </>
    );
  };
};

export default CanWithdrawHoc;
