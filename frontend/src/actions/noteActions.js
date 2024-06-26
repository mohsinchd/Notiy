import {
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAIL,
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAIL,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
} from "../constants/noteConstants";
import { API_URL } from "./forgotPasswordActions";

import axios from "axios";

export const noteCreate = (note) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_NOTE_REQUEST,
    });

    const { data } = await axios.post(`${API_URL}/api/v1/note`, note, {
      withCredentials: true,
    });

    dispatch({
      type: CREATE_NOTE_SUCCESS,
      payload: data.note,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const noteGet =
  (page = "1", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_NOTES_REQUEST,
      });

      const { data } = await axios.get(
        `${API_URL}/api/v1/note?page=${page}&keyword=${keyword}`,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: GET_NOTES_SUCCESS,
        payload: {
          notes: data.notes,
          totalNotes: data.totalNotes,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_NOTES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const noteDelete = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_NOTE_REQUEST,
    });

    const { data } = await axios.delete(`${API_URL}/api/v1/note/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: DELETE_NOTE_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: DELETE_NOTE_FAIL,
      payload: error.response.data.message,
    });
  }
};
