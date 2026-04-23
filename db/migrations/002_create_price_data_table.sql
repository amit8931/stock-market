-- Migration: 002_create_price_data_table
-- Date: 2026-04-23
-- Uses TimescaleDB for time-series optimization

CREATE TABLE price_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  instrument_id UUID NOT NULL REFERENCES instruments(id) ON DELETE CASCADE,
  timestamp TIMESTAMP NOT NULL,
  open FLOAT NOT NULL,
  high FLOAT NOT NULL,
  low FLOAT NOT NULL,
  close FLOAT NOT NULL,
  volume BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_price_data_instrument ON price_data(instrument_id);
CREATE INDEX idx_price_data_timestamp ON price_data(timestamp DESC);

-- Enable TimescaleDB if available
-- SELECT create_hypertable('price_data', 'timestamp', if_not_exists => TRUE);
