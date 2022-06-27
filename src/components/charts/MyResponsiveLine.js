import React from "react";
import { ResponsiveLine } from "@nivo/line";
const MyResponsiveLine = () => {
  return (
    <>
      <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 30, bottom: 40, left: 10 }}
        xScale={{ type: "point" }}
        gridYValues={[120, 140, 150, 200, 240]}
        yScale={{
          type: "linear",
          min: "130",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={{
          orient: "right",
          tickSize: 1,
          tickPadding: 20,
          tickRotation: 0,
          legend: "",
          legendOffset: 0,
        }}
        axisBottom={{
          orient: "bottom",
          tickSize: 6,
          tickPadding: 14,
          tickRotation: 0,
          legend: "",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={null}
        enableGridX={false}
        lineWidth={3}
        enablePoints={false}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={3}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-18}
        enableArea={true}
        areaOpacity={0.3}
        useMesh={true}
        legends={[]}
        defs={[
          {
            id: "gradientC",
            type: "linearGradient",
            colors: [
              { offset: 0, color: "#26AB6D", opacity: 1 },
              { offset: 100, color: "#26AB6D", opacity: 0 },
            ],
            gradientTransform: "rotate(180deg)",
          },
        ]}
        fill={[{ match: "*", id: "gradientC" }]}
        colors={["#26AB6D"]}
      />
    </>
  );
};

let data = [
  {
    id: "japan",
    color: "#26AB6D",
    data: [
      {
        x: "10",
        y: 150,
      },
      {
        x: "20",
        y: 120,
      },
      {
        x: "30",
        y: 140,
      },
      {
        x: "40",
        y: 240,
      },
      {
        x: "50",
        y: 200,
      },
    ],
  },
];

export default MyResponsiveLine;
