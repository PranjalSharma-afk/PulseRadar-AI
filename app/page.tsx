import { AnimatedBackground } from "@/components/AnimatedBackground";
import { AppFooter } from "@/components/AppFooter";
import { DataSourcesSection } from "@/components/DataSourcesSection";
import { FounderInsightPanel } from "@/components/FounderInsightPanel";
import { HeroSection } from "@/components/HeroSection";
import { IntroAnimation } from "@/components/IntroAnimation";
import { Logo } from "@/components/Logo";
import { OpportunityBriefModal } from "@/components/OpportunityBriefModal";
import { OpportunityLeaderboard } from "@/components/OpportunityLeaderboard";
import { PainPointIntelligence } from "@/components/PainPointIntelligence";
import { TrendRadarDashboard } from "@/components/TrendRadarDashboard";
import { TrendScoringFramework } from "@/components/TrendScoringFramework";
import { TrendSignalGraph } from "@/components/TrendSignalGraph";
import {
  fetchOpportunityBrief,
  fetchPainPointInsights,
  fetchTrendSeries,
  fetchTrends
} from "@/lib/api";
import { mockTrendSignals, mockTrendTimeSeries } from "@/lib/mockData";
import { OpportunityBrief, TrendSignal } from "@/lib/types";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientPage = dynamic(() => import("./pageClient"));

export default async function HomePage() {
  // Preload initial data on the server, with graceful fallback to mock data.
  const [trends, painPoints] = await Promise.all([
    fetchTrends(),
    fetchPainPointInsights()
  ]);

  const initialTrend = trends[0] ?? mockTrendSignals[0];
  const initialSeries =
    (await fetchTrendSeries(initialTrend.id)) ||
    mockTrendTimeSeries[initialTrend.id] ||
    [];

  const initialBrief: OpportunityBrief | undefined =
    (await fetchOpportunityBrief(initialTrend.id)) ?? undefined;

  return (
    <main className="relative min-h-screen text-slate-900">
      <IntroAnimation />
      <AnimatedBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b border-black/5 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm">
                <Logo className="h-6 w-6" />
              </span>
              <div>
                <h1 className="text-lg font-black tracking-tight text-black">
                  PulseRadar AI
                </h1>
                <p className="text-xs font-bold text-slate-500">
                  Wellness signal intelligence
                </p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-500 md:flex">
              <a href="#radar" className="hover:text-black transition-colors">
                Live Radar
              </a>
              <a href="#leaderboard" className="hover:text-black transition-colors">
                Leaderboard
              </a>
              <a href="#data-sources" className="hover:text-black transition-colors">
                Data Sources
              </a>
            </nav>
          </div>
        </header>

        <Suspense fallback={null}>
          <ClientPage
            initialTrends={trends}
            initialPainPoints={painPoints}
            initialSeries={initialSeries}
            initialTrend={initialTrend}
            initialBrief={initialBrief}
          />
        </Suspense>

        <AppFooter />
      </div>
    </main>
  );
}

