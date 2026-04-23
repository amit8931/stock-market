# Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- Docker & Docker Compose (recommended)
- PostgreSQL 15 (if running locally)

### Option 1: Docker Compose (Recommended)

**Step 1: Clone and setup**
```bash
cd d:\stock_market
cp .env.example .env
# Edit .env with your API keys
```

**Step 2: Start everything**
```bash
docker-compose up -d
```

**Services will be available at:**
- Frontend: http://localhost:3006
- API Gateway: http://localhost:3000
- WebSocket: ws://localhost:3004
- PostgreSQL: localhost:5432
- Redis: localhost:6379

**Step 3: Verify services**
```bash
# Check if all services are running
docker-compose ps

# View logs
docker-compose logs -f api-gateway
```

---

### Option 2: Local Development Setup

**Step 1: Install dependencies**
```bash
npm install
```

**Step 2: Setup database locally**
```bash
# Create PostgreSQL database
createdb stock_platform

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

**Step 3: Start all services**
```bash
npm run dev
```

This starts all services in parallel with hot-reload.

**Individual service commands:**
```bash
# API Gateway
cd services/api-gateway && npm run dev

# Market Service  
cd services/market-service && npm run dev

# Signal Engine
cd services/signal-engine && python src/main.py

# AI Engine
cd services/ai-engine && python src/main.py

# WebSocket Service
cd services/websocket-service && npm run dev

# User Service
cd services/user-service && npm run dev

# Frontend
cd apps/web && npm run dev
```

---

## 🔑 Environment Variables

**Required API Keys:**

1. **Finnhub** (Free tier available)
   ```
   FINNHUB_KEY=your_key_here
   # Get from: https://finnhub.io/register
   ```

2. **OpenAI**
   ```
   OPENAI_KEY=sk-...
   # Get from: https://platform.openai.com/account/api-keys
   ```

3. **Optional: Polygon.io** (Backup market data)
   ```
   POLYGON_KEY=your_key_here
   ```

---

## 🧪 Quick Test

**Test that everything is working:**

### 1. Check API Gateway
```bash
curl http://localhost:3000/health

# Expected response:
# {"status":"ok","service":"api-gateway","timestamp":"..."}
```

### 2. Search for a stock
```bash
curl "http://localhost:3000/api/search?q=AAPL"

# Expected response:
# {"query":"AAPL","results":[...]}
```

### 3. Get stock signals
```bash
curl http://localhost:3000/api/signals/AAPL

# Expected response:
# {"symbol":"AAPL","signals":[...],"score":..}
```

### 4. Get AI insight
```bash
curl http://localhost:3000/api/insights/AAPL

# Expected response:
# {"symbol":"AAPL","summary":"...","reasons":[...]}
```

### 5. Test WebSocket
```bash
# Use WebSocket client (example with Node.js):
const io = require('socket.io-client');
const socket = io('ws://localhost:3004');

socket.emit('subscribe_price', {symbol: 'AAPL'});
socket.on('price_update', (data) => {
  console.log('Price update:', data);
});
```

---

## 📁 Project Structure

```
stock-intelligence-platform/
├── apps/
│   └── web/                  # Next.js frontend
│       ├── src/
│       │   ├── pages/        # Pages (index, markets, etc)
│       │   ├── styles/       # CSS
│       │   └── components/   # React components
│       └── package.json
│
├── services/
│   ├── api-gateway/          # Main API (Node.js)
│   ├── market-service/       # Data ingestion (Node.js)
│   ├── signal-engine/        # Signal computation (Python)
│   ├── ai-engine/           # LLM integration (Python)
│   ├── websocket-service/   # Real-time (Node.js)
│   └── user-service/        # Auth & users (Node.js)
│
├── packages/
│   ├── shared-types/        # TypeScript types
│   ├── config/              # Configuration
│   └── utils/               # Utilities
│
├── db/
│   ├── migrations/          # SQL schema migrations
│   └── seeds/              # Sample data
│
├── docs/
│   ├── SPRINT_ROADMAP.md   # 6-week plan
│   └── ARCHITECTURE.md     # System design
│
└── infra/
    └── docker-compose.yml  # Container orchestration
```

---

## 🚀 Common Development Tasks

### Add a new API endpoint

**File:** `services/api-gateway/src/index.ts`

```typescript
// Add your route
app.get('/api/your-endpoint', async (req: Request, res: Response) => {
  try {
    // Your logic
    res.json({ data: 'your response' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Add a new database migration

**File:** `db/migrations/XXX_your_migration.sql`

```sql
-- Your migration
CREATE TABLE new_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

Then run:
```bash
npm run db:migrate
```

### Add a new AI prompt

**File:** `services/ai-engine/src/prompts.py`

```python
PROMPTS = {
    "your_prompt_name": """
Your prompt template here...
{data}
"""
}
```

### Test a service

**Create test file:** `services/your-service/__tests__/test.ts`

```typescript
import { yourFunction } from '../src/index';

describe('Your Function', () => {
  test('should work', () => {
    const result = yourFunction();
    expect(result).toBe(expected);
  });
});
```

Run: `npm run test`

---

## 🐛 Troubleshooting

### "Cannot connect to PostgreSQL"
```bash
# Check if database exists
psql -U postgres -l

# Create database if missing
createdb stock_platform

# Check connection string in .env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
```

### "API Gateway not responding"
```bash
# Check if service started
curl http://localhost:3000/health

# View logs
tail -f services/api-gateway/logs.txt

# Restart service
docker-compose restart api-gateway
```

### "OpenAI API errors"
```bash
# Check API key
echo $OPENAI_KEY

# Test API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_KEY"
```

### "Port already in use"
```bash
# Windows: Find process on port
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
```

### Database migration failed
```bash
# View migration status
psql -U postgres -d stock_platform -c "SELECT * FROM schema_migrations;"

# Rollback manually if needed
# Edit db/migrations/ and create rollback migration
```

---

## 📝 Coding Standards

### TypeScript
- Use strict mode: `"strict": true`
- Type all function params and returns
- Use interfaces for data structures
- Avoid `any` type

### Python
- Follow PEP 8 style guide
- Type hints for functions
- Docstrings for classes/functions
- Virtual environment: `python -m venv venv`

### Git Commits
```
Format: <type>(<scope>): <subject>

Types:
  feat:    New feature
  fix:     Bug fix
  docs:    Documentation
  refactor: Code refactoring
  test:    Test additions
  chore:   Build/tooling

Example:
  feat(signal-engine): add volume spike detection
  fix(api-gateway): rate limiting for webhooks
```

---

## 📊 Useful Commands Reference

```bash
# Development
npm run dev                  # Start all services
npm run build              # Build all services
npm run lint               # Lint all code

# Database
npm run db:migrate         # Run migrations
npm run db:seed           # Seed sample data
npm run db:reset          # Drop and recreate (dev only)

# Testing
npm run test              # Run all tests
npm run test:watch       # Watch mode

# Docker
docker-compose up -d     # Start all containers
docker-compose logs -f   # View logs
docker-compose down      # Stop all containers
docker-compose ps        # Show running containers

# TypeScript
tsc --noEmit             # Type check only
```

---

## 🎯 Next Steps

**After successful setup:**

1. ✅ Verify all services running (see Quick Test above)
2. ✅ Explore the database: `psql -U postgres -d stock_platform`
3. ✅ Visit frontend: http://localhost:3006
4. ✅ Check Week 1 tasks in [SPRINT_ROADMAP.md](./SPRINT_ROADMAP.md)
5. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand system design

---

## 💬 Need Help?

- Check logs: `docker-compose logs <service-name>`
- Review architecture: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- Check sprint plan: See [SPRINT_ROADMAP.md](./SPRINT_ROADMAP.md)
- API documentation: See inline comments in service files

---

## 🎓 Learning Resources

- **Next.js:** https://nextjs.org/docs
- **PostgreSQL:** https://www.postgresql.org/docs/
- **Socket.io:** https://socket.io/docs/
- **Python/FastAPI:** https://fastapi.tiangolo.com/
- **Docker:** https://docs.docker.com/

---

**Happy coding! 🚀**
