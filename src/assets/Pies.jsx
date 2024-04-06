import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Pies(data) {
  const filteredData = Object.entries(data.data).map(([name, number]) => ({
    name,
    number,
  }));
  console.log(filteredData);

  const test = [
    { name: "A A", value: 2 },
    { name: "B", value: 2 },
    { name: "C", value: 8 },
    { name: "D", value: 2 },
  ];
  console.log(test);
  return (
    <ResponsiveContainer width={300} height={300}>
      <PieChart>
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
