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

export type CompetitorProfile = {
  id: string;
  name: string;
  shortDescription: string;
  mainCategory: string;
  overview: string;
  productsOffered: string[];
  positioning: string;
  productDistribution: { category: string; percentage: number }[];
};

export type TrendConcept = {
  id: string;
  name: string;
  demand: number; // X-axis (0-100)
  growth: number; // Y-axis (0-100)
  targetSegment: string;
  opportunityLevel: "High" | "Medium" | "Low";
};

export type IntelligenceReport = {
  keyword: string;
  type: "company" | "product" | "ingredient" | "unknown";
  
  visual?: {
    url: string;
    type: "logo" | "illustration" | null;
  } | null;

  websiteUrl?: string;

  // Section A
  analysis: {
    overview: string;
    marketRelevance: string;
    opportunity: string; // Emerging opportunities / Product opportunity
    categoryInsights: string; // Industry relevance
    consumerDemandSignals: string; // Use cases
  };

  // Section B
  dashboardMetrics: {
    opportunityScore: number;
    growthPotential: number; // percentage
    searchMomentum: number; // percentage
    demandSignals: string;
  };

  // Feature 3
  competitors: CompetitorProfile[];

  // Feature 4
  painPoints: PainPointInsight[];

  // Feature 5
  trendScore: TrendSignal;

  // Radar Features
  concepts: TrendConcept[];

  // For charts
  timeSeries: TrendTimepoint[];
};

export type SearchResult = 
  | {
      isValid: true;
      report: IntelligenceReport;
    }
  | {
      isValid: false;
      query: string;
      suggestions: string[];
    };

