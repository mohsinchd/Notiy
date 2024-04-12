import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
} from "../constants/userConstants";
import axios from "axios";
import { API_URL } from "./forgotPasswordActions";

export const userLogin = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    const { data } = await axios.post(
      `${API_URL}/api/v1/user/login`,
      userInfo,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });

    const { data } = await axios.get(`${API_URL}/api/v1/user/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: LOGOUT_USER_SUCCESS,
      payload: data.message,
    });

    localStorage.removeItem("user");
  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const userRegister = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const { data } = await axios.post(
      `${API_URL}/api/v1/user/register`,
      userInfo,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data.user,
    });

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
