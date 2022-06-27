import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlockWithdraw from "../../assets/images/block-withdraw.svg";
import CustomizedButton from "../../components/form/button/Button";
import TriangleTitle from "../../components/triangle-title/TriangleTitle";
import Wrapper from "../../components/wrapper/Wrapper";

const AuthHoc = (WrappedComponent, action, title) => {
  return function HocWrapper(props) {
    const { customer, customerIdentity } = useSelector((state) => state.user);
    const navigate = useNavigate();

    if (customer.isVerified && customerIdentity?.verified === "approved")
      return <WrappedComponent {...props} />;

    return (
      <Wrapper>
        {title ? (
          <div className="w-100 mb-4">
            <TriangleTitle>
              <h2 className="text-gray-4 mb-0 fw-500 size-3">{title}</h2>
            </TriangleTitle>
          </div>
        ) : null}
        <div className="p-5 mb-5 d-flex flex-column justify-content-center align-items-center">
          <img src={BlockWithdraw} width={293} height={223} />

          {customerIdentity?.verifyRequest ? (
            <div className="d-flex flex-wrap justify-content-center">
              <Col xs="12">
                <h2 className="text-gray-3 size-3 mt-5 mb-4 text-center">
                  درخواست احراز هویت شما در حال بررسی است
                </h2>
              </Col>
              <Col xs="12">
                <p className="text-gray-2 size-4 mb-4 text-center">
                  لطفا منتظر نتیجه احراز هویت باش یا اگر 72 ساعت از درخواستت
                  گذشته برای پیگیری بیشتر از طریق پشتیبانی تیکت ارسال کن.
                </p>
              </Col>
              <Col xs="6" className="center-content">
                <CustomizedButton
                  className="size-4 fw-700 main-btn"
                  size="xs"
                  variant="blue"
                  onClick={() => navigate("/create-ticket")}
                  type="submit"
                >
                  ارسال پیام به پشتیبانی
                </CustomizedButton>
              </Col>
            </div>
          ) : (
            <div className="d-flex flex-wrap justify-content-center">
              <Col xs="12">
                <h2 className="text-gray-3 size-3 mt-5 mb-4 text-center">
                  هنوز احراز هویتت رو تکمیل نکردی
                </h2>
              </Col>
              <Col xs="12">
                <p className="text-gray-2 size-4 mb-4 text-center">
                  برای اینکه بتونی {action} ، ابتدا فرایند احراز هویتت رو تکمیل
                  کن.
                </p>
              </Col>
              <Col xs="6" className="center-content">
                <CustomizedButton
                  className="size-4 fw-700 main-btn"
                  size="xs"
                  variant="blue"
                  onClick={() => navigate("/authentication")}
                  type="submit"
                >
                  تکمیل احراز هویت
                </CustomizedButton>
              </Col>
            </div>
          )}
        </div>
      </Wrapper>
    );
  };
};

export default AuthHoc;
