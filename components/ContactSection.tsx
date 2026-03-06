"use client";

import { useState } from "react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Pranjalsudan0987@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="overflow-hidden rounded-[2rem] border-2 border-black bg-black p-8 md:p-12 relative">
        {/* decorative blobs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-[1.5fr,1fr]">
          <div>
            <p className="inline-block rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
              Get in touch
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Partner with PulseRadar AI
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-400">
              Interested in licensing PulseRadar for your CPG or wellness brand? Want a custom trend analysis for your category? Or exploring a strategic partnership?
            </p>
            <p className="mt-3 text-sm font-medium text-slate-500">
              We are actively onboarding early pilot brands for the production version of PulseRadar AI. Space is limited.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:Pranjalsudan0987@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-black transition hover:bg-slate-100"
              >
                ✉️ Send an Email
              </a>
              <button
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-700 bg-transparent px-6 py-3 text-sm font-bold text-slate-300 transition hover:border-slate-400 hover:text-white"
              >
                {copied ? "✅ Copied!" : "📋 Copy Email Address"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { icon: "🏭", title: "For CPG Brands", desc: "Access trend intelligence to validate new SKUs and enter categories before competitors." },
              { icon: "🚀", title: "For D2C Founders", desc: "Identify whitespace opportunities with full opportunity briefs and market sizing." },
              { icon: "🤝", title: "For Investors", desc: "Use PulseRadar as a portfolio-wide signal layer to evaluate category thesis with data." }
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-800/60 p-4"
              >
                <span className="shrink-0 text-2xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-extrabold text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs font-medium leading-relaxed text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
