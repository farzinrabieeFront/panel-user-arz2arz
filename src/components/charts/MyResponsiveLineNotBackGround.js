import React from "react";
import { ResponsiveLine } from "@nivo/line";

const MyResponsiveLineNotBackGround = () => {
  return (
    <>
      <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 10, bottom: 0, left: 10 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        colors={["#AFB7CB"]}
        enablePoints={true}
        pointSize={2}
        enablePointLabel={true}
        legends={[]}
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
        y: 100,
      },
      {
        x: "20",
        y: 120,
      },
      {
        x: "30",
        y: 108,
      },
      {
        x: "40",
        y: 252,
      },
      {
        x: "50",
        y: 200,
      },
      {
        x: "60",
        y: 7,
      },
    ],
  },
];

export default MyResponsiveLineNotBackGround;
