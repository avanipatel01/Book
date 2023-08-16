import React from "react";
import { Formik, Form } from "formik";

import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  addAuthorHandler,
  editAuthorHandler,
} from "../../store/action/AuthorAction";

const validationSchema = yup.object().shape({
  name: yup.string().min(2).required("author name is required"),
  country: yup.string().required("select country"),
  birthDate: yup
    .date()
    .max(new Date().toDateString())
    .required("birth date is required"),
});

const AddAuthor = ({ show, handleClose, editData }) => {
  const { error } = useSelector((state) => state?.author);
  const dispatch = useDispatch();

  const defaultValue = {
    name: (editData?.name && editData?.name) || "",
    country: (editData?.country && editData?.country) || "",
    birthDate: (editData?.birthDate && editData?.birthDate) || "",
  };

  const SubmitHandler = (data, { setErrors }) => {
    if (editData) {
      dispatch(editAuthorHandler(data, editData?._id, setErrors, handleClose));
    } else {
      dispatch(addAuthorHandler(data, setErrors, handleClose));
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <h3 className="history-head">Add Author</h3>
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
                      Name
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
                      placeholder="Name"
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
                      Birth Date
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <input
                      name="birthDate"
                      type="date"
                      value={values?.birthDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                      placeholder="Birth Date"
                    />

                    {errors?.birthDate && touched?.birthDate && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.birthDate}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="label-text mb-2">
                      Country
                      <span
                        style={{ color: "rgba(215, 0, 0, 1)" }}
                        className="ms-1"
                      >
                        *
                      </span>
                    </label>
                    <select
                      name="country"
                      value={values?.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control px-3 py-2  input-field"
                    >
                      <option value="" label="Select a Country">
                        Select a country
                      </option>
                      <option value="India" label="India">
                        India
                      </option>
                      <option value="US" label="US">
                        US
                      </option>
                      <option value="Canada" label="Canada">
                        Canada
                      </option>
                      <option value="Australia" label="Australia">
                        Australia
                      </option>
                      <option value="China" label="China">
                        China
                      </option>
                    </select>

                    {errors?.country && touched?.country && (
                      <p
                        className="text-danger my-1"
                        style={{ fontSize: "14px" }}
                      >
                        {errors?.country}
                      </p>
                    )}
                  </div>

                  <div className="mb-2">
                    <button className="signin-btn btn" type="submit">
                      Add Author
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

export default AddAuthor;
