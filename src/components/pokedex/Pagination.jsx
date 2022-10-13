import React from "react";

import arrow from '../../assets/img/arrow.webp'

export const Pagination = ({ page, lastPage, prev, next }) => {
  
  const prevPage = () => {
    if (page > 1) {
      prev();
    }
  };

  const nextPage = () => {
    if (page < lastPage) {
      next();
    }
  };

  return (
    <div className="pagination-container">
      <button className={page === 1 ? "disable" : ""} onClick={prevPage}>
        <img src={arrow} alt="arrow" />
      </button>
      <div className="page">
        Page{" "}
        <span className="page-color">
          {page} of {lastPage}
        </span>
      </div>
      <button className={page === lastPage ? "disable" : ""} onClick={nextPage}>
        <img src={arrow} alt="arrow" />
      </button>
    </div>
  );
};
