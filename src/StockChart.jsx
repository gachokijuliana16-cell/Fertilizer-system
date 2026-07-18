import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function StockChart({ stock }) {

  const labels = stock.map(item => item.fertilizer_type);

  const quantities = stock.map(item => Number(item.quantity_available));

  const data = {

    labels,

    datasets: [

      {
        label: "Available Bags",
        data: quantities,
        backgroundColor: "#22c55e",
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

      <h2>Current Stock Levels</h2>

      <Bar data={data} options={options} />

    </div>

  );

}

export default StockChart;