import React from 'react';
import Styles from "./Tips.module.scss";

const CustomizedTips = ({ children, variant, className, icon }) => {
    return (
        <div variant={variant || "info"} className={`${Styles.tips} ${className || ""}`}>
            {children}
        </div>
    )
};

export default CustomizedTips;
