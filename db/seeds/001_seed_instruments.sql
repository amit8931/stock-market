-- Seed: US and India stocks
INSERT INTO instruments (symbol, name, type, exchange, country, sector, industry, currency) VALUES
-- US Tech Stocks
('AAPL', 'Apple Inc.', 'equity', 'NASDAQ', 'US', 'Technology', 'Consumer Electronics', 'USD'),
('MSFT', 'Microsoft Corporation', 'equity', 'NASDAQ', 'US', 'Technology', 'Software', 'USD'),
('GOOGL', 'Alphabet Inc.', 'equity', 'NASDAQ', 'US', 'Technology', 'Internet Services', 'USD'),
('NVDA', 'NVIDIA Corporation', 'equity', 'NASDAQ', 'US', 'Technology', 'Semiconductors', 'USD'),
('META', 'Meta Platforms Inc.', 'equity', 'NASDAQ', 'US', 'Technology', 'Internet Services', 'USD'),
('TSLA', 'Tesla Inc.', 'equity', 'NASDAQ', 'US', 'Consumer Cyclical', 'Automobiles', 'USD'),
('AMZN', 'Amazon.com Inc.', 'equity', 'NASDAQ', 'US', 'Consumer Cyclical', 'Internet Services', 'USD'),

-- US Finance Stocks
('JPM', 'JPMorgan Chase Co.', 'equity', 'NYSE', 'US', 'Financials', 'Banks', 'USD'),
('BAC', 'Bank of America Corp.', 'equity', 'NYSE', 'US', 'Financials', 'Banks', 'USD'),
('GS', 'The Goldman Sachs Group Inc.', 'equity', 'NYSE', 'US', 'Financials', 'Investment Banking', 'USD'),

-- US Energy Stocks
('XOM', 'Exxon Mobil Corporation', 'equity', 'NYSE', 'US', 'Energy', 'Oil & Gas Exploration', 'USD'),
('CVX', 'Chevron Corporation', 'equity', 'NYSE', 'US', 'Energy', 'Oil & Gas Exploration', 'USD'),

-- India Stocks (NSE)
('RELIANCE.NS', 'Reliance Industries Limited', 'equity', 'NSE', 'IN', 'Energy', 'Oil & Gas', 'INR'),
('TCS.NS', 'Tata Consultancy Services', 'equity', 'NSE', 'IN', 'Technology', 'IT Services', 'INR'),
('INFY.NS', 'Infosys Limited', 'equity', 'NSE', 'IN', 'Technology', 'IT Services', 'INR'),
('WIPRO.NS', 'Wipro Limited', 'equity', 'NSE', 'IN', 'Technology', 'IT Services', 'INR'),
('HDFC.NS', 'Housing Development Finance Corporation', 'equity', 'NSE', 'IN', 'Financials', 'Banks', 'INR'),
('ICICIBANK.NS', 'ICICI Bank Limited', 'equity', 'NSE', 'IN', 'Financials', 'Banks', 'INR'),
('BHARTIARTL.NS', 'Bharti Airtel Limited', 'equity', 'NSE', 'IN', 'Telecommunications', 'Telecom', 'INR'),

-- US Indices (ETFs)
('SPY', 'SPDR S&P 500 ETF Trust', 'etf', 'NYSE', 'US', 'Index', 'ETF', 'USD'),
('QQQ', 'Invesco QQQ Trust', 'etf', 'NASDAQ', 'US', 'Index', 'ETF', 'USD'),
('IWM', 'iShares Russell 2000 ETF', 'etf', 'NYSE', 'US', 'Index', 'ETF', 'USD')
ON CONFLICT (symbol) DO NOTHING;
