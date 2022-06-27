import { useEffect, useState } from "react";
import Styles from "./Pagination.module.scss";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/all";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const PaginationElement = ({
  totalRecords,
  pageLimit = 15,
  pageNeighbours = 2,
  onChangePage,
  marginPagesDisplayed = 1,
  pageNumber,
}) => {
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalRecords / pageLimit)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [totalRecords, pageLimit]);

  return (
    <ReactPaginate
      previousLabel={
        <div className="center-content h-100">
          <MdOutlineChevronRight size={18} />
        </div>
      }
      nextLabel={
        <div className="center-content h-100">
          <MdOutlineChevronLeft size={18} />
        </div>
      }
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalPages}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageNeighbours}
      onPageChange={(data) => onChangePage(data.selected + 1)}
      forcePage={pageNumber - 1}
      containerClassName={"pagination center-content mt-5"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      initialPage={pageNumber - 1}
    />
  );
};
PaginationElement.propTypes = {
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  onChangePage: PropTypes.func,
  pageNeighbours: PropTypes.number,
};
export default PaginationElement;
