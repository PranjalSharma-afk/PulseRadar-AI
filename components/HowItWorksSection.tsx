"use client";

import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Signal Ingestion",
      description:
        "PulseRadar continuously monitors search queries on Google and marketplaces, social discussions on Reddit and Twitter, content creation patterns on YouTube and Instagram, and product reviews on Amazon — all focused on Indian wellness consumers.",
      icon: "📡",
      color: "bg-sky-50 border-sky-200"
    },
    {
      step: "02",
      title: "Multi-Signal Scoring",
      description:
        "Each trend is scored across four weighted dimensions: Search Velocity (how fast intent is growing), Conversation Momentum (depth of social discussion), Demand Gap (supply deficit vs. consumer pull), and Competition Density (how saturated the space already is).",
      icon: "📊",
      color: "bg-fuchsia-50 border-fuchsia-200"
    },
    {
      step: "03",
      title: "Opportunity Ranking",
      description:
        "Trends are ranked 0–10 by composite score, with the highest-potential, lowest-competition opportunities surfaced at the top. Scores are calibrated against India-specific benchmarks, not global averages.",
      icon: "🏆",
      color: "bg-emerald-50 border-emerald-200"
    },
    {
      step: "04",
      title: "AI Brief Generation",
      description:
        "For each ranked trend, PulseRadar generates an AI-written Opportunity Brief: a product concept, the consumer pain point it addresses, market evidence, estimated opportunity size, and competitive positioning insights.",
      icon: "✨",
      color: "bg-amber-50 border-amber-200"
    }
  ];

  const faqs = [
    {
      q: "How often is the data updated?",
      a: "In the demo, data is simulated. In the production version, trend signals are refreshed weekly with near-real-time updates for fast-moving categories."
    },
    {
      q: "Can I use this for my brand's R&D?",
      a: "Yes — the production version is designed to be licensed by CPG companies, D2C wellness brands, and product teams who want a data-driven edge in category selection."
    },
    {
      q: "What makes this different from Google Trends?",
      a: "Google Trends shows you one signal. PulseRadar fuses 5+ data sources into a single weighted score, adds competitor density analysis, and surfaces format-level product opportunities specifically for India."
    },
    {
      q: "Is the data India-specific?",
      a: "Yes. All signals are filtered for Indian geographies, languages, and commerce behaviour. Global trends are de-weighted if they haven't shown traction in the Indian market."
    }
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
          How It Works
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
          From raw data signals to actionable opportunity briefs — in four steps.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.step}
            className={`relative flex flex-col gap-4 rounded-2xl border-2 p-6 ${step.color}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">{step.icon}</span>
              <span className="text-4xl font-black text-black/10">{step.step}</span>
            </div>
            <h3 className="text-sm font-extrabold text-black">{step.title}</h3>
            <p className="text-xs font-medium leading-relaxed text-slate-600">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Architecture diagram area */}
      <div className="mb-16 overflow-hidden rounded-2xl border-2 border-black bg-black p-8">
        <p className="mb-6 text-xs font-black uppercase tracking-widest text-slate-400">
          Signal Architecture
        </p>
        <div className="grid grid-cols-[1fr,auto,1fr,auto,1fr] items-start gap-4">
          {[
            { label: "Data Sources", items: ["Google Trends", "Reddit", "YouTube", "Amazon", "Pub Research"] },
            { label: "Processing Layer", items: ["Normalisation", "Geo Filtering", "Deduplication", "Trend Scoring", "LLM Synthesis"] },
            { label: "Output", items: ["Trend Scores", "Briefs", "Leaderboard", "Pain Points", "Market Sizing"] }
          ].map((col, ci) => (
            <>
              <div key={col.label} className="flex flex-col gap-3 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{col.label}</p>
                {col.items.map((item) => (
                  <span key={item} className="inline-block w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-bold text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
              {ci < 2 && (
                <div key={`arrow-${ci}`} className="flex items-center justify-center pt-7">
                  <span className="text-xl font-black text-slate-600">→</span>
                </div>
              )}
            </>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="mb-6 text-xl font-extrabold text-black">Frequently Asked Questions</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
            >
              <p className="text-sm font-extrabold text-black">{faq.q}</p>
              <p className="mt-2 text-xs font-medium leading-relaxed text-slate-500">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
