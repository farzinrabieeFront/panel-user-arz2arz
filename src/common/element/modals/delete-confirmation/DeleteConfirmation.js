import { Col, Row } from "react-bootstrap";
import { FiTrash2, IoIosClose } from "react-icons/all";
import Styles from "./DeleteConfirmation.module.scss";
import CustomizedModal from "../../../../components/modal/Modal";
import CustomizedButton from "../../../../components/form/button/Button";

export default function DeleteConfirmation({
  show,
  onHide,
  onClick,
  title,
  desc,
}) {
  return (
    <>
      <CustomizedModal
        className={Styles.smModal}
        bodyClassName={"p-3"}
        show={show}
        onHide={() => onHide()}
        alert
        title="هشدار"
        size="sm"
      >
        <Row>
          <p className="size-3 text-center">
            {title}
            <br />
            {desc}
          </p>
          <Col
            sm="6"
            xs="12"
            className={`${Styles.modalButtons} mb-3 mb-sm-0 d-flex justify-content-center`}
          >
            <CustomizedButton
              rightIcon={<FiTrash2 size={24} />}
              className="size-3 minHeight-auto fw-500 line-height-normal"
              variant="danger"
              onClick={onClick}
            >
              حذف کن
            </CustomizedButton>
          </Col>
          <Col
            sm="6"
            xs="12"
            className={`${Styles.modalButtons} d-flex justify-content-center`}
          >
            <CustomizedButton
              rightIcon={<IoIosClose size={24} />}
              outlined
              className="size-3 minHeight-auto fw-500 line-height-normal"
              variant="light"
              onClick={onHide}
            >
              انصراف
            </CustomizedButton>
          </Col>
        </Row>
      </CustomizedModal>
    </>
  );
}
