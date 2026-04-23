-- Migration: 003_create_news_table
-- Date: 2026-04-23

CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL,
  source TEXT NOT NULL,
  url TEXT,
  published_at TIMESTAMP NOT NULL,
  sentiment_score FLOAT DEFAULT 0.5,
  impact_score TEXT DEFAULT 'medium',
  summary TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE news_instruments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  news_id UUID NOT NULL REFERENCES news(id) ON DELETE CASCADE,
  instrument_id UUID NOT NULL REFERENCES instruments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_news_published ON news(published_at DESC);
CREATE INDEX idx_news_instruments_news ON news_instruments(news_id);
CREATE INDEX idx_news_instruments_instrument ON news_instruments(instrument_id);
