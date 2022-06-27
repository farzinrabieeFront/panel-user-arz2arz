import React from "react";
import Styles from "./Table.module.scss";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
//components
import CustomizedPagination from "../pagination/Pagination";
const CustomizedTable = ({
  header: Header /**dom element */,
  children /**dom element */,
  className,
  totalRecords /**number */,
  pageLimit /**number */,
  handleChangePage = () => false /**function */,
  pageNeighbours = 2 /**number */,
  marginPagesDisplayed /**number */,
  isPaiginate = false /**boolean */,
  miniTable /**boolean */,
}) => {
  return (
    <div className={`${Styles.customizeTable}  `}>
      <Table responsive="xl" className={` m-0 ${Styles.table} ${className}  `}>
        <thead className={Styles.thead}>
          <tr className="text-center">{Header}</tr>
        </thead>
        <tbody className={`${Styles.tbody} text-black `}>{children}</tbody>
      </Table>
      {isPaiginate && totalRecords > pageLimit ? (
        <CustomizedPagination
          totalRecords={totalRecords}
          pageLimit={pageLimit}
          onChangePage={handleChangePage}
          pageNeighbours={pageNeighbours}
          marginPagesDisplayed={marginPagesDisplayed}
        />
      ) : null}
    </div>
  );
};
CustomizedTable.propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  onChangePage: PropTypes.func,
  pageNeighbours: PropTypes.number,
};
export default CustomizedTable;

{
  /* <td>{(currentPage-1) * 12 + index + 1}</td> */
}
