"""
AI Prompt Library - Production-ready prompts for all features
"""

PROMPTS = {
    # Stock Movement Explanation
    "stock_explanation": """
You are a financial analyst for retail investors. Explain why this stock moved today in simple terms.

DATA:
{data}

INSTRUCTIONS:
- Be concise and clear
- Avoid jargon when possible
- Focus on the most important drivers
- Do NOT make predictions about future movement

FORMAT:
1. Summary (2 sentences max)
2. 3 Key Reasons:
   - Reason 1
   - Reason 2
   - Reason 3
3. Market Sentiment: Bullish/Neutral/Bearish
4. Confidence Score: (0-100)
""",

    # Daily Market Brief
    "market_brief": """
You are a senior financial analyst. Create a brief market summary for retail investors.

INPUT DATA:
{data}

RULES:
- 5-7 bullet points maximum
- Focus on meaningful market drivers
- Include macro context (Fed, rates, sectors)
- Mention top movers with context
- Identify risks to watch

FORMAT:
📊 Market Summary:
- [summary line]

🔥 Key Drivers:
- Driver 1
- Driver 2
- Driver 3

📈 Top Movers:
- Stock Name (change%) - reason

⚠️ Risks:
- Risk 1
- Risk 2

🧠 Sentiment: Bullish/Neutral/Bearish
""",

    # Signal Interpretation
    "signal_interpretation": """
Convert technical + news signals into a simple bullish/bearish assessment.

SIGNALS:
{signals}

RULES:
- Weight recent news heavily
- Consider volume confirmation
- Check sector context
- Identify anomalies

OUTPUT:
- Direction: Bullish/Bearish/Neutral
- Strength Score: (0-100)
- Top 3 Signal Drivers
- Key Risks
""",

    # Risk Analysis
    "risk_analysis": """
Identify risks for this stock based on market data.

DATA:
{data}

RULES:
- Focus on quantifiable risks
- Consider volatility, sentiment, and sector headwinds
- Do NOT make predictions
- Rate severity (High/Medium/Low)

OUTPUT:
- Risk 1: [description] - Severity: High/Medium/Low
- Risk 2: [description] - Severity: High/Medium/Low
- Risk 3: [description] - Severity: High/Medium/Low
- Overall Risk Level: High/Medium/Low
""",

    # Earnings Interpretation
    "earnings_analysis": """
Analyze earnings results and impact on stock.

EARNINGS DATA:
{data}

ANALYZE:
- Revenue vs expectations
- Profit margins
- Forward guidance
- Key business metrics
- Market sentiment shift

OUTPUT:
- Summary: (2 lines)
- Key Metrics: Beat/Meet/Miss for each metric
- Stock Impact: Likely direction and why
- Key Risks: What could change this assessment
""",

    # Watchlist Insight
    "watchlist_insight": """
Analyze user's watchlist and provide actionable insights.

WATCHLIST:
{watchlist}

MARKET DATA:
{market_data}

PROVIDE:
- Trending stocks in the list
- Underperformers to watch
- Opportunities (highest signal scores)
- Sector rotation insights

FORMAT:
- Trending: Stock (reason)
- Underperformers: Stock (reason)
- Best Opportunities: Stock (reason)
""",

    # Portfolio Intelligence
    "portfolio_analysis": """
Analyze user's portfolio for risks and opportunities.

PORTFOLIO:
{portfolio}

MARKET DATA:
{market_data}

ASSESS:
- Sector concentration
- Risk exposure
- Correlation analysis
- Opportunity areas
- Rebalancing suggestions

OUTPUT:
- Portfolio Risk Level: High/Medium/Low
- Key Risks: Sector X represents Y% - overweight
- Opportunities: Sector Y underweight - consider
- Suggested Actions: (3 max)
""",

    # Sector Rotation Insight
    "sector_rotation": """
Identify sector rotation opportunities based on market data.

SECTOR DATA:
{sector_data}

MACRO DATA:
{macro_data}

IDENTIFY:
- Strong sectors (bullish tailwinds)
- Weak sectors (bearish headwinds)
- Rotation opportunities
- Timing considerations

OUTPUT:
- Strongest Sectors: [list with reasons]
- Weakest Sectors: [list with reasons]
- Rotation Opportunity: From [sector] to [sector] - Why
- Conviction Level: High/Medium/Low
""",

    # AI Alert Reasoning
    "alert_explanation": """
Explain why an alert was triggered to the user.

ALERT DATA:
{alert_data}

RULES:
- Be clear about what triggered the alert
- Provide context (historical comparison)
- Suggest possible next steps
- Do NOT provide financial advice

FORMAT:
- Why This Alert: [explanation]
- Historical Context: [how rare/normal]
- Possible Implications: [what this could mean]
- Consider: [what to monitor next]
""",

    # AI-Powered Recommendation
    "opportunity_insight": """
Suggest investment considerations based on AI signals.

NOTE: This is NOT a buy/sell recommendation.

INSTRUMENT DATA:
{data}

SIGNAL DATA:
{signals}

PROVIDE:
- Why investors might be interested
- Key positive factors
- Key risks to monitor
- What to watch for confirmation
""",
}


def get_prompt(prompt_name: str, **kwargs) -> str:
    """Get a prompt and format with kwargs"""
    if prompt_name not in PROMPTS:
        raise ValueError(f"Unknown prompt: {prompt_name}")
    
    template = PROMPTS[prompt_name]
    return template.format(**kwargs)


def list_available_prompts():
    """List all available prompts"""
    return list(PROMPTS.keys())
