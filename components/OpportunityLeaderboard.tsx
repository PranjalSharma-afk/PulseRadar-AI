import { TrendSignal } from "@/lib/types";
import { useMemo, useState } from "react";

type Props = {
  trends: TrendSignal[];
};

type SortKey = "score" | "market" | "competition" | "time";

export function OpportunityLeaderboard({ trends }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const sorted = useMemo(() => {
    let items = [...trends];
    if (filterCategory !== "all") {
      items = items.filter((t) => t.category === filterCategory);
    }
    items.sort((a, b) => {
      const factor = direction === "asc" ? 1 : -1;
      switch (sortKey) {
        case "score":
          return factor * (a.score - b.score);
        case "market":
          return factor * (a.estimatedMarketSizeCr - b.estimatedMarketSizeCr);
        case "competition": {
          const weight = { Low: 1, Moderate: 2, High: 3 } as const;
          return factor * (weight[a.competition] - weight[b.competition]);
        }
        case "time":
          return factor * (a.timeToMainstreamMonths - b.timeToMainstreamMonths);
        default:
          return 0;
      }
    });
    return items;
  }, [trends, sortKey, direction, filterCategory]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection(key === "time" || key === "competition" ? "asc" : "desc");
    }
  };

  return (
    <section id="leaderboard" className="mx-auto max-w-6xl px-6 pb-20 pt-10 md:pt-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
            Opportunity Leaderboard
          </h2>
          <p className="mt-2 text-sm font-medium text-slate-500 md:text-base">
            Ranked view of India-first wellness bets by score, market size, and competition.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold uppercase tracking-wider">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border-2 border-slate-200 bg-white px-4 py-2.5 text-black focus:border-black focus:outline-none focus:ring-0 transition-colors cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Sleep">Sleep</option>
            <option value="Gut Health">Gut Health</option>
            <option value="Stress">Stress</option>
            <option value="Beauty">Beauty</option>
            <option value="Immunity">Immunity</option>
            <option value="Energy">Energy</option>
          </select>
          <p className="text-slate-500">
            Showing{" "}
            <span className="text-black">
              {sorted.length} opportunities
            </span>
          </p>
        </div>
      </div>

      <div className="card-elevated overflow-hidden border-2 rounded-[2rem]">
        <div className="max-h-[400px] overflow-auto">
          <table className="min-w-full text-left text-sm text-slate-900 border-collapse">
            <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-widest text-slate-500 sticky top-0 z-10 border-b-2 border-slate-200">
              <tr>
                <Th label="Rank" />
                <Th label="Trend Name" />
                <Th
                  label="Trend Score"
                  sortable
                  active={sortKey === "score"}
                  direction={direction}
                  onClick={() => handleSort("score")}
                />
                <Th
                  label="Est. Market Size"
                  sortable
                  active={sortKey === "market"}
                  direction={direction}
                  onClick={() => handleSort("market")}
                />
                <Th
                  label="Competition"
                  sortable
                  active={sortKey === "competition"}
                  direction={direction}
                  onClick={() => handleSort("competition")}
                />
                <Th
                  label="Time To Mainstream"
                  sortable
                  active={sortKey === "time"}
                  direction={direction}
                  onClick={() => handleSort("time")}
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {sorted.map((trend, index) => (
                <tr
                  key={trend.id}
                  className="group transition-colors hover:bg-slate-50 cursor-default"
                >
                  <td className="px-6 py-4 text-xs font-bold text-slate-400">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-black">{trend.name}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {trend.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-700">
                      {trend.score.toFixed(1)} <span className="text-emerald-300">/ 10</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold">
                    ₹{trend.estimatedMarketSizeCr}Cr
                  </td>
                  <td className="px-6 py-4">
                    <CompetitionTag level={trend.competition} />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">
                    <span className="font-bold text-black">{trend.timeToMainstreamMonths}</span> months
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Th({
  label,
  sortable,
  active,
  direction,
  onClick
}: {
  label: string;
  sortable?: boolean;
  active?: boolean;
  direction?: "asc" | "desc";
  onClick?: () => void;
}) {
  if (!sortable) {
    return (
      <th scope="col" className="px-6 py-4">
        {label}
      </th>
    );
  }
  return (
    <th scope="col" className="px-6 py-4">
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 ${
          active ? "bg-slate-200 text-black" : "text-slate-500 hover:text-black hover:bg-slate-100"
        } transition-colors`}
      >
        {label}
        <span className="text-[10px]">
          {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
  );
}

function CompetitionTag({
  level
}: {
  level: TrendSignal["competition"];
}) {
  const map: Record<
    TrendSignal["competition"],
    { label: string; classes: string }
  > = {
    Low: {
      label: "Low",
      classes: "bg-emerald-50 text-emerald-700"
    },
    Moderate: {
      label: "Moderate",
      classes: "bg-amber-50 text-amber-700"
    },
    High: {
      label: "High",
      classes: "bg-rose-50 text-rose-700"
    }
  };

  const { label, classes } = map[level];
  return (
    <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${classes}`}>
      {label}
    </span>
  );
}

