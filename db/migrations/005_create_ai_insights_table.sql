-- Migration: 005_create_ai_insights_table
-- Date: 2026-04-23

CREATE TABLE ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrument_id UUID NOT NULL REFERENCES instruments(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  reason_codes JSONB NOT NULL,
  confidence FLOAT NOT NULL,
  market_sentiment TEXT,
  generated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_insights_instrument ON ai_insights(instrument_id);
CREATE INDEX idx_ai_insights_created ON ai_insights(created_at DESC);
