import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/forgotPasswordConstants";

import axios from "axios";
import { LOGIN_USER_SUCCESS } from "../constants/userConstants";

export const API_URL = "http://localhost:4000";

export const passwordForgot = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const { data } = await axios.post(
      `${API_URL}/api/v1/user/forgot/password`,
      email
    );

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      error: error.response.data.message,
    });
  }
};

export const passwordReset = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const { data } = await axios.put(
      `${API_URL}/api/v1/user/reset/password/${token}`,
      {
        password,
      }
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      error: error.response.data.message,
    });
  }
};
