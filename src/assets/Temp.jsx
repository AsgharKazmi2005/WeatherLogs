import React, { PureComponent } from "react";
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

function Temp(data) {
  console.log(data);
  return (
    <ResponsiveContainer width={450} height={350}>
      <LineChart
        width={500}
        height={300}
        data={data.data}
        margin={{
          top: 5,
          right: 0,
          left: 2,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="High" stroke="#EE4126" />
        <Line type="monotone" dataKey="Average" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Low" stroke="#72D9F5" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Temp;
