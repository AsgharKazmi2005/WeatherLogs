import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function RainBar(data) {
  return (
    <ResponsiveContainer width={405} height={350}>
      <BarChart
        width="300px"
        aspect={3}
        data={data.data}
        margin={{
          top: 30,
          right: 40,
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rain" name="Rain Chance %" fill="#234187" />
      </BarChart>
    </ResponsiveContainer>
  );
}
