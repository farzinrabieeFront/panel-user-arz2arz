import { Link, useLocation } from "react-router-dom";
import Styles from "./NavItem.module.scss";
import TriangleTitle from "../../../components/triangle-title/TriangleTitle";

export default function NavItem({ title, subItem = [] }) {
  const { pathname } = useLocation();
  return (
    <li className={`${Styles.item} d-flex flex-column align-items-start`}>
      <div className="col-12 d-flex align-items-center justify-content-between p-3"
      >
        <TriangleTitle><h2 className="size-4 fw-500 text-blue mb-0 ">{title}</h2></TriangleTitle>
      </div>
      <ul className={`${Styles.subMenu} col-12 m-0 p-0`}>
        {subItem.map((item, index) => {
          return (
            <li
              key={index}
              className={`${Styles.subItems} ${pathname.includes(item.active) ? Styles.active : ""}`}
            >
              <Link
                to={{ pathname: item.url, state: { type: item.state || null } }}
                className="d-flex w-100 px-3 py-2 size-4 align-items-center">
                <span className={`${Styles.icon} text-gray-1 ms-2`}>{item.Icon}</span>
                <span className="text-gray-3 fw-500">{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
