#!/usr/bin/env python3
"""
AI Engine - LLM-powered insights and stock explanations
"""

import json
import logging
from typing import Dict, Any
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AIEngine:
    """
    Generates AI-powered insights using structured data
    """

    def __init__(self):
        self.prompts = {
            'stock_explanation': self._get_stock_explanation_prompt(),
            'market_brief': self._get_market_brief_prompt(),
            'risk_analysis': self._get_risk_analysis_prompt(),
        }

    def _get_stock_explanation_prompt(self) -> str:
        return """
You are a financial analyst. Explain why this stock moved today.

DATA:
{data}

INCLUDE:
- Price movement
- Volume changes
- News context
- Sector influence

FORMAT:
1. Summary (2 lines)
2. 3 key reasons
3. Market sentiment (bullish/bearish/neutral)
4. Confidence score (0-100)
"""

    def _get_market_brief_prompt(self) -> str:
        return """
You are a senior global financial analyst.
Summarize today's market in 5-7 concise bullet points.

INPUT DATA:
{data}

RULES:
- Do NOT exaggerate
- Focus only on meaningful drivers
- Mention macro + sectors + top movers

OUTPUT:
- Market summary
- Key drivers
- Risk factors
- Sentiment (bullish/neutral/bearish)
"""

    def _get_risk_analysis_prompt(self) -> str:
        return """
Identify risks for this stock based on:
- volatility
- news sentiment
- sector performance

DATA:
{data}

Return:
- Top 3 risks
- Risk level (Low/Medium/High)
"""

    def generate_stock_insight(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate AI insight for why a stock moved
        """
        try:
            logger.info(f"Generating insight for {data.get('symbol')}")
            
            # Mock AI response (will integrate with OpenAI)
            insight = {
                'symbol': data.get('symbol'),
                'summary': f"{data.get('symbol')} is up due to positive market sentiment and strong earnings.",
                'reasons': [
                    'Strong earnings beat by 12%',
                    'Positive analyst upgrade',
                    'Sector rally in tech stocks',
                ],
                'sentiment': 'bullish',
                'confidence': 0.82,
                'generated_at': datetime.now().isoformat(),
            }
            
            return insight
        except Exception as e:
            logger.error(f"Error generating insight: {e}")
            raise

    def generate_market_brief(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate daily market brief
        """
        try:
            logger.info("Generating market brief...")
            
            # Mock market brief
            brief = {
                'title': 'Daily Market Brief',
                'summary': 'Markets are mixed today with tech leading gains.',
                'key_drivers': [
                    'AI chip demand surge',
                    'Fed signals possible rate pause',
                    'Weak energy prices',
                ],
                'risks': [
                    'Interest rate uncertainty',
                    'Geopolitical tensions',
                ],
                'sentiment': 'neutral',
                'generated_at': datetime.now().isoformat(),
            }
            
            return brief
        except Exception as e:
            logger.error(f"Error generating market brief: {e}")
            raise


def main():
    logger.info("🚀 AI Engine starting...")
    engine = AIEngine()
    
    # Example usage
    sample_data = {
        'symbol': 'NVDA',
        'price_change': 5.2,
        'volume_change': 120,
        'news': ['AI demand surge', 'Analyst upgrade'],
        'sector': 'Technology',
    }
    
    insight = engine.generate_stock_insight(sample_data)
    logger.info(f"Insight generated: {json.dumps(insight, indent=2)}")


if __name__ == '__main__':
    main()
