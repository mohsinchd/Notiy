import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { noteCreate } from "../actions/noteActions";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { CREATE_NOTE_RESET } from "../constants/noteConstants";

const NotesScreen = () => {
  const [note, setNote] = useState("");

  const loginUser = useSelector((state) => state.loginUser);
  const { user } = loginUser;

  const createNote = useSelector((state) => state.createNote);
  const { loading, error, note: createdNote } = createNote;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(noteCreate({ note }));
  };

  useEffect(() => {
    if (createdNote) {
      toast.success("Note Created");
      dispatch({ type: CREATE_NOTE_RESET });
      navigate("/note-detail");
    }

    if (error) {
      toast.error(error);
    }
  }, [createdNote, error, dispatch]);

  return (
    <div className="container text-light mt-3">
      <h1 className="display-4">Welcome to Notiy</h1>
      <h3>Name: {user.name}</h3>
      <h5>Email: {user.email}</h5>
      {user.isVerified ? (
        <div className="mine-container">
          {loading && <Spinner />}
          <form className="form" onSubmit={submitHandler}>
            <h4 className="text-dark">Create New Note</h4>
            <div className="div">
              <textarea
                className="input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
              <button className="btn-mine"> Add New Note </button>
            </div>
          </form>
        </div>
      ) : (
        <p className="lead text-center">
          Please confirm your Email first to add notes
        </p>
      )}
    </div>
  );
};

export default NotesScreen;
