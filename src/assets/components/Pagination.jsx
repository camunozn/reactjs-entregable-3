import React from 'react';

const Pagination = ({ pagesArr, currPage, totalPages, changePage }) => {
  return (
    <div className="pagination flex">
      <button
        className="btn btn--pagination"
        onClick={() => changePage(currPage - 1)}
        disabled={currPage === 1}
      >
        <i className="fa-solid fa-left-long"></i>
      </button>
      <ul className="pagination-pages flex">
        {pagesArr.map(page => (
          <li key={page}>
            <button
              className={`btn btn--pagination ${
                page === currPage ? 'btn--pagination--selected' : ''
              }`}
              onClick={() => changePage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="btn btn--pagination"
        onClick={() => changePage(currPage + 1)}
        disabled={currPage >= totalPages}
      >
        <i className="fa-solid fa-right-long"></i>
      </button>
    </div>
  );
};

export default Pagination;
