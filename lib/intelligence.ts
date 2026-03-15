import { IntelligenceReport, CompetitorProfile, TrendSignal, TrendTimepoint, PainPointInsight } from "./types";

/**
 * Heuristic to guess the intent of the keyword.
 */
function classifyKeyword(keyword: string): "company" | "product" | "ingredient" | "unknown" {
  const lower = keyword.toLowerCase();
  
  const companyKeywords = ["wellness", "himalaya", "nykaa", "mamaearth", "healthkart", "curefit", "boldfit"];
  const ingredientKeywords = ["magnesium", "protein", "ashwagandha", "moss", "collagen", "moringa", "vitamin", "zinc", "curcumin", "shilajit", "creatine"];
  
  if (companyKeywords.some(k => lower.includes(k))) return "company";
  if (ingredientKeywords.some(k => lower.includes(k))) return "ingredient";
  
  return "product";
}

/**
 * Generates a mock AI intelligence report for the given keyword.
 * In a real app, this would call an LLM API (like GPT-4) or a specialized backend.
 */
export async function generateIntelligenceForKeyword(keyword: string): Promise<IntelligenceReport> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const type = classifyKeyword(keyword);
  const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);

  // Determine scores based on keyword length to make it pseudo-deterministic
  const seed = keyword.length + keyword.charCodeAt(0) + (keyword.charCodeAt(keyword.length - 1) || 0);
  const opportunityScore = 6 + (seed % 40) / 10; // 6.0 to 9.9
  const searchGrowth = 20 + (seed % 80); // 20% to 99%
  const socialGrowth = 15 + (seed % 60);

  // Dynamic Pain Points
  const painPoints: PainPointInsight[] = [
    {
      id: "pp1",
      trendId: keyword,
      insightSummary: `Consumers struggle to find authentic ${capitalizedKeyword} products with clear dosage information.`,
      quotes: [
        `"I'm confused about the right dosage for ${capitalizedKeyword}. Everyone says something different online."`,
        `"Is this ${capitalizedKeyword} actually pure? It's so hard to tell from the packaging."`
      ]
    },
    {
      id: "pp2",
      trendId: keyword,
      insightSummary: `High demand for improved absorption and better taste profiles in ${capitalizedKeyword} supplements.`,
      quotes: [
        `"Most ${capitalizedKeyword} powders taste awful. Wish there were gummy or flavoured options."`,
        `"I took ${capitalizedKeyword} for a month but didn't feel anything. Wondering if my body even absorbs it."`
      ]
    }
  ];

  // Dynamic Time Series
  const timeSeries: TrendTimepoint[] = Array.from({ length: 6 }).map((_, i) => {
    const baseInterest = 30 + i * 10 + (seed % 15);
    return {
      month: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i],
      searchInterest: Math.floor(baseInterest * (1 + (seed % 20) / 100)),
      socialVolume: Math.floor((baseInterest - 10) * (1 + (seed % 30) / 100)),
      contentCreation: Math.floor((baseInterest - 20) * (1 + (seed % 40) / 100))
    };
  });

  // Competitors
  const competitors: CompetitorProfile[] = [
    {
      id: "comp1",
      name: "VitaCore India",
      shortDescription: `Leading D2C brand focusing on premium ${capitalizedKeyword} extracts.`,
      mainCategory: "Premium Supplements",
      overview: `VitaCore India has quickly captured market share in the premium wellness segment by focusing specifically on high-bioavailability ${capitalizedKeyword} formulations.`,
      productsOffered: [`${capitalizedKeyword} Gummies`, `Liquid ${capitalizedKeyword}`, `${capitalizedKeyword} Complex`],
      positioning: "Premium, Science-backed, High Bioavailability",
      productDistribution: [
        { category: "Gummies", percentage: 45 },
        { category: "Capsules", percentage: 35 },
        { category: "Powders", percentage: 20 },
      ]
    },
    {
      id: "comp2",
      name: "Nature's Blueprint",
      shortDescription: `Affordable, mass-market provider of ${capitalizedKeyword}.`,
      mainCategory: "Mass Market Wellness",
      overview: `Targeting tier 2 and tier 3 cities with affordable, generic formulations of ${capitalizedKeyword} and related wellness products.`,
      productsOffered: [`${capitalizedKeyword} Tablets`, `Multivitamins with ${capitalizedKeyword}`],
      positioning: "Affordable, Accessible, Daily Use",
      productDistribution: [
        { category: "Tablets", percentage: 70 },
        { category: "Syrups", percentage: 30 },
      ]
    }
  ];

  // Trend Signal representing the dynamic score
  const trendScore: TrendSignal = {
    id: keyword.toLowerCase().replace(/\s+/g, '-'),
    name: capitalizedKeyword,
    category: type === "ingredient" ? "Sleep" : "Energy", // just mock mapping
    score: opportunityScore,
    searchGrowth: searchGrowth,
    socialGrowth: socialGrowth,
    contentGrowth: socialGrowth + 5,
    competition: opportunityScore > 8 ? "High" : opportunityScore > 7 ? "Moderate" : "Low",
    estimatedMarketSizeCr: 100 + (seed * 10),
    timeToMainstreamMonths: 3 + (seed % 9),
    opportunityInsight: `Strong consumer demand signals for ${capitalizedKeyword} with whitespace in premium, highly-bioavailable formats.`
  };

  return {
    keyword: capitalizedKeyword,
    type,
    analysis: {
      overview: `Comprehensive analysis indicates that ${capitalizedKeyword} is experiencing a surge in consumer interest across D2C channels in India.`,
      marketRelevance: `${capitalizedKeyword} aligns perfectly with the current macro trend towards preventative healthcare and functional nutrition.`,
      opportunity: `Significant whitespace exists in premium formats (like gummies or effervescent tablets) for ${capitalizedKeyword}.`,
      categoryInsights: `The ${type} category is currently expanding at ~${searchGrowth}% YoY.`,
      consumerDemandSignals: `Social listening indicates strong demand for "better tasting" and "more effective" ${capitalizedKeyword} products.`
    },
    dashboardMetrics: {
      opportunityScore: parseFloat(opportunityScore.toFixed(1)),
      growthPotential: searchGrowth + 12,
      searchMomentum: searchGrowth,
      demandSignals: opportunityScore > 8 ? "Very Strong" : "Strong"
    },
    competitors,
    painPoints,
    trendScore,
    timeSeries
  };
}
