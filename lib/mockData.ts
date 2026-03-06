import {
  OpportunityBrief,
  PainPointInsight,
  TrendSignal,
  TrendTimepoint
} from "./types";

export const mockTrendSignals: TrendSignal[] = [
  {
    id: "magnesium-glycinate",
    name: "Magnesium Glycinate Sleep Gummies",
    category: "Sleep",
    score: 9.3,
    searchGrowth: 142.3,
    socialGrowth: 118.6,
    contentGrowth: 97.4,
    competition: "Low",
    estimatedMarketSizeCr: 220,
    timeToMainstreamMonths: 18,
    opportunityInsight:
      "Searches for magnesium glycinate for sleep have more than doubled in metros, but India has very limited gummy-based SKUs tailored for sleep and stress relief."
  },
  {
    id: "sea-moss",
    name: "Sea Moss Gut & Skin Tonics",
    category: "Gut Health",
    score: 8.7,
    searchGrowth: 163.9,
    socialGrowth: 134.2,
    contentGrowth: 121.8,
    competition: "Moderate",
    estimatedMarketSizeCr: 140,
    timeToMainstreamMonths: 24,
    opportunityInsight:
      "Sea moss is trending via global creators on YouTube and Instagram, but local Indian brands have barely localized the proposition for gut health and skin radiance."
  },
  {
    id: "moringa-gummies",
    name: "Moringa Micronutrient Gummies",
    category: "Energy",
    score: 8.4,
    searchGrowth: 98.1,
    socialGrowth: 87.5,
    contentGrowth: 76.3,
    competition: "Low",
    estimatedMarketSizeCr: 95,
    timeToMainstreamMonths: 16,
    opportunityInsight:
      "Consumers are searching for natural energy and immunity solutions beyond vitamin C, with moringa emerging as a hero ingredient but underutilised in fun, gummy-first formats."
  },
  {
    id: "ashwagandha-latte",
    name: "Ashwagandha Evening Lattes",
    category: "Stress",
    score: 8.1,
    searchGrowth: 76.4,
    socialGrowth: 90.2,
    contentGrowth: 84.6,
    competition: "Moderate",
    estimatedMarketSizeCr: 130,
    timeToMainstreamMonths: 14,
    opportunityInsight:
      "Ashwagandha is established in capsules and tablets, but there is whitespace in warm beverage rituals for evening wind-down routines inspired by global moon milk trends."
  },
  {
    id: "gaba-l-theanine",
    name: "GABA + L-Theanine Focus Chews",
    category: "Stress",
    score: 7.9,
    searchGrowth: 88.2,
    socialGrowth: 69.5,
    contentGrowth: 73.3,
    competition: "Moderate",
    estimatedMarketSizeCr: 110,
    timeToMainstreamMonths: 20,
    opportunityInsight:
      "Young professionals are seeking non-caffeine focus aids; combination queries for GABA and L-theanine are rising but product availability remains niche and premium-focused."
  },
  {
    id: "collagen-sachets",
    name: "Collagen + Hyaluronic Sachets",
    category: "Beauty",
    score: 7.6,
    searchGrowth: 70.1,
    socialGrowth: 62.4,
    contentGrowth: 80.5,
    competition: "High",
    estimatedMarketSizeCr: 260,
    timeToMainstreamMonths: 10,
    opportunityInsight:
      "Collagen for joint and skin health is already mainstream in tier-1 cities, but sachet and stick formats are still underpenetrated beyond premium marketplaces."
  }
];

export const mockTrendTimeSeries: Record<string, TrendTimepoint[]> = {
  "magnesium-glycinate": [
    { month: "Apr", searchInterest: 34, socialVolume: 22, contentCreation: 18 },
    { month: "May", searchInterest: 42, socialVolume: 29, contentCreation: 24 },
    { month: "Jun", searchInterest: 55, socialVolume: 38, contentCreation: 31 },
    { month: "Jul", searchInterest: 63, socialVolume: 46, contentCreation: 39 },
    { month: "Aug", searchInterest: 77, socialVolume: 59, contentCreation: 51 },
    { month: "Sep", searchInterest: 89, socialVolume: 71, contentCreation: 64 }
  ],
  "sea-moss": [
    { month: "Apr", searchInterest: 18, socialVolume: 24, contentCreation: 17 },
    { month: "May", searchInterest: 24, socialVolume: 31, contentCreation: 23 },
    { month: "Jun", searchInterest: 31, socialVolume: 39, contentCreation: 29 },
    { month: "Jul", searchInterest: 41, socialVolume: 49, contentCreation: 38 },
    { month: "Aug", searchInterest: 55, socialVolume: 63, contentCreation: 52 },
    { month: "Sep", searchInterest: 68, socialVolume: 78, contentCreation: 66 }
  ],
  "moringa-gummies": [
    { month: "Apr", searchInterest: 22, socialVolume: 16, contentCreation: 14 },
    { month: "May", searchInterest: 28, socialVolume: 19, contentCreation: 18 },
    { month: "Jun", searchInterest: 34, socialVolume: 27, contentCreation: 24 },
    { month: "Jul", searchInterest: 46, socialVolume: 33, contentCreation: 32 },
    { month: "Aug", searchInterest: 58, socialVolume: 42, contentCreation: 40 },
    { month: "Sep", searchInterest: 67, socialVolume: 53, contentCreation: 48 }
  ],
  "ashwagandha-latte": [
    { month: "Apr", searchInterest: 41, socialVolume: 38, contentCreation: 35 },
    { month: "May", searchInterest: 49, socialVolume: 45, contentCreation: 42 },
    { month: "Jun", searchInterest: 58, socialVolume: 54, contentCreation: 50 },
    { month: "Jul", searchInterest: 65, socialVolume: 62, contentCreation: 58 },
    { month: "Aug", searchInterest: 72, socialVolume: 70, contentCreation: 66 },
    { month: "Sep", searchInterest: 80, socialVolume: 79, contentCreation: 73 }
  ],
  "gaba-l-theanine": [
    { month: "Apr", searchInterest: 14, socialVolume: 11, contentCreation: 9 },
    { month: "May", searchInterest: 19, socialVolume: 15, contentCreation: 13 },
    { month: "Jun", searchInterest: 26, socialVolume: 21, contentCreation: 18 },
    { month: "Jul", searchInterest: 35, socialVolume: 28, contentCreation: 25 },
    { month: "Aug", searchInterest: 48, socialVolume: 38, contentCreation: 34 },
    { month: "Sep", searchInterest: 61, socialVolume: 50, contentCreation: 45 }
  ],
  "collagen-sachets": [
    { month: "Apr", searchInterest: 55, socialVolume: 42, contentCreation: 50 },
    { month: "May", searchInterest: 60, socialVolume: 47, contentCreation: 56 },
    { month: "Jun", searchInterest: 65, socialVolume: 54, contentCreation: 63 },
    { month: "Jul", searchInterest: 70, socialVolume: 61, contentCreation: 68 },
    { month: "Aug", searchInterest: 75, socialVolume: 67, contentCreation: 73 },
    { month: "Sep", searchInterest: 82, socialVolume: 74, contentCreation: 80 }
  ]
};

export const mockOpportunityBriefs: OpportunityBrief[] = [
  {
    trendId: "magnesium-glycinate",
    trendName: "Magnesium Glycinate Sleep Gummies",
    productConcept:
      "Sugar-conscious magnesium glycinate sleep gummies with L-theanine and chamomile, formulated for Indian palettes and digestive comfort.",
    consumerProblem:
      "Consumers want deeper sleep and reduced anxiety without melatonin dependence or heavy tablets that upset the stomach.",
    marketEvidence: [
      "3x YoY growth in searches for 'magnesium glycinate for sleep' across metro and tier-1 cities.",
      "Spike in Reddit and community discussions around 'non-melatonin sleep supplements' and 'gentle magnesium formats'.",
      "Low SKU density on Indian marketplaces for magnesium glycinate gummies vs tablets and capsules."
    ],
    estimatedMarketPotentialCr: 220,
    competitionDensity: "Low",
    timeToMainstreamMonths: 18
  },
  {
    trendId: "sea-moss",
    trendName: "Sea Moss Gut & Skin Tonics",
    productConcept:
      "Sea moss-based functional tonics and gel sachets localized with Indian flavours, targeting gut health, immunity, and skin radiance.",
    consumerProblem:
      "Rising curiosity around sea moss benefits, but current options are expensive imports with poor taste fit and unclear usage rituals.",
    marketEvidence: [
      "Strong creator-led education on YouTube and Instagram driving awareness of sea moss for gut and skin.",
      "Searches for 'sea moss India' and 'sea moss gel' have grown >150% in the last 6 months.",
      "Limited Indian brands with clinically-backed claims and localized formats."
    ],
    estimatedMarketPotentialCr: 140,
    competitionDensity: "Moderate",
    timeToMainstreamMonths: 24
  }
];

export const mockPainPointInsights: PainPointInsight[] = [
  {
    id: "magnesium-sentiment",
    trendId: "magnesium-glycinate",
    quotes: [
      "Magnesium tablets upset my stomach but they help my sleep.",
      "I wish magnesium supplements came in gummies, tablets feel too clinical.",
      "I don't want to rely on melatonin every night but still need something to calm my mind."
    ],
    insightSummary:
      "Consumers are looking for gentler, ritual-friendly sleep support formats that avoid melatonin and heavy tablets. Gummies and chews that feel like a calming nightly ritual can win share quickly."
  },
  {
    id: "sea-moss-sentiment",
    trendId: "sea-moss",
    quotes: [
      "I keep hearing about sea moss on YouTube but have no idea which brand to trust.",
      "The imported sea moss gels taste weird; wish there was an Indian flavour version.",
      "Sea moss sounds great for gut issues but the products are either too expensive or not available in India."
    ],
    insightSummary:
      "Education and trust are the main barriers for sea moss adoption in India. There is room for a credible, India-first brand with transparent sourcing and familiar flavours."
  }
];

