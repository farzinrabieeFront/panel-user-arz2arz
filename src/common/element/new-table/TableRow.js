import React from "react";

import classNames from "classnames";
import { Row } from "react-bootstrap";
import Styles from "./NewTable.module.scss";

const TableRow = (props) => {
  let trClasses = classNames(
    props.className,
    Styles.tableRows,
    "text-nowrap m-0 p-0"
  );

  return (
    <Row className={trClasses} {...props}>
      {props.children}
    </Row>
  );
};

export default TableRow;
