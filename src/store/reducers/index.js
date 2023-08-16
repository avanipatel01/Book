import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import AuthorReducer from "./AuthorReducer";
import BookReducer from "./BookReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  book: BookReducer,
  author: AuthorReducer,
});

export default rootReducer;
