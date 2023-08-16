import React, { useState } from "react";
import AddBook from "../components/book/AddEditBook";
import BookPagination from "../components/book/BookPagination";

const Books = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        style={{ backgroundColor: "#fff", height: "100vh" }}
        className="p-5 content"
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between mt-sm-5 px-sm-5 my-5">
          <div className="py-4 col-lg-10 col-sm-8 col-6">
            <p className="pagination-header">Books</p>
            <p className="history-text ">Wonderful Books</p>
          </div>
          <div className="col-lg-2 col-sm-4 col-6 ">
            <div>
              <button className="btn signin-btn" onClick={handleShow}>
                Add Book
              </button>
              <AddBook show={show} handleClose={handleClose} />
            </div>
          </div>
        </div>

        <BookPagination />
      </div>
    </>
  );
};

export default Books;
