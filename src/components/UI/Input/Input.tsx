import React, { ChangeEvent, FC } from "react";
import classes from "./Input.module.scss";

type InputPropsType = {
  type?: string;
  id?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

const Input: FC<InputPropsType> = ({
  type = "text",
  id,
  value,
  onChange,
  label,
}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className={classes.input}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
