import React from "react";
import { Button } from "react-bootstrap";
import Styles from "./Button.module.scss";
import { FiChevronLeft, FiChevronRight } from "react-icons/all";

import barLoadingSvg from "../../../assets/svgs/loading/bars.svg";

const CustomizedButton = ({
  children,
  size = "md",
  gradient,
  className,
  variant = "success",
  loading = false,
  outlined = false,
  disabled = false,
  isFullWidth,
  leftIcon,
  rightIcon,
  onClick,
  ...rest
}) => {
  // <span className={Styles.leftIcon}><FiChevronLeft size={20} /></span>
  // <span className={Styles.rightIcon}><FiChevronRight size={20} /></span>
  return (
    <Button
      disabled={loading || disabled}
      {...rest}
      className={`${Styles.btn} ${leftIcon ? Styles.hasLeftIcon : ""} ${
        rightIcon ? Styles.hasRightIcon : ""
      } ${className} ${gradient ? Styles.gradient : ""} ${
        isFullWidth ? "d-block w-100" : ""
      }`}
      variant={`${outlined ? "outline-" : ""}${variant}`}
      size={size}
      onClick={onClick}
    >
      {loading ? (
        <img src={barLoadingSvg} style={{ height: "26px" }} alt="" />
      ) : (
        <>
          {children}
          {leftIcon ? (
            <span className={Styles.leftIcon}>{leftIcon}</span>
          ) : rightIcon ? (
            <span className={Styles.rightIcon}>{rightIcon}</span>
          ) : null}
        </>
      )}
    </Button>
  );
};
export default CustomizedButton;
