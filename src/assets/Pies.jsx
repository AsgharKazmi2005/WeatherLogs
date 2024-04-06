import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Pies(data) {
  const filteredData = Object.entries(data.data).map(([name, number]) => ({
    name,
    number,
  }));

  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart
        margin={{
          top: 0,
          right: 0,
          left: 20,
        }}
      >
        <Pie
          data={filteredData}
          dataKey="number"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#234187"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Pies;
