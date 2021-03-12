import React, { FC } from "react";
import classes from "./Pagination.module.scss";
import Button from "../UI/Button/Button";

type PaginationPropsType = {
  page: number;
  prevPage: () => void;
  nextPage: () => void;
};

const Pagination: FC<PaginationPropsType> = ({ page, prevPage, nextPage }) => {
  return (
    <div className={classes.pagination}>
      <Button onClick={prevPage} disabled={page === 1}>
        &lt;
      </Button>
      <p className={classes.numberPage}>{page}</p>
      <Button onClick={nextPage}>&gt;</Button>
    </div>
  );
};

export default Pagination;
