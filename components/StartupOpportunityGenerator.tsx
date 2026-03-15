"use client";

import { StartupOpportunity } from "@/lib/types";
import { Lightbulb, Target, Sparkles, Zap } from "lucide-react";

type Props = {
  opportunities: StartupOpportunity[];
};

export function StartupOpportunityGenerator({ opportunities }: Props) {
  if (!opportunities || opportunities.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-purple-700 shadow-sm mb-6">
          <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
          AI Opportunity Engine
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
          Startup Opportunities
        </h2>
        <p className="mt-4 text-slate-500 max-w-2xl text-lg font-medium">
          Data-driven product concepts and whitespace opportunities generated from consumer pain points, trend momentum, and competitor gaps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opp, i) => (
          <div 
            key={opp.id} 
            className="group relative flex flex-col rounded-[2rem] border-2 border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50"
          >
            {/* Number Indicator */}
            <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white font-black text-sm shadow-md transition-transform group-hover:scale-110">
              0{i + 1}
            </div>

            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="text-xl font-bold leading-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                {opp.conceptName}
              </h3>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
                 <Lightbulb className="h-5 w-5 text-purple-600" />
              </div>
            </div>

            <div className="space-y-5 flex-1">
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-xs font-black uppercase text-slate-400 tracking-widest">
                  <Target className="h-3.5 w-3.5" />
                  Target Consumer
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {opp.targetConsumer}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5 text-xs font-black uppercase text-slate-400 tracking-widest">
                  <Zap className="h-3.5 w-3.5" />
                  Problem Solved
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {opp.problemSolved}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5 text-xs font-black uppercase text-slate-400 tracking-widest">
                  <Sparkles className="h-3.5 w-3.5" />
                  Differentiation Angle
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {opp.differentiationAngle}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
