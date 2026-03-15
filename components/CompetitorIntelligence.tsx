"use client";

import { CompetitorProfile } from "@/lib/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

type Props = {
  competitors: CompetitorProfile[];
  keyword: string;
};

export function CompetitorIntelligence({ competitors, keyword }: Props) {
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorProfile | null>(null);

  if (!competitors || competitors.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl flex items-center gap-3">
             <span className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-xl text-indigo-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
             </span>
             Competitor Intelligence
          </h2>
          <p className="mt-4 text-sm font-medium text-slate-500 md:text-base">
            Key players and emerging brands adopting <span className="font-bold text-slate-800">{keyword}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-500 md:text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            {competitors.length} Brands tracked
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {competitors.map((comp, idx) => (
          <motion.button
            key={comp.id}
            onClick={() => setSelectedCompetitor(comp)}
            className="group flex flex-col items-start text-left rounded-2xl border-2 border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-black hover:shadow-xl relative overflow-hidden h-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/50 opacity-0 transition-opacity group-hover:opacity-100" />
             <div className="relative z-10 w-full flex-1 flex flex-col">
               <div className="flex items-start justify-between gap-4 w-full">
                 <div>
                   <h3 className="text-lg font-black tracking-tight text-slate-900">{comp.name}</h3>
                   <span className="mt-1 inline-block rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                     {comp.mainCategory}
                   </span>
                 </div>
                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7z" clipRule="evenodd" />
                   </svg>
                 </div>
               </div>
               <p className="mt-5 text-sm font-medium leading-relaxed text-slate-600 line-clamp-3">
                 {comp.shortDescription}
               </p>
               <div className="mt-auto pt-6 flex items-center text-xs font-bold text-indigo-600 group-hover:underline decoration-2 underline-offset-4">
                 View deep dive &rarr;
               </div>
             </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedCompetitor && (
          <CompetitorModal 
            competitor={selectedCompetitor} 
            onClose={() => setSelectedCompetitor(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function CompetitorModal({ competitor, onClose }: { competitor: CompetitorProfile, onClose: () => void }) {
  const COLORS = ['#818cf8', '#34d399', '#f472b6', '#fbbf24', '#60a5fa'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <motion.div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="relative flex w-full max-w-4xl max-h-[90vh] flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
      >
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4 sm:px-8 sm:py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
               <span className="font-bold text-xl">{competitor.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
                {competitor.name}
              </h2>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                {competitor.mainCategory}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-black transition-colors"
          >
            <span className="sr-only">Close modal</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-8 custom-scrollbar">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              <div className="space-y-8">
                 <div>
                   <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 hover:text-indigo-500 transition-colors cursor-default">Company Overview</h3>
                   <p className="text-sm font-medium leading-relaxed text-slate-700">{competitor.overview}</p>
                 </div>
                 
                 <div>
                   <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 hover:text-indigo-500 transition-colors cursor-default">Market Positioning</h3>
                   <div className="inline-flex rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700">
                     {competitor.positioning}
                   </div>
                 </div>

                 <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 hover:text-indigo-500 transition-colors cursor-default">Key Products</h3>
                    <div className="flex flex-wrap gap-2">
                      {competitor.productsOffered.map((prod, i) => (
                        <span key={i} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm">
                          {prod}
                        </span>
                      ))}
                    </div>
                 </div>
              </div>

              <div className="rounded-3xl border-2 border-slate-100 bg-slate-50/50 p-6 flex flex-col min-h-[300px]">
                 <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">Product Distribution Focus</h3>
                 <div className="flex-1 w-full min-h-[250px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={competitor.productDistribution}
                         cx="50%"
                         cy="50%"
                         innerRadius={60}
                         outerRadius={80}
                         paddingAngle={5}
                         dataKey="percentage"
                         nameKey="category"
                         stroke="none"
                       >
                         {competitor.productDistribution.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                       </Pie>
                       <RechartsTooltip 
                         contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px' }}
                         itemStyle={{ color: '#0f172a' }}
                       />
                     </PieChart>
                   </ResponsiveContainer>
                 </div>
                 <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {competitor.productDistribution.map((entry, index) => (
                      <div key={index} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                         <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                         {entry.category}: {entry.percentage}%
                      </div>
                    ))}
                 </div>
              </div>

           </div>
        </div>
      </motion.div>
    </div>
  );
}
