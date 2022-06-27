import React from "react";
import Styles from "./Table.module.scss";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
//components
import PaginationElement from "./pagination/Pagination";
import NoData from "../../../components/no-data/NoData";
const TableElement = ({
  header: Header /**dom element */,
  children /**dom element */,
  className,
  totalRecords /**number */,
  pageLimit /**number */,
  handleChangePage = () => false /**function */,
  pageNeighbours = 2 /**number */,
  marginPagesDisplayed /**number */,
  isPaiginate = false /**boolean */,
  striped,
  responsive,
  pageNumber = 1,
  fixedHeader /**boolean */,
  loading = false
}) => {
  // console.log(children);
  return (
    <div className={`${Styles.customizeTable} ${fixedHeader ? " fixedHeader h-100" : ""} `}>
      <Table responsive={responsive} className={`m-0 ${className || ""} ${striped ? Styles.striped : ""}`}>
        <thead className={`${Styles.thead} ${fixedHeader ? Styles.fixed : ""}`}>
          <tr className="text-center">{Header}</tr>
        </thead>
        <tbody className={`${Styles.tbody} text-black `}>
          {
            children && children.length ?
              children
              :
              <tr className="bg-white tr-noData">
                <td colSpan={Header.length}>
                  <NoData  {...{
                    text: loading ? "درحال دریافت اطلاعات ..." : "داده ای موجود نیست",
                  }} />
                </td>
              </tr>
          }
        </tbody>
      </Table>
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
    </div>
  );
};
TableElement.propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  onChangePage: PropTypes.func,
  pageNeighbours: PropTypes.number,
};
export default TableElement;

{
  /* <td>{(currentPage-1) * 12 + index + 1}</td> */
}
