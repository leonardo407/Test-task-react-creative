import React, { FC, ReactNode, MouseEvent } from "react";
import classes from "./Button.module.scss";

type ButtonPropsType = {
  children: ReactNode;
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
};

const Button: FC<ButtonPropsType> = ({ children, onClick, disabled }) => {
  return (
    <button onClick={onClick} className={classes.btn} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
