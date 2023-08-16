import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { BsTrash3 } from "react-icons/bs";
import { removeBookHandler } from "../../store/action/BookAction";
import ClipLoader from "react-spinners/ClipLoader";
import AddBook from "./AddEditBook";
import { BiEdit } from "react-icons/bi";

const PaginationTable = () => {
  const { bookList, loading, page, error } = useSelector(
    (state) => state?.book
  );
  const [edit, setEdit] = useState(null);
  const dispatch = useDispatch();
  const handleEditClose = () => {
    setEdit(null);
  };
  return (
    <>
      <div className="p-4">
        <div className="my-5 w-100">
          <div className="">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Luanch Date</th>
                  <th>Number os sales</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <th colSpan={6}>
                      <div className="d-flex justify-content-center align-items-center w-100">
                        <ClipLoader color="#36d7b7" />
                      </div>
                    </th>
                  </tr>
                )}

                {bookList?.docs &&
                  !loading &&
                  bookList?.docs?.map((item, index) => {
                    return (
                      <tr key={item?._id}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
                        <td>{item?.author_id?.name}</td>
                        <td>{item?.launch_date}</td>
                        <td>{item?.number_of_sales}</td>
                        <td>
                          <button
                            className="btn text-danger fs-5"
                            onClick={() =>
                              dispatch(removeBookHandler(item?._id, page))
                            }
                          >
                            <BsTrash3 />
                          </button>
                          <button
                            className="btn text-success fs-5"
                            onClick={() => setEdit(item)}
                          >
                            <BiEdit />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {error && (
                  <tr>
                    <th colSpan={6}>
                      <div className="d-flex justify-content-center align-items-center w-100">
                        {error}
                      </div>
                    </th>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {edit && (
        <AddBook show={edit} handleClose={handleEditClose} editbook={edit} />
      )}
    </>
  );
};

export default PaginationTable;
