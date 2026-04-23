export type Tone = 'neutral' | 'good' | 'warn' | 'bad' | 'info';

export type MarketMover = {
  symbol: string;
  name: string;
  changePct: number;
  price: number;
  signalScore: number;
  status: 'Bullish' | 'Neutral' | 'Bearish';
  reason: string;
  catalyst: string;
  sparkline: number[];
};

export type WatchlistItem = {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  signalScore: number;
  status: 'Bullish' | 'Neutral' | 'Bearish';
  thesis: string;
  alertCount: number;
  region: string;
  sparkline: number[];
};

export type Holding = {
  symbol: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  price: number;
  dayChangePct: number;
  risk: 'Low' | 'Medium' | 'High';
  thesis: string;
  sparkline: number[];
};

export type AlertItem = {
  id: string;
  title: string;
  body: string;
  symbol: string;
  severity: 'High' | 'Medium' | 'Low';
  category: 'Price' | 'Volume' | 'News' | 'AI';
  status: 'Active' | 'Watching' | 'Resolved';
  createdAt: string;
};

export type InstrumentAdminRow = {
  symbol: string;
  name: string;
  type: 'Equity' | 'ETF' | 'Index' | 'Crypto';
  exchange: string;
  country: string;
  coverage: 'Realtime' | 'Delayed';
  qualityScore: number;
  status: 'Active' | 'Paused';
};

export type AdminUserRow = {
  email: string;
  role: 'Admin' | 'User';
  plan: 'Free' | 'Pro' | 'Premium';
  status: 'Healthy' | 'At risk' | 'Churn risk';
  watchlists: number;
  alerts: number;
  lastActive: string;
};

export type SignalAdminRow = {
  symbol: string;
  type: 'Momentum' | 'Sentiment' | 'Volume' | 'Macro';
  direction: 'Bullish' | 'Neutral' | 'Bearish';
  score: number;
  confidence: number;
  source: string;
  createdAt: string;
};

export type NewsAdminRow = {
  headline: string;
  impact: 'High' | 'Medium' | 'Low';
  sentiment: 'Positive' | 'Mixed' | 'Negative';
  symbols: string[];
  source: string;
  latencyMin: number;
};

export type JobAdminRow = {
  job: string;
  schedule: string;
  nextRun: string;
  lastRun: string;
  status: 'Healthy' | 'Delayed' | 'Attention';
  successRate: number;
  avgDurationSec: number;
  queueDepth: number;
};

export const USER_PANEL_NAV = [
  { href: '/app', label: 'Overview' },
  { href: '/app/watchlist', label: 'Watchlist' },
  { href: '/app/portfolio', label: 'Portfolio' },
  { href: '/app/alerts', label: 'Alerts' },
  { href: '/app/settings', label: 'Settings' },
] as const;

export const ADMIN_PANEL_NAV = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/instruments', label: 'Instruments' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/signals', label: 'Signals' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/jobs', label: 'Jobs / Pipelines' },
] as const;

export const marketBrief = {
  sentiment: 'Moderately bullish',
  summary:
    'Tech leadership is holding, but the market is only rewarding names with clear catalysts. AI-linked semis remain strong while rate-sensitive pockets are still fragile.',
  drivers: [
    'AI infrastructure demand is supporting semiconductor momentum.',
    'Macro risk is stable after softer rate-volatility expectations.',
    'Energy and consumer discretionary are lagging on weaker pricing power.',
  ],
  riskNote: 'Watch for rotation if broad-market breadth weakens into the close.',
};

export const marketMovers: MarketMover[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    changePct: 5.2,
    price: 925.45,
    signalScore: 88,
    status: 'Bullish',
    reason: 'AI chip demand and another analyst upgrade reinforced the breakout.',
    catalyst: 'Semiconductor leadership',
    sparkline: [812, 824, 840, 856, 875, 889, 907, 925],
  },
  {
    symbol: 'AMD',
    name: 'AMD',
    changePct: 3.1,
    price: 178.12,
    signalScore: 76,
    status: 'Bullish',
    reason: 'Positive read-through from AI server demand and strong options flow.',
    catalyst: 'Compute acceleration',
    sparkline: [161, 163, 165, 169, 170, 173, 176, 178],
  },
  {
    symbol: 'AAPL',
    name: 'Apple',
    changePct: 1.4,
    price: 191.25,
    signalScore: 62,
    status: 'Neutral',
    reason: 'Services resilience is offsetting softer hardware enthusiasm.',
    catalyst: 'Defensive mega-cap bid',
    sparkline: [186, 187, 187, 188, 189, 190, 190, 191],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    changePct: -2.3,
    price: 168.7,
    signalScore: 34,
    status: 'Bearish',
    reason: 'Margin concerns and softer deliveries are still dominating the tape.',
    catalyst: 'EV demand pressure',
    sparkline: [182, 180, 177, 176, 174, 172, 170, 169],
  },
];

export const watchlistItems: WatchlistItem[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    price: 925.45,
    changePct: 5.2,
    signalScore: 88,
    status: 'Bullish',
    thesis: 'Momentum is backed by both news and volume.',
    alertCount: 2,
    region: 'US',
    sparkline: [812, 824, 840, 856, 875, 889, 907, 925],
  },
  {
    symbol: 'AAPL',
    name: 'Apple',
    price: 191.25,
    changePct: 1.4,
    signalScore: 62,
    status: 'Neutral',
    thesis: 'Still strong, but needs a fresh catalyst for a bigger move.',
    alertCount: 1,
    region: 'US',
    sparkline: [186, 187, 187, 188, 189, 190, 190, 191],
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    price: 168.7,
    changePct: -2.3,
    signalScore: 34,
    status: 'Bearish',
    thesis: 'Headline risk remains elevated after demand revisions.',
    alertCount: 3,
    region: 'US',
    sparkline: [182, 180, 177, 176, 174, 172, 170, 169],
  },
  {
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries',
    price: 2948.2,
    changePct: 0.9,
    signalScore: 58,
    status: 'Neutral',
    thesis: 'Steady domestic demand but no breakout yet.',
    alertCount: 1,
    region: 'India',
    sparkline: [2870, 2885, 2898, 2910, 2918, 2929, 2941, 2948],
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    price: 428.6,
    changePct: 2.2,
    signalScore: 74,
    status: 'Bullish',
    thesis: 'Cloud and Copilot narrative is staying supportive.',
    alertCount: 2,
    region: 'US',
    sparkline: [406, 409, 411, 415, 419, 421, 425, 429],
  },
];

export const holdings: Holding[] = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    sector: 'Technology',
    shares: 50,
    avgCost: 175.2,
    price: 191.25,
    dayChangePct: 1.4,
    risk: 'Low',
    thesis: 'Core quality compounder with defensive cash flow.',
    sparkline: [182, 184, 185, 186, 187, 189, 190, 191],
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    sector: 'Technology',
    shares: 10,
    avgCost: 780,
    price: 925.45,
    dayChangePct: 5.2,
    risk: 'High',
    thesis: 'Highest upside, but concentration risk is also highest.',
    sparkline: [812, 824, 840, 856, 875, 889, 907, 925],
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase',
    sector: 'Financials',
    shares: 22,
    avgCost: 186.4,
    price: 198.1,
    dayChangePct: 0.6,
    risk: 'Medium',
    thesis: 'Quality bank exposure balancing tech-heavy winners.',
    sparkline: [189, 190, 191, 193, 194, 196, 197, 198],
  },
  {
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries',
    sector: 'Energy',
    shares: 14,
    avgCost: 2810,
    price: 2948.2,
    dayChangePct: 0.9,
    risk: 'Medium',
    thesis: 'India growth exposure with broad conglomerate diversification.',
    sparkline: [2870, 2885, 2898, 2910, 2918, 2929, 2941, 2948],
  },
];

export const alertItems: AlertItem[] = [
  {
    id: 'alert-1',
    title: 'NVDA volume spike',
    body: 'Volume has crossed 2.1x the 20-day average while price remains near highs.',
    symbol: 'NVDA',
    severity: 'High',
    category: 'Volume',
    status: 'Active',
    createdAt: '6 min ago',
  },
  {
    id: 'alert-2',
    title: 'TSLA sentiment deterioration',
    body: 'Negative story flow is clustering around margins and demand revisions.',
    symbol: 'TSLA',
    severity: 'High',
    category: 'News',
    status: 'Active',
    createdAt: '18 min ago',
  },
  {
    id: 'alert-3',
    title: 'AAPL reclaimed 190',
    body: 'Price alert triggered after reclaiming a short-term resistance band.',
    symbol: 'AAPL',
    severity: 'Medium',
    category: 'Price',
    status: 'Watching',
    createdAt: '41 min ago',
  },
  {
    id: 'alert-4',
    title: 'RELIANCE.NS signal normalized',
    body: 'Momentum cooled back to neutral after the morning push.',
    symbol: 'RELIANCE.NS',
    severity: 'Low',
    category: 'AI',
    status: 'Resolved',
    createdAt: '2 hr ago',
  },
];

export const settingsProfile = {
  displayName: 'Market Operator',
  email: 'demo@pivotstocks.ai',
  plan: 'Pro',
  riskProfile: 'Balanced',
  digest: 'Market close',
  assistantMode: 'Decision-focused',
  regions: ['US', 'India', 'Europe'],
};

export const instrumentRows: InstrumentAdminRow[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'Equity',
    exchange: 'NASDAQ',
    country: 'US',
    coverage: 'Realtime',
    qualityScore: 96,
    status: 'Active',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA',
    type: 'Equity',
    exchange: 'NASDAQ',
    country: 'US',
    coverage: 'Realtime',
    qualityScore: 98,
    status: 'Active',
  },
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF',
    type: 'ETF',
    exchange: 'NYSE Arca',
    country: 'US',
    coverage: 'Realtime',
    qualityScore: 93,
    status: 'Active',
  },
  {
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries',
    type: 'Equity',
    exchange: 'NSE',
    country: 'India',
    coverage: 'Delayed',
    qualityScore: 84,
    status: 'Active',
  },
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin',
    type: 'Crypto',
    exchange: 'Global',
    country: 'Global',
    coverage: 'Realtime',
    qualityScore: 91,
    status: 'Active',
  },
  {
    symbol: 'NIFTY50',
    name: 'Nifty 50',
    type: 'Index',
    exchange: 'NSE',
    country: 'India',
    coverage: 'Delayed',
    qualityScore: 79,
    status: 'Paused',
  },
];

export const adminUsers: AdminUserRow[] = [
  {
    email: 'admin@pivotstocks.ai',
    role: 'Admin',
    plan: 'Premium',
    status: 'Healthy',
    watchlists: 4,
    alerts: 12,
    lastActive: '2 min ago',
  },
  {
    email: 'rhea@investor.com',
    role: 'User',
    plan: 'Pro',
    status: 'Healthy',
    watchlists: 3,
    alerts: 9,
    lastActive: '9 min ago',
  },
  {
    email: 'arjun@alphaedge.com',
    role: 'User',
    plan: 'Free',
    status: 'At risk',
    watchlists: 1,
    alerts: 1,
    lastActive: '2 days ago',
  },
  {
    email: 'sara@momentumlabs.io',
    role: 'User',
    plan: 'Premium',
    status: 'Healthy',
    watchlists: 6,
    alerts: 18,
    lastActive: '14 min ago',
  },
];

export const adminSignals: SignalAdminRow[] = [
  {
    symbol: 'NVDA',
    type: 'Momentum',
    direction: 'Bullish',
    score: 88,
    confidence: 92,
    source: 'price+volume+news',
    createdAt: '10:14 UTC',
  },
  {
    symbol: 'TSLA',
    type: 'Sentiment',
    direction: 'Bearish',
    score: 34,
    confidence: 81,
    source: 'news clustering',
    createdAt: '10:18 UTC',
  },
  {
    symbol: 'AAPL',
    type: 'Macro',
    direction: 'Neutral',
    score: 61,
    confidence: 68,
    source: 'sector stabilization',
    createdAt: '10:22 UTC',
  },
  {
    symbol: 'BTCUSD',
    type: 'Volume',
    direction: 'Bullish',
    score: 71,
    confidence: 77,
    source: 'exchange flow',
    createdAt: '10:28 UTC',
  },
];

export const adminNews: NewsAdminRow[] = [
  {
    headline: 'Fed speakers keep rate-path expectations contained.',
    impact: 'High',
    sentiment: 'Mixed',
    symbols: ['SPY', 'QQQ', 'JPM'],
    source: 'Reuters',
    latencyMin: 4,
  },
  {
    headline: 'AI infrastructure spending drives another semi breakout.',
    impact: 'High',
    sentiment: 'Positive',
    symbols: ['NVDA', 'AMD', 'AVGO'],
    source: 'Benzinga',
    latencyMin: 6,
  },
  {
    headline: 'Oil softens, pulling energy complex lower.',
    impact: 'Medium',
    sentiment: 'Negative',
    symbols: ['XOM', 'CVX'],
    source: 'NewsAPI',
    latencyMin: 9,
  },
];

export const adminJobs: JobAdminRow[] = [
  {
    job: 'Market ingestion',
    schedule: 'Every 5 min',
    nextRun: 'In 3 min',
    lastRun: '2 min ago',
    status: 'Healthy',
    successRate: 99,
    avgDurationSec: 27,
    queueDepth: 2,
  },
  {
    job: 'Signal scoring',
    schedule: 'Every 5 min',
    nextRun: 'In 3 min',
    lastRun: '2 min ago',
    status: 'Healthy',
    successRate: 97,
    avgDurationSec: 18,
    queueDepth: 1,
  },
  {
    job: 'News enrichment',
    schedule: 'Every 10 min',
    nextRun: 'In 7 min',
    lastRun: '3 min ago',
    status: 'Delayed',
    successRate: 92,
    avgDurationSec: 52,
    queueDepth: 6,
  },
  {
    job: 'Daily market brief',
    schedule: '06:00 UTC',
    nextRun: '17 hr',
    lastRun: '4 hr ago',
    status: 'Attention',
    successRate: 88,
    avgDurationSec: 81,
    queueDepth: 0,
  },
];

export const adminIncidents = [
  'One delayed news enrichment run needs queue backpressure tuning.',
  'India index coverage is still delayed and should not be marketed as realtime.',
  'AI brief confidence should drop when macro inputs are incomplete.',
];

export const adminChecklist = [
  { label: 'Schema coverage', value: 92 },
  { label: 'Signal freshness', value: 87 },
  { label: 'News linkage quality', value: 79 },
  { label: 'AI output QA', value: 83 },
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value >= 1000 ? 0 : 2,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

export function scoreTone(score: number): Tone {
  if (score >= 80) return 'good';
  if (score >= 60) return 'info';
  if (score >= 40) return 'warn';
  return 'bad';
}

export function signalTone(status: string): Tone {
  if (status === 'Bullish' || status === 'Healthy' || status === 'Positive' || status === 'Active') return 'good';
  if (status === 'Neutral' || status === 'Mixed' || status === 'Watching' || status === 'Delayed') return 'warn';
  if (status === 'Bearish' || status === 'Negative' || status === 'Attention' || status === 'Paused' || status === 'Resolved') return 'bad';
  return 'neutral';
}

export function severityTone(severity: string): Tone {
  if (severity === 'High') return 'bad';
  if (severity === 'Medium') return 'warn';
  return 'info';
}

export function sum<T>(items: T[], selector: (item: T) => number) {
  return items.reduce((total, item) => total + selector(item), 0);
}

export function average<T>(items: T[], selector: (item: T) => number) {
  if (items.length === 0) return 0;
  return sum(items, selector) / items.length;
}

export function getPortfolioValue() {
  return sum(holdings, (holding) => holding.shares * holding.price);
}

export function getPortfolioCostBasis() {
  return sum(holdings, (holding) => holding.shares * holding.avgCost);
}

export function getPortfolioDayPnl() {
  return sum(holdings, (holding) => holding.shares * holding.price * (holding.dayChangePct / 100));
}

export function getSectorExposure() {
  const total = getPortfolioValue() || 1;
  const buckets = holdings.reduce<Record<string, number>>((acc, holding) => {
    const positionValue = holding.shares * holding.price;
    acc[holding.sector] = (acc[holding.sector] || 0) + positionValue;
    return acc;
  }, {});

  return Object.entries(buckets)
    .map(([sector, value]) => ({ sector, weight: Math.round((value / total) * 100), value }))
    .sort((left, right) => right.weight - left.weight);
}
