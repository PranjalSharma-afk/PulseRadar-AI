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
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
          Trend Radar Dashboard
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
          Ranked view of India&apos;s fastest-emerging wellness opportunities.
        </p>
        <div className="mt-4 flex items-center justify-center">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Multi-signal score (0–10)
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trends.map((trend, index) => (
          <motion.div
            key={trend.id}
            className="flex"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
          >
            <motion.button
              onClick={() => onSelectTrend(trend)}
              className="group relative flex w-full flex-col h-full items-stretch rounded-2xl border-2 border-slate-100 bg-white p-6 text-left shadow-md transition-all duration-300 hover:border-black hover:shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2
              }}
              whileHover={{ scale: 1.02 }}
            >
            <div className="absolute inset-0 rounded-2xl bg-slate-50/0 transition-colors group-hover:bg-slate-50/40" />

            {/* Title Row */}
            <div className="relative flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Trend
                </p>
                <p className="mt-1 text-base font-extrabold leading-snug text-black">
                  {trend.name}
                </p>
              </div>
              <div className="flex flex-col items-end text-right shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Score
                </span>
                <span className="text-xl font-black text-black">
                  {trend.score.toFixed(1)}
                  <span className="ml-0.5 text-xs font-bold text-slate-400">/10</span>
                </span>
              </div>
            </div>

            {/* Metrics Row — perfectly aligned 3 columns */}
            <div className="relative mt-6 grid grid-cols-3 gap-2">
              <MetricPill
                label="Search Growth"
                value={`${trend.searchGrowth > 0 ? "+" : ""}${trend.searchGrowth.toFixed(1)}%`}
                tone="sky"
              />
              <MetricPill
                label="Social Buzz"
                value={`${trend.socialGrowth > 0 ? "+" : ""}${trend.socialGrowth.toFixed(1)}%`}
                tone="fuchsia"
              />
              <CompetitionPill level={trend.competition} />
            </div>

            {/* Insight */}
            <p className="relative mt-5 line-clamp-3 text-sm font-medium leading-relaxed text-slate-600">
              {trend.opportunityInsight}
            </p>

            {/* Footer */}
            <div className="relative flex w-full mt-auto items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                AI brief available
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-black transition-transform group-hover:translate-x-1">
                View brief &rarr;
              </span>
            </div>
          </motion.button>
          </motion.div>
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
  const badgeColor = tone === "sky" ? "bg-sky-100 text-sky-700" : "bg-fuchsia-100 text-fuchsia-700";

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 truncate">{label}</span>
      <div className={`flex items-center justify-center rounded-lg ${badgeColor} px-2 py-2 border border-slate-100 h-9`}>
        <span className="text-[11px] font-black">{value}</span>
      </div>
    </div>
  );
}

function CompetitionPill({ level }: { level: TrendSignal["competition"] }) {
  const map: Record<
    TrendSignal["competition"],
    { label: string; bg: string; dot: string; text: string }
  > = {
    Low: { label: "Low", bg: "bg-emerald-50", dot: "bg-emerald-500", text: "text-emerald-700" },
    Moderate: { label: "Moderate", bg: "bg-amber-50", dot: "bg-amber-500", text: "text-amber-700" },
    High: { label: "Crowded", bg: "bg-rose-50", dot: "bg-rose-500", text: "text-rose-700" }
  };

  const { label, bg, dot, text } = map[level];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 truncate">Competition</span>
      <div className={`flex items-center justify-center gap-1.5 rounded-lg ${bg} px-2 py-2 border border-slate-100 h-9`}>
        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
        <span className={`text-[11px] font-black ${text}`}>{label}</span>
      </div>
    </div>
  );
}
