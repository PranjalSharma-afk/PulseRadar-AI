"use client";

import { useState, useMemo } from "react";
import {
  Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from "recharts";
import { TrendTimepoint, TrendSignal } from "@/lib/types";

type Props = {
  selectedTrend: TrendSignal;
  series: TrendTimepoint[];
};

type TimelineKey = "3M" | "6M" | "1Y" | "3Y" | "ALL" | "Custom";

const SIGNALS = [
  { key: "searchInterest",        label: "Search Interest",          color: "#0ea5e9", bg: "bg-sky-50",      text: "text-sky-700",     border: "border-sky-100" },
  { key: "socialVolume",          label: "Social Conversations",     color: "#d946ef", bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-100" },
  { key: "contentCreation",       label: "Content Creation",         color: "#10b981", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100" },
  { key: "reviewVolume",          label: "Review Volume",            color: "#f59e0b", bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-100" },
  { key: "productLaunchMentions", label: "Launch Mentions",          color: "#8b5cf6", bg: "bg-violet-50", text: "text-violet-700",  border: "border-violet-100" },
  { key: "marketBuzzIndex",       label: "Market Buzz Index",        color: "#ef4444", bg: "bg-red-50",     text: "text-red-700",     border: "border-red-100" },
];

/** Enrich any series with the 3 optional fields if they are missing */
function enrichSeries(raw: TrendTimepoint[]): TrendTimepoint[] {
  return raw.map((pt, i) => {
    const base = pt.searchInterest ?? 30;
    return {
      ...pt,
      reviewVolume:          pt.reviewVolume          ?? Math.floor(base * 0.85 + i * 3),
      productLaunchMentions: pt.productLaunchMentions ?? Math.floor(10 + i * 6),
      marketBuzzIndex:       pt.marketBuzzIndex       ?? Math.floor(base * 0.9 - 5 + i * 4),
    };
  });
}

/**
 * Returns 0-based quarter index  e.g. "Q1 2025" → 100, "Q4 2025" → 103, "Q1 2026" → 104
 * Works for both "Qn YYYY" and "YYYY-MM" (from <input type=month>)
 */
function toQIdx(s: string): number {
  // YYYY-MM from date input
  if (/^\d{4}-\d{2}$/.test(s)) {
    const [y, m] = s.split("-").map(Number);
    return y * 4 + Math.ceil(m / 3);
  }
  // "Qn YYYY"
  const m = s.match(/Q(\d)\s+(\d{4})/);
  if (m) return parseInt(m[2]) * 4 + parseInt(m[1]);
  return 0;
}

export function TrendSignalGraph({ selectedTrend, series }: Props) {
  const [timeline, setTimeline] = useState<TimelineKey>("1Y");
  const [active, setActive] = useState<Set<string>>(new Set(SIGNALS.map(s => s.key)));
  const [startM, setStartM]   = useState("2025-01");
  const [endM, setEndM]       = useState("2026-06");

  const enriched = useMemo(() => enrichSeries(series), [series]);

  const visible = useMemo(() => {
    switch (timeline) {
      case "3M":  return enriched.slice(-1);
      case "6M":  return enriched.slice(-2);
      case "1Y":  return enriched.slice(-4);
      case "3Y":
      case "ALL": return enriched;
      case "Custom": {
        const lo = toQIdx(startM);
        const hi = toQIdx(endM);
        const filtered = enriched.filter(pt => {
          const qi = toQIdx(pt.month);
          return qi >= lo && qi <= hi;
        });
        return filtered;
      }
    }
  }, [timeline, enriched, startM, endM]);

  const noData = timeline === "Custom" && visible.length === 0;

  const toggle = (key: string) =>
    setActive(prev => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
          Trend Intelligence Graph
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
          Multi-signal trend data for{" "}
          <span className="font-bold text-black">{selectedTrend.name}</span>. Toggle datasets below.
        </p>
      </div>

      {/* Signal toggle pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SIGNALS.map(s => {
          const on = active.has(s.key);
          return (
            <button
              key={s.key}
              onClick={() => toggle(s.key)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border text-[10px] font-bold uppercase tracking-widest transition-all ${
                on ? `${s.bg} ${s.text} ${s.border}` : "bg-slate-50 text-slate-400 border-slate-200 opacity-50"
              }`}
            >
              <span className="h-2 w-4 rounded-full" style={{ backgroundColor: on ? s.color : "#cbd5e1" }} />
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="card-elevated border-2 rounded-[2rem] p-8 bg-white/50">
        {/* Chart */}
        {noData ? (
          <div className="h-80 flex items-center justify-center text-slate-400 font-semibold text-sm text-center">
            No trend data available for the selected timeframe.
            <br />
            <span className="text-xs mt-1 block">Try expanding your date range.</span>
          </div>
        ) : (
          <div className="h-80 w-full font-bold">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visible}>
                <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0", borderRadius: 16, padding: "12px 16px", boxShadow: "0 10px 25px -5px rgba(0,0,0,.1)", fontWeight: "bold" }}
                  labelStyle={{ color: "#0f172a", fontSize: 11, marginBottom: 8, textTransform: "uppercase" }}
                  itemStyle={{ fontSize: 11 }}
                />
                {SIGNALS.map(s =>
                  active.has(s.key) ? (
                    <Line
                      key={s.key}
                      type="monotone"
                      dataKey={s.key}
                      stroke={s.color}
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name={s.label}
                      connectNulls
                    />
                  ) : null
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Timeline tabs */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="inline-flex items-center flex-wrap justify-center rounded-xl bg-slate-100/50 p-1 border border-slate-200 gap-0.5">
            {(["3M", "6M", "1Y", "3Y", "ALL", "Custom"] as TimelineKey[]).map(t => (
              <button
                key={t}
                onClick={() => setTimeline(t)}
                className={`px-4 py-1.5 text-xs font-bold transition-all rounded-lg ${
                  timeline === t ? "bg-white text-black shadow-sm" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {t === "Custom" ? "Custom Date Range" : t}
              </button>
            ))}
          </div>

          {/* Custom range inputs */}
          {timeline === "Custom" && (
            <div className="flex flex-wrap items-end justify-center gap-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/80 w-full max-w-lg">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Start Quarter</span>
                <input
                  type="month"
                  min="2025-01"
                  max="2026-06"
                  value={startM}
                  onChange={e => setStartM(e.target.value)}
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-black"
                />
              </div>
              <span className="text-slate-300 font-bold pb-2">→</span>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">End Quarter</span>
                <input
                  type="month"
                  min="2025-01"
                  max="2026-06"
                  value={endM}
                  onChange={e => setEndM(e.target.value)}
                  className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:border-black"
                />
              </div>
              <div className="text-[11px] font-bold text-slate-500 mt-1 w-full text-center">
                Showing {visible.length} quarter{visible.length !== 1 ? "s" : ""} in range
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
