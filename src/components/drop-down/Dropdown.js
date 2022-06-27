import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/all";
import Styles from "./Dropdown.module.scss";

const Dropdown = ({
  title,
  children,
  pathnameActive,
  icon,
  stateClose,
  setStateClose,
  size,
}) => {
  //////////////////////////////////////////////////////////////////////////////////////////////////state
  const [showMenu, setShowMenu] = useState(false);
  const [widthPage, setWidthPage] = useState(document.body.offsetWidth);
  //////////////////////////////////////////////////////////////////////////////////////////////////hook
  const { pathname } = useLocation();
  let ref = useRef(null);
  useEffect(() => {
    window.addEventListener("resize", () => {
      let ChangeWidth = document.body.offsetWidth;
      setWidthPage(ChangeWidth);
    });
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    // let childType = children.props?.className.includes("MobileMenu");
    if (showMenu) {
      if (widthPage < 575) {
        document.body.style.overflow = "hidden";
      } else if (widthPage > 575) {
        document.body.style = "";
      }
    }

    // if (showMenu && childType && widthPage < 575) {
    //   document.body.style.overflow = "hidden";
    // } else if (!showMenu && !childType && widthPage > 575) {
    //   document.body.style.overflow = "unset";
    // }
  }, [showMenu, widthPage]);
  useEffect(() => {
    if (stateClose) {
      setShowMenu(false);
      document.body.style = "";
    }
  }, [stateClose]);

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);
  //////////////////////////////////////////////////////////////////////////////////////////////////function

  const handleClickOutside = (event) => {
    if (!event.currentTarget.body.classList.value.includes("modal-open")) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
  };

  return (
    <div className={Styles.dropdown} ref={ref}>
      <div
        className={Styles.title}
        onClick={() => {
          setStateClose && setStateClose(false);
          setShowMenu((prev) => !prev);
        }}
      >
        {pathnameActive ? (
          <span
            className={`${
              pathname.includes(pathnameActive)
                ? "text-blue fw-500"
                : "text-white"
            } ms-4 size-4 pointer`}
          >
            {title}
            <AiFillCaretDown
              className={`${Styles.arrow} ${
                showMenu ? Styles.rotate : ""
              } me-1`}
              size={12}
            />
          </span>
        ) : (
          <span className="py-1 me-4 text-white pointer">
            <AiFillCaretDown
              className={`${Styles.arrow} ${
                showMenu ? Styles.rotate : ""
              } ms-1`}
              size={12}
            />
            {title}
          </span>
        )}
      </div>
      <div
        style={{ minWidth: size ? size : "" }}
        id={"dropDownShow"}
        className={`${Styles.menu} ${showMenu ? Styles.show : ""} `}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
