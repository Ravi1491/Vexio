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
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";

export default function Dashboard() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Reviews requested",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Reviews received",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          fontSize: "22px",
          fontWeight: 500,
          color: "#012970",
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "24px 36px",
            cursor: "pointer",
            boxShadow: "0 25px 35px rgba(239, 207, 227,0.4)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#012970",
            }}
          >
            Reviews Requested
          </div>
          <div>
            <img src="" alt="" />
            <span
              style={{
                fontSize: "28px",
                color: "#012970",
                fontWeight: 700,
              }}
            >
              0
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "24px 36px",
            cursor: "pointer",
            boxShadow: "0 25px 35px rgba(239, 207, 227, 0.4)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#012970",
            }}
          >
            Reviews received
          </div>
          <div>
            <img src="" alt="" />
            <span
              style={{
                fontSize: "28px",
                color: "#012970",
                fontWeight: 700,
              }}
            >
              0
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            cursor: "pointer",
            padding: "24px 36px",
            boxShadow: "0 25px 35px rgba(239, 207, 227,0.4)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: 500,
              color: "#012970",
            }}
          >
            Product Reviews (overall)
          </div>
          <div>
            <img src="" alt="" />
            <span
              style={{
                fontSize: "28px",
                color: "#012970",
                fontWeight: 700,
              }}
            >
              0
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "50%",
          height: "50%",
          marginTop: "100px",
        }}
      >
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
