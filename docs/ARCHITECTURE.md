# Stock Intelligence Platform - Architecture Guide

## 🏛️ System Architecture

### Microservices Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  Dashboard | Markets | Screener | Portfolio | Insights     │
└────────────────────────┬────────────────────────────────────┘
                         │
                  HTTP + WebSocket
                         │
        ┌────────────────┴────────────────┐
        │                                 │
┌───────▼──────────────┐        ┌────────▼────────────┐
│  API Gateway         │        │  WebSocket Service  │
│  (Port 3000)         │        │  (Port 3004)        │
│  - Route requests    │        │  - Real-time updates│
│  - Rate limiting     │        │  - Price streams    │
│  - Authentication    │        │  - Signal alerts    │
└────────┬─────────────┘        └─────────┬──────────┘
         │                               │
         └──────────────┬────────────────┘
                        │
    ┌───────────────────┼───────────────────┐
    │                   │                   │
    ▼                   ▼                   ▼
┌─────────────┐  ┌──────────────┐  ┌──────────────┐
│   Market    │  │   User       │  │ External APIs│
│   Service   │  │   Service    │  │              │
│ (Port 3001) │  │ (Port 3005)  │  │ - Finnhub   │
│             │  │              │  │ - NewsAPI   │
│ - Ingest    │  │ - Auth       │  │ - OpenAI    │
│ - Normalize │  │ - Accounts   │  │             │
│ - Cache     │  │ - Subs       │  │             │
└──────┬──────┘  └──────┬───────┘  └──────┬───────┘
       │                │                  │
       └────────────┬───┴──────────────────┘
                    │
        ┌───────────┼────────────┐
        │           │            │
        ▼           ▼            ▼
   ┌─────────┐  ┌─────────┐  ┌─────────┐
   │  Signal │  │   AI    │  │ Cache   │
   │ Engine  │  │ Engine  │  │ (Redis) │
   │(Python) │  │(Python) │  │         │
   │         │  │         │  │ -users  │
   │ Port    │  │Port     │  │ -prices │
   │ 3002    │  │3003     │  │ -signals│
   └────┬────┘  └────┬────┘  └────┬────┘
        │            │            │
        └────────────┼────────────┘
                     │
          ┌──────────▼──────────┐
          │   PostgreSQL        │
          │   TimescaleDB       │
          │   (Port 5432)       │
          │                     │
          │ - instruments       │
          │ - price_data        │
          │ - news              │
          │ - signals           │
          │ - ai_insights       │
          │ - users             │
          │ - portfolios        │
          │ - watchlists        │
          │ - alerts            │
          └─────────────────────┘
```

---

## 🧩 Service Responsibilities

### 1. **API Gateway** (Node.js/Express)
**Port:** 3000  
**Responsibility:** Single entry point for all client requests

**Routes:**
```
GET  /api/stocks/:symbol        → fetch stock data
GET  /api/search?q=...          → global search
GET  /api/signals/:symbol       → get signals for stock
GET  /api/insights/:symbol      → get AI explanation
GET  /api/market/brief          → daily market summary
GET  /api/markets               → market overview
GET  /api/watchlist             → user watchlist
POST /auth/login                → user authentication
```

**Responsibilities:**
- Route requests to appropriate services
- Rate limiting (100 req/min per IP)
- JWT token validation
- CORS handling
- Response formatting
- Error handling & logging

---

### 2. **Market Service** (Node.js)
**Port:** 3001  
**Responsibility:** Data ingestion and normalization

**Process Flow:**
```
Finnhub API
    ↓
[Collect Data]
    ↓
[Normalize] → Convert to standard schema
    ↓
[Store in PostgreSQL]
    ↓
[Publish to Redis] → Notify subscribers
```

**Key Functions:**
```typescript
// Fetch live price
async getStockPrice(symbol: string)

// Fetch news for stock
async getStockNews(symbol: string)

// Store price history
async storePriceData(symbol, priceData)

// Start data collection loop
async startIngestionLoop()
```

**Configuration:**
```
UPDATE FREQUENCY:
- Prices: every 1 minute (during market hours)
- News: every 5 minutes
- Market overview: every 15 minutes
```

---

### 3. **Signal Engine** (Python)
**Port:** 3002  
**Responsibility:** Compute trading signals

**Algorithm:**
```python
def compute_signal(stock_data):
    # Inputs: price, volume, news sentiment, sector trend
    
    # Calculate components
    price_momentum = calculate_momentum(price_change)      # 0-1
    volume_strength = calculate_volume(volume_ratio)       # 0-1
    news_sentiment = data['news_sentiment']               # 0-1
    sector_trend = data['sector_trend']                   # 0-1
    volatility = calculate_volatility(volatility_data)    # 0-1
    
    # Weighted sum
    score = (
        price_momentum * 0.30 +
        volume_strength * 0.20 +
        news_sentiment * 0.25 +
        sector_trend * 0.15 +
        volatility * 0.10
    ) * 100  # Scale to 0-100
    
    # Classify
    if score >= 70:
        return {'direction': 'bullish', 'label': 'Strong Bullish'}
    elif score >= 60:
        return {'direction': 'bullish', 'label': 'Bullish'}
    elif score > 40:
        return {'direction': 'neutral', 'label': 'Neutral'}
    else:
        return {'direction': 'bearish', 'label': 'Bearish'}
```

**Signal Detection:**
- Volume spike: `volume_ratio > 1.5`
- Price momentum: `abs(change_percent) > 2%`
- News sentiment: Positive/Negative/Neutral
- Sector influence: Moving average trend

---

### 4. **AI Engine** (Python + OpenAI)
**Port:** 3003  
**Responsibility:** Generate intelligent insights

**Features:**

1. **Stock Explanation**
   - Input: Signal data + news + prices
   - Output: Why stock moved (2-line summary + 3 reasons + confidence)
   - Prompt-based LLM call

2. **Market Brief**
   - Input: Indices + top movers + news
   - Output: 5-7 bullet point daily summary
   - Generated once daily (caching)

3. **Risk Analysis**
   - Input: Volatility + news sentiment + sector performance
   - Output: Top 3 risks + severity rating

**Caching Strategy:**
```python
cache_key = f"insight_{symbol}_{date}"
# Cache for 2 hours to reduce API costs
TTL = 2 * 60 * 60  # seconds
```

**Cost Optimization:**
- Use gpt-4-mini (cheaper than gpt-4)
- Batch similar requests
- Aggressive caching
- Fallback to cached response if API fails

---

### 5. **WebSocket Service** (Node.js + Socket.io)
**Port:** 3004  
**Responsibility:** Real-time updates

**Event Types:**
```
price_update:
  {symbol, price, change%, timestamp}

signal_update:
  {symbol, score, direction, drivers}

news_alert:
  {symbol, headline, impact, sentiment}

market_brief:
  {summary, drivers, risks, sentiment}
```

**Connection Flow:**
```
Client Connects
    ↓
[Subscribe to channels]
    example: socket.emit('subscribe_price', {symbol: 'AAPL'})
    ↓
[Receive live updates]
    example: socket.on('price_update', callback)
```

**Broadcasting:**
```javascript
// Publish from any service
redis.publish('price_updates', JSON.stringify(data))

// WebSocket receives and broadcasts
subscriber.on('message', (channel, message) => {
  io.to(channel).emit('update', message)
})
```

---

### 6. **User Service** (Node.js + PostgreSQL)
**Port:** 3005  
**Responsibility:** User management & authentication

**Endpoints:**
```
POST   /auth/register          → Create account
POST   /auth/login             → Login (returns JWT)
GET    /users/:userId          → Get profile
PUT    /users/:userId          → Update profile
PUT    /users/:userId/subscription → Upgrade plan
GET    /users/:userId/watchlist    → Get watchlist
POST   /users/:userId/watchlist    → Add to watchlist
DELETE /users/:userId/watchlist/:stockId → Remove
```

**JWT Implementation:**
```javascript
const token = jwt.sign(
  {userId, email, plan},
  JWT_SECRET,
  {expiresIn: '7d'}
)

// All API calls must include header:
// Authorization: Bearer <token>
```

**Subscription Plans:**
- `free`: Basic data + charts
- `pro`: AI insights + signals + alerts
- `premium`: Portfolio analysis + advanced features
- `enterprise`: API access + dedicated support

---

## 📊 Data Flow Example: Stock Movement Explanation

**User requests:** "Why did Tesla move today?"

```
1. Frontend Request
   GET /api/insights/TSLA
   ↓

2. API Gateway
   ✓ Validate JWT token
   ✓ Check rate limit
   ✓ Route to Market Service
   ↓

3. Market Service
   ✓ Fetch latest price data
   ✓ Fetch recent news
   ✓ Get sector data
   ↓

4. Signal Engine
   ✓ Calculate signal score
   ✓ Identify drivers
   ↓

5. AI Engine
   ✓ Call OpenAI with structured data
   ✓ Generate explanation
   ✓ Cache result for 2 hours
   ↓

6. Response (500ms total)
   {
     "symbol": "TSLA",
     "summary": "Tesla dropped 2.1% due to weaker delivery guidance",
     "reasons": [
       "Delivery numbers below expectations",
       "Margin pressure concerns",
       "Sector weakness in auto stocks"
     ],
     "sentiment": "bearish",
     "confidence": 0.82
   }
```

---

## 🔄 Real-Time Data Pipeline

```
Market APIs (every 1 min)
      ↓
Market Service [Fetch]
      ↓
PostgreSQL [Store]
      ↓
Redis Pub/Sub [Broadcast]
      ↓
Signal Engine [Compute]
      ↓
Redis [Publish results]
      ↓
WebSocket Service [Receive]
      ↓
Connected Clients [Update UI]
      
Total Latency: <2 seconds
```

---

## 🔐 Security Considerations

**Authentication:**
- JWT tokens, 7-day expiry
- Passwords hashed with bcrypt
- Rate limiting: 100 req/min per IP

**API Keys:**
- Never commit .env files
- Rotate API keys monthly
- Monitor unusual usage

**Database:**
- SQL parameterized queries (prevent injection)
- Encrypt sensitive data
- Regular backups

**Frontend:**
- HTTPS only
- XSS protection
- CORS properly configured

---

## 📈 Scaling Strategy (Future)

**Phase 1 (MVP):**
- Single server deployments
- PostgreSQL primary only
- Redis cache

**Phase 2 (1,000 users):**
- Database read replicas
- CDN for static assets
- API rate limiting per plan

**Phase 3 (10,000 users):**
- Database sharding (by country)
- Kafka for event streaming
- Elasticsearch for search
- Multiple API instances (load balanced)

**Phase 4 (Enterprise):**
- Private cloud deployments
- Dedicated databases per customer
- Custom integrations

---

## 🚨 Failure Recovery

**Service goes down?**

| Service | Recovery |
|---------|----------|
| Market Service | Use 1-hour old cache data |
| Signal Engine | Fall back to simple heuristics |
| AI Engine | Show last cached explanation |
| WebSocket | Clients reconnect automatically |
| PostgreSQL | Automated failover to replica |

---

## 📊 Monitoring & Observability

**Key Metrics:**
- API response times (target: <500ms)
- Signal accuracy (manual validation)
- Database query latency
- WebSocket connection count
- API error rate (<1%)
- AI cost per request

**Logging:**
- Structured JSON logs
- Centralized logging (ELK stack)
- Error alerting

**Dashboards:**
- System health
- User activity
- API performance
- Database metrics
- Cost tracking

---

## 🔄 Deployment Flow

```
Git Commit
    ↓
GitHub Actions CI/CD
    ↓
Run tests
    ↓
Build Docker images
    ↓
Push to registry
    ↓
Deploy to production (Docker Compose)
    ↓
Run smoke tests
    ↓
Monitor for 1 hour
```

---

## 🆚 Comparison: You vs Competitors

| Feature | Yahoo Finance | TradingView | **You** |
|---------|---------------|------------|--------|
| Stock data | ✓ | ✓ | ✓ |
| Charts | ✓ | ✓ | ✓ |
| **Why stock moved** | ✗ | ✗ | ✅ |
| **AI insights** | ✗ | ✗ | ✅ |
| **Signal scores** | ✗ | ✗ | ✅ |
| News | ✓ | ✓ | ✓ (filtered) |
| Pro tools | ✗ | ✓ | ✓ |
| Real-time | Limited | ✓ | ✓ |
| Price | Free | $25-125/mo | $10-60/mo |

**Your Advantage:** Decision clarity through AI explanations
