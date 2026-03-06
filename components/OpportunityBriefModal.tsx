"use client";

import { OpportunityBrief, TrendSignal } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
  open: boolean;
  trend: TrendSignal | null;
  brief: OpportunityBrief | undefined;
  onClose: () => void;
};

export function OpportunityBriefModal({ open, trend, brief, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && trend && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border-2 border-black bg-white shadow-2xl flex flex-col"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between gap-4 border-b-2 border-slate-100 bg-white px-8 py-6 shrink-0 z-10">
              <div>
                <p className="inline-block rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  Opportunity Brief
                </p>
                <h3 className="text-2xl font-black text-black">
                  {trend.name}
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Category: <span className="text-black">{trend.category}</span> • Score{" "}
                  <span className="text-emerald-600">
                    {trend.score.toFixed(1)}/10
                  </span>
                </p>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-500 transition hover:border-black hover:bg-slate-50 hover:text-black"
                aria-label="Close opportunity brief"
              >
                <span className="text-lg font-bold">&times;</span>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 text-sm text-slate-600">
              {brief ? (
                <>
                  <section className="grid gap-8 lg:grid-cols-[1.6fr,1fr] mb-10">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        Product Concept
                      </h4>
                      <p className="text-lg font-medium leading-relaxed text-black">
                        {brief.productConcept}
                      </p>
                    </div>
                    <div className="space-y-4 rounded-2xl border-2 border-slate-100 bg-slate-50 p-6">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        Snapshot
                      </h4>
                      <dl className="space-y-4">
                        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                          <dt className="text-xs font-bold text-slate-500">
                            Estimated Market
                          </dt>
                          <dd className="text-sm font-black text-black">
                            ~₹{brief.estimatedMarketPotentialCr}Cr
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                          <dt className="text-xs font-bold text-slate-500">
                            Competition Density
                          </dt>
                          <dd className="text-sm font-black text-black">
                            {brief.competitionDensity}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <dt className="text-xs font-bold text-slate-500">
                            Time to Mainstream
                          </dt>
                          <dd className="text-sm font-black text-black">
                            {brief.timeToMainstreamMonths}–{brief.timeToMainstreamMonths + 6} months
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </section>

                  <section className="grid gap-8 lg:grid-cols-2 mb-10">
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        Consumer Problem
                      </h4>
                      <p className="text-base font-medium leading-relaxed text-slate-600">
                        {brief.consumerProblem}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                        Market Evidence
                      </h4>
                      <ul className="space-y-3 text-sm font-semibold text-slate-700">
                        {brief.marketEvidence?.map((item, index) => (
                          <li key={index} className="flex gap-3 items-start">
                            <span className="mt-1.5 shrink-0 h-2 w-2 rounded-full bg-black" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  <section className="grid gap-6 sm:grid-cols-3 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Search Velocity
                      </h4>
                      <ProgressBar
                        value={Math.min(100, trend.searchGrowth / 2)}
                        tone="sky"
                        helper={`${trend.searchGrowth.toFixed(1)}% 6m growth`}
                      />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Conversation Momentum
                      </h4>
                      <ProgressBar
                        value={Math.min(100, trend.socialGrowth / 2)}
                        tone="fuchsia"
                        helper={`${trend.socialGrowth.toFixed(1)}% social lift`}
                      />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Demand Gap
                      </h4>
                      <ProgressBar
                        value={trend.competition === "Low" ? 92 : 68}
                        tone="emerald"
                        helper={
                          trend.competition === "Low"
                            ? "Category white space"
                            : "Selective white spaces"
                        }
                      />
                    </div>
                  </section>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-black mb-4" />
                  <p className="text-sm font-bold">Loading brief data…</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProgressBar({
  value,
  tone,
  helper
}: {
  value: number;
  tone: "sky" | "fuchsia" | "emerald";
  helper: string;
}) {
  const gradient =
    tone === "sky"
      ? "from-sky-500 to-sky-300"
      : tone === "fuchsia"
      ? "from-fuchsia-500 to-fuchsia-300"
      : "from-emerald-500 to-emerald-300";

  return (
    <div className="space-y-1.5">
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-[11px] font-bold text-slate-500 uppercase">{helper}</p>
    </div>
  );
}

