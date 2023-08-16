import {
  ADD_AUTHOR_REQUEST,
  AUTHOR_REQUEST,
  REMOVE_AUTHOR_REQUEST,
  UPDATE_AUTHOR_REQUEST,
} from "../constant/index";

const initialState = {
  author: [],
  loading: true,
  error: null,
};

const AuthorReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHOR_REQUEST:
      return {
        ...state,
        ...action?.payload,
      };
    case ADD_AUTHOR_REQUEST:
      return {
        ...state,
        author: [...state?.author, action?.payload],
        loading: action?.loading,
      };
    case UPDATE_AUTHOR_REQUEST:
      return {
        loading: action?.loading,
        author: [
          ...state?.author?.map((item) =>
            item?._id === action?.id ? action?.data : item
          ),
        ],
      };
    case REMOVE_AUTHOR_REQUEST:
      return {
        error: action.payload.error,
        author: state?.author?.filter((data) => {
          return data?._id !== action?.payload?.id;
        }),
      };
    default:
      return state;
  }
};

export default AuthorReducer;
