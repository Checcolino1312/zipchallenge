"use client";

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
import { DailyEntry } from "../types";

interface Props {
  daily: DailyEntry[];
}

function formatSecs(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ color: string; name: string; value: number }>;
  label?: string | number;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 shadow-lg text-sm">
        <p className="font-semibold mb-1 text-zinc-700 dark:text-zinc-300">Zip #{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {formatSecs(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function TrendChart({ daily }: Props) {
  const data = daily
    .filter((d) => d.Francesco && d.Pierpaolo)
    .map((d) => ({
      zip_num: d.zip_num,
      Francesco: d.Francesco!.seconds,
      Pierpaolo: d.Pierpaolo!.seconds,
    }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="zip_num"
          tick={{ fontSize: 11 }}
          label={{ value: "Zip #", position: "insideBottomRight", offset: -5, fontSize: 12 }}
        />
        <YAxis
          tickFormatter={formatSecs}
          tick={{ fontSize: 11 }}
          width={45}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Francesco"
          stroke="#3b82f6"
          dot={false}
          strokeWidth={1.5}
        />
        <Line
          type="monotone"
          dataKey="Pierpaolo"
          stroke="#f97316"
          dot={false}
          strokeWidth={1.5}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
