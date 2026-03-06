export function TrendScoringFramework() {
  const categories = [
    {
      id: "search-velocity",
      label: "Search velocity",
      description:
        "Rate of change in high-intent searches across Google and marketplaces, normalised for category size.",
      value: 88,
      tone: "sky" as const
    },
    {
      id: "conversation-momentum",
      label: "Conversation momentum",
      description:
        "Depth and frequency of discussions across Reddit, Twitter, and community forums.",
      value: 82,
      tone: "fuchsia" as const
    },
    {
      id: "demand-gap",
      label: "Demand gap",
      description:
        "Mismatch between consumer demand and available supply or SKU variety in India.",
      value: 91,
      tone: "emerald" as const
    },
    {
      id: "competition-density",
      label: "Competition density",
      description:
        "Number of credible players, SKU spread, and pricing compression in the category.",
      value: 36,
      tone: "amber" as const
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pb-10 pt-2">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Trend Scoring Framework
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            PulseRadar AI evaluates each wellness signal across four dimensions.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category.id}
            className="relative flex flex-col gap-4 rounded-2xl border-2 border-slate-100 bg-white p-6 shadow-sm"
          >
            <header className="flex items-center justify-between gap-3">
              <div>
                <p className="text-base font-extrabold text-black">
                  {category.label}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                  Weighted signal contribution
                </p>
              </div>
              <ScoreBadge value={category.value} tone={category.tone} />
            </header>
            <p className="text-sm font-medium leading-relaxed text-slate-600">
              {category.description}
            </p>
            <Progress value={category.value} tone={category.tone} />
          </article>
        ))}
      </div>
    </section>
  );
}

function ScoreBadge({
  value,
  tone
}: {
  value: number;
  tone: "sky" | "fuchsia" | "emerald" | "amber";
}) {
  const styles = {
    sky:     { gradient: "from-sky-500 to-cyan-400",       bg: "bg-sky-50 border-sky-200",     text: "text-sky-700"     },
    fuchsia: { gradient: "from-fuchsia-500 to-purple-400", bg: "bg-fuchsia-50 border-fuchsia-200", text: "text-fuchsia-700" },
    emerald: { gradient: "from-emerald-500 to-lime-400",   bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700" },
    amber:   { gradient: "from-amber-400 to-orange-500",   bg: "bg-amber-50 border-amber-200",   text: "text-amber-700"   },
  }[tone];

  return (
    <div className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-black ${styles.bg} ${styles.text}`}>
      <span className={`h-1.5 w-5 rounded-full bg-gradient-to-r ${styles.gradient}`} />
      {value}/100
    </div>
  );
}

function Progress({
  value,
  tone
}: {
  value: number;
  tone: "sky" | "fuchsia" | "emerald" | "amber";
}) {
  const gradient =
    tone === "sky"
      ? "from-sky-500 to-cyan-400"
      : tone === "fuchsia"
      ? "from-fuchsia-500 to-purple-400"
      : tone === "emerald"
      ? "from-emerald-500 to-lime-400"
      : "from-amber-400 to-orange-500";

  return (
    <div className="space-y-1.5">
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-2 rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {value} / 100
      </p>
    </div>
  );
}
