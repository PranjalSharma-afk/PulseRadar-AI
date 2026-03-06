from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional


class TrendSignal(BaseModel):
  id: str
  name: str
  category: str
  score: float
  searchGrowth: float
  socialGrowth: float
  contentGrowth: float
  competition: str
  estimatedMarketSizeCr: int
  timeToMainstreamMonths: int
  opportunityInsight: str


class TrendTimepoint(BaseModel):
  month: str
  searchInterest: float
  socialVolume: float
  contentCreation: float


class OpportunityBrief(BaseModel):
  trendId: str
  trendName: str
  productConcept: str
  consumerProblem: str
  marketEvidence: List[str]
  estimatedMarketPotentialCr: int
  competitionDensity: str
  timeToMainstreamMonths: int


class PainPointInsight(BaseModel):
  id: str
  trendId: str
  quotes: List[str]
  insightSummary: str


class ScoringCategory(BaseModel):
  id: str
  label: str
  description: str
  value: int


app = FastAPI(title="PulseRadar AI API", version="1.0.0")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


TREND_SIGNALS: List[TrendSignal] = [
  TrendSignal(
    id="magnesium-glycinate",
    name="Magnesium Glycinate Sleep Gummies",
    category="Sleep",
    score=9.3,
    searchGrowth=142.3,
    socialGrowth=118.6,
    contentGrowth=97.4,
    competition="Low",
    estimatedMarketSizeCr=220,
    timeToMainstreamMonths=18,
    opportunityInsight=(
      "Searches for magnesium glycinate for sleep have more than doubled in metros, "
      "but India has very limited gummy-based SKUs tailored for sleep and stress relief."
    ),
  ),
  TrendSignal(
    id="sea-moss",
    name="Sea Moss Gut & Skin Tonics",
    category="Gut Health",
    score=8.7,
    searchGrowth=163.9,
    socialGrowth=134.2,
    contentGrowth=121.8,
    competition="Moderate",
    estimatedMarketSizeCr=140,
    timeToMainstreamMonths=24,
    opportunityInsight=(
      "Sea moss is trending via global creators on YouTube and Instagram, but local Indian "
      "brands have barely localized the proposition for gut health and skin radiance."
    ),
  ),
  TrendSignal(
    id="moringa-gummies",
    name="Moringa Micronutrient Gummies",
    category="Energy",
    score=8.4,
    searchGrowth=98.1,
    socialGrowth=87.5,
    contentGrowth=76.3,
    competition="Low",
    estimatedMarketSizeCr=95,
    timeToMainstreamMonths=16,
    opportunityInsight=(
      "Consumers are searching for natural energy and immunity solutions beyond vitamin C, "
      "with moringa emerging as a hero ingredient but underutilised in fun, gummy-first formats."
    ),
  ),
  TrendSignal(
    id="ashwagandha-latte",
    name="Ashwagandha Evening Lattes",
    category="Stress",
    score=8.1,
    searchGrowth=76.4,
    socialGrowth=90.2,
    contentGrowth=84.6,
    competition="Moderate",
    estimatedMarketSizeCr=130,
    timeToMainstreamMonths=14,
    opportunityInsight=(
      "Ashwagandha is established in capsules and tablets, but there is whitespace in warm "
      "beverage rituals for evening wind-down routines inspired by global moon milk trends."
    ),
  ),
  TrendSignal(
    id="gaba-l-theanine",
    name="GABA + L-Theanine Focus Chews",
    category="Stress",
    score=7.9,
    searchGrowth=88.2,
    socialGrowth=69.5,
    contentGrowth=73.3,
    competition="Moderate",
    estimatedMarketSizeCr=110,
    timeToMainstreamMonths=20,
    opportunityInsight=(
      "Young professionals are seeking non-caffeine focus aids; combination queries for GABA and "
      "L-theanine are rising but product availability remains niche and premium-focused."
    ),
  ),
  TrendSignal(
    id="collagen-sachets",
    name="Collagen + Hyaluronic Sachets",
    category="Beauty",
    score=7.6,
    searchGrowth=70.1,
    socialGrowth=62.4,
    contentGrowth=80.5,
    competition="High",
    estimatedMarketSizeCr=260,
    timeToMainstreamMonths=10,
    opportunityInsight=(
      "Collagen for joint and skin health is already mainstream in tier-1 cities, but sachet and "
      "stick formats are still underpenetrated beyond premium marketplaces."
    ),
  ),
]


TREND_SERIES: dict[str, List[TrendTimepoint]] = {
  "magnesium-glycinate": [
    TrendTimepoint(month="Apr", searchInterest=34, socialVolume=22, contentCreation=18),
    TrendTimepoint(month="May", searchInterest=42, socialVolume=29, contentCreation=24),
    TrendTimepoint(month="Jun", searchInterest=55, socialVolume=38, contentCreation=31),
    TrendTimepoint(month="Jul", searchInterest=63, socialVolume=46, contentCreation=39),
    TrendTimepoint(month="Aug", searchInterest=77, socialVolume=59, contentCreation=51),
    TrendTimepoint(month="Sep", searchInterest=89, socialVolume=71, contentCreation=64),
  ],
  "sea-moss": [
    TrendTimepoint(month="Apr", searchInterest=18, socialVolume=24, contentCreation=17),
    TrendTimepoint(month="May", searchInterest=24, socialVolume=31, contentCreation=23),
    TrendTimepoint(month="Jun", searchInterest=31, socialVolume=39, contentCreation=29),
    TrendTimepoint(month="Jul", searchInterest=41, socialVolume=49, contentCreation=38),
    TrendTimepoint(month="Aug", searchInterest=55, socialVolume=63, contentCreation=52),
    TrendTimepoint(month="Sep", searchInterest=68, socialVolume=78, contentCreation=66),
  ],
  "moringa-gummies": [
    TrendTimepoint(month="Apr", searchInterest=22, socialVolume=16, contentCreation=14),
    TrendTimepoint(month="May", searchInterest=28, socialVolume=19, contentCreation=18),
    TrendTimepoint(month="Jun", searchInterest=34, socialVolume=27, contentCreation=24),
    TrendTimepoint(month="Jul", searchInterest=46, socialVolume=33, contentCreation=32),
    TrendTimepoint(month="Aug", searchInterest=58, socialVolume=42, contentCreation=40),
    TrendTimepoint(month="Sep", searchInterest=67, socialVolume=53, contentCreation=48),
  ],
  "ashwagandha-latte": [
    TrendTimepoint(month="Apr", searchInterest=41, socialVolume=38, contentCreation=35),
    TrendTimepoint(month="May", searchInterest=49, socialVolume=45, contentCreation=42),
    TrendTimepoint(month="Jun", searchInterest=58, socialVolume=54, contentCreation=50),
    TrendTimepoint(month="Jul", searchInterest=65, socialVolume=62, contentCreation=58),
    TrendTimepoint(month="Aug", searchInterest=72, socialVolume=70, contentCreation=66),
    TrendTimepoint(month="Sep", searchInterest=80, socialVolume=79, contentCreation=73),
  ],
  "gaba-l-theanine": [
    TrendTimepoint(month="Apr", searchInterest=14, socialVolume=11, contentCreation=9),
    TrendTimepoint(month="May", searchInterest=19, socialVolume=15, contentCreation=13),
    TrendTimepoint(month="Jun", searchInterest=26, socialVolume=21, contentCreation=18),
    TrendTimepoint(month="Jul", searchInterest=35, socialVolume=28, contentCreation=25),
    TrendTimepoint(month="Aug", searchInterest=48, socialVolume=38, contentCreation=34),
    TrendTimepoint(month="Sep", searchInterest=61, socialVolume=50, contentCreation=45),
  ],
  "collagen-sachets": [
    TrendTimepoint(month="Apr", searchInterest=55, socialVolume=42, contentCreation=50),
    TrendTimepoint(month="May", searchInterest=60, socialVolume=47, contentCreation=56),
    TrendTimepoint(month="Jun", searchInterest=65, socialVolume=54, contentCreation=63),
    TrendTimepoint(month="Jul", searchInterest=70, socialVolume=61, contentCreation=68),
    TrendTimepoint(month="Aug", searchInterest=75, socialVolume=67, contentCreation=73),
    TrendTimepoint(month="Sep", searchInterest=82, socialVolume=74, contentCreation=80),
  ],
}


OPPORTUNITY_BRIEFS: List[OpportunityBrief] = [
  OpportunityBrief(
    trendId="magnesium-glycinate",
    trendName="Magnesium Glycinate Sleep Gummies",
    productConcept=(
      "Sugar-conscious magnesium glycinate sleep gummies with L-theanine and chamomile, "
      "formulated for Indian palettes and digestive comfort."
    ),
    consumerProblem=(
      "Consumers want deeper sleep and reduced anxiety without melatonin dependence or heavy "
      "tablets that upset the stomach."
    ),
    marketEvidence=[
      "3x YoY growth in searches for 'magnesium glycinate for sleep' across metro and tier-1 cities.",
      "Spike in Reddit and community discussions around 'non-melatonin sleep supplements' and 'gentle magnesium formats'.",
      "Low SKU density on Indian marketplaces for magnesium glycinate gummies vs tablets and capsules.",
    ],
    estimatedMarketPotentialCr=220,
    competitionDensity="Low",
    timeToMainstreamMonths=18,
  ),
  OpportunityBrief(
    trendId="sea-moss",
    trendName="Sea Moss Gut & Skin Tonics",
    productConcept=(
      "Sea moss-based functional tonics and gel sachets localized with Indian flavours, "
      "targeting gut health, immunity, and skin radiance."
    ),
    consumerProblem=(
      "Rising curiosity around sea moss benefits, but current options are expensive imports "
      "with poor taste fit and unclear usage rituals."
    ),
    marketEvidence=[
      "Strong creator-led education on YouTube and Instagram driving awareness of sea moss for gut and skin.",
      "Searches for 'sea moss India' and 'sea moss gel' have grown >150% in the last 6 months.",
      "Limited Indian brands with clinically-backed claims and localized formats.",
    ],
    estimatedMarketPotentialCr=140,
    competitionDensity="Moderate",
    timeToMainstreamMonths=24,
  ),
  OpportunityBrief(
    trendId="moringa-gummies",
    trendName="Moringa Micronutrient Gummies",
    productConcept=(
      "Daily moringa energy gummies packed with natural iron, vitamins, and antioxidants. "
      "Formulated for a fun, jitter-free energy boost."
    ),
    consumerProblem=(
      "Pill fatigue is real. Consumers want immunity and energy boosts but hate swallowing "
      "bitter powders or large multivitamins."
    ),
    marketEvidence=[
      "Searches for moringa benefits up 98% this year.",
      "Growing disdain for caffeine-driven vitality products on social media.",
      "High demand for gummy formats in the wellness category.",
    ],
    estimatedMarketPotentialCr=95,
    competitionDensity="Low",
    timeToMainstreamMonths=16,
  ),
  OpportunityBrief(
    trendId="ashwagandha-latte",
    trendName="Ashwagandha Evening Lattes",
    productConcept=(
      "A soothing ashwagandha-infused milk blend designed to be mixed hot before bed, "
      "promoting relaxation and stress relief."
    ),
    consumerProblem=(
      "People struggle to wind down after stressful work days, but don't want clinical sleep aids or pills."
    ),
    marketEvidence=[
      "Consistent 76% growth in searches for ashwagandha evening routines.",
      "Rising trend of 'moon milk' aesthetics on Instagram and TikTok.",
      "Whitespace in the calming hot beverage segment.",
    ],
    estimatedMarketPotentialCr=130,
    competitionDensity="Moderate",
    timeToMainstreamMonths=14,
  ),
  OpportunityBrief(
    trendId="gaba-l-theanine",
    trendName="GABA + L-Theanine Focus Chews",
    productConcept=(
      "Bite-sized focus chews pairing GABA and L-Theanine to promote a calm, alert state "
      "of mind during deep work sessions."
    ),
    consumerProblem=(
      "Professionals need focus to work efficiently, but coffee causes jitters and anxiety."
    ),
    marketEvidence=[
      "88% search growth for non-caffeine focus alternatives.",
      "L-theanine mentions doubling on productivity forums and communities.",
      "Premium positioning opportunity for office-friendly wellness snacks.",
    ],
    estimatedMarketPotentialCr=110,
    competitionDensity="Moderate",
    timeToMainstreamMonths=20,
  ),
  OpportunityBrief(
    trendId="collagen-sachets",
    trendName="Collagen + Hyaluronic Sachets",
    productConcept=(
      "Single-serve, unflavored collagen and hyaluronic acid sachets that dissolve instantly "
      "in morning coffee or smoothies."
    ),
    consumerProblem=(
      "Consumers know collagen is good for skin and joints, but bulky tubs are messy and hard to travel with."
    ),
    marketEvidence=[
      "Collagen queries dominate the beauty ingestibles category.",
      "Demand for easy, on-the-go wellness formats is strongly rising.",
      "Sachets allow premium trial without high upfront tub commitments.",
    ],
    estimatedMarketPotentialCr=260,
    competitionDensity="High",
    timeToMainstreamMonths=10,
  ),
]


PAIN_POINT_INSIGHTS: List[PainPointInsight] = [
  PainPointInsight(
    id="magnesium-sentiment",
    trendId="magnesium-glycinate",
    quotes=[
      "Magnesium tablets upset my stomach but they help my sleep.",
      "I wish magnesium supplements came in gummies, tablets feel too clinical.",
      "I don't want to rely on melatonin every night but still need something to calm my mind.",
    ],
    insightSummary=(
      "Consumers are looking for gentler, ritual-friendly sleep support formats that avoid "
      "melatonin and heavy tablets. Gummies and chews that feel like a calming nightly ritual "
      "can win share quickly."
    ),
  ),
  PainPointInsight(
    id="sea-moss-sentiment",
    trendId="sea-moss",
    quotes=[
      "I keep hearing about sea moss on YouTube but have no idea which brand to trust.",
      "The imported sea moss gels taste weird; wish there was an Indian flavour version.",
      "Sea moss sounds great for gut issues but the products are either too expensive or not available in India.",
    ],
    insightSummary=(
      "Education and trust are the main barriers for sea moss adoption in India. There is room "
      "for a credible, India-first brand with transparent sourcing and familiar flavours."
    ),
  ),
]


SCORING_CATEGORIES: List[ScoringCategory] = [
  ScoringCategory(
    id="search-velocity",
    label="Search velocity",
    description=(
      "Rate of change in high-intent searches across Google and marketplaces, "
      "normalised for category size."
    ),
    value=88,
  ),
  ScoringCategory(
    id="conversation-momentum",
    label="Conversation momentum",
    description=(
      "Depth and frequency of discussions across Reddit, Twitter, and community forums."
    ),
    value=82,
  ),
  ScoringCategory(
    id="demand-gap",
    label="Demand gap",
    description=(
      "Mismatch between consumer demand and available supply or SKU variety in India."
    ),
    value=91,
  ),
  ScoringCategory(
    id="competition-density",
    label="Competition density",
    description=(
      "Number of credible players, SKU spread, and pricing compression in the category."
    ),
    value=36,
  ),
]


@app.get("/api/health")
def health() -> dict[str, str]:
  return {"status": "ok"}


@app.get("/api/trend-signals", response_model=List[TrendSignal])
def get_trend_signals() -> List[TrendSignal]:
  return TREND_SIGNALS


@app.get("/api/trend-signals/{trend_id}/series", response_model=List[TrendTimepoint])
def get_trend_series(trend_id: str) -> List[TrendTimepoint]:
  series = TREND_SERIES.get(trend_id)
  if series is None:
    raise HTTPException(status_code=404, detail="Trend not found")
  return series


@app.get("/api/opportunity-briefs/{trend_id}", response_model=OpportunityBrief)
def get_opportunity_brief(trend_id: str) -> OpportunityBrief:
  brief: Optional[OpportunityBrief] = next(
    (b for b in OPPORTUNITY_BRIEFS if b.trendId == trend_id), None
  )
  if brief is None:
    raise HTTPException(status_code=404, detail="Opportunity brief not found")
  return brief


@app.get("/api/trend-scoring", response_model=List[ScoringCategory])
def get_trend_scoring() -> List[ScoringCategory]:
  return SCORING_CATEGORIES


@app.get("/api/trend-scoring/pain-points", response_model=List[PainPointInsight])
def get_pain_point_insights() -> List[PainPointInsight]:
  return PAIN_POINT_INSIGHTS


