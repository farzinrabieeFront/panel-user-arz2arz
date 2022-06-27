import Chart from "react-apexcharts";

const PieChartComp = ({ data, colors, labels }) => {
  let options;
  options = {
    series: data,
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 1,
        size: 200,
        expandOnClick: false,
        donut: {
          size: "80%",
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: "22px",
              fontWeight: 600,
              formatter: function (val) {
                return 'val';
              },
            },
            value: {
              show: true,
              fontSize: "16px",
              fontWeight: 400,
              formatter: function (val) {
                return 'val';
              },
            },
          },
        },
      },
    },
    legend: {
      show: false,
    },
    fill: {
      colors: colors,
    },
    // plotOptions: {
    //   pie: {
    //     customScale: 1,
    //     size: 200,
    //     expandOnClick: false,

    //     donut: {
    //       size: "65%",
    //       labels: {
    //         show: true,
    //         name: "name",
    //         value: "value",
    //       },
    //     },
    //   },
    // },
  };
  return (
    <div className="app">
      <div >
        <div className="mixed-chart m-auto">
          <Chart
            options={options}
            series={options.series}
            type="donut"
            width="100%"
            height="200px"
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartComp;
