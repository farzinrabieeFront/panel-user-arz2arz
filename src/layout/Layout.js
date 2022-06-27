import { useState, useEffect, forwardRef, cloneElement } from "react";
import { useLocation } from "react-router-dom";
import Styles from "./Layout.module.scss";
import { Offcanvas } from "react-bootstrap";
import Loading from "../components/loading/Loading";
//components
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import MobileMenu from "./header/mobile-menu/MobileMenu";

let full_width_routes = [
  "trade",
  //  "fiat-trade"
];

const LayoutPanel = ({ children }, ref) => {
  const { pathname } = useLocation();
  const [humbergerSide, setHumbergerSide] = useState(false);
  const [openSide, setOpenSide] = useState(false);

  useEffect(() => {
    setOpenSide(false);
    if (full_width_routes.includes(pathname.split("/")[1])) {
      setHumbergerSide(true);
    } else {
      setHumbergerSide(false);
    }
  }, [pathname]);

  return (
    <div className={Styles.layout}>
      {/* <Loading /> */}
      {/*<MobileMenu />*/}
      <Header
        humbergerSide={humbergerSide}
        onOpenMenu={() => setOpenSide(true)}
      />
      <main
        className={`${Styles.main} ${
          humbergerSide ? Styles.humbergerSide : Styles.container
        } `}
      >
        {humbergerSide ? null : (
          <div className={`${Styles.sidebar}`}>
            <Sidebar isSideClose={false} />
          </div>
        )}
        <div className={`${Styles.content} ${humbergerSide ? "w-100" : ""} `}>
          {/*{cloneElement(children, { ref })}*/}
        </div>
      </main>
    </div>
  );
};

export default forwardRef(LayoutPanel);

// HiOutlineMenuAlt3   for humberger menu

// {humbergerSide ? (
//   <Offcanvas
//     show={openSide}
//     onHide={() => setOpenSide(false)}
//     placement="end"
//     className="border"
//   >
//     <Offcanvas.Header closeButton>
//       <Offcanvas.Title>Offcanvas</Offcanvas.Title>
//     </Offcanvas.Header>
//     <Offcanvas.Body>
//       <Sidebar isSideClose={false} />
//     </Offcanvas.Body>
//   </Offcanvas>
// ) : (
//   <div className={`${Styles.sidebar}`}>
//     <Sidebar isSideClose={false} />
//   </div>
// )}
