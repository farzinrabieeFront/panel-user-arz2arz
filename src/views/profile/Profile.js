/** external imports */
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
/** component imports */
import PersonalInformation from "./components/PersonalInformation";
import DownloadDocument from "./components/DownloadDocument";
import FinancialInformation from "./components/FinancialInformation";
import AuthHoc from "../../common/hoc/AuthHoc";

const Profile = () => {
  const { customerIdentity } = useSelector((state) => state.user);

  return (
    <Row>
      <Col xs={12} className="mb-4">
        <PersonalInformation customerIdentity={customerIdentity} />
      </Col>
      <Col xs={12} className="mb-4">
        <DownloadDocument customerIdentity={customerIdentity} />
      </Col>
      {/* <Col xs={12} className="mb-4">
        <FinancialInformation />
      </Col> */}
    </Row>
  );
};

export default AuthHoc(Profile, "مشخصات خودت رو ببینی", "مشخصات");
