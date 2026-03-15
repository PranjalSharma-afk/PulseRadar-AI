"use client";

import { TrendConcept } from "@/lib/types";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from "recharts";

export function TrendMomentumRadar({ concepts }: { concepts: TrendConcept[] }) {
  if (!concepts || concepts.length === 0) return null;

  // Render a custom tooltip that matches our high fidelity design system
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: TrendConcept = payload[0].payload;
      return (
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] backdrop-blur-md max-w-[280px]">
          <p className="text-sm font-extrabold text-slate-900 leading-tight mb-1">{data.name}</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{data.targetSegment}</p>
          <p className="text-xs text-slate-600 font-medium mb-4 leading-snug">{data.explanation}</p>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
             <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
               <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Demand</span>
               <span className="text-sm font-black text-emerald-600">{data.demand}/100</span>
             </div>
             <div className="rounded-xl border border-slate-100 bg-slate-50 p-2">
               <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Growth</span>
               <span className="text-sm font-black text-sky-600">+{data.growth}%</span>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
             <span className={`inline-flex px-2 py-1 rounded border text-[9px] font-black uppercase tracking-widest ${
               data.opportunityLevel === 'High' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
               data.opportunityLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
               'bg-rose-50 text-rose-700 border-rose-200'
             }`}>
               {data.opportunityLevel} Opp
             </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl flex items-center gap-3">
            <span className="inline-flex items-center justify-center p-2 bg-sky-100 rounded-xl text-sky-600">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1v2.5M4 7l2-1M4 7l2 1v2.5M4 17l2-1m-2 1l2 1v2.5M14 20l-2-1m2 1l-2 1v2.5" />
               </svg>
             </span>
             Trend Momentum Radar
          </h2>
          <p className="mt-4 text-sm font-medium text-slate-500 md:text-base max-w-2xl leading-relaxed">
            Trend Momentum Radar maps product opportunities based on two dimensions: <span className="font-bold text-slate-800">Current Market Demand</span> and <span className="font-bold text-slate-800">Future Growth Momentum</span>. Concepts located in the top right quadrant represent <span className="font-bold text-slate-800">high demand and high growth opportunities</span>, while those in other quadrants represent emerging or saturated markets.
          </p>
        </div>
      </div>

      <div className="rounded-[2rem] border-2 border-slate-100 bg-white p-6 shadow-sm relative overflow-hidden flex flex-col items-center">
         
         {/* Custom Quadrant Background Labels for Aesthetics */}
         <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2">
            <div className="pt-8 pl-10 border-b border-r border-slate-100/50 bg-sky-50/10">
               <span className="text-[11px] font-black uppercase tracking-widest text-sky-200">Emerging Opportunities</span>
            </div>
            <div className="pt-8 pr-10 border-b border-slate-100/50 bg-emerald-50/10 flex justify-end">
               <span className="text-[11px] font-black uppercase tracking-widest text-emerald-200">Breakout Trends</span>
            </div>
            <div className="pb-8 pl-10 border-r border-slate-100/50 bg-slate-50/20 flex items-end">
               <span className="text-[11px] font-black uppercase tracking-widest text-slate-200">Experimental Ideas</span>
            </div>
            <div className="pb-8 pr-10 bg-amber-50/10 flex justify-end items-end">
               <span className="text-[11px] font-black uppercase tracking-widest text-amber-200">Saturated Market</span>
            </div>
         </div>

         <div className="h-[400px] md:h-[500px] w-full mt-4 z-10 font-bold">
           <ResponsiveContainer width="100%" height="100%">
             <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
               <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
               <XAxis 
                 type="number" 
                 dataKey="demand" 
                 name="Current Demand" 
                 domain={[0, 100]} 
                 stroke="#94a3b8"
                 tick={{ fontSize: 11 }}
                 axisLine={false}
                 tickLine={false}
               />
               <YAxis 
                 type="number" 
                 dataKey="growth" 
                 name="Growth Momentum" 
                 domain={[0, 100]} 
                 stroke="#94a3b8"
                 tick={{ fontSize: 11 }}
                 axisLine={false}
                 tickLine={false}
               />
               <ZAxis type="number" range={[150, 600]} />
               <Tooltip 
                 content={<CustomTooltip />} 
                 cursor={{ strokeDasharray: '3 3', strokeWidth: 1.5, stroke: '#cbd5e1' }}
               />
               
               {/* 4 Quadrants Divider */}
               <ReferenceLine x={50} stroke="#e2e8f0" strokeDasharray="5 5" label={{ value: "High Demand", position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10, fontWeight: "bold" }} />
               <ReferenceLine y={50} stroke="#e2e8f0" strokeDasharray="5 5" label={{ value: "High Growth", position: 'insideTopLeft', fill: '#94a3b8', fontSize: 10, fontWeight: "bold" }} />

               <Scatter name="Concepts" data={concepts}>
                 {concepts.map((entry, index) => {
                    // Color code dynamically based on Opportunity Level
                    const dotColor = entry.opportunityLevel === 'High' ? '#10b981' : 
                                     entry.opportunityLevel === 'Medium' ? '#f59e0b' : 
                                     '#64748b'; // Gray for Low Opp
                    
                    return (
                      <Cell key={`cell-${index}`} fill={dotColor} stroke="#ffffff" strokeWidth={2} />
                    )
                 })}
               </Scatter>
             </ScatterChart>
           </ResponsiveContainer>
         </div>

         <div className="flex w-full mt-4 justify-between text-[10px] font-bold text-slate-400 capitalize whitespace-nowrap px-4">
             <span>&larr; Lower Demand</span>
             <span>Higher Demand &rarr;</span>
         </div>
      </div>
    </section>
  );
}
