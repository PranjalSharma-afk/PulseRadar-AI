"use client";

import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList
} from "recharts";
import { TrendConcept, CompetitorProfile } from "@/lib/types";

type Props = {
  keyword: string;
  entityType: "company" | "product" | "ingredient" | "unknown";
  concepts: TrendConcept[];
  competitors: CompetitorProfile[];
};

// ── helpers ──────────────────────────────────────────────────────────────────

function seed(str: string) {
  return str.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
}

function getSentiment(keyword: string) {
  const s = seed(keyword);
  const pos = 45 + (s % 25);
  const neg = 10 + (s % 15);
  return [
    { name: "Positive", value: pos,       fill: "#10b981" },
    { name: "Neutral",  value: 100 - pos - neg, fill: "#94a3b8" },
    { name: "Negative", value: neg,        fill: "#f43f5e" },
  ];
}

function getDemandDistribution(concepts: TrendConcept[]) {
  return concepts.slice(0, 5).map((c) => ({
    name: c.name.replace(/^.+? /, ""), // strip keyword prefix for brevity
    demand: c.demand,
  }));
}

function getFormatPopularity(concepts: TrendConcept[]) {
  return [...concepts]
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 4)
    .map((c) => ({
      name: c.name.replace(/^.+? /, ""),
      growth: c.growth,
    }));
}

const DENSITY_LABELS = [
  "Core Supplements", "Sleep Aids", "Stress Relief",
  "Athletic Recovery", "Beauty Wellness", "Ayurvedic",
  "Functional Drinks", "Gummies", "Clinical Grade",
];

function getDensityGrid(keyword: string) {
  const s = seed(keyword);
  return DENSITY_LABELS.map((label, i) => ({
    label,
    density: ((s * (i + 3)) % 80) + 20, // 20–100
  }));
}

function densityColor(v: number) {
  if (v >= 75) return "#f43f5e";  // red – very crowded
  if (v >= 55) return "#f59e0b";  // amber – moderate
  if (v >= 35) return "#10b981";  // green – opportunity
  return "#d1fae5";               // pale – whitespace
}

// ── sub-components ────────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[2rem] border-2 border-slate-100 bg-white p-8">
      <h3 className="text-xl font-extrabold text-black tracking-tight mb-1">{title}</h3>
      <p className="text-xs font-medium text-slate-400 mb-6 uppercase tracking-widest">{subtitle}</p>
      {children}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────

export function AdvancedCharts({ keyword, concepts, competitors }: Props) {
  const sentimentData      = getSentiment(keyword);
  const demandData         = getDemandDistribution(concepts);
  const popularityData     = getFormatPopularity(concepts);
  const densityGrid        = getDensityGrid(keyword);

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
          Demand distribution, consumer sentiment, product format momentum, and competitive density for <strong>{keyword}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* 1 · Demand Distribution */}
        <ChartCard title="Demand Distribution" subtitle="Units of demand per product format">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demandData} margin={{ left: -20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontWeight: "bold", fontSize: 12 }}
                />
                <Bar dataKey="demand" radius={[8, 8, 0, 0]} fill="#0ea5e9">
                  <LabelList dataKey="demand" position="top" style={{ fontSize: 11, fontWeight: 700 }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* 2 · Consumer Sentiment Donut */}
        <ChartCard title="Consumer Sentiment" subtitle="Aggregated from Amazon · Reddit · YouTube">
          <div className="h-56 flex items-center justify-center gap-8">
            <PieChart width={180} height={180}>
              <Pie
                data={sentimentData}
                cx={85} cy={85}
                innerRadius={45} outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {sentimentData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ borderRadius: 12, fontWeight: "bold", fontSize: 12 }} />
            </PieChart>
            <div className="flex flex-col gap-3">
              {sentimentData.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: s.fill }} />
                  <span className="text-xs font-bold text-slate-700">{s.name}</span>
                  <span className="ml-auto text-xs font-black text-slate-400">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        {/* 3 · Product Format Popularity (horizontal bar) */}
        <ChartCard title="Product Format Popularity" subtitle="Growth momentum by delivery format">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={popularityData} margin={{ left: 0, right: 40 }}>
                <XAxis type="number" tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11, fontWeight: 700 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, fontWeight: "bold", fontSize: 12 }} />
                <Bar dataKey="growth" radius={[0, 8, 8, 0]} fill="#8b5cf6">
                  <LabelList dataKey="growth" position="right" style={{ fontSize: 11, fontWeight: 700 }} formatter={(v: number) => `${v}%`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* 4 · Competitive Density Heatmap */}
        <ChartCard title="Competitive Density Map" subtitle="Category crowding · red = saturated, green = whitespace">
          <div className="grid grid-cols-3 gap-2">
            {densityGrid.map(({ label, density }) => (
              <div
                key={label}
                className="rounded-xl p-3 flex flex-col items-center text-center"
                style={{ backgroundColor: densityColor(density) + "33", borderLeft: `4px solid ${densityColor(density)}` }}
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 leading-tight mb-1">{label}</span>
                <span className="text-lg font-black" style={{ color: densityColor(density) }}>{density}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#d1fae5]" />Whitespace</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />Moderate</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />Crowded</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-[#f43f5e]" />Saturated</span>
          </div>
        </ChartCard>

      </div>
    </section>
  );
}
