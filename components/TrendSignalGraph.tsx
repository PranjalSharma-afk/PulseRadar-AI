"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { TrendTimepoint, TrendSignal } from "@/lib/types";

type Props = {
  selectedTrend: TrendSignal;
  series: TrendTimepoint[];
};

export function TrendSignalGraph({ selectedTrend, series }: Props) {
  const [timeline, setTimeline] = useState<"3M" | "6M" | "1Y" | "3Y" | "ALL">("1Y");

  // Determine how many data points to show based on timeline
  // The mock series currently has 6 quarters.
  // We'll mimic dynamic data slicing here based on selection.
  const getVisibleData = () => {
    switch (timeline) {
      case "3M":
        return series.slice(-1); // Show latest 1 quarter (approx 3M)
      case "6M":
        return series.slice(-2); // Show latest 2 quarters
      case "1Y":
        return series.slice(-4); // Show latest 4 quarters
      case "3Y":
      case "ALL":
        return series; // Show all 6 available quarters in our mock
      default:
        return series;
    }
  };

  const visibleData = getVisibleData();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Trend Intelligence Graph
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            Search interest, social conversation volume, and content creation
            growth over time for{" "}
            <span className="font-bold text-black">{selectedTrend.name}</span>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500 md:text-xs">
          <LegendPill colorClass="bg-sky-500" textClass="text-sky-700" label="Search interest" bgClass="bg-sky-50 border border-sky-100" />
          <LegendPill colorClass="bg-fuchsia-500" textClass="text-fuchsia-700" label="Social conversations" bgClass="bg-fuchsia-50 border border-fuchsia-100" />
          <LegendPill colorClass="bg-emerald-500" textClass="text-emerald-700" label="Content creation growth" bgClass="bg-emerald-50 border border-emerald-100" />
        </div>
      </div>

      <div className="card-elevated border-2 rounded-[2rem] p-8 bg-white/50">
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
                tickFormatter={(value) => `${value}`}
                tick={{ fontSize: 12, fontWeight: 700 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e2e8f0",
                  borderRadius: 16,
                  padding: "12px 16px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  fontWeight: "bold",
                }}
                labelStyle={{ color: "#0f172a", fontSize: 12, marginBottom: 8, textTransform: "uppercase" }}
                itemStyle={{ fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="searchInterest"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="socialVolume"
                stroke="#d946ef"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="contentCreation"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline Selector Feature */}
        <div className="mt-8 flex justify-center">
           <div className="inline-flex items-center rounded-xl bg-slate-100/50 p-1 border border-slate-200">
             {["3M", "6M", "1Y", "3Y", "ALL"].map((t) => (
               <button
                 key={t}
                 onClick={() => setTimeline(t as any)}
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
        </div>
      </div>
    </section>
  );
}

function LegendPill({
  colorClass,
  textClass,
  label,
  bgClass
}: {
  colorClass: string;
  textClass: string;
  label: string;
  bgClass: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-lg ${bgClass} px-3 py-1.5`}>
      <span className={`h-2 w-4 rounded-full ${colorClass}`} />
      <span className={`text-[10px] uppercase font-bold tracking-widest ${textClass}`}>{label}</span>
    </span>
  );
}

