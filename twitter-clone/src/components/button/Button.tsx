import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children?: React.ReactNode;
  classNames?: string;
}

const Button: React.FC<ButtonProps> = ({ children, classNames, ...rest }) => {
  return (
    <button className={`${styles.button} ${classNames}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
