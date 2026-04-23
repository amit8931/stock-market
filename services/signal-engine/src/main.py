#!/usr/bin/env python3
"""
Signal Engine - Computes bullish/bearish signals from market data
"""

import json
import logging
from typing import Dict, List, Any
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SignalEngine:
    """
    Computes trading signals based on:
    - Price momentum (30%)
    - Volume strength (20%)
    - News sentiment (25%)
    - Sector trend (15%)
    - Volatility stability (10%)
    """

    def __init__(self):
        self.weights = {
            'price_momentum': 0.30,
            'volume_strength': 0.20,
            'news_sentiment': 0.25,
            'sector_trend': 0.15,
            'volatility_stability': 0.10,
        }

    def compute_score(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Compute final signal score (0-100)
        """
        try:
            price_momentum = self._calculate_price_momentum(data)
            volume_strength = self._calculate_volume_strength(data)
            news_sentiment = data.get('news_sentiment', 0.5)
            sector_trend = data.get('sector_trend', 0.5)
            volatility = self._calculate_volatility_stability(data)

            score = (
                (price_momentum * self.weights['price_momentum']) +
                (volume_strength * self.weights['volume_strength']) +
                (news_sentiment * self.weights['news_sentiment']) +
                (sector_trend * self.weights['sector_trend']) +
                (volatility * self.weights['volatility_stability'])
            ) * 100

            # Determine direction
            if score >= 60:
                direction = 'bullish'
                label = 'Strong Bullish' if score >= 80 else 'Bullish'
            elif score <= 40:
                direction = 'bearish'
                label = 'Strong Bearish' if score <= 20 else 'Bearish'
            else:
                direction = 'neutral'
                label = 'Neutral'

            return {
                'symbol': data.get('symbol'),
                'score': round(score, 2),
                'label': label,
                'direction': direction,
                'drivers': self._identify_drivers(data),
                'timestamp': datetime.now().isoformat(),
            }
        except Exception as e:
            logger.error(f"Error computing score: {e}")
            raise

    def _calculate_price_momentum(self, data: Dict[str, Any]) -> float:
        """Calculate price momentum (0-1)"""
        change_percent = data.get('change_percent', 0)
        # Normalize to 0-1 range
        momentum = (change_percent + 10) / 20  # -10% = 0, +10% = 1
        return max(0, min(1, momentum))

    def _calculate_volume_strength(self, data: Dict[str, Any]) -> float:
        """Calculate volume anomaly (0-1)"""
        volume_ratio = data.get('volume_ratio', 1.0)
        # volume_ratio > 1.5 = strong, < 0.5 = weak
        if volume_ratio > 2.0:
            return 1.0
        elif volume_ratio > 1.5:
            return 0.8
        elif volume_ratio < 0.5:
            return 0.2
        else:
            return 0.5

    def _calculate_volatility_stability(self, data: Dict[str, Any]) -> float:
        """Calculate volatility stability (0-1)"""
        volatility = data.get('volatility', 0)
        # Lower volatility = more stable
        if volatility < 0.02:
            return 0.8
        elif volatility > 0.05:
            return 0.3
        else:
            return 0.5

    def _identify_drivers(self, data: Dict[str, Any]) -> List[str]:
        """Identify key signal drivers"""
        drivers = []
        
        if data.get('volume_ratio', 1.0) > 1.5:
            drivers.append('volume_spike')
        
        if data.get('change_percent', 0) > 2:
            drivers.append('bullish_momentum')
        elif data.get('change_percent', 0) < -2:
            drivers.append('bearish_momentum')
        
        if data.get('news_sentiment', 0.5) > 0.7:
            drivers.append('positive_news_sentiment')
        elif data.get('news_sentiment', 0.5) < 0.3:
            drivers.append('negative_news_sentiment')
        
        return drivers


def main():
    logger.info("🚀 Signal Engine starting...")
    engine = SignalEngine()
    
    # Example usage
    sample_data = {
        'symbol': 'NVDA',
        'change_percent': 5.2,
        'volume_ratio': 2.1,
        'news_sentiment': 0.8,
        'sector_trend': 0.7,
        'volatility': 0.02,
    }
    
    result = engine.compute_score(sample_data)
    logger.info(f"Signal computed: {json.dumps(result, indent=2)}")


if __name__ == '__main__':
    main()
