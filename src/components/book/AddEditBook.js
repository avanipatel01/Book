import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { getAuthorHandler } from "../../store/action/AuthorAction";
import { addBookHandler, editBookHandler } from "../../store/action/BookAction";

const validationSchema = yup.object().shape({
  name: yup.string().min(2).required("book name is required"),
  author_id: yup.string().required("Author is required!"),
  launch_date: yup.date().required("launch date is required"),
  description: yup.string().min(2).required("description is required"),
  genre: yup.string().required("genre is required"),
  number_of_sales: yup.number().positive().required("enter your sales number"),
});

const AddBook = ({ show, handleClose, editbook }) => {
  const dispatch = useDispatch();

  const { author } = useSelector((state) => state?.author);
  const { page, error } = useSelector((state) => state?.book);

  useEffect(() => {
    if (!author?.length) dispatch(getAuthorHandler());
  }, [dispatch, author?.length]);

  const defaultValue = {
    name: (editbook && editbook?.name) || "",
    author_id: (editbook && editbook?.author_id?._id) || "",
    author_name: (editbook && editbook?.author_id?.name) || "",
    launch_date: (editbook && editbook?.launch_date) || "",
    description: (editbook && editbook?.description) || "",
    genre: (editbook && editbook?.genre) || "",
    number_of_sales: (editbook && editbook?.number_of_sales) || "",
  };

  const SubmitHandler = (data, { setErrors }) => {
    if (editbook) {
      dispatch(
        editBookHandler(data, editbook?._id, setErrors, handleClose)
      );
    } else {
      dispatch(addBookHandler(data, page, setErrors, handleClose));
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <h3 className="history-head">Add Book</h3>
        </Modal.Header>
        {error && (
          <div className="d-flex justify-content-center align-items-center w-100 text-danger">
            {error}
          </div>
        )}
        <Modal.Body>
          <Formik
            validationSchema={validationSchema}
            initialValues={defaultValue}
            onSubmit={SubmitHandler}
            enableReinitialize
          >
            {({ errors, touched, values, handleBlur, handleChange }) => (
              <Form>
                <div className="p-5">
                  <div className="mb-3">
                    <label className="label-text mb-2">
                      Book Name
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                      placeholder="Book Name"
                    />

                    {errors?.name && touched?.name && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.name}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="label-text mb-2">
                      Author
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <select
                      name="author_id"
                      value={values?.author_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                    >
                      {editbook?.author_id ? (
                        <option
                          value={editbook?.author_id}
                          label={values?.author_name}
                        >
                          {values?.author_name}
                        </option>
                      ) : (
                        <option value="" label="Select a Author">
                          Select a Author
                        </option>
                      )}

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

                    {errors?.author_id && touched?.author_id && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.author_id}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="label-text mb-2">
                      Luanch Date
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <input
                      name="launch_date"
                      type="date"
                      value={values?.launch_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                      placeholder="Launch Date"
                    />

                    {errors?.launch_date && touched?.launch_date && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.launch_date}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="label-text mb-2">
                      Description
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <Field
                      name="description"
                      as="textarea"
                      value={values?.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                      placeholder="description"
                    />

                    {errors?.description && touched?.description && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.description}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="label-text mb-2">
                      Genre
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <input
                      name="genre"
                      type="text"
                      value={values?.genre}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                      placeholder="genre"
                    />

                    {errors?.genre && touched?.genre && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.genre}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="label-text mb-2">
                      Number of number_of_sales
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <input
                      name="number_of_sales"
                      id="number_of_sales"
                      type="number"
                      value={values?.number_of_sales}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                      placeholder="number of sales"
                    />

                    {errors?.number_of_sales && touched?.number_of_sales && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.number_of_sales}
                      </p>
                    )}
                  </div>

                  <div className="mb-2">
                    <button className="signin-btn btn" type="submit">
                      Add Book
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddBook;
