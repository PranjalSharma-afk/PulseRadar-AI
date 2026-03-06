"use client";

import { motion } from "framer-motion";

export function DataSourcesSection() {
  const sources = [
    {
      name: "Google Trends",
      icon: "🔍",
      description:
        "Measures search velocity and intent signals across Indian geographies and languages.",
      href: "https://trends.google.com/trends/?geo=IN"
    },
    {
      name: "Reddit",
      icon: "💬",
      description:
        "Surfaces deep conversations around symptoms, routines, and supplement experiences.",
      href: "https://www.reddit.com/r/IndianSkincareAddicts/"
    },
    {
      name: "Amazon Reviews",
      icon: "📦",
      description:
        "Captures real user feedback on product efficacy, side effects, and packaging.",
      href: "https://www.amazon.in/s?k=wellness+supplements"
    },
    {
      name: "YouTube",
      icon: "▶️",
      description:
        "Tracks education-driven content creation and influencer-led category formation.",
      href: "https://www.youtube.com/results?search_query=wellness+india"
    },
    {
      name: "Research Pubs",
      icon: "📄",
      description:
        "Grounds each signal in peer-reviewed evidence and ingredient-level efficacy data.",
      href: "https://pubmed.ncbi.nlm.nih.gov/"
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10" id="data-sources">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Data Sources
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            PulseRadar AI blends multiple public signals to avoid overfitting to
            a single channel.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-5">
        {sources.map((source, i) => (
          <motion.a
            key={source.name}
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-3 rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-md transition-all duration-300 hover:border-black hover:shadow-2xl cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 * i, duration: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-lg">
                {source.icon}
              </span>
              <h3 className="text-sm font-extrabold text-black group-hover:underline leading-tight">
                {source.name} ↗
              </h3>
            </div>
            <p className="text-xs font-medium leading-relaxed text-slate-500">{source.description}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
