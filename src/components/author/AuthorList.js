import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAuthorHandler,
  removeAuthorHandler,
} from "../../store/action/AuthorAction";
import ClipLoader from "react-spinners/ClipLoader";
import { BsTrash3 } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import AddAuthor from "./AddEditAuthor";

const AuthorList = () => {
  const { loading, error, author } = useSelector((state) => state?.author);
  const dispatch = useDispatch();

  const [editAuthor, setEditAuthor] = useState(null);
  const handleEditClose = () => {
    setEditAuthor(null);
  };

  useEffect(() => {
    if (!author?.length) dispatch(getAuthorHandler());
  }, []);

  return (
    <>
      <div className="my-5 w-100">
        <div className="">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Author</th>
                <th>Country</th>
                <th>BirthDate</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <th colSpan={5}>
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <ClipLoader color="#36d7b7" />
                    </div>
                  </th>
                </tr>
              )}
              {author &&
                !loading &&
                author?.map((item, index) => {
                  return (
                    <tr key={item?._id}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.birthDate}</td>
                      <td>{item?.country}</td>
                      <td>
                        <button
                          className="btn text-danger fs-5"
                          onClick={() =>
                            dispatch(removeAuthorHandler(item?._id))
                          }
                        >
                          <BsTrash3 />
                        </button>
                        <button
                          className="btn text-success fs-5"
                          onClick={() => setEditAuthor(item)}
                        >
                          <BiEdit />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {error && (
                <tr>
                  <th colSpan={5}>
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
      {editAuthor && (
        <AddAuthor
          show={editAuthor}
          handleClose={handleEditClose}
          editData={editAuthor}
        />
      )}
    </>
  );
};

export default AuthorList;
