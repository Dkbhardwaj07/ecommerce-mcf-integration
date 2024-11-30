// TrackingDashboard.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", shipments: 30 },
  { name: "Feb", shipments: 45 },
  { name: "Mar", shipments: 60 },
  { name: "Apr", shipments: 40 },
  // Add more data as needed
];

function TrackingDashboard() {
  return (
    <div className="dashboard-container">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="shipments" stroke="#4CAF50" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TrackingDashboard;
