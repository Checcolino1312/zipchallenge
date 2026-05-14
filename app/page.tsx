import { ZipStats } from "./types";
import statsData from "./data/zip_stats.json";
import TrendChart from "./components/TrendChart";
import WinBarChart from "./components/WinBarChart";
import ImpeccabileChart from "./components/ImpeccabileChart";
import DailyTable from "./components/DailyTable";

const stats = statsData as ZipStats;

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-mono">{value}</span>
    </div>
  );
}

export default function Home() {
  const { head_to_head: h2h, Francesco: fc, Pierpaolo: pp, daily } = stats;

  const totalPlayed = h2h.total_shared_days + h2h.only_Francesco + h2h.only_Pierpaolo;
  const fcWinPct = Math.round((h2h.Francesco_wins / h2h.total_shared_days) * 100);
  const ppWinPct = Math.round((h2h.Pierpaolo_wins / h2h.total_shared_days) * 100);

  const lastGame = daily[daily.length - 1];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                🏁 ZIP Challenge
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                Francesco Paolo vs Pierpaolo Arpa · LinkedIn ZIP
              </p>
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 text-right">
              <span className="font-mono font-semibold text-zinc-700 dark:text-zinc-300">
                {totalPlayed}
              </span>{" "}
              giorni di sfida · ultimo: Zip #{lastGame.zip_num}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Head-to-Head Banner */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-5">Head to Head</h2>
          <div className="grid grid-cols-3 text-center mb-4">
            <div>
              <div className="text-4xl font-bold text-blue-500">{h2h.Francesco_wins}</div>
              <div className="text-sm text-zinc-500 mt-1">Francesco</div>
              <div className="text-xs text-zinc-400">{fcWinPct}%</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-zinc-400">{h2h.ties}</div>
              <div className="text-sm text-zinc-500 mt-1">Pareggi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500">{h2h.Pierpaolo_wins}</div>
              <div className="text-sm text-zinc-500 mt-1">Pierpaolo</div>
              <div className="text-xs text-zinc-400">{ppWinPct}%</div>
            </div>
          </div>

          {/* Win ratio bar */}
          <div className="flex rounded-full overflow-hidden h-3 mt-2">
            <div
              className="bg-blue-500 transition-all"
              style={{ width: `${fcWinPct}%` }}
            />
            <div
              className="bg-zinc-300 dark:bg-zinc-600"
              style={{ width: `${Math.round(h2h.ties / h2h.total_shared_days * 100)}%` }}
            />
            <div
              className="bg-orange-500 flex-1"
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-400 mt-1.5">
            <span>Francesco {fcWinPct}%</span>
            <span>Pierpaolo {ppWinPct}%</span>
          </div>
        </section>

        {/* Player Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Francesco */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-blue-200 dark:border-blue-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <h2 className="text-lg font-semibold">Francesco Paolo</h2>
            </div>
            <StatRow label="Partite giocate" value={fc.total_games} />
            <StatRow label="Vittorie" value={`${h2h.Francesco_wins} (${fcWinPct}%)`} />
            <StatRow label="Impeccabile ✦" value={`${fc.impeccabile_count} (${fc.impeccabile_pct}%)`} />
            <StatRow label="Media dietrofront" value={fc.avg_dietrofront ?? "—"} />
            <StatRow label="Best time" value={`${fc.best_time} — ${fc.best_dietrofront ?? "?"}↩ (Zip #${fc.best_zip})`} />
            <StatRow label="Worst time" value={`${fc.worst_time} — ${fc.worst_dietrofront ?? "?"}↩ (Zip #${fc.worst_zip})`} />
            <StatRow label="Media" value={fc.avg_time_str} />
            <StatRow label="Mediana" value={fc.median_time_str} />
          </div>

          {/* Pierpaolo */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-orange-200 dark:border-orange-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <h2 className="text-lg font-semibold">Pierpaolo Arpa</h2>
            </div>
            <StatRow label="Partite giocate" value={pp.total_games} />
            <StatRow label="Vittorie" value={`${h2h.Pierpaolo_wins} (${ppWinPct}%)`} />
            <StatRow label="Impeccabile ✦" value={`${pp.impeccabile_count} (${pp.impeccabile_pct}%)`} />
            <StatRow label="Media dietrofront" value={pp.avg_dietrofront ?? "—"} />
            <StatRow label="Best time" value={`${pp.best_time} — ${pp.best_dietrofront ?? "?"}↩ (Zip #${pp.best_zip})`} />
            <StatRow label="Worst time" value={`${pp.worst_time} — ${pp.worst_dietrofront ?? "?"}↩ (Zip #${pp.worst_zip})`} />
            <StatRow label="Media" value={pp.avg_time_str} />
            <StatRow label="Mediana" value={pp.median_time_str} />
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-base font-semibold mb-4">Vittorie per giocatore</h2>
            <WinBarChart h2h={h2h} />
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <h2 className="text-base font-semibold mb-1">Impeccabile ✦</h2>
            <p className="text-xs text-zinc-400 mb-3">Quante volte ha completato senza errori</p>
            <ImpeccabileChart
              francescoImpec={fc.impeccabile_count}
              francescoTotal={fc.total_games}
              pierInpec={pp.impeccabile_count}
              pierTotal={pp.total_games}
            />
          </div>
        </section>

        {/* Trend Chart */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h2 className="text-base font-semibold mb-1">Andamento tempi nel tempo</h2>
          <p className="text-xs text-zinc-400 mb-4">Tempo impiegato da entrambi (solo giorni con entrambi i risultati)</p>
          <TrendChart daily={daily} />
        </section>

        {/* Recap boxes */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Record assoluto", value: "0:04", sub: "Francesco & Pierpaolo", color: "text-emerald-500" },
            { label: "Peggior tempo", value: "2:53", sub: "Pierpaolo (Zip #76)", color: "text-red-500" },
            { label: "Streak più lunga", value: "Pierpaolo", sub: "più vittorie consecutive", color: "text-orange-500" },
            { label: "Impeccabile rate", value: "43%", sub: "Francesco (best)", color: "text-blue-500" },
          ].map((box) => (
            <div key={box.label} className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-center shadow-sm">
              <div className={`text-2xl font-bold ${box.color}`}>{box.value}</div>
              <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mt-1">{box.label}</div>
              <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{box.sub}</div>
            </div>
          ))}
        </section>

        {/* Table */}
        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
          <h2 className="text-base font-semibold mb-4">Tutti i risultati</h2>
          <DailyTable daily={daily} />
        </section>

      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-12 py-6 text-center text-xs text-zinc-400">
        ZIP Challenge · Francesco Paolo Ragusa vs Pierpaolo Arpa · Dati da WhatsApp
      </footer>
    </div>
  );
}
