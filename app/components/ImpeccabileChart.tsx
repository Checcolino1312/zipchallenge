"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Props {
  francescoImpec: number;
  francescoTotal: number;
  pierInpec: number;
  pierTotal: number;
}

export default function ImpeccabileChart({ francescoImpec, francescoTotal, pierInpec, pierTotal }: Props) {
  const data = [
    {
      name: "Francesco ✦",
      value: francescoImpec,
      pct: Math.round(francescoImpec / francescoTotal * 100),
      fill: "#3b82f6",
    },
    {
      name: "Pierpaolo ✦",
      value: pierInpec,
      pct: Math.round(pierInpec / pierTotal * 100),
      fill: "#f97316",
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
          label={({ name, value, percent }) => `${Math.round((percent ?? 0) * 100)}%`}
          labelLine={false}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 8 }} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
