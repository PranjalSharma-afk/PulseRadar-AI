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
import { AboutSection } from "@/components/AboutSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ContactSection } from "@/components/ContactSection";
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
  initialBrief: OpportunityBrief | undefined;
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
  const [activeBrief, setActiveBrief] = useState<OpportunityBrief | undefined>(
    initialBrief
  );

  const radarRef = useRef<HTMLElement | null>(null);
  const leaderboardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    radarRef.current = document.getElementById("radar");
    leaderboardRef.current = document.getElementById("leaderboard");
  }, []);

  const handleSelectTrend = async (trend: TrendSignal) => {
    console.log("Clicked trend:", trend.id);
    setSelectedTrend(trend);
    try {
      const [nextSeries, brief] = await Promise.all([
        fetchTrendSeries(trend.id),
        fetchOpportunityBrief(trend.id)
      ]);
      console.log("Fetched series:", nextSeries?.length, "brief:", !!brief);
      setSeries(nextSeries);
      setActiveBrief(brief);
      setModalOpen(true);
    } catch (err) {
      console.error("Error setting trend data:", err);
    }
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

      <AboutSection />

      <DataSourcesSection />

      <HowItWorksSection />

      <ContactSection />

      <OpportunityBriefModal
        open={modalOpen}
        trend={selectedTrend}
        brief={activeBrief ?? undefined}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

