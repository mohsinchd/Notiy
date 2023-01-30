import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_RESET,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_RESET,
} from "../constants/userConstants";

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true, ...state };
    case LOGIN_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload };
    case LOGIN_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const logoutUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_USER_REQUEST:
      return { loading: true, ...state };
    case LOGOUT_USER_SUCCESS:
      return { loading: false, message: action.payload };
    case LOGOUT_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true, ...state };
    case REGISTER_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload };
    case REGISTER_USER_RESET:
      return {};
    default:
      return state;
  }
};
