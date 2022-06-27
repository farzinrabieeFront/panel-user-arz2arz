import React from 'react';
import { Nav } from 'react-bootstrap';
import { MdOutlineClose } from "react-icons/all"
import Sidebar from '../../../../sidebar/Sidebar';
import Styles from "./SlidingMenu.module.scss";


const SlidingMenu = ({ show, close }) => {
    return (
        <div className={`${Styles.menu} ${show ? Styles.show : ""} p-3 d-flex flex-wrap align-content-start`}>
                
                <div className={Styles.closeButton}><span onClick={() => close(false)}><MdOutlineClose size={30} /></span></div>
      

            <div
            >
                <Sidebar isSideClose={false} />
            </div>

        </div>
    )
}

export default SlidingMenu
