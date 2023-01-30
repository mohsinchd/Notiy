import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginUserReducer,
  logoutUserReducer,
  registerUserReducer,
} from "./reducers/userReducers";
import {
  forgotPasswordReducer,
  resetPasswordReducer,
} from "./reducers/forgotPasswordReducers";
import {
  createNoteReducer,
  deleteNoteReducer,
  getNotesReducer,
} from "./reducers/noteReducers";

const reducers = combineReducers({
  loginUser: loginUserReducer,
  logoutUser: logoutUserReducer,
  registerUser: registerUserReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  createNote: createNoteReducer,
  getNotes: getNotesReducer,
  deleteNote: deleteNoteReducer,
});

const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  loginUser: {
    user: userFromLocalStorage,
  },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
