import React from "react";
import { noteDelete, noteGet } from "../actions/noteActions";
import { useDispatch } from "react-redux";

const Note = ({ note }) => {
  const dispatch = useDispatch();

  const deleteNote = (id) => {
    dispatch(noteDelete(id));
    dispatch(noteGet());
  };

  return (
    <div className="card card-body bg-warning mb-3">
      <p className="lead">{note.note}</p>
      <p>Created At: {note.createdAt.substring(0, 10)}</p>
      <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>
        Delete Note
      </button>
    </div>
  );
};

export default Note;
