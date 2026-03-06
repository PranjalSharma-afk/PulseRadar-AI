"use client";

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
            <span className="font-bold text-black">
              {selectedTrend.name}
            </span>
            .
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
            <LineChart data={series}>
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

