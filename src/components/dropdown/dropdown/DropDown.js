import React, { useEffect, useRef, useState } from 'react';
import Styles from "./DropDown.module.scss";
import { Dropdown } from 'react-bootstrap';

const DropDown = ({ title, children, className, menuClassName }) => {


    return (
        <>
            <Dropdown className={`${Styles.Dropdown} ${className || ""}`}>
                <Dropdown.Toggle>
                    {title}
                </Dropdown.Toggle>

                <Dropdown.Menu className={`${Styles.dropMenu} ${menuClassName || ""}`}>
                    {children}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default DropDown

        // <div className={Styles.dropdown}>
        //     <span className={Styles.title}
        //         onClick={() => setIsOpen(true)}
        //     >
        //         DropDown
        //     </span>

        //     <div ref={ref} className={`${Styles.dropdownBox} ${isOpen ? Styles.show : ""}`}>
        //         textttttttttttttttttttttttt
        //     </div>
        // </div>