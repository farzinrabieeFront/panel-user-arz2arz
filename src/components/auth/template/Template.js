import React from "react";
import Styles from "./Template.module.scss";
import { Col } from "react-bootstrap";

//images
import arz2arzLogo from "../../../assets/images/auth-logo.svg";

const AuthTemplate = ({ children, className, type }) => {
  return (
    <div className={Styles.template}>
      <div className={Styles.imageCol}>
        <div className={`${Styles.bgImage} h-100`}></div>
      </div>

      <div className={Styles.formCol}>
        <div className="h-100 d-flex flex-wrap align-items-start align-items-sm-center justify-content-center">
          <div
            className={`${Styles.form} pt-5 pt-sm-0 d-flex justify-content-center flex-wrap`}
          >
            <Col
              xs={6}
              sm={8}
              md={12}
              className={`${Styles.logo} text-center mb-3`}
            >
              <img width={322} height={106} src={arz2arzLogo} alt="" />
            </Col>
            <Col xs={12}>{children}</Col>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthTemplate;

{
  /* <Col className={`${Styles.forms} ${className}`}>{children}</Col> */
}
