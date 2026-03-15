"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

type HeroProps = {
  onExploreRadar: () => void;
  onShowBriefs: () => void;
};

const exampleTrends = [
  "Magnesium Glycinate",
  "Sea Moss",
  "Moringa Gummies",
  "Ashwagandha Lattes"
];

export function HeroSection({ onExploreRadar, onShowBriefs }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <section className="relative mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2 items-center gap-10 px-6 pt-24 pb-16 lg:pt-32 lg:pb-20 min-h-screen lg:min-h-[90vh]">
      {/* Left: Text Content */}
      <div className="relative z-10 space-y-7">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="h-2 w-2 rounded-full bg-black animate-pulse" />
          Live signal radar for India
        </motion.div>

        <motion.h1
          className="text-balance text-5xl font-extrabold tracking-tighter text-black sm:text-6xl leading-[1.05]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Discover India&apos;s Next{" "}
          <span className="block text-slate-400">₹100Cr Product.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-md"
        >
          <form 
            onSubmit={handleSearch}
            className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-black/20 focus-within:border-black/20 transition-all"
          >
            <div className="flex-1 relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-xl border-0 py-3.5 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent outline-none font-medium"
                placeholder="Search companies, ingredients (e.g. Magnesium)"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              className="flex shrink-0 items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-bold tracking-wide text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              Analyze
            </button>
          </form>
        </motion.div>

        <motion.p
          className="text-base font-medium leading-relaxed text-slate-500 sm:text-lg max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          PulseRadar AI maps search signals, consumer buzz, and market whitespace
          to find wellness trends months before they scale.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <button
            onClick={onExploreRadar}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:border-black hover:bg-slate-50 hover:text-black active:bg-slate-100"
          >
            Explore Live Radar
          </button>
          <button
            onClick={onShowBriefs}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-600 transition-colors hover:border-black hover:bg-slate-50 hover:text-black active:bg-slate-100"
          >
            See AI Briefs
          </button>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mr-2">
            Trending:
          </span>
          {exampleTrends.map((trend) => (
            <span
              key={trend}
              className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-600"
            >
              {trend}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Right: Radar Card */}
      <div className="relative z-10 flex justify-center lg:justify-end">
        <motion.div
          className="relative h-[340px] w-[340px] sm:h-[380px] sm:w-[380px] max-w-full rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] ring-1 ring-black/5 cursor-pointer"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", damping: 20 }}
          onClick={onExploreRadar}
          whileHover={{ scale: 1.02 }}
          title="Click to open Live Radar"
        >
          <div className="relative flex h-full w-full flex-col gap-4 rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-black">
                  Live Radar
                </p>
                <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                  Real-time multi-signal mapped
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Synced
              </div>
            </div>

            <div className="relative flex-1 rounded-xl bg-white border border-slate-100 p-4 shadow-sm overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <motion.div
                  className="h-56 w-56 rounded-full border-2 border-slate-300"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute h-40 w-40 rounded-full border border-slate-200" />
                <div className="absolute h-24 w-24 rounded-full border border-slate-200" />
                <div className="absolute h-px w-full bg-slate-100" />
                <div className="absolute h-full w-px bg-slate-100" />
              </div>

              <TrendSignalDot
                label="Magnesium"
                position={{ top: "20%", left: "60%" }}
                intensity={0.95}
                bgClass="bg-black"
                textClass="text-black border-black"
                onClick={onExploreRadar}
              />
              <TrendSignalDot
                label="Sea Moss"
                position={{ top: "65%", left: "25%" }}
                intensity={0.82}
                bgClass="bg-slate-600"
                textClass="text-slate-600 border-slate-600"
                onClick={onExploreRadar}
              />
              <TrendSignalDot
                label="Moringa"
                position={{ top: "35%", left: "30%" }}
                intensity={0.88}
                bgClass="bg-slate-800"
                textClass="text-slate-800 border-slate-800"
                onClick={onExploreRadar}
              />
              <TrendSignalDot
                label="Sleep Aids"
                position={{ top: "68%", left: "65%" }}
                intensity={0.77}
                bgClass="bg-slate-400"
                textClass="text-slate-600 border-slate-400"
                onClick={onExploreRadar}
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>↓ Click to explore live radar</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type TrendSignalDotProps = {
  label: string;
  position: { top: string; left: string };
  intensity: number;
  bgClass: string;
  textClass: string;
  onClick?: () => void;
};

function TrendSignalDot({
  label,
  position,
  intensity,
  bgClass,
  textClass,
  onClick
}: TrendSignalDotProps) {
  return (
    <motion.div
      className="absolute"
      style={position}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 + Math.random() * 0.5 }}
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
    >
      <div className="relative group cursor-pointer">
        <span
          className={`relative z-10 flex h-3 w-3 items-center justify-center rounded-full ${bgClass} shadow-md transition-transform group-hover:scale-150`}
        />
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-md border bg-white px-2 py-1 shadow-sm ${textClass}`}>
          <span className="text-[10px] font-bold whitespace-nowrap">{label}</span>
        </div>
      </div>
    </motion.div>
  );
}

