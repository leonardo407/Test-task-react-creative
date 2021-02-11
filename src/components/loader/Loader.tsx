import React, { FC } from "react";
import classes from "./Loader.module.scss";

const Loader: FC = () => (
  <div className={classes.ldsRing}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Loader;
