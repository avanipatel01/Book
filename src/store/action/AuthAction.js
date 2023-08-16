import axios from "axios";
import { LOGIN_REQUEST, SIGNUP_REQUEST, PROFILE_REQUEST } from "../constant";

// userProfile

const getProfileHandler = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_REQUEST, payload: { loading: true } });
      const response = await axios.get("/user/get-profile");
      dispatch({
        type: PROFILE_REQUEST,
        payload: { profile: response?.data?.data, loading: false },
      });
    } catch (error) {
      if (error.request.status === 404) {
        localStorage.clear("authorization");
        navigate("/");
        dispatch({
          type: PROFILE_REQUEST,
          payload: { loading: false, profile: null },
        });
      } else {
        dispatch({
          type: PROFILE_REQUEST,
          payload: { loading: false, profile: null },
        });
      }
    }
  };
};

// signup
const signupUser = (data, navigate, setErrors) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST, payload: { loading: true } });
    try {
      const response = await axios.post("/user/signup", data);
      if (response) {
        dispatch({ type: SIGNUP_REQUEST, payload: { loading: false } });
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        let err = {};
        error?.response?.data?.Error?.errors?.forEach((element) => {
          err[element?.param] = element?.msg;
        });
        setErrors(err);
        dispatch({
          type: SIGNUP_REQUEST,
          payload: { loading: false },
        });
      } else {
        dispatch({
          type: SIGNUP_REQUEST,
          payload: { loading: false, error: error?.message },
        });
        setTimeout(() => {
          dispatch({
            type: SIGNUP_REQUEST,
            payload: { loading: false, error: null },
          });
        }, 1000);
      }
    }
  };
};

// login
const loginUser = (data, navigate, setErrors) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST, payload: { loading: true } });
    try {
      const response = await axios.post("/user/login", data);
      if (response.data) {
        console.log("respo", response);
        localStorage.setItem("authorization", response?.data?.token);
        navigate("/dashboard");
        dispatch({ type: LOGIN_REQUEST, payload: { loading: false } });
      }
    } catch (error) {
      if (error?.response?.status === 422) {
        let err = {};
        error.response?.data?.Error?.errors?.forEach((element) => {
          err[element?.param] = element?.msg;
        });
        setErrors(err);
        dispatch({
          type: LOGIN_REQUEST,
          payload: { loading: false },
        });
      } else {
        dispatch({
          type: LOGIN_REQUEST,
          payload: { loading: false, error: error?.message },
        });
        setTimeout(() => {
          dispatch({
            type: LOGIN_REQUEST,
            payload: { loading: false, error: null },
          });
        }, 1000);
      }
    }
  };
};

// logout

const logoutUser = (navigate) => {
  return () => {
    localStorage.clear("authorization");
    navigate("/");
  };
};

export { signupUser, loginUser, logoutUser, getProfileHandler };
