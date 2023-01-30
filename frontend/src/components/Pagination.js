import React from "react";

const Pagination = ({ totalNotes, notesPerPage, changePage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <h6>Page No</h6>
      <ul className="pagination">
        {pages.map((pageNo, index) => (
          <li className="page-item" key={index}>
            <button
              className="page-item btn btn-secondary me-2 btn-lg"
              onClick={() => changePage(pageNo)}
            >
              {pageNo}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pagination;
