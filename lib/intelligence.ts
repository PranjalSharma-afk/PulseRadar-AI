import { IntelligenceReport, CompetitorProfile, TrendSignal, TrendTimepoint, PainPointInsight, TrendConcept, SearchResult, StartupOpportunity } from "./types";

/**
 * Heuristic to guess the intent of the keyword.
 */
function classifyKeyword(keyword: string): "company" | "product" | "ingredient" | "unknown" {
  const lower = keyword.toLowerCase();
  
  const companyKeywords = ["wellness", "himalaya", "nykaa", "mamaearth", "healthkart", "curefit", "boldfit", "minimalist", "plum", "derma", "dot", "bodywise", "mosaic", "sugar"];
  const ingredientKeywords = ["magnesium", "protein", "ashwagandha", "moss", "collagen", "moringa", "vitamin", "zinc", "curcumin", "shilajit", "creatine", "retinol", "niacinamide", "hyaluronic", "melatonin", "bcaa"];
  
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
  "minimalist", "mamaearth", "nykaa", "sugar cosmetics", "plum", "mCaffeine", "the derma co", "dot & key",
  "protein bar", "electrolyte drink", "kombucha", "matcha", "bcaa", "melatonin", "shilajit",
  "curcumin", "vitamin c", "hyaluronic acid", "retinol", "niacinamide", "zinc",
  "sleep supplement", "energy drink", "meal replacement", "multivitamin",
  "whey protein", "plant protein", "gummies", "skincare", "haircare", "supplements",
  "mosaic wellness", "man matters", "be bodywise", "healthkart", "fast&up", "carbamide forte"
];

const CONCEPT_SYNONYMS: Record<string, string[]> = {
  "sleep mineral": ["Magnesium", "Melatonin", "Ashwagandha"],
  "muscle powder": ["Whey Protein", "Plant Protein", "Creatine"],
  "skin acid": ["Hyaluronic Acid", "Retinol", "Vitamin C"],
  "stress relief": ["Ashwagandha", "Magnesium", "L-Theanine"]
};

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
  
  // Check for semantic conceptual synonyms 
  for (const [key, suggestionsList] of Object.entries(CONCEPT_SYNONYMS)) {
     if (normalized.includes(key) || key.includes(normalized)) {
        return { isValid: false, suggestions: suggestionsList };
     }
  }

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

  const resolvedType = classifyKeyword(keyword);
  // Also keep `type` for backwards compat on existing hardcoded fields in this function currently
  const type = resolvedType;
  const capitalizedKeyword = keyword.charAt(0).toUpperCase() + keyword.slice(1);

  // Determine scores based on keyword length to make it pseudo-deterministic
  const seed = keyword.length + keyword.charCodeAt(0) + (keyword.charCodeAt(keyword.length - 1) || 0);
  const opportunityScore = 6 + (seed % 40) / 10; // 6.0 to 9.9
  const searchGrowth = 20 + (seed % 80); // 20% to 99%
  const socialGrowth = 15 + (seed % 60);

  // Dynamic Pain Points based on the 5 data sources
  const painPoints: PainPointInsight[] = generateDynamicPainPoints(capitalizedKeyword, type);

  // Fetch Visuals
  // In a real app we would call something like Clearbit. For mocking, we map known strings or use simple heuristics.
  let visual: IntelligenceReport["visual"] = null;
  const kwLower = keyword.toLowerCase();
  
  if (resolvedType === "company") {
     const domainMap: Record<string, string> = {
        "mosaic wellness": "mosaicwellness.in",
        "minimalist": "beminimalist.co",
        "mamaearth": "mamaearth.in",
        "nykaa": "nykaa.com",
        "sugar cosmetics": "sugarcosmetics.com",
        "plum": "plumgoodness.com",
        "mcaffeine": "mcaffeine.com",
        "healthkart": "healthkart.com",
        "curefit": "cult.fit",
        "himalaya": "himalayawellness.in",
        "the derma co": "thedermaco.com",
        "dot & key": "dotandkey.com",
        "man matters": "manmatters.com",
        "be bodywise": "bebodywise.com"
     };
     const targetDomain = domainMap[kwLower] || `${kwLower.replace(/\s+/g, '')}.com`;
     visual = { url: `https://logo.clearbit.com/${targetDomain}`, type: "logo" };
  } else if (resolvedType === "ingredient") {
     // Use an aesthetic placeholder illustration representing molecular / botanical nature
     visual = { url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=300&h=300", type: "illustration" };
  }

  // Authentic Contextual Analysis 
  let analysis = {
     overview: "",
     marketRelevance: "",
     opportunity: "",
     categoryInsights: "",
     consumerDemandSignals: ""
  };

  if (resolvedType === "company") {
     if (kwLower === "mosaic wellness") {
        analysis.overview = `Mosaic Wellness is a rapidly growing digital-first health clinic and D2C conglomerate operating out of India.`;
        analysis.marketRelevance = `The company operates powerhouse brands including Man Matters and Be Bodywise, capturing significant market share in the highly fragmented personal care and wellness sectors.`;
        analysis.opportunity = `Mosaic targets extremely high-intent consumer segments addressing specific clinical issues (hair loss, weight management, intimate health) rather than generic beauty.`;
        analysis.categoryInsights = `The personal wellness category in India is expanding at ${searchGrowth}% YoY, driven strongly by tele-consultation models integrated with digital product delivery.`;
        analysis.consumerDemandSignals = `Demand signals indicate consumers heavily favor Mosaic's science-backed, consultation-first approach over traditional retail shelves.`;
     } else {
        analysis.overview = `${capitalizedKeyword} operates as a consumer-facing entity within the Indian D2C and retail landscape.`;
        analysis.marketRelevance = `The brand competes heavily in its category, positioning itself against both legacy FMCG conglomerates and new-age digital startups.`;
        analysis.opportunity = `Significant whitespace exists for ${capitalizedKeyword} to capture tier-2 market demand through hyper-localized messaging.`;
        analysis.categoryInsights = `The operating category is currently expanding at ~${searchGrowth}% YoY.`;
        analysis.consumerDemandSignals = `Social listening reveals strong consumer tracking for ${capitalizedKeyword} regarding ingredient transparency and brand trust.`;
     }
  } else if (resolvedType === "ingredient") {
     if (kwLower === "magnesium") {
        analysis.overview = `Magnesium is an essential foundational mineral currently undergoing a massive "re-discovery" cycle in the Indian consumer wellness market.`;
        analysis.marketRelevance = `Historically sold as a generic supplement, Magnesium's modern relevance is heavily anchored in sleep quality, stress management, and athletic recovery.`;
        analysis.opportunity = `Major product expansion opportunities exist beyond traditional capsules: including premium gummies, hydration matrix powders, and topical sleep sprays.`;
        analysis.categoryInsights = `The functional supplement category is seeing a structural shift; demand for highly-bioavailable formats (like Bisglycinate) is outperforming generic oxides by ${socialGrowth}%.`;
        analysis.consumerDemandSignals = `Growing consumer demand points specifically toward formulations optimizing for nervous system regulation and deep sleep without daytime drowsiness.`;
     } else {
        analysis.overview = `${capitalizedKeyword} is an active health ingredient receiving heightened clinical and consumer attention.`;
        analysis.marketRelevance = `The ingredient's relevance is anchored in the macro shift towards preventative, functional healthcare formulations.`;
        analysis.opportunity = `Clear opportunity exists to formulate ${capitalizedKeyword} into consumer-friendly delivery systems, moving away from intimidating clinical pill burdens.`;
        analysis.categoryInsights = `Ingredient-driven category searches for ${capitalizedKeyword} are expanding at ~${searchGrowth}% YoY across major e-commerce platforms.`;
        analysis.consumerDemandSignals = `Consumers are actively researching the clinical efficacy and bioavailability of ${capitalizedKeyword} before purchasing.`;
     }
  } else {
     // Generic / Product
     analysis.overview = `Comprehensive analysis indicates that the phrase "${capitalizedKeyword}" represents a growing product category trend within D2C channels.`;
     analysis.marketRelevance = `${capitalizedKeyword} concepts align with macro trends toward functional formulations and premiumization in the Indian market.`;
     analysis.opportunity = `Whitespaces exist across the pricing architecture for high-quality, transparently-marketed ${capitalizedKeyword} formats.`;
     analysis.categoryInsights = `This category subset is expanding at ~${searchGrowth}% YoY, largely driven by influencer education.`;
     analysis.consumerDemandSignals = `Social listening indicates strong demand for better-tasting, higher-efficacy variations of ${capitalizedKeyword}.`;
  }

  // Dynamic Time Series - Q1 2025 formats
  const timeSeries: TrendTimepoint[] = Array.from({ length: 6 }).map((_, i) => {
    const baseInterest = 30 + i * 10 + (seed % 15);
    const quarters = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026"];
    return {
      month: quarters[i],
      searchInterest: Math.floor(baseInterest * (1 + (seed % 20) / 100)),
      socialVolume: Math.floor((baseInterest - 10) * (1 + (seed % 30) / 100)),
      contentCreation: Math.floor((baseInterest - 20) * (1 + (seed % 40) / 100))
    };
  });

  // Dynamic Competitors based on Category
  let competitors: CompetitorProfile[] = [];
  const isSkinType = kwLower.includes("minimalist") || kwLower.includes("mamaearth") || kwLower.includes("plum") || kwLower.includes("derma") || kwLower.includes("retinol") || kwLower.includes("acid");
  
  if (isSkinType) {
    competitors = [
      {
        id: "comp1_skin",
        name: "The Derma Co",
        shortDescription: `Science-backed skincare formulated by dermatologists.`,
        mainCategory: "Active Skincare",
        overview: `The Derma Co focuses on exact active ingredient percentages aimed directly at treating acne, pigmentation, and skin barriers without fluff.`,
        productsOffered: [`Niacinamide Serums`, `Salicylic Acid Washes`, `Retinol Gels`],
        positioning: "Clinical, Direct, Problem-Solving",
        productDistribution: [
          { category: "Serums", percentage: 50 },
          { category: "Cleansers", percentage: 30 },
          { category: "Sunscreens", percentage: 20 },
        ]
      },
      {
        id: "comp2_skin",
        name: "Dot & Key",
        shortDescription: `Aesthetic-first targeted aesthetic skincare.`,
        mainCategory: "Premium Skincare",
        overview: `Targeting Millennial and Gen-Z consumers with aesthetic packaging and scientifically backed formulations combining fruits and actives.`,
        productsOffered: [`Ceramide Creams`, `Watermelon Sunscreen`, `Cica Night Gels`],
        positioning: "Aesthetic, Gentle, Fruit-Forward",
        productDistribution: [
          { category: "Moisturizers", percentage: 40 },
          { category: "Sunscreens", percentage: 40 },
          { category: "Serums", percentage: 20 },
        ]
      },
      {
        id: "comp3_skin",
        name: "Plum Goodness",
        shortDescription: `100% Vegan, cruelty-free beauty.`,
        mainCategory: "Clean Skincare",
        overview: `Mass-premium positioning focusing on toxic-free, clean beauty products that are highly accessible.`,
        productsOffered: [`Green Tea Range`, `Vitamin C Serums`],
        positioning: "Vegan, Clean, Approachable",
        productDistribution: [
          { category: "Face Care", percentage: 60 },
          { category: "Body Care", percentage: 40 },
        ]
      }
    ];
  } else {
    // Supplement / General
    competitors = [
      {
        id: "comp1_supp",
        name: "HealthKart",
        shortDescription: `India's largest unified nutrition and supplement platform.`,
        mainCategory: "Mass Market Nutrition",
        overview: `HealthKart provides deep D2C penetration via both private labels and multi-brand distribution for ${capitalizedKeyword} and related macro-nutrients.`,
        productsOffered: [`HK Vitals ${capitalizedKeyword}`, `MuscleBlaze Proteins`],
        positioning: "Trusted, Massive Distribution, Price-Competitive",
        productDistribution: [
          { category: "Vitamins/Minerals", percentage: 45 },
          { category: "Sports Nutrition", percentage: 45 },
          { category: "Ayurveda", percentage: 10 },
        ]
      },
      {
        id: "comp2_supp",
        name: "Fast&Up",
        shortDescription: `Effervescent sports and active nutrition experts.`,
        mainCategory: "Active Nutrition",
        overview: `Pioneered effervescent tablet technology in India to provide highly bioavailable, quick-acting ${capitalizedKeyword} and hydration metrics.`,
        productsOffered: [`${capitalizedKeyword} Hydration Tubes`, `Plant Protein`, `Electrolytes`],
        positioning: "Athletic, Effervescent, High-Absorption",
        productDistribution: [
          { category: "Effervescent Tubes", percentage: 70 },
          { category: "Powders", percentage: 30 },
        ]
      },
      {
         id: "comp3_supp",
         name: "Carbamide Forte",
         shortDescription: `High-dose clinical grade supplements.`,
         mainCategory: "Clinical Nutrition",
         overview: `Focuses on aggressive, high-dosage clinical formulations of ${capitalizedKeyword} aimed at addressing strict deficiencies.`,
         productsOffered: [`${capitalizedKeyword} Complex`, `High-Potency Multi`],
         positioning: "High-Dose, Clinical Grade, Affordable",
         productDistribution: [
           { category: "Tablets", percentage: 80 },
           { category: "Gummies", percentage: 20 },
         ]
       }
    ];
  }

  // Trend Signal representing the dynamic score
  const trendScore: TrendSignal = {
    id: keyword.toLowerCase().replace(/\s+/g, '-'),
    name: capitalizedKeyword,
    category: type === "ingredient" ? "Immunity" : isSkinType ? "Beauty" : "Energy",
    score: opportunityScore,
    searchGrowth: searchGrowth,
    socialGrowth: socialGrowth,
    contentGrowth: socialGrowth + 5,
    competition: opportunityScore > 8 ? "High" : opportunityScore > 7 ? "Moderate" : "Low",
    estimatedMarketSizeCr: 100 + (seed * 10),
    timeToMainstreamMonths: 3 + (seed % 9),
    opportunityInsight: `Strong consumer demand signals for ${capitalizedKeyword} with whitespace in premium, highly-bioavailable formats.`
  };

  // Trend momentum concepts dynamically tailored using domain constrained opportunity libraries
  let concepts: TrendConcept[] = [];
  let opportunities: StartupOpportunity[] = [];
  if (isSkinType) {
     concepts = [
      { id: "c1", name: `${capitalizedKeyword} Peeling Solutions`, explanation: `High-strength AHA/BHA exfoliating treatments for targeted hyperpigmentation.`, demand: 85, growth: 92, targetSegment: "Acne-prone, Exfoliation Seekers", opportunityLevel: "High" },
      { id: "c2", name: `${capitalizedKeyword} Barrier Repair Creams`, explanation: `Ceramide-dense soothing creams targeting damaged skin barriers.`, demand: 60, growth: 88, targetSegment: "Dry/Sensitive Skin", opportunityLevel: "High" },
      { id: "c3", name: `${capitalizedKeyword} Body Lotions`, explanation: `Daily utility moisturizing lotions infused with active percentages.`, demand: 90, growth: 25, targetSegment: "General Skincare", opportunityLevel: "Low" },
      { id: "c4", name: `${capitalizedKeyword} Lip Treatments`, explanation: `Specialized active balms treating lip discoloration and extreme dryness.`, demand: 20, growth: 30, targetSegment: "Aesthetic Consumers", opportunityLevel: "Medium" },
      { id: "c5", name: `${capitalizedKeyword} Overnight Masks`, explanation: `Rich leave-on nocturnal treatments designed for deep penetration.`, demand: 45, growth: 75, targetSegment: "Anti-aging", opportunityLevel: "Medium" }
    ];

    opportunities = [
      { id: "o1", conceptName: `${capitalizedKeyword} Post-Procedure Barrier Therapy`, targetConsumer: "Dermatology Patients & Sensitive Skin", problemSolved: "Clinical aftercare products are often too heavy or lack active soothing agents.", differentiationAngle: "Formulated specifically with clinically-tested peptide complexes to accelerate barrier repair post-laser." },
      { id: "o2", conceptName: `${capitalizedKeyword} Scalp Hydration Serums`, targetConsumer: "Individuals with dry, flaky scalps", problemSolved: "Most scalp products are wash-off; few exist as leave-on protective barriers.", differentiationAngle: "Applying face-grade restorative ceramides in an ultra-lightweight, non-greasy scalp serum." },
      { id: "o3", conceptName: `${capitalizedKeyword} Tinted Adaptive Sunscreen`, targetConsumer: "Daily skincare minimalists", problemSolved: "Layering multiple products (moisturizer, tint, SPF) leads to pillage and clogged pores.", differentiationAngle: "A single-step formula combining high SPF, encapsulated tint, and deep barrier repair." }
    ];
  } else {
    // Supplements / Health format library filters out invalid things like "Coffee"
    concepts = [
      { id: "c1", name: `${capitalizedKeyword} Sleep Gummies`, explanation: `Adaptogenic supplement combining ${capitalizedKeyword} with sleep support complexes inside a gummy format.`, demand: 85, growth: 92, targetSegment: "Insomniacs, Stressed Professionals", opportunityLevel: "High" },
      { id: "c2", name: `${capitalizedKeyword} Hydration Powders`, explanation: `Effervescent or powdered electrolytes heavily fortified with ${capitalizedKeyword}.`, demand: 35, growth: 88, targetSegment: "Athletes, Fitness Enthusiasts", opportunityLevel: "High" },
      { id: "c3", name: `${capitalizedKeyword} Standard Capsules`, explanation: `Generic single-ingredient ${capitalizedKeyword} delivery payload via standardized gelatin or veg capsules.`, demand: 90, growth: 25, targetSegment: "General Wellness", opportunityLevel: "Low" },
      { id: "c4", name: `${capitalizedKeyword} Liquid Extracts`, explanation: `Sublingual drops formulated for rapid bloodstream absorption and high bioavailability.`, demand: 20, growth: 30, targetSegment: "Biohackers, Fast Absorption", opportunityLevel: "Medium" },
      { id: "c5", name: `${capitalizedKeyword} Stress Support Blends`, explanation: `Multi-ingredient functional blends primarily anchored by clinical doses of ${capitalizedKeyword}.`, demand: 55, growth: 75, targetSegment: "Anxiety, Mental Health", opportunityLevel: "Medium" }
    ];

    opportunities = [
      { id: "o1", conceptName: `${capitalizedKeyword} Sleep & Rest Elixir`, targetConsumer: "Stressed Urban Professionals", problemSolved: "Pills are difficult for some to swallow right before bed.", differentiationAngle: "A fast-absorbing, night-time sublingual droplet system maximizing bioavailability." },
      { id: "o2", conceptName: `${capitalizedKeyword} Fortified Electrolyte Mix`, targetConsumer: "Endurance Athletes", problemSolved: "Standard hydration mixes lack adequate muscle relaxation minerals.", differentiationAngle: "Combines high-sodium rapid rehydration with massive muscular-relaxation doses of ${capitalizedKeyword}." },
      { id: "o3", conceptName: `${capitalizedKeyword} Focus & Calm Bars`, targetConsumer: "Students & Desk Workers", problemSolved: "Most snack bars spike blood sugar causing afternoon brain fog.", differentiationAngle: "A high-protein savory format heavily dosed with ${capitalizedKeyword} to combat cortisol spikes." }
    ];
  }

  return {
    isValid: true,
    report: {
      keyword: capitalizedKeyword,
      type: resolvedType,
      visual,
      ...(visual?.type === 'logo' && { websiteUrl: `https://${visual.url.split('clearbit.com/')[1]}` }),
      analysis,
      dashboardMetrics: {
        opportunityScore: parseFloat(opportunityScore.toFixed(1)),
        growthPotential: searchGrowth + 12,
        searchMomentum: searchGrowth,
        demandSignals: opportunityScore > 8 ? "Very Strong" : "Strong"
      },
      competitors,
      opportunities,
      painPoints,
      trendScore,
      concepts,
      timeSeries
    }
  };
}
