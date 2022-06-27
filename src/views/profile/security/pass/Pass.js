/**internal imports */
import { useEffect, useState } from "react";
import Styles from "../Security.module.scss";
/**external imports */
import { Col, Row } from "react-bootstrap";
import { FiEdit2 } from "react-icons/all";
/**component imports */
import TriangleTitle from "../../../../components/triangle-title/TriangleTitle";
import CustomizedButton from "../../../../components/form/button/Button";
import EditPass from "./EditPass";
import PassStrenght from "../../../../common/widgets/pass-strenght/PassStrenght";
import { useSelector } from "react-redux";

export default function Pass() {
  const { scoreOfPassword } = useSelector((state) => state.user.customer);
  const [showEditPassModal, setShowEditPassModal] = useState(false);
  const [otpData, setOtpData] = useState({});

  useEffect(() => {
    if (otpData.expiryDate) {
      const isExpiredOtp = new Date().getTime() >= otpData.expiryDate;
      if (isExpiredOtp) {
        setOtpData({});
      }
    }
  }, [showEditPassModal]);

  return [
    <div className="wrapper mb-3">
      <Row className="align-items-center justify-content-between">
        <Col sm="12" md={3} className="ps-0">
          <TriangleTitle>
            <h2 className="text-gray-4 size-3 fw-500 mb-0">رمز عبور</h2>
          </TriangleTitle>
          <p className="text-gray-2 size-4 pr-5 mt-2 mb-0 text-nowrap">
            تغییر رمز عبور برای ورود به ارز تو ارز
          </p>
        </Col>

        <Col xs={12} sm={8} md="6" className="pe-3 my-3">
          <PassStrenght status={scoreOfPassword} />
        </Col>

        <Col
          sm="3"
          md={2}
          className="d-flex justify-content-center justify-content-sm-end mt-sm-0 mt-2"
        >
          <CustomizedButton
            rightIcon={<FiEdit2 size={16} />}
            outlined
            onClick={() => setShowEditPassModal(true)}
            className={`${Styles.actionsBtn} size-5 py-1 minHeight-auto fw-500 line-height-normal`}
            variant="blue"
          >
            ویرایش
          </CustomizedButton>
        </Col>
      </Row>
    </div>,
    showEditPassModal ? (
      <EditPass
        otpData={otpData}
        setOtpData={setOtpData}
        show={showEditPassModal}
        onHide={() => setShowEditPassModal(false)}
      />
    ) : null,
  ];
}
