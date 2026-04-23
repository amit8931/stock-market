# 📊 Stock Intelligence Platform

> **AI-first decision intelligence layer for retail investors**
>
> Not another Yahoo Finance clone. This is clarity where there's currently chaos.

---

## 🎯 What This Is

**Forget data portals.** Users don't want:
- ❌ 100 indicators
- ❌ 20 news articles to parse
- ❌ Complicated charts

Users want:
- ✅ **"Why did this stock move today?"** (AI-powered explanation in 30 seconds)
- ✅ **Clear signals** (Bullish 88/100, not some vague indicator)
- ✅ **Actionable insights** (What should I do right now?)

**That's what we're building.**

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────┐
│        Frontend (React + Next.js)                    │
│  Dashboard | Markets | Portfolio | AI Insights      │
└────────────────────┬─────────────────────────────────┘
                     │
            ┌────────┴────────┐
            │                 │
      ┌─────▼──────┐     ┌───▼──────────┐
      │ API        │     │ WebSocket    │
      │ Gateway    │     │ Service      │
      │(3000)      │     │ (3004)       │
      └──┬──┬──┬───┘     └───┬──────────┘
         │  │  │             │
    ┌────┴──┼──┴───┐         │
    │       │      │         │
    ▼       ▼      ▼         ▼
┌──────┐ ┌───┐ ┌────┐   ┌─────────┐
│      │ │   │ │ AI │   │ Cache   │
│Market│ │Usr│ │Eng │   │(Redis)  │
│Svc   │ │ │ │ │    │   │         │
└──┬───┘ └───┘ └──┬─┘   └────┬────┘
   │              │          │
   └──────────────┼──────────┘
                  │
      ┌───────────┴───────────┐
      │ Signal Engine         │
      │ (Python Scoring)      │
      │ (3002)                │
      └───────────┬───────────┘
                  │
          ┌───────▼────────┐
          │  PostgreSQL    │
          │  TimescaleDB   │
          │  (5432)        │
          └────────────────┘
```

---

## 🚀 Quick Start (Docker)

```bash
# 1. Clone and configure
cd stock_market
cp .env.example .env
# Edit .env with your API keys

# 2. Start all services
docker-compose up -d

# 3. Verify
curl http://localhost:3000/health

# 4. Visit frontend
open http://localhost:3006
```

**See [docs/QUICKSTART.md](docs/QUICKSTART.md) for detailed setup.**

---

## 📚 Documentation

- **[QUICKSTART.md](docs/QUICKSTART.md)** - Get running in 5 minutes
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - System design & service details
- **[SPRINT_ROADMAP.md](docs/SPRINT_ROADMAP.md)** - 6-week development plan

---

## 🧩 Services (Microservices)

| Service | Port | Tech | Purpose |
|---------|------|------|---------|
| **API Gateway** | 3000 | Node.js/Express | Entry point, routing, auth |
| **Market Service** | 3001 | Node.js | Data ingestion & normalization |
| **Signal Engine** | 3002 | Python | Trading signal computation |
| **AI Engine** | 3003 | Python/OpenAI | Stock explanations & insights |
| **WebSocket Service** | 3004 | Node.js/Socket.io | Real-time updates |
| **User Service** | 3005 | Node.js | Auth, accounts, subscriptions |
| **Frontend** | 3006 | Next.js/React | Web UI |

---

## 🎯 Core Features (MVP)

### Week 1-2: Foundation
- [x] Database schema (9 tables)
- [x] API Gateway setup
- [x] Market data service skeleton
- [x] 20+ stocks seeded

### Week 3-4: Intelligence  
- [ ] Signal engine scoring algorithm
- [ ] AI explanations ("Why stock moved")
- [ ] Market brief generator
- [ ] News sentiment analysis

### Week 5-6: Polish
- [ ] Real-time WebSocket updates
- [ ] Watchlist system
- [ ] User authentication
- [ ] Beta launch

---

## 💡 Key Differentiators

### vs Yahoo Finance
| Feature | Yahoo | **Us** |
|---------|-------|--------|
| Stock data | ✓ | ✓ |
| Charts | ✓ | ✓ |
| **"Why moved?"** | ✗ | ✅ **AI-powered** |
| **Signal scores** | ✗ | ✅ **Real-time** |
| News | ✓ (noisy) | ✓ **Filtered & ranked** |
| Decision clarity | ✗ | ✅ **Our superpower** |

### vs TradingView
| Feature | TradingView | **Us** |
|---------|-------------|--------|
| Charting | ✓ Advanced | ✓ Basic (sufficient) |
| Community | ✓ | ✗ |
| **Retail focus** | ✗ | ✅ **By design** |
| **AI insights** | ✗ | ✅ **Core feature** |
| Price | $25-125/mo | $10-60/mo |

---

## 🧠 Signal Algorithm

**Final Score = (0-100)**

```python
Score = (
  Price_Momentum × 0.30    +  # Is it moving up/down fast?
  Volume_Strength × 0.20   +  # Unusual volume activity?
  News_Sentiment × 0.25    +  # What are people saying?
  Sector_Trend × 0.15      +  # Is the sector moving?
  Volatility × 0.10           # Is it stable or wild?
)

Classification:
  80-100  → 🟢 Strong Bullish
  60-80   → 🟢 Bullish
  40-60   → 🔵 Neutral
  20-40   → 🔴 Bearish
  0-20    → 🔴 Strong Bearish
```

---

## 💰 Business Model

### Free Tier
- Basic stock data
- Charts
- Watchlist (limited)
- News feed

### Pro Tier ($10-20/month)
- 🧠 **"Why stock moved" AI explanations**
- 📊 Signal scores (0-100)
- ⚡ Real-time alerts
- 📰 Filtered + ranked news

### Premium Tier ($30-60/month)
- Portfolio intelligence
- Risk analysis
- Sector rotation insights
- Advanced screener
- Historical signal data

### Enterprise (custom)
- API access
- Custom dashboards
- Dedicated support

---

## 📊 Technology Stack

**Frontend:**
- React 18
- Next.js 14
- Tailwind CSS
- Socket.io client

**Backend:**
- Node.js 18 (API Gateway, Market, WebSocket, User services)
- Python 3.11 (Signal, AI engines)
- Express.js for HTTP
- Socket.io for WebSockets

**Data:**
- PostgreSQL 15 (primary storage)
- TimescaleDB (time-series optimization)
- Redis (caching & pub/sub)

**AI/ML:**
- OpenAI GPT-4 API (explanations)
- Python for signal computation

**DevOps:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Turbo monorepo

---

## 🗂️ Project Structure

```
stock-intelligence-platform/
├── apps/web/                    # Frontend (Next.js)
├── services/
│   ├── api-gateway/            # Main API (3000)
│   ├── market-service/         # Data ingestion (3001)
│   ├── signal-engine/          # Signal scoring (3002, Python)
│   ├── ai-engine/              # LLM integration (3003, Python)
│   ├── websocket-service/      # Real-time (3004)
│   └── user-service/           # Auth & users (3005)
├── packages/
│   ├── shared-types/           # TypeScript types
│   ├── config/                 # Config management
│   └── utils/                  # Shared utilities
├── db/
│   ├── migrations/             # SQL schema
│   └── seeds/                  # Sample data
├── docs/
│   ├── QUICKSTART.md          # Get started
│   ├── ARCHITECTURE.md        # System design
│   └── SPRINT_ROADMAP.md      # Dev plan
└── docker-compose.yml         # Container orchestration
```

---

## 📈 Development Timeline

### Phase 1: MVP (6 weeks)
- ✅ Monorepo foundation
- [ ] Signal engine + AI explanations
- [ ] Real-time updates
- [ ] User authentication
- [ ] Beta launch

**Target:** 100 stocks, 50 beta users, <500ms latency

### Phase 2: Scale (Weeks 7-12)
- Portfolio intelligence
- Risk analysis
- Mobile app
- Stripe payments

### Phase 3: Enterprise (Weeks 13+)
- API tier
- Advanced analytics
- Institutional data
- Custom implementations

---

## 🔐 Security

- **Authentication:** JWT tokens, 7-day expiry
- **Passwords:** bcrypt hashing
- **API Keys:** Environment-based, never in code
- **Database:** Encrypted connections, parameterized queries
- **Rate Limiting:** 100 req/min per IP
- **HTTPS:** Production only

---

## 🚨 API Rate Limits

| Plan | Requests/min | Concurrent |
|------|-------------|-----------|
| Free | 30 | 5 |
| Pro | 300 | 50 |
| Premium | 1000 | 200 |
| Enterprise | Unlimited | Unlimited |

---

## 💾 Database Schema

**9 Core Tables:**
- `instruments` - Stock definitions
- `price_data` - Time-series prices (TimescaleDB optimized)
- `news` - News articles
- `news_instruments` - News ↔ Stock mapping
- `signals` - Trading signals
- `ai_insights` - AI explanations
- `users` - User accounts
- `watchlists` - User saved stocks
- `portfolios` - User holdings

---

## 🧪 Testing Strategy

**Unit Tests:**
- Service logic (signal calculation, etc.)
- API routes
- Database queries

**Integration Tests:**
- Service-to-service communication
- WebSocket real-time updates
- End-to-end user flows

**Load Tests:**
- 1000 concurrent users
- Real-time price updates
- API response times

---

## 📞 API Endpoints

### Stocks
```
GET  /api/stocks/:symbol       # Get stock data + price
GET  /api/search?q=...         # Search stocks
GET  /api/signals/:symbol      # Get signal score
GET  /api/insights/:symbol     # Get AI explanation
GET  /api/market/brief         # Daily market summary
```

### Markets
```
GET  /api/markets              # Market overview
GET  /api/sectors              # Sector performance
GET  /api/top-movers           # Top gainers/losers
```

### User
```
POST /auth/register            # Create account
POST /auth/login               # Login
GET  /users/:userId            # Get profile
GET  /users/:userId/watchlist  # Get watchlist
```

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for full API specification.

---

## 🤝 Contributing

**Development workflow:**
1. Create feature branch: `git checkout -b feat/signal-enhancement`
2. Make changes (one service at a time)
3. Run tests: `npm run test`
4. Commit: `git commit -m "feat(signal-engine): add..."`
5. Push & create PR

**Code standards:**
- TypeScript: Use strict mode
- Python: PEP 8 + type hints
- Commits: Semantic commits
- No `any` types in TypeScript

---

## 📊 Monitoring & Observability

**Key Metrics to Track:**
- API response time (target: <500ms)
- Signal accuracy (manual validation)
- WebSocket connection count
- Database query latency
- AI API costs per request

**Dashboard:** Datadog / Prometheus (future)

---

## 🐛 Troubleshooting

**"Cannot connect to PostgreSQL"**
```bash
docker-compose logs postgres
```

**"Services not starting"**
```bash
docker-compose down
docker-compose up -d --build
```

**"API returning 500 errors"**
```bash
docker-compose logs api-gateway
```

See [QUICKSTART.md](docs/QUICKSTART.md#troubleshooting) for more.

---

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [PostgreSQL Guide](https://www.postgresql.org/docs/)
- [Socket.io Tutorial](https://socket.io/docs/)
- [Python FastAPI](https://fastapi.tiangolo.com/)
- [Docker Basics](https://docs.docker.com/)

---

## 💡 Philosophy

**Problem:** Retail investors drown in data but lack decision clarity

**Solution:** Cut through noise with AI-powered intelligence

**Success Metric:** Users trust our insights and make better decisions

**Not Competing:** With Yahoo (data) or TradingView (charting)

**Actually Competing:** With human confusion and analysis paralysis

---

## 🚀 Ready to Build?

1. **Setup:** `docker-compose up -d` ([QUICKSTART.md](docs/QUICKSTART.md))
2. **Understand:** Read [ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. **Execute:** Follow [SPRINT_ROADMAP.md](docs/SPRINT_ROADMAP.md)

**Current Status:** Week 1 ✅ (Foundation complete)

**Next:** Week 2 - Market data pipeline

---

## 📞 Questions?

- Architecture questions? → See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- Setup issues? → See [docs/QUICKSTART.md](docs/QUICKSTART.md)
- Development timeline? → See [docs/SPRINT_ROADMAP.md](docs/SPRINT_ROADMAP.md)

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

Built with ❤️ for retail investors who deserve better.

**Core Philosophy:** Decision clarity beats data quantity.

---

<div align="center">

**🚀 Let's build something that makes retail investors actually successful 🚀**

---

*Last Updated: April 23, 2026*

</div>
