import React from "react";

import Styles from "./NewTable.module.scss";
import classNames from "classnames";
import { Col } from "react-bootstrap";

const TableCell = ({ className, ...props }) => {
    let tdClasses = classNames(
        Styles.td,
        className,
        "text-start d-flex  flex-nowrap px-2 py-md-2 px-md-0 text-nowrap",
        { "align-items-center": !className?.includes("flex-column") }
    );

    return (
        <Col
            className={tdClasses}
            {...props}
        >
            {props.children}
        </Col>
    );
};

export default TableCell;
