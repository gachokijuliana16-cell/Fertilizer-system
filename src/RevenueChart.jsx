import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function RevenueChart({ revenue }) {

  const data = {

    labels: ["Revenue"],

    datasets: [

      {
        label: "Tea SACCO Revenue",
        data: [revenue],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22,163,74,0.3)",
        tension: 0.4,
        fill: true,
      },

    ],

  };

  const options = {

    responsive: true,

    plugins: {

      legend: {

        position: "top",

      },

    },

  };

  return (

    <div className="chart-card">

      <h2>Revenue Overview</h2>

      <Line data={data} options={options} />

    </div>

  );

}

export default RevenueChart;