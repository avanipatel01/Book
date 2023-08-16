import { BOOK_REQUEST, EDIT_BOOK_REQUEST } from "../constant/index";

const initialState = {
  bookList: [],
  page: 1,
  loading: true,
  error: null,
};

const BookReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOK_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case EDIT_BOOK_REQUEST:
      const payloadData = action.payload;
      let tempBookList = state?.bookList?.docs;
      tempBookList = tempBookList?.map((elem) =>
        elem?._id === payloadData?.data?._id ? payloadData?.data : elem
      );
      return {
        ...state,
        loading: action.payload.loading,
        bookList: {
          ...state.bookList,
          docs: tempBookList,
        },
      };

    default:
      return state;
  }
};

export default BookReducer;
