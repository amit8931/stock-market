# Stock Intelligence Platform - 6-Week Sprint Plan

## 🎯 Project Overview

**Goal:** Build an AI-first decision intelligence layer for retail investors

**Not Building:** Another Yahoo Finance clone  
**Actually Building:** Decision clarity system that helps retail investors understand stock movements instantly

---

## 📋 6-Week Execution Roadmap

### 🟢 **WEEK 1: Foundation & Database Setup**

**Goal:** System skeleton working end-to-end

**Tasks:**
- ✅ Monorepo structure setup (Turborepo)
- ✅ PostgreSQL + TimescaleDB schema creation
- ✅ Database migrations and seeds
- ✅ Shared types and configuration packages
- ✅ Environment setup (.env files)

**Deliverables:**
- Postgres running with all tables created
- Seed data: 20+ US/India stocks
- Configuration system working across all services
- All TypeScript configs properly set up

**Testing:** `npm run db:migrate` works, seed data visible in DB

---

### 🟡 **WEEK 2: Market Data Ingestion Pipeline**

**Goal:** Live stock prices flowing into the system

**Tasks:**
- [ ] Integrate Finnhub API (or Polygon.io as fallback)
- [ ] Build market data collector service
- [ ] Implement data normalization layer
- [ ] Store prices in TimescaleDB
- [ ] Set up Redis caching layer
- [ ] Create search indexing system

**Services to Build:**
- Market Service (Node.js) - data fetching & normalization
- Redis pub/sub for real-time distribution

**Testing:**
- Fetch live prices for top 50 stocks
- Verify prices stored in DB with 1-min intervals
- Cache hits working in Redis

**APIs Needed:**
- Finnhub API key (get free tier)
- Polygon.io API key (optional backup)

---

### 🔵 **WEEK 3: News & Sentiment Layer**

**Goal:** Stock-specific news with sentiment scoring

**Tasks:**
- [ ] Integrate news API (Finnhub or NewsAPI)
- [ ] Build news ingestion service
- [ ] Link news → stocks (many-to-many)
- [ ] Implement basic sentiment scoring
  - Use pre-trained sentiment model OR
  - Use simple keyword-based scoring initially
- [ ] Build news filtering system
- [ ] Create news API endpoint

**Key Features:**
- Only show top 5 most relevant articles per stock
- Sentiment score: negative (-1) to positive (+1)
- Impact scoring: high/medium/low

**Testing:**
- Pull news for Tesla → verify related articles appear
- Sentiment scoring accuracy test (manual validation)
- News endpoint returns last 24 hours for a stock

---

### 🟣 **WEEK 4: Signal Engine Core**

**Goal:** Bullish/Bearish signals computed in real-time

**Tasks:**
- [ ] Implement signal scoring algorithm
- [ ] Volume spike detection
- [ ] Price momentum calculation
- [ ] News sentiment weighting
- [ ] Sector movement tracking
- [ ] Generate signal scores (0-100)
- [ ] Signal storage in database

**Signal Engine Formula:**
```
Final Score = 
  (Price Momentum × 0.30) +
  (Volume Strength × 0.20) +
  (News Sentiment × 0.25) +
  (Sector Trend × 0.15) +
  (Volatility Stability × 0.10)
```

**Output:** Direction (Bullish/Neutral/Bearish) + Confidence

**Testing:**
- Known bullish stocks get 70+ score
- Known bearish stocks get <40 score
- Volume spikes detected correctly

---

### 🔴 **WEEK 5: AI Intelligence Layer**

**Goal:** "Why did this stock move?" explained by AI

**Tasks:**
- [ ] Set up OpenAI API integration
- [ ] Implement AI prompt system
- [ ] Build stock explanation engine
- [ ] Create market brief generator
- [ ] Implement caching for AI responses (avoid redundant calls)
- [ ] Build AI insight storage

**Features:**
1. **Stock Explanation:**
   - Input: price, volume, news, signals
   - Output: 2-line summary + 3 reasons + sentiment + confidence

2. **Market Brief:**
   - Input: indices, top movers, macro data
   - Output: 5-7 bullet points with key drivers

3. **Caching Strategy:**
   - Same stock = cache for 2 hours
   - Reduces API costs significantly

**Testing:**
- Generate explanation for known stocks
- Verify market brief quality
- Monitor API costs

---

### ⚫ **WEEK 6: Real-Time & Polish**

**Goal:** Production-ready MVP

**Tasks:**
- [ ] WebSocket service for real-time updates
- [ ] Watchlist system
- [ ] Price alerts (user-configurable)
- [ ] User authentication (basic JWT)
- [ ] Frontend integration with all services
- [ ] Performance optimization
- [ ] Error handling & logging
- [ ] Beta launch preparation

**Real-Time Features:**
- Price updates push to connected clients
- Signal score updates stream live
- News alerts instant notify

**Frontend Completion:**
- Dashboard with market brief
- Stock search & detail page
- Markets page with stock table
- Watchlist management
- Basic alerts setup

**Testing:**
- Load test with 100 concurrent users
- Verify no data loss on disconnects
- Check alert triggers correctly
- UI responsive on mobile

---

## 🏗️ Architecture Overview

```
Market Data APIs
     ↓
┌────────────────────────────┐
│ Market Service (Node)      │
│ - Collect                  │
│ - Normalize                │
└────────┬───────────────────┘
         ↓
┌────────────────────────────┐
│ PostgreSQL + TimescaleDB   │
│ - Store historical data    │
│ - Time-series optimized    │
└────────┬───────────────────┘
         ↓
┌────────────────────────────┐
│ Signal Engine (Python)     │
│ - Score calculation        │
│ - Pattern detection        │
└────────┬───────────────────┘
         ↓
┌────────────────────────────┐
│ AI Engine (Python + OpenAI)│
│ - Generate explanations    │
│ - Create market briefs     │
└────────┬───────────────────┘
         ↓
┌────────────────────────────┐
│ API Gateway (Node)         │
│ - Central entry point      │
│ - Rate limiting            │
└────────┬───────────────────┘
    ↙    ↓    ↘
WebSocket  DB   Cache
(Real-time) (PostgreSQL) (Redis)
    ↓
┌────────────────────────────┐
│ Frontend (React/Next.js)   │
│ - Dashboard                │
│ - Market views             │
│ - Stock details            │
└────────────────────────────┘
```

---

## 📊 Database Schema Summary

**Core Tables:**
- `instruments` - Stock definitions (AAPL, TCS, etc.)
- `price_data` - Time-series prices (time-optimized)
- `news` - News articles
- `news_instruments` - Link news → stocks
- `signals` - Computed trading signals
- `ai_insights` - AI-generated explanations
- `users` - User accounts & subscriptions
- `watchlists` - User-saved stocks
- `portfolios` - User holdings
- `alerts` - Price/volume alerts

---

## 🚀 Development Commands

```bash
# Install all dependencies
npm install

# Start all services in development
npm run dev

# Build everything
npm run build

# Run database migrations
npm run db:migrate

# Seed initial data
npm run db:seed

# Run with Docker Compose
docker-compose up -d
```

---

## 💰 Cost Estimation (First 3 Months)

**Fixed Monthly Costs:**
| Item | Cost |
|------|------|
| Finnhub API | $0-50 |
| Polygon API | $0-50 |
| OpenAI API (1K users × 5 calls) | $50-200 |
| Database (AWS RDS) | $30-50 |
| Redis Cloud | $15-30 |
| Hosting (Render/Railway) | $50-200 |
| **Total** | **$145-580** |

**Cost-Saving Tips:**
- Use Finnhub free tier initially
- Cache AI responses aggressively
- Batch API calls
- Implement rate limiting

---

## 📈 Success Metrics (MVP)

**Week 6 Targets:**
- [ ] 100+ stocks with live data
- [ ] 50 daily active users (beta)
- [ ] <500ms response time for stock page
- [ ] 95%+ signal accuracy (manual validation)
- [ ] AI explanations rated 4/5 quality
- [ ] Zero data loss on service restarts

---

## 🎯 Post-MVP Features (Weeks 7+)

**Phase 2 (Weeks 7-8):**
- Portfolio intelligence system
- Risk analysis engine
- Sector rotation insights
- Advanced screener
- Mobile app (React Native)

**Phase 3 (Month 3+):**
- Institutional data feeds
- Historical signal analysis
- API access for power users
- Enterprise plans

---

## 🛠️ Tech Stack Reference

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Next.js 14 + Tailwind |
| API Gateway | Node.js + Express |
| Market Service | Node.js + Axios + PostgreSQL |
| Signal Engine | Python + Pandas + NumPy |
| AI Engine | Python + OpenAI GPT-4 |
| Real-time | WebSocket + Socket.io + Redis |
| Database | PostgreSQL + TimescaleDB |
| Cache | Redis |
| Auth | JWT + bcryptjs |
| Deployment | Docker + Docker Compose |

---

## ⚠️ Critical Paths (Don't Skip)

1. **Database schema correctness** - Get this wrong, rebuild everything
2. **Signal algorithm accuracy** - Core differentiator from competitors
3. **API cost optimization** - Can spiral if unmanaged
4. **Real-time architecture** - WebSocket reliability crucial
5. **AI prompt quality** - Core product quality

---

## 🔄 Daily Standup Template

**Each day report:**
- [ ] What was completed?
- [ ] What's blocking progress?
- [ ] What's next?
- [ ] Any API/database issues?

---

## 📞 Support Resources

**Free APIs (Start here):**
- Finnhub: finnhub.io/register
- NewsAPI: newsapi.org
- OpenAI: platform.openai.com

**Documentation:**
- Finnhub Docs: finnhub.io/docs
- PostgreSQL: postgresql.org/docs
- Socket.io: socket.io/docs
- Next.js: nextjs.org/docs

---

## ✅ Go-Live Checklist (Week 6)

- [ ] All migrations run successfully
- [ ] 100+ stocks with live prices
- [ ] Signals computing correctly
- [ ] AI explanations generating
- [ ] WebSocket real-time working
- [ ] User auth system tested
- [ ] Frontend all pages functional
- [ ] Error handling in place
- [ ] Logging configured
- [ ] Performance benchmarked
- [ ] Security review done
- [ ] Beta users invited

---

**Remember:** This is a **decision intelligence system**, not another data portal.  
Focus on: **clarity > quantity**, **insights > data**, **actionable > complex**.

🚀 **Ready to build?** Start with Week 1 - get the foundation rock solid!
