import {
  CREATE_NOTE_REQUEST,
  CREATE_NOTE_SUCCESS,
  CREATE_NOTE_FAIL,
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAIL,
  CREATE_NOTE_RESET,
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAIL,
} from "../constants/noteConstants";

export const createNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTE_REQUEST:
      return { loading: true };
    case CREATE_NOTE_SUCCESS:
      return { loading: false, note: action.payload };
    case CREATE_NOTE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_NOTE_RESET:
      return {};
    default:
      return state;
  }
};

export const getNotesReducer = (state = { notes: [] }, action) => {
  switch (action.type) {
    case GET_NOTES_REQUEST:
      return { loading: true };
    case GET_NOTES_SUCCESS:
      return {
        loading: false,
        notes: action.payload.notes,
        totalNotes: action.payload.totalNotes,
      };
    case GET_NOTES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_NOTE_REQUEST:
      return { loading: true };
    case DELETE_NOTE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case DELETE_NOTE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
