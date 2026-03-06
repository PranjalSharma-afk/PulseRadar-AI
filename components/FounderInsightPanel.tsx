export function FounderInsightPanel() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-black bg-white p-8 shadow-2xl">
        <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-emerald-100 blur-3xl" />
        <header className="relative mb-6 flex flex-col items-start md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="inline-block rounded-full bg-black px-3 py-1.5 text-[11px] font-black uppercase tracking-widest text-white">
              Weekly Founder Insight
            </p>
            <p className="mt-3 text-sm font-bold text-slate-500">
              Curated AI summary of emerging wellness signals in India.
            </p>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-black">
            Week of simulated data
          </span>
        </header>

        <div className="relative grid gap-8 md:grid-cols-[1.7fr,1.2fr]">
          <article className="space-y-4 text-sm font-medium leading-relaxed text-slate-600">
            <p>
              Consumers are increasingly seeking{" "}
              <span className="font-extrabold text-black">
                natural sleep solutions without melatonin dependency
              </span>
              . Magnesium glycinate-related searches show strong multi-signal
              growth across metros and tier-2 cities, with especially high
              intent around &quot;gentle&quot; and &quot;non-groggy&quot; sleep
              aids.
            </p>
            <p>
              Yet, product availability in India is skewed towards{" "}
              <span className="font-extrabold text-black">imported tablets and capsules</span>
              , leaving a void in friendly, nightly ritual formats suitable for
              Indian digestive comfort.
            </p>
          </article>
          <aside className="space-y-4 rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 text-sm">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-400">
              Recommended Concept
            </h3>
            <p className="text-lg font-extrabold text-black">
              Magnesium Glycinate Sleep Gummies
            </p>
            <ul className="mt-3 space-y-2.5 text-xs font-semibold text-slate-600">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Sugar-conscious, stomach-friendly formulation.</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Melatonin-free, with L-theanine and botanicals.</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Tailored for Indian flavours and warm weather logistics.</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Strong D2C + marketplace launch potential in metro clusters.</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

