import React from "react";

import arrow from '../../assets/img/arrow1.png'

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
    <div className="paginationContainer">
      <button className={page === 1 ? "disable" : ""} onClick={prevPage}>
        <img src={arrow} alt="arrow" />
      </button>
      <div className="page">
        Página{" "}
        <span className="page-color">
          {page} de {lastPage}
        </span>
      </div>
      <button className={page === lastPage ? "disable" : ""} onClick={nextPage}>
        <img src={arrow} alt="arrow" />
      </button>
    </div>
  );
};
