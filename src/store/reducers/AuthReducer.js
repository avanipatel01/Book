import { LOGIN_REQUEST, SIGNUP_REQUEST, PROFILE_REQUEST } from "../constant";

const initialState = {
  profile: null,
  error: null,
  loading: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    case PROFILE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
