
import { useMemo } from "react";
import Styles from "./Tabs.module.scss";
import { Link, useLocation } from "react-router-dom";
import CustomizedButton from "../../../components/form/button/Button";

export default function Tabs({ data }) {
    const { pathname } = useLocation();

    const tabs = useMemo(() => {
        return data.map((item, i) =>
            <Link to={item.to} key={i}>
                <CustomizedButton
                    variant={`${pathname.includes(item.to) ? "blue" : "light"}`}
                    className={`${Styles.tabBtn} size-5 mx-1 ms-md-3 fw-500 text-nowrap`}
                >
                    {item.title}
                </CustomizedButton>
            </Link>

        )
    }, [data]);

    return (
        <div
            className={`${Styles.overflow} d-flex align-items-center justify-content-start`}
        >
            {tabs}
        </div>
    );
}


// TODO : remove CustomizedButton dependency