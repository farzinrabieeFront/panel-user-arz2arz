import React from "react";
import nodata from "../../assets/images/a2z-special-icon-2.png";

import Styles from "./NoData.module.scss";

const NoData = ({loading}) => {
    return (
        <div className={`${Styles.noData}`}>
            {loading ? (
                <div className="center-content w-75 my-5 py-5">
                    {Array.from({length: 5}, () => (
                        <div className={Styles.wave}/>
                    ))}
                </div>
            ) : (
                <img src={nodata}/>
            )}
            <span className="mt-3 size-4 text-gray-3">
        {loading ? "در حال بارگزاری" : "داده ای موجود نیست"}
      </span>
        </div>
    );
};

export default NoData;
