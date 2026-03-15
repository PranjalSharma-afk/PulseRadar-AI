import { IntelligenceReport, CompetitorProfile, TrendSignal, TrendTimepoint, PainPointInsight, TrendConcept, SearchResult } from "./types";

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
 * Helper to dynamically generate realistic consumer pain points contextualized to the keyword
 * and mapping to our 5 data sources (Amazon, Reddit, Google Trends, YouTube, Research Pubs).
 */
function generateDynamicPainPoints(keyword: string, type: "company" | "product" | "ingredient" | "unknown"): PainPointInsight[] {
  const lower = keyword.toLowerCase();
  
  // Skincare / Beauty Category
  if (lower.includes("minimalist") || lower.includes("skincare") || lower.includes("mamaearth") || lower.includes("nykaa")) {
    return [
      {
        id: "pp_skin_1",
        trendId: keyword,
        insightSummary: `Amazon Reviews and Reddit threads indicate a struggle with ${keyword} products causing sudden purging or irritation for sensitive skin types, despite "clean" claims.`,
        quotes: [
          `"I bought ${keyword} because it was trending on YouTube, but my skin barrier got completely wrecked within a week."`,
          `"Every time I try to layer ${keyword} serums with my moisturizer, it pills terribly. Found similar complaints on Reddit."`
        ]
      },
      {
        id: "pp_skin_2",
        trendId: keyword,
        insightSummary: `Google Trends and Research Pubs show rising curiosity around percentage concentrations, with consumers confused if ${keyword} formulas are actually effective or just marketing.`,
        quotes: [
          `"The bottle doesn't specify the exact active percentage for ${keyword}. Does it actually work or is it just a buzzword?"`,
          `"I'm confused if I should use ${keyword} morning or night. The instructions on the packaging are so vague."`
        ]
      }
    ];
  }

  // Supplements / Ingredients Category
  if (lower.includes("magnesium") || lower.includes("ashwagandha") || lower.includes("protein") || lower.includes("curcumin") || type === "ingredient") {
    return [
      {
        id: "pp_supp_1",
        trendId: keyword,
        insightSummary: `A synthesis of Amazon Reviews and Reddit discussions reveals significant difficulty with the format and taste of ${keyword} supplements, leading to poor adherence.`,
        quotes: [
          `"Most ${keyword} powders taste awful. Wish there were gummy or flavoured options that weren't packed with sugar."`,
          `"The pills for ${keyword} are horse-sized! I end up dreading taking them every morning."`
        ]
      },
      {
        id: "pp_supp_2",
        trendId: keyword,
        insightSummary: `YouTube deep-dives and PubMed cross-references show consumers are becoming highly skeptical of the bioavailability and actual absorption rates of commercial ${keyword}.`,
        quotes: [
          `"I took ${keyword} for a month but didn't feel any different. I saw a YouTube video saying most brands use the cheapest, least absorbable form."`,
          `"Everyone talks about the benefits of ${keyword}, but nobody warns you about the stomach upset if you get the wrong kind."`
        ]
      }
    ];
  }

  // Snacks / Food Category
  if (lower.includes("bar") || lower.includes("snack") || lower.includes("gummies") || lower.includes("drink")) {
    return [
      {
        id: "pp_food_1",
        trendId: keyword,
        insightSummary: `Amazon Reviews heavily index on sensory complaints, specifically targeting the artificial aftertaste and chalky texture characteristic of ${keyword} products.`,
        quotes: [
          `"The macros on this ${keyword} looked great, but it tastes like stevia-flavoured cardboard."`,
          `"Great concept, but the texture of the ${keyword} is so chalky I have to drink a whole glass of water just to get it down."`
        ]
      },
      {
        id: "pp_food_2",
        trendId: keyword,
        insightSummary: `Google Trends and Reddit indicate consumers are increasingly scrutinizing "hidden ingredients" (like maltodextrin or seed oils) in ${keyword} promoted as healthy.`,
        quotes: [
          `"It's marketed as a clean ${keyword}, but the second ingredient is a cheap filler syrup. Very disappointing."`,
          `"Why do all these healthy ${keyword} options always have to include palm oil or artificial preservatives?"`
        ]
      }
    ];
  }

  // Generic / Default Fallback for anything else
  return [
    {
      id: "pp_gen_1",
      trendId: keyword,
      insightSummary: `Analysis across Amazon and Reddit indicates a general frustration with the pricing-to-value ratio and overpromising marketing of ${keyword}.`,
      quotes: [
        `"I feel like I'm paying a massive premium for ${keyword} just because it has aesthetic packaging, not because the product is better."`,
        `"All the influencers on YouTube hyped up ${keyword}, but honestly, the results are underwhelming for the price."`
      ]
    },
    {
      id: "pp_gen_2",
      trendId: keyword,
      insightSummary: `Cross-referencing consumer complaints shows a consistent gap in reliable sourcing transparency and authentic customer support for ${keyword}.`,
      quotes: [
        `"Is this ${keyword} actually pure? It's so hard to tell from the packaging and the brand's website is vague."`,
        `"Bought ${keyword} based on the hype, but figuring out how to actually use it correctly took me hours of reading Reddit."`
        ]
      }
    ];
}

const VALID_DOMAINS = [
  "magnesium", "ashwagandha", "protein powder", "creatine", "collagen",
  "minimalist", "mamaearth", "nykaa", "sugar cosmetics", "plum", "mCaffeine",
  "protein bar", "electrolyte drink", "kombucha", "matcha", "bcaa",
  "curcumin", "vitamin c", "hyaluronic acid", "retinol", "niacinamide",
  "sleep supplement", "energy drink", "meal replacement", "multivitamin",
  "whey protein", "plant protein", "gummies", "skincare", "haircare", "supplements"
];

// Helper to calculate Levenshtein distance for typos
function getEditDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1,   // insertion
            matrix[i - 1][j] + 1    // deletion
          )
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Validates the search query against known domains. 
 * Returns true if valid. If invalid, returns suggestions.
 */
function validateSearchQuery(keyword: string): { isValid: boolean, suggestions: string[] } {
  const normalized = keyword.toLowerCase().trim();
  
  // Exact or partial strict match
  if (VALID_DOMAINS.some(domain => normalized.includes(domain) || domain.includes(normalized))) {
    return { isValid: true, suggestions: [] };
  }

  // Spell correct / distance matching
  const suggestions: { word: string, dist: number }[] = [];
  
  for (const domain of VALID_DOMAINS) {
    const dist = getEditDistance(normalized, domain);
    // If it's a very close typo (e.g. Magnesuim -> Magnesium), collect it
    if (dist <= 3) {
      suggestions.push({ word: domain, dist });
    }
  }

  suggestions.sort((a, b) => a.dist - b.dist);

  let defaultSuggestions = ["Magnesium", "Ashwagandha", "Protein Powder"];
  let finalSuggestions = suggestions.map(s => s.word.charAt(0).toUpperCase() + s.word.slice(1));
  
  if (finalSuggestions.length === 0) {
     finalSuggestions = defaultSuggestions;
  } else {
     // Ensure we provide at least one default if spellcheck only caught 1
     if (finalSuggestions.length < 3) finalSuggestions = [...finalSuggestions, ...defaultSuggestions].slice(0, 3);
  }

  return { isValid: false, suggestions: finalSuggestions.slice(0, 3) };
}

/**
 * Generates a mock AI intelligence report for the given keyword.
 * In a real app, this would call an LLM API (like GPT-4) or a specialized backend.
 */
export async function generateIntelligenceForKeyword(keyword: string): Promise<SearchResult> {
  // Simulate network delay for realistic loading skeleton feeling in Next.js
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 600));

  const validation = validateSearchQuery(keyword);

  if (!validation.isValid) {
     return {
        isValid: false,
        query: keyword,
        suggestions: validation.suggestions
     };
  }

  const type = classifyKeyword(keyword);
  const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);

  // Determine scores based on keyword length to make it pseudo-deterministic
  const seed = keyword.length + keyword.charCodeAt(0) + (keyword.charCodeAt(keyword.length - 1) || 0);
  const opportunityScore = 6 + (seed % 40) / 10; // 6.0 to 9.9
  const searchGrowth = 20 + (seed % 80); // 20% to 99%
  const socialGrowth = 15 + (seed % 60);

  // Dynamic Pain Points based on the 5 data sources
  const painPoints: PainPointInsight[] = generateDynamicPainPoints(capitalizedKeyword, type);

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

  // Trend momentum concepts mapping across quadrents
  const concepts: TrendConcept[] = [
    {
      id: "c1",
      name: `${capitalizedKeyword} Sleep Gummies`,
      demand: 85,
      growth: 92,
      targetSegment: "Insomniacs, Stressed Professionals",
      opportunityLevel: "High"  // Top Right (Breakout)
    },
    {
      id: "c2",
      name: `${capitalizedKeyword} Hydration Mix`,
      demand: 35,
      growth: 88,
      targetSegment: "Athletes, Fitness Enthusiasts",
      opportunityLevel: "High" // Top Left (Emerging)
    },
    {
      id: "c3",
      name: `${capitalizedKeyword} Standard Capsules`,
      demand: 90,
      growth: 25,
      targetSegment: "General Wellness",
      opportunityLevel: "Low"  // Bottom Right (Saturated)
    },
    {
      id: "c4",
      name: `${capitalizedKeyword} Pet Soft Chews`,
      demand: 20,
      growth: 30,
      targetSegment: "Pet Owners",
      opportunityLevel: "Medium" // Bottom Left (Experimental)
    },
    {
      id: "c5",
      name: `${capitalizedKeyword} Coffee Alternative`,
      demand: 45,
      growth: 75,
      targetSegment: "Biohackers, Alternative Health",
      opportunityLevel: "Medium" // Emerging / Breakout border
    }
  ];

  return {
    isValid: true,
    report: {
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
      concepts,
      timeSeries
    }
  };
}
