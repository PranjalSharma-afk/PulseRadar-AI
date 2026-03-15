"use client";

import { useState } from "react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AppFooter } from "@/components/AppFooter";
import { Logo } from "@/components/Logo";
import { SearchResult } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PainPointIntelligence } from "@/components/PainPointIntelligence";
import { TrendSignalGraph } from "@/components/TrendSignalGraph";
import { TrendScoringFramework } from "@/components/TrendScoringFramework";
import { CompetitorIntelligence } from "@/components/CompetitorIntelligence";
import { TrendMomentumRadar } from "@/components/TrendMomentumRadar";
import { StartupOpportunityGenerator } from "@/components/StartupOpportunityGenerator";

export function SearchClientPage({ result, query }: { result: SearchResult; query: string }) {
  if (!result.isValid) {
    return (
      <main className="min-h-[80vh] bg-white flex items-center justify-center p-6">
        <motion.div 
          className="max-w-xl w-full text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-16 w-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-sm mb-6">
            🔍
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            No relevant product, ingredient, or company found.
          </h1>
          
          <p className="text-slate-500 font-medium mb-10 max-w-sm">
            PulseRadar AI only analyzes search domains related to registered companies, verified FMCG products, and health ingredients.
          </p>

          <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-8 mb-8 text-left">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Did you mean</h3>
            <div className="flex flex-wrap gap-2">
               {result.suggestions.map((sug) => (
                 <Link href={`/search?q=${encodeURIComponent(sug)}`} key={sug}>
                   <span className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-sky-100 bg-sky-50 text-sky-700 text-sm font-bold hover:bg-sky-100 transition-colors cursor-pointer">
                     {sug} &rarr;
                   </span>
                 </Link>
               ))}
            </div>
          </div>

          <Link href="/">
             <button className="h-12 px-6 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
               Return Home
             </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  const { report } = result;

  return (
    <main className="min-h-screen bg-white">
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
          {/* Entry Overview & Visuals */}
          <section className="mx-auto max-w-6xl px-6 pt-16 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              <div className="flex-1">
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

                {report.websiteUrl && (
                  <div className="mt-8">
                    <a 
                      href={report.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-12 px-6 rounded-2xl bg-black text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 gap-2"
                    >
                      Visit Official Website
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {report.visual && (
                <div className="md:mt-4 shrink-0 shadow-lg rounded-2xl overflow-hidden border-2 border-slate-100 bg-white p-2">
                   {report.visual.type === 'logo' ? (
                     <img 
                       src={report.visual.url} 
                       alt={`${report.keyword} Logo`} 
                       className="w-24 h-24 object-contain rounded-xl bg-white" 
                     />
                   ) : (
                     <img 
                       src={report.visual.url} 
                       alt={`${report.keyword} Illustration`} 
                       className="w-32 h-32 object-cover rounded-xl" 
                     />
                   )}
                </div>
              )}
            </motion.div>
          </section>

          {/* Layout Structure ordered matching Update 7 requirements:
              1. Entry Overview & Visuals (done above)
              2. Market Context & Detailed Analysis
              3. Consumer Pain Point Intelligence
              4. Signal Strength Indicators (Metrics + Scoring Framework)
              5. Trend Intelligence Graph
              6. Trend Momentum Radar
              7. Competitor Intelligence
          */}

          {/* 2. Market Context & Detailed Analysis */}
          <section className="mx-auto max-w-6xl px-6 py-6 border-t border-slate-100">
             <motion.div 
               className="w-full space-y-8"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
             >
               <div>
                 <h2 className="text-2xl font-extrabold tracking-tight text-black flex items-center gap-2">
                    Market Context & Analysis
                 </h2>
                 <div className="mt-6 flex flex-col gap-6 rounded-2xl border-2 border-slate-100 bg-white p-6 md:p-8 shadow-sm">
                   <div className="grid gap-6">
                     <div>
                       <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Overview</h3>
                       <p className="text-slate-700 font-medium leading-relaxed">{report.analysis.overview}</p>
                     </div>
                     <div className="grid md:grid-cols-4 gap-6">
                        <div className="md:col-span-2">
                         <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Market Relevance</h3>
                         <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.marketRelevance}</p>
                        </div>
                        <div className="md:col-span-2">
                         <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Opportunity</h3>
                         <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.opportunity}</p>
                        </div>
                        <div className="md:col-span-2">
                         <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Category Insights</h3>
                         <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.categoryInsights}</p>
                        </div>
                        <div className="md:col-span-2">
                         <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Demand Signals</h3>
                         <p className="text-sm text-slate-600 font-medium leading-relaxed">{report.analysis.consumerDemandSignals}</p>
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
             </motion.div>
          </section>

          {/* 3. Consumer Pain Point Intelligence */}
          <div className="border-t border-slate-100 relative">
             <PainPointIntelligence insights={report.painPoints} />
          </div>

          {/* 4. Signal Strength Indicators */}
          <section className="mx-auto max-w-6xl px-6 py-12 border-t border-slate-100">
             <motion.div 
               className="space-y-6"
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
             >
               <h2 className="text-2xl font-extrabold tracking-tight text-black">
                  Signal Strength Indicators
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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
               
               <div className="mt-8">
                 <TrendScoringFramework trendScore={report.trendScore} />
               </div>
             </motion.div>
          </section>

          {/* 5. Trend Intelligence Graph */}
          {report.timeSeries.length > 0 && (
             <div className="border-t border-slate-100 mt-10">
               <TrendSignalGraph selectedTrend={report.trendScore} series={report.timeSeries} />
             </div>
          )}

          {/* 6. Trend Momentum Radar */}
          <div className="border-t border-slate-100">
             <TrendMomentumRadar concepts={report.concepts} />
          </div>

          {/* 7. Competitor Intelligence */}
          <div className="border-t border-slate-100 mt-10">
            <CompetitorIntelligence competitors={report.competitors} keyword={report.keyword} />
          </div>

          {/* 8. Startup Opportunity Generator */}
          {report.opportunities && report.opportunities.length > 0 && (
            <div className="border-t border-slate-100 mt-10">
              <StartupOpportunityGenerator opportunities={report.opportunities} />
            </div>
          )}

        </article>

        <AppFooter />
      </div>
    </main>
  );
}
