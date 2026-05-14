"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  francescoImpec: number;
  francescoTotal: number;
  pierInpec: number;
  pierTotal: number;
}

export default function ImpeccabileChart({ francescoImpec, francescoTotal, pierInpec, pierTotal }: Props) {
  const data = [
    { name: "Francesco", value: francescoImpec, pct: Math.round(francescoImpec / francescoTotal * 100), fill: "#3b82f6" },
    { name: "Pierpaolo", value: pierInpec, pct: Math.round(pierInpec / pierTotal * 100), fill: "#f97316" },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={4}
            dataKey="value"
            label={false}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: 8, fontSize: 13 }}
            formatter={(val) => [`${val} volte`]}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom legend */}
      <div className="flex gap-6">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.fill }} />
            <span className="text-zinc-600 dark:text-zinc-400">{entry.name}</span>
            <span className="font-bold" style={{ color: entry.fill }}>{entry.pct}%</span>
            <span className="text-zinc-400 text-xs">({entry.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
