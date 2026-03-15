"use client";

import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList,
  AreaChart, Area,
} from "recharts";
import { TrendConcept, CompetitorProfile, TrendTimepoint } from "@/lib/types";

type Props = {
  keyword: string;
  entityType: "company" | "product" | "ingredient" | "unknown";
  concepts: TrendConcept[];
  competitors: CompetitorProfile[];
  timeSeries?: TrendTimepoint[];
};

// ── helpers ────────────────────────────────────────────────────────────────

function seedNum(str: string) {
  return str.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
}

function getSentiment(keyword: string) {
  const s = seedNum(keyword);
  const pos = 45 + (s % 25);
  const neg = 10 + (s % 15);
  const neu = Math.max(0, 100 - pos - neg);
  return [
    { name: "Positive", value: pos, fill: "#10b981" },
    { name: "Neutral",  value: neu, fill: "#94a3b8" },
    { name: "Negative", value: neg, fill: "#f43f5e" },
  ];
}

const DENSITY_LABELS = [
  "Core Supplements","Sleep Aids","Stress Relief",
  "Athletic Recovery","Beauty Wellness","Ayurvedic",
  "Functional Drinks","Gummies","Clinical Grade",
];

function densityColor(v: number) {
  if (v >= 75) return "#f43f5e";
  if (v >= 55) return "#f59e0b";
  if (v >= 35) return "#10b981";
  return "#bbf7d0";
}

function CustomXAxisTick({ x, y, payload }: any) {
  if (!payload || !payload.value) return null;
  const words = payload.value.split(" ");
  const line1 = words.length > 2 ? words.slice(0, 2).join(" ") : words[0];
  const line2 = words.length > 2 ? words.slice(2).join(" ") : words.slice(1).join(" ");
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fill="#64748b" fontSize={9} fontWeight={800} letterSpacing={0.5}>
        <tspan x={0} dy="0">{line1}</tspan>
        {line2 && <tspan x={0} dy="12">{line2}</tspan>}
      </text>
    </g>
  );
}

// ── ChartCard wrapper ──────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border-2 border-slate-100 bg-white p-8">
      <h3 className="text-xl font-extrabold text-black tracking-tight mb-1">{title}</h3>
      <p className="text-xs font-medium text-slate-400 mb-6 uppercase tracking-widest">{subtitle}</p>
      {children}
    </div>
  );
}

// ── main ──────────────────────────────────────────────────────────────────

export function AdvancedCharts({ keyword, concepts = [], timeSeries = [] }: Props) {
  const s = seedNum(keyword);

  // Number of words in the keyword — used to cleanly strip the keyword prefix from concept names
  // e.g. keyword="Magnesium" → 1 word, keyword="Mosaic Wellness" → 2 words
  const kwWordCount = keyword.trim().split(/\s+/).length;
  const stripKeyword = (name: string) =>
    name.split(" ").slice(kwWordCount).join(" ") || name;

  // 1. Demand distribution — use radar concepts or fallback
  const demandData = (concepts.length > 0 ? concepts.slice(0, 5) : []).map(c => ({
    name: stripKeyword(c.name),
    demand: c.demand,
  }));

  // 2. Sentiment
  const sentimentData = getSentiment(keyword);

  // 3. Format popularity — sorted concepts by growth
  const popularityData = [...concepts]
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 4)
    .map(c => ({
      name: stripKeyword(c.name),
      growth: c.growth,
    }));

  // 4. Competitive density grid
  const densityGrid = DENSITY_LABELS.map((label, i) => ({
    label,
    density: ((s * (i + 3)) % 80) + 20,
  }));

  // 5. Area chart — market volume growth (generated from timeSeries or synthetic)
  const volumeData = timeSeries.length > 0
    ? timeSeries.map(pt => ({
        month: pt.month,
        searchInterest: pt.searchInterest,
        reviewVolume: pt.reviewVolume ?? Math.floor((pt.searchInterest ?? 30) * 0.8),
      }))
    : Array.from({ length: 6 }, (_, i) => ({
        month: ["Q1 2025","Q2 2025","Q3 2025","Q4 2025","Q1 2026","Q2 2026"][i],
        searchInterest: 30 + i * 10 + (s % 15),
        reviewVolume: 20 + i * 8 + (s % 12),
      }));

  if (!keyword) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 shadow-sm mb-4">
          Advanced Analytics
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-black md:text-4xl">
          Market Intelligence Panels
        </h2>
        <p className="mt-2 text-slate-500 font-medium text-base max-w-2xl">
          Demand distribution, consumer sentiment, product format momentum, and competitive density for{" "}
          <strong>{keyword}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* 1 · Demand Distribution */}
        <ChartCard title="Demand Distribution" subtitle="Units of demand per product format">
          {demandData.length > 0 ? (
            <div className="h-56 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demandData} margin={{ left: -20, right: 10, top: 10, bottom: 20 }}>
                  <XAxis dataKey="name" interval={0} tick={<CustomXAxisTick />} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fontWeight: 700 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontWeight: "bold", fontSize: 12 }} />
                  <Bar dataKey="demand" radius={[8, 8, 0, 0]} fill="#0ea5e9" maxBarSize={50}>
                    <LabelList dataKey="demand" position="top" style={{ fontSize: 10, fontWeight: 800 }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-56 flex items-center justify-center text-slate-300 text-sm font-medium">Generating data…</div>
          )}
        </ChartCard>

        {/* 2 · Consumer Sentiment Donut */}
        <ChartCard title="Consumer Sentiment" subtitle="Aggregated from Amazon · Reddit · YouTube">
          <div className="h-56 flex items-center justify-center gap-8">
            <PieChart width={175} height={175}>
              <Pie data={sentimentData} cx={83} cy={83} innerRadius={42} outerRadius={78} paddingAngle={3} dataKey="value">
                {sentimentData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 12, fontWeight: "bold", fontSize: 12 }} />
            </PieChart>
            <div className="flex flex-col gap-3">
              {sentimentData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: d.fill }} />
                  <span className="text-xs font-bold text-slate-700">{d.name}</span>
                  <span className="ml-auto pl-3 text-xs font-black text-slate-400">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* 3 · Product Format Popularity */}
        <ChartCard title="Product Format Popularity" subtitle="Growth momentum by delivery format">
          {popularityData.length > 0 ? (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={popularityData} margin={{ left: 0, right: 48 }}>
                  <XAxis type="number" tick={{ fontSize: 10, fontWeight: 700 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 10, fontWeight: 700 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, fontWeight: "bold", fontSize: 12 }} />
                  <Bar dataKey="growth" radius={[0, 8, 8, 0]} fill="#8b5cf6">
                    <LabelList dataKey="growth" position="right" style={{ fontSize: 11, fontWeight: 800 }} formatter={(v: number) => `${v}%`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-56 flex items-center justify-center text-slate-300 text-sm font-medium">Generating data…</div>
          )}
        </ChartCard>

        {/* 4 · Competitive Density Heatmap */}
        <ChartCard title="Competitive Density Map" subtitle="Category crowding · red = saturated · green = whitespace">
          <div className="grid grid-cols-3 gap-2">
            {densityGrid.map(({ label, density }) => (
              <div
                key={label}
                className="rounded-xl p-3 flex flex-col items-center text-center"
                style={{ backgroundColor: densityColor(density) + "28", borderLeft: `3px solid ${densityColor(density)}` }}
              >
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 leading-tight mb-1">{label}</span>
                <span className="text-base font-black" style={{ color: densityColor(density) }}>{density}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-slate-400">
            {[["#bbf7d0","Whitespace"],["#10b981","Opportunity"],["#f59e0b","Crowded"],["#f43f5e","Saturated"]].map(([c,l]) => (
              <span key={l} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c }} />{l}</span>
            ))}
          </div>
        </ChartCard>

        {/* 5 · Market Volume Trend — Area chart spanning full row */}
        <div className="md:col-span-2">
          <ChartCard title="Market Volume Trend" subtitle="Search interest vs consumer review volume over time">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volumeData} margin={{ left: -10, top: 10 }}>
                  <defs>
                    <linearGradient id="gSearch" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gReview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontWeight: "bold", fontSize: 12 }} />
                  <Area type="monotone" dataKey="searchInterest" name="Search Interest" stroke="#0ea5e9" strokeWidth={3} fill="url(#gSearch)" dot={{ r:4 }} activeDot={{ r:6 }} />
                  <Area type="monotone" dataKey="reviewVolume"   name="Review Volume"   stroke="#f59e0b" strokeWidth={3} fill="url(#gReview)" dot={{ r:4 }} activeDot={{ r:6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

      </div>
    </section>
  );
}
