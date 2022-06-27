import { useEffect } from "react";
import Chart from "react-apexcharts";


const PieChart = ({ data, colors, labels }) => {
  let options;
  options = {
    series: data,
    labels: ['BTC', 'USDT', 'DOGE'],
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'donut',
    },

    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],

    plotOptions: {
      pie: {
        donut: {
          size: '65',
        }
      },
    },

    colors: colors,
    legend: {
      show: false,
    },

    tooltip: {
      enabled: false,
    },

    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.6,
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.75,
        }
      },
    }
  };


  return (
    <Chart
      options={options}
      series={options.series}
      type="donut"
      // width="250px"
      height="214px"
    />
  );
};

export default PieChart;
