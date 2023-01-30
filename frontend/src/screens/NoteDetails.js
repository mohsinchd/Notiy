import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { noteGet } from "../actions/noteActions";
import Spinner from "../components/Spinner";
import Note from "../components/Note";
import Pagination from "../components/Pagination";

const NoteDetails = () => {
  const dispatch = useDispatch();

  const getNotes = useSelector((state) => state.getNotes);
  const { loading, error, totalNotes, notes } = getNotes;

  const changePage = (p) => {
    dispatch(noteGet(p));
  };

  useEffect(() => {
    dispatch(noteGet());
  }, []);

  return (
    <div className="container mt-3">
      <Link to="/notes" className="btn btn-primary">
        Go to Add Note
      </Link>
      <div className="form-group mt-3">
        <label htmlFor="search" className="text-light">
          Search Note
        </label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => dispatch(noteGet(1, e.target.value))}
        />
      </div>
      <div className="row mt-3">
        {loading ? (
          <Spinner />
        ) : error ? (
          <h1>{error}</h1>
        ) : (
          notes.map((note) => {
            return (
              <div key={note._id} className="col-lg-4 col-md-3">
                <Note note={note} />
              </div>
            );
          })
        )}
      </div>
      {totalNotes > 6 && (
        <Pagination
          totalNotes={totalNotes}
          notesPerPage={6}
          changePage={changePage}
        />
      )}
    </div>
  );
};

export default NoteDetails;
