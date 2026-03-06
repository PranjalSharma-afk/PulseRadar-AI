"use client";

import { motion } from "framer-motion";
import { TrendSignal } from "@/lib/types";

type Props = {
  trends: TrendSignal[];
  onSelectTrend: (trend: TrendSignal) => void;
};

export function TrendRadarDashboard({ trends, onSelectTrend }: Props) {
  return (
    <section
      id="radar"
      className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:pt-16"
      aria-label="Trend Radar Dashboard"
    >
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Trend Radar Dashboard
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            Ranked view of India&apos;s fastest-emerging wellness opportunities.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 md:text-xs">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Multi-signal score (0–10)
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trends.map((trend, index) => (
          <motion.button
            key={trend.id}
            onClick={() => onSelectTrend(trend)}
            className="group relative flex flex-col items-stretch rounded-2xl border-2 border-slate-100 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-black hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05 * index, duration: 0.5 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-slate-50/0 transition-colors group-hover:bg-slate-50/50" />
            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Trend
                </p>
                <p className="mt-1 text-base font-extrabold text-black">
                  {trend.name}
                </p>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Score
                </span>
                <span className="text-xl font-black text-black">
                  {trend.score.toFixed(1)}
                  <span className="ml-0.5 text-xs font-bold text-slate-400">/10</span>
                </span>
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-3">
              <MetricPill
                label="Search growth"
                value={`${trend.searchGrowth > 0 ? "+" : ""}${trend.searchGrowth.toFixed(1)}%`}
                tone="sky"
              />
              <MetricPill
                label="Social buzz"
                value={`${trend.socialGrowth > 0 ? "+" : ""}${trend.socialGrowth.toFixed(1)}%`}
                tone="fuchsia"
              />
              <CompetitionPill level={trend.competition} />
            </div>

            <p className="relative mt-5 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
              {trend.opportunityInsight}
            </p>

            <div className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                AI brief available
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-black transition-transform group-hover:translate-x-1">
                View brief &rarr;
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function MetricPill({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: "sky" | "fuchsia";
}) {
  const badgeColor = tone === "sky" ? "bg-sky-100 text-sky-800" : "bg-fuchsia-100 text-fuchsia-800";

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
      <div className="inline-flex items-center justify-between rounded-lg bg-slate-50 px-2 py-1.5 border border-slate-100">
        <span className="h-1 w-6 rounded-full bg-slate-200" />
        <span className={`ml-1 rounded px-1.5 py-0.5 text-[10px] font-bold ${badgeColor}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

function CompetitionPill({ level }: { level: TrendSignal["competition"] }) {
  const map: Record<
    TrendSignal["competition"],
    { label: string; bg: string; dot: string; text: string }
  > = {
    Low: { label: "Low", bg: "bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", text: "text-emerald-700" },
    Moderate: { label: "Moderate", bg: "bg-amber-50 text-amber-700", dot: "bg-amber-500", text: "text-amber-700" },
    High: { label: "Crowded", bg: "bg-rose-50 text-rose-700", dot: "bg-rose-500", text: "text-rose-700" }
  };

  const { label, bg, dot, text } = map[level];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Competition</span>
      <div className={`inline-flex items-center justify-between rounded-lg ${bg} px-2 py-1.5 border border-slate-100`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        <span className={`ml-1 flex-1 truncate text-right text-[10px] font-bold ${text}`}>{label}</span>
      </div>
    </div>
  );
}

