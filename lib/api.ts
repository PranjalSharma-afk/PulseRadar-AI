import {
  OpportunityBrief,
  PainPointInsight,
  TrendSignal,
  TrendTimepoint
} from "./types";
import {
  mockOpportunityBriefs,
  mockPainPointInsights,
  mockTrendSignals,
  mockTrendTimeSeries
} from "./mockData";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchTrends(): Promise<TrendSignal[]> {
  const apiData = await safeFetch<TrendSignal[]>("/trend-signals");
  return apiData ?? mockTrendSignals;
}

export async function fetchTrendSeries(
  trendId: string
): Promise<TrendTimepoint[]> {
  const apiData = await safeFetch<TrendTimepoint[]>(
    `/trend-signals/${trendId}/series`
  );
  if (apiData) return apiData;
  return mockTrendTimeSeries[trendId] ?? [];
}

export async function fetchOpportunityBrief(
  trendId: string
): Promise<OpportunityBrief | null> {
  const apiData = await safeFetch<OpportunityBrief>(
    `/opportunity-briefs/${trendId}`
  );
  if (apiData) return apiData;
  return mockOpportunityBriefs.find((b) => b.trendId === trendId) ?? null;
}

export async function fetchPainPointInsights(): Promise<PainPointInsight[]> {
  const apiData = await safeFetch<PainPointInsight[]>(
    "/trend-scoring/pain-points"
  );
  return apiData ?? mockPainPointInsights;
}

