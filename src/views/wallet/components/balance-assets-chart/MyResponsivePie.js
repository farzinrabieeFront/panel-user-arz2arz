import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";
// const data = [
//   {
//     id: "DOGE",
//     label: "DOGE",
//     value: 200,
//     color: "#53A5E1",
//   },
//   {
//     id: "others",
//     label: "others",
//     value: 100,
//     color: "#ED5254",
//   },
//   {
//     id: "ETH",
//     label: "ETH",
//     value: 200,
//     color: "#26AB6D",
//   },
//   {
//     id: "USDT",
//     label: "USDT",
//     value: 400,
//     color: "#F0B90B",
//   },
//   {
//     id: "BTC",
//     label: "BTC",
//     value: 566,
//     color: "#00BABA",
//   },
// ];

export const MyResponsivePie = ({ data }) => {
  const [state, setState] = useState(true);
  useEffect(() => {
    data.map((itm, ind) => {
      if (itm?.noValue) {
        setState(false);
      } else {
        setState(true);
      }
    });
  }, [data]);

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 0, right: 60, bottom: 0, left: 60 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeInnerRadiusOffset={8}
      activeOuterRadiusOffset={5}
      borderWidth={4}
      enableArcLinkLabels={state}
      borderColor="#ffffff"
      back
      arcLinkLabelsSkipAngle={17}
      arcLinkLabelsTextOffset={35}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={-1}
      arcLinkLabelsDiagonalLength={15}
      arcLinkLabelsStraightLength={5}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsSkipAngle={10}
      colors={data.map((item, _) => item.color)}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={
        [
          // {
          //   match: {
          //     id: "ruby",
          //   },
          //   id: "dots",
          // },
          // {
          //   match: {
          //     id: "c",
          //   },
          //   id: "dots",
          // },
          // {
          //   match: {
          //     id: "go",
          //   },
          //   id: "dots",
          // },
          // {
          //   match: {
          //     id: "python",
          //   },
          //   id: "dots",
          // },
          // {
          //   match: {
          //     id: "scala",
          //   },
          //   id: "lines",
          // },
          // {
          //   match: {
          //     id: "lisp",
          //   },
          //   id: "lines",
          // },
          // {
          //   match: {
          //     id: "elixir",
          //   },
          //   id: "lines",
          // },
          // {
          //   match: {
          //     id: "javascript",
          //   },
          //   id: "lines",
          // },
        ]
      }
      legends={[]}
    />
  );
};
