"use client";

import { motion } from "framer-motion";

export function AboutSection() {
  const pillars = [
    {
      icon: "🎯",
      title: "Signal-First Intelligence",
      description:
        "PulseRadar AI doesn't rely on gut feel. It blends search velocity, social conversation depth, content creation momentum, and demand gaps into a single, weighted opportunity score for every trend."
    },
    {
      icon: "🇮🇳",
      title: "Built for India",
      description:
        "Most global trend tools miss India's nuance. PulseRadar is calibrated for Indian geographies, languages, shopping behaviour, and the unique pace of wellness adoption in metros vs tier-2 cities."
    },
    {
      icon: "⚡",
      title: "Speed to Insight",
      description:
        "Founders waste months validating what data already knows. PulseRadar compresses that research into a single dashboard — from raw signal to opportunity brief in seconds."
    },
    {
      icon: "🔁",
      title: "Continuously Updated",
      description:
        "The production version of PulseRadar plugs into live data providers, refreshing scores weekly so your product roadmap always reflects the market's real-time pulse."
    }
  ];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="mb-10 grid gap-10 md:grid-cols-[1.4fr,1fr]">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            About PulseRadar AI
          </h2>
          <p className="mt-4 text-base font-medium leading-relaxed text-slate-600">
            PulseRadar AI is a wellness trend intelligence platform built for India's next wave of{" "}
            <span className="font-extrabold text-black">CPG founders, D2C brands, and product strategists</span>.
            It surfaces the earliest, highest-conviction wellness opportunities before they become crowded — powered by multi-signal AI scoring across search, social, content, and commerce data.
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-500">
            This demo uses simulated, anonymised data to showcase the platform's capability. The production version integrates live Indian wellness signals across multiple channels in real time.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-slate-50 px-4 py-2 text-xs font-bold text-black">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Demo — simulated data
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500">
              🚀 Production version coming soon
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border-2 border-black bg-black p-8 text-white">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400">
            Why PulseRadar?
          </p>
          <p className="mt-4 text-2xl font-black leading-tight text-white">
            The Indian wellness market is a{" "}
            <span className="text-emerald-400">₹30,000 Cr</span>{" "}
            opportunity growing at 12% CAGR.
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-400">
            Yet most brands enter categories too late, when competition is already crowded. PulseRadar gives you the edge to move first.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            className="flex flex-col gap-3 rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-xl">
              {pillar.icon}
            </span>
            <h3 className="text-sm font-extrabold text-black">{pillar.title}</h3>
            <p className="text-xs font-medium leading-relaxed text-slate-500">{pillar.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
