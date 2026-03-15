"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { TrendTimepoint, TrendSignal } from "@/lib/types";

type Props = {
  selectedTrend: TrendSignal;
  series: TrendTimepoint[];
};

type TimelineOption = "3M" | "6M" | "1Y" | "3Y" | "ALL" | "Custom Date Range";

const ALL_SIGNALS: { key: keyof TrendTimepoint; label: string; color: string; bgClass: string; textClass: string; borderClass: string }[] = [
  { key: "searchInterest",       label: "Search Interest",          color: "#0ea5e9", bgClass: "bg-sky-50",      textClass: "text-sky-700",     borderClass: "border-sky-100" },
  { key: "socialVolume",         label: "Social Conversations",     color: "#d946ef", bgClass: "bg-fuchsia-50", textClass: "text-fuchsia-700", borderClass: "border-fuchsia-100" },
  { key: "contentCreation",      label: "Content Creation Growth",  color: "#10b981", bgClass: "bg-emerald-50", textClass: "text-emerald-700", borderClass: "border-emerald-100" },
  { key: "reviewVolume",         label: "Consumer Review Volume",   color: "#f59e0b", bgClass: "bg-amber-50",   textClass: "text-amber-700",   borderClass: "border-amber-100" },
  { key: "productLaunchMentions",label: "Product Launch Mentions",  color: "#8b5cf6", bgClass: "bg-violet-50", textClass: "text-violet-700",  borderClass: "border-violet-100" },
  { key: "marketBuzzIndex",      label: "Market Buzz Index",        color: "#ef4444", bgClass: "bg-red-50",     textClass: "text-red-700",     borderClass: "border-red-100" },
];

// Map a "YYYY-MM" value to a quarter string for comparison
function monthInputToQuarter(yearMonth: string): string {
  const [year, month] = yearMonth.split("-").map(Number);
  const q = Math.ceil(month / 3);
  return `Q${q} ${year}`;
}

// Quarter ordering helper
function quarterToIndex(q: string): number {
  const match = q.match(/Q(\d) (\d{4})/);
  if (!match) return 0;
  return parseInt(match[2]) * 4 + parseInt(match[1]);
}

export function TrendSignalGraph({ selectedTrend, series }: Props) {
  const [timeline, setTimeline] = useState<TimelineOption>("1Y");
  const [activeSignals, setActiveSignals] = useState<Set<string>>(
    new Set(ALL_SIGNALS.map((s) => s.key as string))
  );
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd]   = useState<string>("");

  const toggleSignal = (key: string) => {
    setActiveSignals((prev) => {
      const next = new Set(prev);
      if (next.has(key)) { next.delete(key); } else { next.add(key); }
      return next;
    });
  };

  const getVisibleData = (): TrendTimepoint[] => {
    if (timeline === "Custom Date Range") {
      if (!customStart || !customEnd) return series;
      const startIdx = quarterToIndex(monthInputToQuarter(customStart));
      const endIdx   = quarterToIndex(monthInputToQuarter(customEnd));
      return series.filter((pt) => {
        const idx = quarterToIndex(pt.month);
        return idx >= startIdx && idx <= endIdx;
      });
    }
    switch (timeline) {
      case "3M":  return series.slice(-1);
      case "6M":  return series.slice(-2);
      case "1Y":  return series.slice(-4);
      case "3Y":
      case "ALL": return series;
      default:    return series;
    }
  };

  const visibleData = getVisibleData();
  const noData = timeline === "Custom Date Range" && customStart && customEnd && visibleData.length === 0;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Trend Intelligence Graph
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            Multi-signal trend data for{" "}
            <span className="font-bold text-black">{selectedTrend.name}</span>.
            Toggle datasets to compare signals.
          </p>
        </div>
      </div>

      {/* Signal toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {ALL_SIGNALS.map((s) => {
          const isActive = activeSignals.has(s.key as string);
          return (
            <button
              key={s.key as string}
              onClick={() => toggleSignal(s.key as string)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                isActive
                  ? `${s.bgClass} ${s.textClass} ${s.borderClass}`
                  : "bg-slate-50 text-slate-400 border-slate-200 opacity-50"
              }`}
            >
              <span
                className="h-2 w-4 rounded-full"
                style={{ backgroundColor: isActive ? s.color : "#cbd5e1" }}
              />
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="card-elevated border-2 rounded-[2rem] p-8 bg-white/50">
        {/* Graph area */}
        {noData ? (
          <div className="h-80 flex items-center justify-center text-center text-slate-400 font-semibold text-sm">
            No trend data available for the selected timeframe.
          </div>
        ) : (
          <div className="h-80 w-full font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visibleData}>
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fontWeight: 700 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: 16,
                    padding: "12px 16px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    fontWeight: "bold",
                  }}
                  labelStyle={{ color: "#0f172a", fontSize: 12, marginBottom: 8, textTransform: "uppercase" }}
                  itemStyle={{ fontSize: 12 }}
                />
                {ALL_SIGNALS.map((s) =>
                  activeSignals.has(s.key as string) ? (
                    <Line
                      key={s.key as string}
                      type="monotone"
                      dataKey={s.key as string}
                      stroke={s.color}
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name={s.label}
                    />
                  ) : null
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Timeline Selector */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex items-center rounded-xl bg-slate-100/50 p-1 border border-slate-200">
            {(["3M", "6M", "1Y", "3Y", "ALL", "Custom Date Range"] as TimelineOption[]).map((t) => (
              <button
                key={t}
                onClick={() => setTimeline(t)}
                className={`px-4 py-1.5 text-xs font-bold transition-all rounded-lg ${
                  timeline === t
                    ? "bg-white text-black shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Custom date range picker — shown only when tab is active */}
          {timeline === "Custom Date Range" && (
            <div className="flex flex-wrap items-center justify-center gap-4 p-4 rounded-2xl border border-slate-200 bg-slate-50/80">
              <label className="flex flex-col items-start gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Start</span>
                <input
                  type="month"
                  min="2025-01"
                  max="2026-06"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-black transition-colors"
                />
              </label>
              <span className="text-slate-300 font-bold text-lg mt-4">→</span>
              <label className="flex flex-col items-start gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">End</span>
                <input
                  type="month"
                  min="2025-01"
                  max="2026-06"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-black transition-colors"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
