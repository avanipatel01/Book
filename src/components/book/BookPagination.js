import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getBookHandler, changePage } from "../../store/action/BookAction";
import search_logo from "../../assert/Image/search_logo.png";
import PaginationTable from "./PaginationTable";

const BookPagination = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const { author } = useSelector((state) => state?.author);
  const { bookList, page } = useSelector((state) => state?.book);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookHandler(page, search, filter));
  }, [dispatch, search, page, filter]);

  const handlePageClick = (data) => {
    let currentPage = data?.selected + 1;
    dispatch(changePage(currentPage));
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#fff" }}
        className="p-md-5 m-md-5 border rounded-3 my-5"
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between mt-5 px-5">
          <p className="pagination-header col-lg-5 col-12">Book List</p>

          <div className="col-lg-7 col-12 d-flex flex-wrap">
            <div className="d-flex flex-wrap  align-items-center">
              <div className="px-4 py-2 search_input col-lg-6 col-sm-6 col-12">
                <div className="d-flex align-items-center">
                  <img src={search_logo} alt="search_logo" />
                  <input
                    type="search"
                    className="border-0 ms-3 form-control"
                    placeholder="search..."
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="py-2 col-lg-6 col-sm-6 col-12">
                <select
                  name="filter"
                  className="form-control ms-md-4"
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="" label="All">
                    All
                  </option>

                  {author?.length &&
                    author?.map((item, index) => {
                      return (
                        <option
                          value={item?._id}
                          label={item?.name}
                          key={index}
                        >
                          {item?.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <PaginationTable />

        <ReactPaginate
          previousLabel={"< "}
          breakLabel={"..."}
          pageCount={bookList?.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          nextLabel=" >"
          containerClassName={"pagination justify-content-center mt-4"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={`page-item ${
            bookList?.hasPrevPage ? " d-block" : " d-none"
          }`}
          previousLinkClassName={"page-link"}
          nextClassName={`page-item ${
            bookList?.hasNextPage ? "d-block" : "d-none"
          }`}
          nextLinkClassName={"page-link"}
          activeClassName="active"
        />
      </div>
    </>
  );
};

export default BookPagination;
