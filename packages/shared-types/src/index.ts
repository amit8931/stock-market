// Shared types for all services

export interface Instrument {
  id: string;
  symbol: string;
  name: string;
  type: 'equity' | 'etf' | 'crypto' | 'index';
  exchange: string;
  country: string;
  sector?: string;
  industry?: string;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PriceData {
  id: string;
  instrumentId: string;
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  createdAt: Date;
}

export interface Signal {
  id: string;
  instrumentId: string;
  signalType: string;
  score: number;
  direction: 'bullish' | 'bearish' | 'neutral';
  strength: number;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIInsight {
  id: string;
  instrumentId: string;
  summary: string;
  reasonCodes: string[];
  confidence: number;
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
  generatedAt: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  fullName?: string;
  subscriptionPlan: 'free' | 'pro' | 'premium' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface Watchlist {
  id: string;
  userId: string;
  instrumentId: string;
  createdAt: Date;
}

export interface WebSocketMessage {
  type: 'price_update' | 'signal_update' | 'news_alert' | 'market_brief';
  data: any;
  timestamp: Date;
}
