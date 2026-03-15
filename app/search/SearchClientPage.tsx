"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AppFooter } from "@/components/AppFooter";
import { Logo } from "@/components/Logo";
import { IntelligenceReport } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { PainPointIntelligence } from "@/components/PainPointIntelligence";
import { TrendSignalGraph } from "@/components/TrendSignalGraph";
import { TrendScoringFramework } from "@/components/TrendScoringFramework";
import { CompetitorIntelligence } from "@/components/CompetitorIntelligence";

export function SearchClientPage({ report, query }: { report: IntelligenceReport; query: string }) {
  return (
    <main className="relative min-h-screen text-slate-900">
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="flex items-center gap-4 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm transition-transform group-hover:scale-105">
                <Logo className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-lg font-black tracking-tight text-black transition-colors group-hover:text-slate-700">
                  PulseRadar AI
                </h1>
                <p className="text-xs font-bold text-slate-500">
                  Wellness signal intelligence
                </p>
              </div>
            </Link>
            <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-500 md:flex">
              <Link href="/" className="hover:text-black transition-colors">
                Back to Home
              </Link>
            </nav>
          </div>
        </header>

        <article className="flex-1 pb-20">
          {/* Header Section */}
          <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700 shadow-sm mb-6">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                AI Generated Report
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl mb-4">
                Intelligence: <span className="text-slate-400">{report.keyword}</span>
              </h1>
              <p className="text-lg font-medium text-slate-500 max-w-2xl">
                Dynamic market signals, competitor analysis, and consumer buzz mapped for {query}.
              </p>
            </motion.div>
          </section>

          {/* Section A & Section B - AI Analysis & Dashboard */}
          <section className="mx-auto max-w-6xl px-6 py-6 border-t border-slate-100">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Section A: Keyword Analysis */}
                <motion.div 
                  className="lg:col-span-2 space-y-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-black flex items-center gap-2">
                       Market Context
                    </h2>
                    <div className="mt-6 flex flex-col gap-6 rounded-2xl border-2 border-slate-100 bg-white p-6 md:p-8 shadow-sm">
                      <div className="grid gap-6">
                        <div>
                          <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Overview</h3>
                          <p className="text-slate-700 font-medium leading-relaxed">{report.analysis.overview}</p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                           <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Market Relevance</h3>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.marketRelevance}</p>
                           </div>
                           <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Opportunity</h3>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.opportunity}</p>
                           </div>
                           <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Category Insights</h3>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.categoryInsights}</p>
                           </div>
                           <div>
                            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Demand Signals</h3>
                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.consumerDemandSignals}</p>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Section B: Visualization Dashboard */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-extrabold tracking-tight text-black">
                     Signal Strength
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                     <div className="rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Opportunity Score</p>
                        <p className="mt-2 text-3xl font-black text-black">{report.dashboardMetrics.opportunityScore}<span className="text-sm text-slate-400 font-bold">/10</span></p>
                     </div>
                     <div className="rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Growth Potential</p>
                        <p className="mt-2 text-3xl font-black text-emerald-600">+{report.dashboardMetrics.growthPotential}%</p>
                     </div>
                     <div className="rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Search Momentum</p>
                        <p className="mt-2 text-3xl font-black text-sky-600">+{report.dashboardMetrics.searchMomentum}%</p>
                     </div>
                     <div className="rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Demand Signal</p>
                        <p className="mt-2 text-xl font-black text-purple-600 leading-tight">{report.dashboardMetrics.demandSignals}</p>
                     </div>
                  </div>
                </motion.div>
             </div>
          </section>

          {/* Feature 6 / Dynamic Trend Signal Graph */}
          {report.timeSeries.length > 0 && (
             <div className="border-t border-slate-100 mt-10">
               <TrendSignalGraph selectedTrend={report.trendScore} series={report.timeSeries} />
             </div>
          )}

          {/* Feature 4: Dynamic Pain Points */}
          <div className="border-t border-slate-100">
             <PainPointIntelligence insights={report.painPoints} />
          </div>

          {/* Feature 5: Dynamic Trend Scoring Framework */}
          {/* Note: In a complete implementation we would pass the dynamic scores to the framework component.
              Since TrendScoringFramework doesn't currently accept props, we render it as is, or we could pass the trendScore.
              For this exercise, we keep it as requested to "Update the Trend Scoring Framework so that it is fully keyword driven."
          */}
          <div className="border-t border-slate-100 mt-10">
            <TrendScoringFramework trendScore={report.trendScore} />
          </div>

          {/* Feature 3: Competitor Intelligence Section */}
          <div className="border-t border-slate-100 mt-10">
            <CompetitorIntelligence competitors={report.competitors} keyword={report.keyword} />
          </div>

        </article>

        <AppFooter />
      </div>
    </main>
  );
}
