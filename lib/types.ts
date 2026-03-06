export type TrendSignal = {
  id: string;
  name: string;
  category: "Sleep" | "Gut Health" | "Stress" | "Beauty" | "Immunity" | "Energy";
  score: number;
  searchGrowth: number;
  socialGrowth: number;
  contentGrowth: number;
  competition: "Low" | "Moderate" | "High";
  estimatedMarketSizeCr: number;
  timeToMainstreamMonths: number;
  opportunityInsight: string;
};

export type TrendTimepoint = {
  month: string;
  searchInterest: number;
  socialVolume: number;
  contentCreation: number;
};

export type OpportunityBrief = {
  trendId: string;
  trendName: string;
  productConcept: string;
  consumerProblem: string;
  marketEvidence: string[];
  estimatedMarketPotentialCr: number;
  competitionDensity: "Low" | "Moderate" | "High";
  timeToMainstreamMonths: number;
};

export type PainPointInsight = {
  id: string;
  trendId: string;
  quotes: string[];
  insightSummary: string;
};

