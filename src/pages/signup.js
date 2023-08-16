import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { BsEye } from "react-icons/bs";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../store/action/AuthAction";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";

const defaultValue = {
  name: "",
  email: "",
  password: "",
  confirm: "",
};

const formValidationSchema = yup.object().shape({
  name: yup.string().required("username is reaquired"),
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("please enter a password")
    .min(8, "Your password must be 8 char long")
    .matches(/[0-9]/, "Your password must have at least 1 number")
    .matches(/[a-z]/, "Your password must have at least 1 lowercase character")
    .matches(/[A-Z]/, "Your password must have at least 1 uppercase character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const SignUp = () => {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const SubmitHandler = (data, { isSubmitting, setErrors }) => {
    dispatch(signupUser(data, navigate, setErrors, isSubmitting));
  };

  return (
    <>
      <div className="signupform">
        <div className="signupform-head">
          <p>Get Started</p>
        </div>
        <Formik
          initialValues={defaultValue}
          validationSchema={formValidationSchema}
          onSubmit={SubmitHandler}
          enableReinitialize
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <div className="mb-2">
                <label className="label-text mb-2">
                  Full Name
                  <span
                    style={{ color: "rgba(215, 0, 0, 1)" }}
                    className="ms-1"
                  >
                    *
                  </span>
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={values?.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control p-2 input-field"
                  placeholder="Email or username"
                />
                {errors?.name && touched?.name && (
                  <p className="text-danger my-1" style={{ fontSize: "14px" }}>
                    {errors?.name}
                  </p>
                )}
              </div>
              <div className="mb-2">
                <label className="label-text mb-2">
                  Email Address
                  <span
                    style={{ color: "rgba(215, 0, 0, 1)" }}
                    className="ms-1"
                  >
                    *
                  </span>
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control p-2 input-field"
                  placeholder="Email Address"
                />

                {errors?.email && touched?.email && (
                  <p className="text-danger my-1" style={{ fontSize: "14px" }}>
                    {errors?.email}
                  </p>
                )}
              </div>
              <div className="row mb-2">
                <div className="col-lg-6">
                  <label className="label-text mb-2"> Birth Date </label>
                  <input
                    className="form-control p-2 input-field"
                    name="bod"
                    id="bod"
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Birth Date"
                  />
                </div>
                <div className="col-lg-6">
                  <label className="label-text mb-2"> Phone Number </label>
                  <input
                    className="form-control p-2 input-field"
                    name="phone"
                    id="phone"
                    type="tel"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-lg-6">
                  <label className="label-text mb-2"> Province </label>
                  <input
                    className="form-control p-2 input-field"
                    name="province"
                    id="province"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Province"
                  />
                </div>
                <div className="col-lg-6">
                  <label className="label-text mb-2"> City </label>
                  <input
                    className="form-control p-2 input-field"
                    name="city"
                    id="city"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="City"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="label-text mb-2"> Province </label>
                <Field
                  as="textarea"
                  rows="5"
                  cols="20"
                  name="province"
                  className="form-control p-2 input-field"
                  placeholder="Full Address"
                />
              </div>

              <div className="row mb-2">
                <div className="col-lg-6">
                  <label className="label-text mb-2"> Password </label>
                  <div className="border d-flex rounded-3">
                    <input
                      name="password"
                      id="password"
                      type={showPass ? "text" : "password"}
                      value={values?.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control p-2 input-field border-0"
                      placeholder="Password"
                    />
                    <div
                      onClick={() => setShowPass(!showPass)}
                      className="mt-2 me-3 cursor"
                    >
                      <BsEye />
                    </div>
                  </div>
                  {errors?.password && touched?.password && (
                    <p
                      className="text-danger my-1"
                      style={{ fontSize: "14px" }}
                    >
                      {errors?.password}
                    </p>
                  )}
                </div>
                <div className="col-lg-6">
                  <label className="label-text mb-2"> Confirm Password </label>

                  <div className="border d-flex rounded-3">
                    <input
                      name="confirm"
                      id="confirm"
                      type={showConfirmPass ? "text" : "password"}
                      value={values?.confirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control p-2 input-field border-0"
                      placeholder="Confirm Password"
                    />
                    <div
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="mt-2 me-3 cursor"
                    >
                      <BsEye />
                    </div>
                  </div>

                  {errors?.confirm && touched?.confirm && (
                    <p
                      className="text-danger my-1"
                      style={{ fontSize: "14px" }}
                    >
                      {errors?.confirm}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <button className="signin-btn btn" type="submit">
                  {loading ? (
                    <Loader
                      type="bubble-scale"
                      bgColor={"#FFF"}
                      color={"#FFFFFF"}
                      size={50}
                    />
                  ) : (
                    "Sign Up "
                  )}
                </button>
                {error?.length && !loading && (
                  <h6 className="text-danger text-center my-4">{error}</h6>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
