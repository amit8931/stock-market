import express, { Express, Request, Response } from 'express';
import config from '@stock-platform/config';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'api-gateway', timestamp: new Date() });
});

// Stock endpoints (routing to market service)
app.get('/api/stocks/:symbol', async (req: Request, res: Response) => {
  try {
    // TODO: Proxy to market service
    res.json({ symbol: req.params.symbol, message: 'Stock endpoint' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search endpoint
app.get('/api/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    // TODO: Search across instruments
    res.json({ query, results: [] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signals endpoint
app.get('/api/signals/:symbol', async (req: Request, res: Response) => {
  try {
    // TODO: Fetch signals from signal engine
    res.json({ symbol: req.params.symbol, signals: [] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// AI insights endpoint
app.get('/api/insights/:symbol', async (req: Request, res: Response) => {
  try {
    // TODO: Fetch AI insights
    res.json({ symbol: req.params.symbol, insight: null });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Market brief endpoint
app.get('/api/market/brief', async (req: Request, res: Response) => {
  try {
    // TODO: Generate market brief
    res.json({ brief: 'Market brief will be generated here' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});

export default app;
