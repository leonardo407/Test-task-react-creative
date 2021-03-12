import React, { FC } from "react";
import classes from "./BeerItem.module.scss";
import { IBeerItem } from "../../types";

type BeerItemPropsType = {
  beerItem: IBeerItem;
};

const BeerItem: FC<BeerItemPropsType> = ({ beerItem }) => {
  return (
    <div className={classes.item}>
      <img src={beerItem.image_url} alt="" className={classes.img} />
      <p className={classes.name}>{beerItem.name}</p>
      <p className={classes.abv}>{beerItem.abv}</p>
      <p className={classes.description}>{beerItem.description}</p>
    </div>
  );
};

export default BeerItem;
