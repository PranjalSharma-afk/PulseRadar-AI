export function DataSourcesSection() {
  const sources = [
    {
      name: "Google Trends",
      description:
        "Measures search velocity and intent signals across Indian geographies and languages."
    },
    {
      name: "Reddit",
      description:
        "Surfaces deep conversations around symptoms, routines, and supplement experiences."
    },
    {
      name: "Amazon Reviews",
      description:
        "Captures real user feedback on product efficacy, side effects, and packaging."
    },
    {
      name: "YouTube",
      description:
        "Tracks education-driven content creation and influencer-led category formation."
    },
    {
      name: "Research Publications",
      description:
        "Grounds each signal in peer-reviewed evidence and ingredient-level efficacy data."
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

      <div className="grid gap-6 md:grid-cols-5">
        {sources.map((source) => (
          <article
            key={source.name}
            className="flex flex-col gap-3 rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-black hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[13px] font-black uppercase text-black">
                {source.name[0]}
              </span>
              <h3 className="text-sm font-extrabold text-black">
                {source.name}
              </h3>
            </div>
            <p className="text-xs font-medium leading-relaxed text-slate-500">{source.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

