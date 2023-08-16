import axios from "axios";
import { BOOK_REQUEST, EDIT_BOOK_REQUEST } from "../constant";
import Swal from "sweetalert2";

// get book list
const getBookHandler = (page, search = "", filter = "") => {
  return async (dispatch) => {
    dispatch({ type: BOOK_REQUEST, payload: { loading: true } });
    try {
      const response = await axios.get(
        `/book?page=${page}&limit=10&search=${search}&author=${filter}`
      );
      dispatch({
        type: BOOK_REQUEST,
        payload: {
          loading: false,
          bookList: response?.data?.data,
          error: null,
        },
      });
    } catch (error) {
      if (error.response.status === 404) {
        dispatch({
          type: BOOK_REQUEST,
          payload: { loading: false, error: error?.response?.data?.message },
        });
      } else {
        dispatch({
          type: BOOK_REQUEST,
          payload: { loading: false, error: error?.message },
        });
      }
    }
  };
};

const changePage = (currentPage) => {
  return async (dispatch) => {
    dispatch({
      type: BOOK_REQUEST,
      payload: { loading: false, page: currentPage },
    });
  };
};

// add book data
const addBookHandler = (data, page, setErrors, handleClose) => {
  return async (dispatch) => {
    dispatch({ type: BOOK_REQUEST, payload: { loading: true } });
    try {
      await axios.post("/book/create-book", data);
      dispatch({ type: BOOK_REQUEST, payload: { loading: false } });
      handleClose();
      dispatch(getBookHandler(page));
    } catch (error) {
      if (error?.response?.status === 422) {
        let err = {};
        error?.response?.data?.Error?.errors?.forEach((elem) => {
          err[elem?.param] = elem?.msg;
        });
        setErrors(err);
        dispatch({
          type: BOOK_REQUEST,
          payload: { loading: false },
        });
      } else {
        dispatch({
          type: BOOK_REQUEST,
          payload: { loading: false, error: error?.message },
        });
        setTimeout(() => {
          dispatch({
            type: BOOK_REQUEST,
            payload: { loading: false, error: null },
          });
        }, 1000);
      }
    }
  };
};

// edit book data
const editBookHandler = (data, id, setErrors, handleClose) => {
  return async (dispatch) => {
    dispatch({ type: BOOK_REQUEST, payload: { loading: true } });
    try {
      const res = await axios.put(`/book/update-book/${id}`, data);
      handleClose();
      dispatch({
        type: EDIT_BOOK_REQUEST,
        payload: { loading: false,data: res?.data?.data },
      });
    } catch (error) {
      if (error?.response?.status === 422) {
        let err = {};
        error?.response?.data?.Error?.errors?.forEach((elem) => {
          err[elem?.param] = elem?.msg;
        });
        dispatch({
          type: BOOK_REQUEST,
          payload: { loading: false },
        });
        setErrors(err);
      } else {
        dispatch({
          type: BOOK_REQUEST,
          payload: { loading: false, error: error?.message },
        });
        setTimeout(() => {
          dispatch({
            type: BOOK_REQUEST,
            payload: { loading: false, error: null },
          });
        }, 1000);
      }
    }
  };
};

// remove book data
const removeBookHandler = (id, page) => {
  return async (dispatch) => {
    dispatch({ type: BOOK_REQUEST, payload: { loading: true, error: null } });
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
          await axios.delete(`/book/delete-book/${id}`);
          dispatch({
            type: BOOK_REQUEST,
            payload: { loading: false, error: null },
          });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          dispatch(getBookHandler(page));
        } else {
          dispatch({
            type: BOOK_REQUEST,
            payload: { loading: false, error: null },
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          dispatch({
            type: BOOK_REQUEST,
            payload: { loading: false, error: error?.message },
          });
          setTimeout(() => {
            dispatch({
              type: BOOK_REQUEST,
              payload: { loading: false, error: null },
            });
          }, 1000);
        }
      });
  };
};

export {
  getBookHandler,
  changePage,
  addBookHandler,
  editBookHandler,
  removeBookHandler,
};
