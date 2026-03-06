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
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-50 md:text-xl">
            Trend Scoring Framework
          </h2>
          <p className="mt-1 text-xs text-slate-400 md:text-sm">
            PulseRadar AI evaluates each wellness signal across four dimensions.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <article
            key={category.id}
            className="card-elevated relative flex flex-col gap-3 rounded-2xl p-4"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-100/0 via-slate-100/0 to-slate-100/5" />
            <header className="relative flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-slate-50">
                  {category.label}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Weighted signal contribution
                </p>
              </div>
              <ScoreBadge value={category.value} tone={category.tone} />
            </header>
            <div className="relative space-y-2 text-[11px] text-slate-300">
              <p>{category.description}</p>
              <Progress value={category.value} tone={category.tone} />
            </div>
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
  const gradient =
    tone === "sky"
      ? "from-sky-500 to-cyan-400"
      : tone === "fuchsia"
      ? "from-fuchsia-500 to-purple-400"
      : tone === "emerald"
      ? "from-emerald-500 to-lime-400"
      : "from-amber-400 to-orange-500";

  return (
    <div className="inline-flex items-center rounded-full bg-slate-900/90 px-2.5 py-1 text-[10px] text-slate-100 ring-1 ring-slate-700/80">
      <span
        className={`mr-1 h-1.5 w-6 rounded-full bg-gradient-to-r ${gradient}`}
      />
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
      <div className="h-1.5 w-full rounded-full bg-slate-800/80">
        <div
          className={`h-1.5 rounded-full bg-gradient-to-r ${gradient}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-[10px] text-slate-500">{value.toFixed(0)} / 100</p>
    </div>
  );
}

