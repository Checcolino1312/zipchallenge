"use client";

import { useState, useMemo } from "react";
import { DailyEntry } from "../types";

interface Props {
  daily: DailyEntry[];
}

function formatDate(d: string) {
  // d is DD/MM/YY
  const [day, month, year] = d.split("/");
  return `${day}/${month}/20${year}`;
}

export default function DailyTable({ daily }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "Francesco" | "Pierpaolo" | "pareggio">("all");
  const [page, setPage] = useState(0);
  const PER_PAGE = 30;

  const filtered = useMemo(() => {
    let rows = [...daily].reverse();
    if (filter !== "all") {
      rows = rows.filter((r) =>
        filter === "pareggio"
          ? r.winner === "pareggio"
          : r.winner === filter || r.winner === `solo_${filter}`
      );
    }
    if (search) {
      rows = rows.filter((r) => String(r.zip_num).includes(search) || r.date.includes(search));
    }
    return rows;
  }, [daily, filter, search]);

  const pages = Math.ceil(filtered.length / PER_PAGE);
  const visible = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const winnerStyle = (entry: DailyEntry) => {
    if (entry.winner === "Francesco" || entry.winner === "solo_Francesco") return "bg-blue-50 dark:bg-blue-950/30";
    if (entry.winner === "Pierpaolo" || entry.winner === "solo_Pierpaolo") return "bg-orange-50 dark:bg-orange-950/30";
    if (entry.winner === "pareggio") return "bg-zinc-50 dark:bg-zinc-800/30";
    return "";
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Cerca Zip # o data…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-1.5 text-sm bg-white dark:bg-zinc-800 dark:text-zinc-100 w-44"
        />
        <div className="flex gap-1">
          {(["all", "Francesco", "Pierpaolo", "pareggio"] as const).map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(0); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? f === "all" ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-800"
                    : f === "Francesco" ? "bg-blue-500 text-white"
                    : f === "Pierpaolo" ? "bg-orange-500 text-white"
                    : "bg-zinc-400 text-white"
                  : "bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600"
              }`}
            >
              {f === "all" ? "Tutti" : f === "pareggio" ? "Pareggi" : f}
            </button>
          ))}
        </div>
        <span className="text-sm text-zinc-500 dark:text-zinc-400 self-center">{filtered.length} risultati</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              <th className="text-left px-4 py-2.5 font-semibold">Zip</th>
              <th className="text-left px-4 py-2.5 font-semibold">Data</th>
              <th className="text-left px-4 py-2.5 font-semibold text-blue-600 dark:text-blue-400">Francesco</th>
              <th className="text-left px-4 py-2.5 font-semibold text-blue-400 dark:text-blue-500 text-xs">↩</th>
              <th className="text-left px-4 py-2.5 font-semibold text-orange-600 dark:text-orange-400">Pierpaolo</th>
              <th className="text-left px-4 py-2.5 font-semibold text-orange-400 dark:text-orange-500 text-xs">↩</th>
              <th className="text-left px-4 py-2.5 font-semibold">Vincitore</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {visible.map((row) => (
              <tr key={row.zip_num} className={`${winnerStyle(row)} transition-colors`}>
                <td className="px-4 py-2 font-mono font-semibold text-zinc-700 dark:text-zinc-300">#{row.zip_num}</td>
                <td className="px-4 py-2 text-zinc-500 dark:text-zinc-400">{formatDate(row.date)}</td>
                <td className="px-4 py-2">
                  {row.Francesco ? (
                    <span className={`font-mono ${row.winner === "Francesco" ? "font-bold text-blue-600 dark:text-blue-400" : "text-zinc-600 dark:text-zinc-400"}`}>
                      {row.Francesco.time_str}
                      {row.Francesco.impeccabile && <span className="ml-1 text-xs text-emerald-500">✦</span>}
                    </span>
                  ) : <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                </td>
                <td className="px-4 py-2 text-xs text-zinc-400 font-mono">
                  {row.Francesco ? (
                    row.Francesco.dietrofront === 0
                      ? <span className="text-emerald-500">0</span>
                      : row.Francesco.dietrofront ?? "?"
                  ) : ""}
                </td>
                <td className="px-4 py-2">
                  {row.Pierpaolo ? (
                    <span className={`font-mono ${row.winner === "Pierpaolo" ? "font-bold text-orange-600 dark:text-orange-400" : "text-zinc-600 dark:text-zinc-400"}`}>
                      {row.Pierpaolo.time_str}
                      {row.Pierpaolo.impeccabile && <span className="ml-1 text-xs text-emerald-500">✦</span>}
                    </span>
                  ) : <span className="text-zinc-300 dark:text-zinc-600">—</span>}
                </td>
                <td className="px-4 py-2 text-xs text-zinc-400 font-mono">
                  {row.Pierpaolo ? (
                    row.Pierpaolo.dietrofront === 0
                      ? <span className="text-emerald-500">0</span>
                      : row.Pierpaolo.dietrofront ?? "?"
                  ) : ""}
                </td>
                <td className="px-4 py-2">
                  {row.winner === "Francesco" && <span className="text-blue-600 dark:text-blue-400 font-semibold">Francesco 🏆</span>}
                  {row.winner === "Pierpaolo" && <span className="text-orange-600 dark:text-orange-400 font-semibold">Pierpaolo 🏆</span>}
                  {row.winner === "pareggio" && <span className="text-zinc-500">Pareggio 🤝</span>}
                  {row.winner === "solo_Francesco" && <span className="text-blue-400 text-xs">Solo Francesco</span>}
                  {row.winner === "solo_Pierpaolo" && <span className="text-orange-400 text-xs">Solo Pierpaolo</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-3 py-1 rounded-lg text-sm bg-zinc-100 dark:bg-zinc-700 disabled:opacity-40"
          >
            ← Prec
          </button>
          <span className="px-3 py-1 text-sm text-zinc-500 dark:text-zinc-400">
            {page + 1} / {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page === pages - 1}
            className="px-3 py-1 rounded-lg text-sm bg-zinc-100 dark:bg-zinc-700 disabled:opacity-40"
          >
            Succ →
          </button>
        </div>
      )}
    </div>
  );
}
