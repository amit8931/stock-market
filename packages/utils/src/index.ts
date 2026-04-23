export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function safeNumber(value: number | null | undefined, fallback = 0) {
  return Number.isFinite(value) ? Number(value) : fallback;
}

export function percentageChange(current: number, previous: number) {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
}

export function scoreToLabel(score: number) {
  const normalizedScore = clamp(score, 0, 100);

  if (normalizedScore >= 80) return 'strong_bullish';
  if (normalizedScore >= 60) return 'bullish';
  if (normalizedScore >= 40) return 'neutral';
  return 'bearish';
}
