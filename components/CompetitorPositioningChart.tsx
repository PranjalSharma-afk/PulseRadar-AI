"use client";

import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis,
  Tooltip, ResponsiveContainer, ReferenceLine, Label
} from "recharts";
import { CompetitorProfile } from "@/lib/types";

type Props = {
  competitors: CompetitorProfile[];
  keyword: string;
};

type CustomDotProps = {
  cx?: number;
  cy?: number;
  payload?: CompetitorProfile;
};

function CustomDot({ cx = 0, cy = 0, payload }: CustomDotProps) {
  if (!payload) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={10} fill="#0f172a" opacity={0.85} />
      <text
        x={cx}
        y={cy - 16}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="#0f172a"
      >
        {payload.name}
      </text>
    </g>
  );
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { payload: CompetitorProfile }[] }) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl max-w-[220px]">
      <p className="text-sm font-extrabold text-slate-900 mb-1">{d.name}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{d.positioning}</p>
      <div className="flex gap-4 text-xs font-bold text-slate-600">
        <span>Price: <strong className="text-black">{d.pricePositioning}</strong>/100</span>
        <span>Visibility: <strong className="text-black">{d.brandVisibility}</strong>/100</span>
      </div>
    </div>
  );
}

export function CompetitorPositioningChart({ competitors, keyword }: Props) {
  // Filter only competitors with positioning data
  const plotData = competitors.filter(
    (c) => c.pricePositioning !== undefined && c.brandVisibility !== undefined
  );

  if (plotData.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-[2rem] border-2 border-slate-100 bg-white p-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight text-black mb-1">Competitor Positioning</h3>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
              Price Positioning → vs Brand Visibility · {keyword}
            </p>
          </div>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <div className="flex flex-col items-center gap-1">
              <span>← Budget</span>
              <span className="text-slate-300">X Axis</span>
              <span>Premium →</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span>↑ High Visibility</span>
              <span className="text-slate-300">Y Axis</span>
              <span>↓ Low Visibility</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: -10, bottom: 20 }}>
              <XAxis
                type="number"
                dataKey="pricePositioning"
                domain={[0, 100]}
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fontWeight: 700 }}
                name="Price Positioning"
              >
                <Label value="Price Positioning (Budget → Premium)" position="insideBottom" offset={-12} style={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
              </XAxis>
              <YAxis
                type="number"
                dataKey="brandVisibility"
                domain={[0, 100]}
                stroke="#94a3b8"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fontWeight: 700 }}
                name="Brand Visibility"
              >
                <Label value="Brand Visibility" angle={-90} position="insideLeft" offset={20} style={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
              </YAxis>
              <ZAxis range={[80, 80]} />
              <Tooltip content={<CustomTooltip />} />
              {/* Quadrant dividers */}
              <ReferenceLine x={50} stroke="#e2e8f0" strokeDasharray="4 4" />
              <ReferenceLine y={50} stroke="#e2e8f0" strokeDasharray="4 4" />
              <Scatter
                data={plotData}
                shape={<CustomDot />}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Quadrant labels */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] font-bold uppercase tracking-widest">
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-2 text-emerald-700 text-center">↖ Budget · High Visibility</div>
          <div className="rounded-xl bg-violet-50 border border-violet-100 p-2 text-violet-700 text-center">↗ Premium · High Visibility</div>
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-2 text-slate-500 text-center">↙ Budget · Low Visibility</div>
          <div className="rounded-xl bg-amber-50 border border-amber-100 p-2 text-amber-700 text-center">↘ Premium · Low Visibility</div>
        </div>
      </div>
    </section>
  );
}
