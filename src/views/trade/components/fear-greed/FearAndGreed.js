import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TechnicalAnalysis from "react-tradingview-technical-analysis";
import Styles from "./FearAndGreed.module.scss";

export default function FearAndGreed() {
  const { spot } = useParams();


  return (
    <div className="p-2 rounded-12 bg-white h-100">
      <div className={`${Styles.fearGreed} h-100`}>
        <div className={Styles.title}>
          <span className="fw-500 text-gray-4">شاخص ترس و طمع </span>
          <span className="en fw-500 me-2 text-blue">
            {spot.split("-").join("/")}
          </span>
        </div>
        <TechnicalAnalysis
          symbol={spot.split("-").join("")}
          interval={TechnicalAnalysis.THEMES.ONE_HOUR}
          autoSize={true}
          isTransparent={true}
          showIntervalTabs={false}
        />
      </div>
    </div>
  );
}
//speedometerTitle-DPgs-R4s noTopMargin-DPgs-R4s compactMargin-1mNRKgwm
//speedometerTitle-DPgs-R4s noTopMargin-DPgs-R4s compactMargin-1mNRKgwm
