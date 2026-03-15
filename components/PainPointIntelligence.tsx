import { PainPointInsight } from "@/lib/types";

type Props = {
  insights: PainPointInsight[];
};

export function PainPointIntelligence({ insights }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Consumer Pain Point Intelligence
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            Real sentiment distilled from Amazon, Reddit, Google Trends, YouTube & Research Pubs.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm text-[11px] font-bold uppercase tracking-wider text-slate-500">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          5 Sources Scanned
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {insights.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-6 rounded-2xl border-2 border-slate-100 bg-white p-6 shadow-sm"
          >
            <div className="space-y-4">
              {item.quotes.map((quote, idx) => (
                <figure
                  key={idx}
                  className="rounded-xl bg-slate-50 p-4 border border-slate-100 relative"
                >
                  <blockquote className="text-sm font-medium leading-relaxed text-slate-700 italic">
                    “{quote}”
                  </blockquote>
                </figure>
              ))}
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5 p-3 text-xs text-slate-100">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                AI Insight
              </p>
              <p className="text-sm font-semibold leading-relaxed text-emerald-950">
                {item.insightSummary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

