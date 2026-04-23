-- Migration: 004_create_signals_table
-- Date: 2026-04-23

CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrument_id UUID NOT NULL REFERENCES instruments(id) ON DELETE CASCADE,
  signal_type TEXT NOT NULL,
  score FLOAT NOT NULL,
  direction TEXT NOT NULL,
  strength FLOAT DEFAULT 0.5,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_signals_instrument ON signals(instrument_id);
CREATE INDEX idx_signals_type ON signals(signal_type);
CREATE INDEX idx_signals_created ON signals(created_at DESC);
