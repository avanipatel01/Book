import axios from "axios";
import {
  ADD_AUTHOR_REQUEST,
  AUTHOR_REQUEST,
  REMOVE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_REQUEST,
} from "../constant";
import Swal from "sweetalert2";

// get author list
const getAuthorHandler = () => {
  return async (dispatch) => {
    dispatch({ type: AUTHOR_REQUEST, payload: { loading: true } });
    try {
      const response = await axios.get("/author/");
      dispatch({
        type: AUTHOR_REQUEST,
        payload: { loading: false, author: response?.data?.data, error: null },
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: AUTHOR_REQUEST,
          payload: { loading: false, error: error?.response?.data?.message },
        });
      } else {
        dispatch({
          type: AUTHOR_REQUEST,
          payload: { loading: false, error: error?.message },
        });
      }
    }
  };
};

// add author data
const addAuthorHandler = (data, setErrors, handleClose) => {
  return async (dispatch) => {
    dispatch({ type: AUTHOR_REQUEST, payload: { loading: true } });
    try {
      const response = await axios.post("/author/create-author", data);
      handleClose();
      dispatch({
        type: ADD_AUTHOR_REQUEST,
        payload: response?.data?.data,
        loading: false,
      });
    } catch (error) {
      if (error?.response?.status === 422) {
        let err = {};
        error?.response?.data?.Error?.errors?.forEach((elem) => {
          err[elem?.param] = elem?.msg;
        });
        setErrors(err);
        dispatch({
          type: AUTHOR_REQUEST,
          payload: { loading: false },
        });
      } else {
        dispatch({
          type: AUTHOR_REQUEST,
          payload: { loading: false, error: error?.message },
        });
        setTimeout(() => {
          dispatch({
            type: AUTHOR_REQUEST,
            payload: { loading: false, error: null },
          });
        }, 1000);
      }
    }
  };
};

// edit author data
const editAuthorHandler = (data, id, setErrors, handleClose) => {
  return async (dispatch) => {
    dispatch({ type: AUTHOR_REQUEST, payload: { loading: true } });
    try {
      const response = await axios.put(`/author/update-author/${id}`, data);
      console.log("response Author: ",response?.data?.data);
      handleClose();
      dispatch({
        type: UPDATE_AUTHOR_REQUEST,
        loading: false,
        id: id,
        data: response?.data?.data,
      });
    } catch (error) {
      if (error?.response?.status === 422) {
        let err = {};
        error?.response?.data?.Error?.errors?.forEach((elem) => {
          err[elem?.param] = elem?.msg;
        });
        setErrors(err);
        dispatch({
          type: AUTHOR_REQUEST,
          payload: { loading: false },
        });
      } else {
        dispatch({
          type: AUTHOR_REQUEST,
          payload: { loading: false, error: error?.message },
        });
        handleClose();
        setTimeout(() => {
          dispatch({
            type: AUTHOR_REQUEST,
            payload: { loading: false, error: null },
          });
        }, 1000);
      }
    }
  };
};

// remove author data
const removeAuthorHandler = (id) => {
  return async (dispatch) => {
    dispatch({ type: AUTHOR_REQUEST, payload: { loading: true } });

    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/author/delete-author/${id}`);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          dispatch({
            type: REMOVE_AUTHOR_REQUEST,
            payload: { loading: false, id: id },
          });
        } else {
          dispatch({
            type: REMOVE_AUTHOR_REQUEST,
            payload: { loading: false },
          });
        }
      })
      .catch((error) => {
        if (error?.response?.status === 404) {
          dispatch({
            type: REMOVE_AUTHOR_REQUEST,
            payload: { loading: false, error: error?.message },
          });
          setTimeout(() => {
            dispatch({
              type: REMOVE_AUTHOR_REQUEST,
              payload: { loading: false, error: null },
            });
          }, 1000);
        }
      });
  };
};

export {
  getAuthorHandler,
  addAuthorHandler,
  removeAuthorHandler,
  editAuthorHandler,
};
