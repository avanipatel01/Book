import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/action/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import Loader from "react-js-loader";

const defaultValue = {
  email: "",
  password: "",
};

const formValidationSchema = yup.object().shape({
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("please enter a password")
    .matches(/[0-9]/, "Your password must have at least 1 number")
    .matches(/[a-z]/, "Your password must have at least 1 lowercase character")
    .matches(/[A-Z]/, "Your password must have at least 1 uppercase character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "  Must Contain  One Special Case Character"
    ),
});

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const { loading, error } = useSelector((state) => state.auth);

  const SubmitHandler = async (data, { setErrors }) => {
    dispatch(loginUser(data, navigate, setErrors));
  };

  return (
    <>
      <div className="signupform d-flex flex-column justify-content-center h-100">
        <div className="signupform-head">
          <p>Hi, Welcome Back Fellas!</p>
        </div>
        <Formik
          initialValues={defaultValue}
          validationSchema={formValidationSchema}
          onSubmit={SubmitHandler}
        >
          {({ errors, values, touched, handleBlur, handleChange }) => (
            <Form className="mt-4">
              <div className="mb-3">
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
                  className="form-control px-3 py-2  input-field"
                  placeholder="Email Address"
                />

                {errors?.email && touched?.email && (
                  <p className="text-danger my-1" style={{ fontSize: "14px" }}>
                    {errors?.email}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <p className="d-flex justify-content-between mb-1">
                  <label className="label-text mb-2"> Password </label>
                  <Link
                    className="mb-2 text-decoration-none"
                    style={{
                      color: "rgba(248, 173, 21, 1)",
                      fontSize: "14px",
                    }}
                  >
                    Forgot Password?
                  </Link>
                </p>

                <div className="border d-flex rounded-3">
                  <input
                    name="password"
                    id="password"
                    type={showPass ? "text" : "password"}
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
                  <p className="text-danger my-1" style={{ fontSize: "14px" }}>
                    {errors?.password}
                  </p>
                )}
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
                    "Sign In "
                  )}
                </button>
              </div>
              {error?.length && !loading && (
                <h6 className="text-danger text-center my-4">{error}</h6>
              )}

              <div className="my-4 d-flex justify-content-center align-items-center ">
                <p
                  className="col-lg-4 mb-0"
                  style={{
                    borderBottom: "1px solid rgba(145, 148, 153, 0.5)",
                  }}
                ></p>
                <p className="col-lg-4 mb-0 text-center label-text">
                  Or sign in with
                </p>
                <p
                  className="col-lg-4 mb-0"
                  style={{
                    borderBottom: "1px solid rgba(145, 148, 153, 0.5)",
                  }}
                ></p>
              </div>
              <div className="mb-2">
                <button className="label-text another-btn btn" type="submit">
                  Another Method
                </button>

                <p className="my-4 mb-0 text-center label-text">
                  You dont Have an Account ?{" "}
                  <Link
                    className="mb-2 text-decoration-none"
                    style={{
                      color: "rgba(248, 173, 21, 1)",
                      fontSize: "14px",
                    }}
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
