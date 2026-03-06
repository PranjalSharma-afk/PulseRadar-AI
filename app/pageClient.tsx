"use client";

import { HeroSection } from "@/components/HeroSection";
import { OpportunityBriefModal } from "@/components/OpportunityBriefModal";
import { OpportunityLeaderboard } from "@/components/OpportunityLeaderboard";
import { PainPointIntelligence } from "@/components/PainPointIntelligence";
import { TrendRadarDashboard } from "@/components/TrendRadarDashboard";
import { TrendScoringFramework } from "@/components/TrendScoringFramework";
import { TrendSignalGraph } from "@/components/TrendSignalGraph";
import { FounderInsightPanel } from "@/components/FounderInsightPanel";
import { DataSourcesSection } from "@/components/DataSourcesSection";
import {
  fetchOpportunityBrief,
  fetchTrendSeries
} from "@/lib/api";
import { PainPointInsight, OpportunityBrief, TrendSignal, TrendTimepoint } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

type Props = {
  initialTrends: TrendSignal[];
  initialPainPoints: PainPointInsight[];
  initialSeries: TrendTimepoint[];
  initialTrend: TrendSignal;
  initialBrief: OpportunityBrief | null;
};

export default function PageClient({
  initialTrends,
  initialPainPoints,
  initialSeries,
  initialTrend,
  initialBrief
}: Props) {
  const [trends] = useState<TrendSignal[]>(initialTrends);
  const [selectedTrend, setSelectedTrend] = useState<TrendSignal>(initialTrend);
  const [series, setSeries] = useState<TrendTimepoint[]>(initialSeries);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBrief, setActiveBrief] = useState<OpportunityBrief | null>(
    initialBrief
  );

  const radarRef = useRef<HTMLElement | null>(null);
  const leaderboardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    radarRef.current = document.getElementById("radar");
    leaderboardRef.current = document.getElementById("leaderboard");
  }, []);

  const handleSelectTrend = async (trend: TrendSignal) => {
    setSelectedTrend(trend);
    const [nextSeries, brief] = await Promise.all([
      fetchTrendSeries(trend.id),
      fetchOpportunityBrief(trend.id)
    ]);
    setSeries(nextSeries);
    setActiveBrief(brief);
    setModalOpen(true);
  };

  const scrollToRadar = () => {
    radarRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToLeaderboard = () => {
    leaderboardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <>
      <HeroSection
        onExploreRadar={scrollToRadar}
        onShowBriefs={scrollToLeaderboard}
      />

      <TrendRadarDashboard trends={trends} onSelectTrend={handleSelectTrend} />

      <TrendSignalGraph selectedTrend={selectedTrend} series={series} />

      <PainPointIntelligence insights={initialPainPoints} />

      <TrendScoringFramework />

      <section id="leaderboard">
        <OpportunityLeaderboard trends={trends} />
      </section>

      <FounderInsightPanel />

      <section id="about" className="mx-auto max-w-6xl px-6 pb-4 pt-2">
        <p className="text-[11px] text-slate-500">
          PulseRadar AI uses simulated, anonymised data in this demo. The
          production version will plug into live Indian wellness signals across
          multiple channels.
        </p>
      </section>

      <DataSourcesSection />

      <section
        id="how-it-works"
        className="mx-auto max-w-6xl px-6 pb-8 pt-4 text-[11px] text-slate-400"
      >
        <p>
          Behind the scenes, PulseRadar AI aggregates search trends, public
          reviews, social conversations, and content creation patterns to score
          wellness opportunities. The backend API is designed to plug into
          real-time data providers as you scale.
        </p>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-6xl px-6 pb-10 text-sm font-medium text-slate-500"
      >
        <p>
          Interested in partnering or piloting PulseRadar AI for your CPG or
          wellness brand? Reach out at{" "}
          <a href="mailto:Pranjalsudan0987@gmail.com" className="font-black text-black hover:underline">
            Pranjalsudan0987@gmail.com
          </a>
          .
        </p>
      </section>

      <OpportunityBriefModal
        open={modalOpen}
        trend={selectedTrend}
        brief={activeBrief}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

