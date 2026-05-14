"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { HeadToHead } from "../types";

interface Props {
  h2h: HeadToHead;
}

export default function WinBarChart({ h2h }: Props) {
  const data = [
    { name: "Francesco", value: h2h.Francesco_wins, fill: "#3b82f6" },
    { name: "Pareggi", value: h2h.ties, fill: "#a1a1aa" },
    { name: "Pierpaolo", value: h2h.Pierpaolo_wins, fill: "#f97316" },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 600 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
