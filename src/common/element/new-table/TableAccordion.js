import React from "react";

import { Col } from "react-bootstrap";
import classNames from "classnames";
import Styles from "./NewTable.module.scss";

const TableAccordion = (props) => {
  const accordionClasses = classNames(props.className, Styles.accordion);

  return (
    <Col xs={props.xs} md={props.md} className={`${accordionClasses} d-flex`} onClick={props.activeDropdown}>
      {props.children}
    </Col>
  );
};

export default TableAccordion;
