import React, { useState } from "react";
import search_logo from "../assert/Image/search_logo.png";
import AuthorList from "../components/author/AuthorList";
import AddAuthor from "../components/author/AddEditAuthor";

const Author = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div style={{ backgroundColor: "#fff" }} className="p-5 content">
        <div className="d-flex flex-wrap align-items-center justify-content-between mt-sm-5 px-sm-5 my-5">
          <div className="py-4 col-lg-10 col-sm-8 col-6">
            <p className="pagination-header">Author Details</p>
          </div>
          <div className="col-lg-2 col-sm-4 col-6 ">
            <div>
              <button className="btn signin-btn" onClick={handleShow}>
                Add Author
              </button>
              <AddAuthor handleClose={handleClose} show={show} />
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: "#fff" }}
          className="p-md-5 p-3 m-md-5 border rounded-3"
        >
          <div className="d-flex flex-wrap align-items-center justify-content-between mt-5 px-5">
            <p className="pagination-header col-lg-5 col-12">Author List</p>

            <div className="col-lg-7 col-12 d-flex flex-wrap">
              <div className="d-flex flex-wrap  align-items-center">
                <div className="px-4 py-2 search_input col-lg-6 col-sm-6 col-12">
                  <div className="d-flex align-items-center">
                    <img src={search_logo} alt="search_logo" />
                    <input
                      type="search"
                      className="border-0 ms-3 form-control"
                      placeholder="search..."
                    />
                  </div>
                </div>
                <div className="py-2 col-lg-6 col-sm-6 col-12">
                  <select name="filter" className="form-control ms-md-4">
                    <option value="" label="Filter by">
                      Filter by
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <AuthorList />
        </div>
      </div>
    </div>
  );
};

export default Author;
