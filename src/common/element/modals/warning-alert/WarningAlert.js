/** internal imports */
import Styles from "./WarningAlert.module.scss";
/** external imports */
import { Col, Row } from "react-bootstrap";
/** component imports */
import CustomizedModal from "../../../../components/modal/Modal";
import CustomizedButton from "../../../../components/form/button/Button";

export default function WarningAlert({ show, onHide, title }) {
  return (
    <CustomizedModal
      show={show}
      className={Styles.smModal}
      bodyClassName={"p-3"}
      onHide={() => onHide()}
      alert
      title="هشدار"
    >
      <Row>
        <p className="size-4 text-center">{title}</p>
        <Col sm="12" className={`d-flex justify-content-center`}>
          <CustomizedButton
            outlined
            className="w-75 mt-3 size-3 minHeight-auto fw-500 line-height-normal"
            variant="light"
            onClick={() => onHide()}
          >
            متوجه شدم
          </CustomizedButton>
        </Col>
      </Row>
    </CustomizedModal>
  );
}
