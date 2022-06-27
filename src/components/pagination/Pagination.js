import { useEffect, useState } from "react";
import Styles from "./Pagination.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/all";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const CustomizedPagination = ({
  totalRecords,
  pageLimit = 15,
  pageNeighbours = 2,
  onChangePage,
  marginPagesDisplayed = 1,
}) => {
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalRecords / pageLimit)
  );
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [totalRecords, pageLimit]);
  return (
    <div>
      <ReactPaginate
        previousLabel={
          <div className="center-content h-100">
            <FaChevronRight size={15} />
          </div>
        }
        nextLabel={
          <div className="center-content h-100">
            <FaChevronLeft size={15} />
          </div>
        }
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageNeighbours}
        onPageChange={(data) => onChangePage(data.selected + 1)}
        containerClassName={"pagination center-content mt-2"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};
CustomizedPagination.propTypes = {
  totalRecords: PropTypes.number,
  pageLimit: PropTypes.number,
  onChangePage: PropTypes.func,
  pageNeighbours: PropTypes.number,
};
export default CustomizedPagination;
