import React from "react";
import { Col } from "react-bootstrap";

import NoData from "../../../components/no-data/NoData";
import Styles from "./NewTable.module.scss";
import StatusBadge from "./StatusBadge";
import TableRow from "./TableRow";
import TableCell from "./TableCell";
import TableAccordion from "./TableAccordion";
import PaginationElement from "./pagination/Pagination";

const NewTable = ({
  headerItems,
  loading,
  totalRecords /**number */,
  pageLimit = 6 /**number */,
  handleChangePage = () => false /**function */,
  pageNeighbours = 2 /**number */,
  isPaiginate = false /**boolean */,
  marginPagesDisplayed /**number */,
  pageNumber = 1,
  ...props
}) => {
  return (
    <Col xs="12" className={`${Styles.table} d-flex flex-column`}>
      <TableRow
        className={`${Styles.tHeader} w-100 flex-nowrap text-gray-2 size-5 pt-4 mb-2 pe-sm-0 pe-none`}
      >
        {headerItems?.map((item, index) => {
          return (
            <Col
              xs={item.xs ? item.xs : ""}
              sm={item.sm ? item.sm : ""}
              md={item.md ? item.md : ""}
              lg={item.lg ? item.lg : ""}
              key={index}
              className={`d-flex flex-nowrap text-nowrap m-0 p-0 ${item.className}`}
            >
              {item.headerName} {item.after ? item.after : null}
            </Col>
          );
        })}
      </TableRow>
      <Col
        xs="12"
        className={`${
          loading || !props.children?.length ? "" : Styles.tBody
        } d-flex flex-column`}
        style={{ minHeight: `${pageLimit * 58}px` }}
      >
        {loading ? (
          <NoData loading />
        ) : props.children?.length ? (
          props.children
        ) : (
          <NoData />
        )}
      </Col>
      {isPaiginate && totalRecords > pageLimit ? (
        <PaginationElement
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          onChangePage={handleChangePage}
          pageNeighbours={pageNeighbours}
          marginPagesDisplayed={marginPagesDisplayed}
          pageNumber={pageNumber}
        />
      ) : null}
    </Col>
  );
};

export default NewTable;
export { StatusBadge, TableRow, TableCell, TableAccordion };
