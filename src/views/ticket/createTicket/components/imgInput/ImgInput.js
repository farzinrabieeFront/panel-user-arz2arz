import { IoCloseOutline, IoCloudUploadOutline } from "react-icons/all";
import { useField } from "formik";
import Styles from "./ImgInput.module.scss";
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";

const ImgInput = (props) => {
  const [
    { name, value, onChange, ...field },
    { error, touched },
    { setValue },
  ] = useField(props);

  return (
    <>
      <div
        className={`${Styles.FileInput} size-5 fw-500 text-gray-4 py-2 px-3`}
      >
        <div>
          {value ? (
            <Row className="d-flex align-items-center w-100">
              <Col xs="2">
                <IoCloseOutline
                  className="pointer"
                  size={24}
                  onClick={() => setValue("")}
                />
              </Col>
              <Col xs="10">
                <p className="text-center mb-0">{value.name}</p>
              </Col>
            </Row>
          ) : (
            <Row className="d-flex align-items-center w-100">
              <Col xs="5">
                <IoCloudUploadOutline size={24} />
              </Col>
              <Col>
                <p className="mb-0">بارگذاری فایل ضمیمه</p>
              </Col>
            </Row>
          )}
        </div>
        <input
          className={`${Styles.input}`}
          {...field}
          type="file"
          onChange={(event) => {
            setValue(event.currentTarget.files[0]);
          }}
          name="name"
        />
      </div>
    </>
  );
};

export default ImgInput;
