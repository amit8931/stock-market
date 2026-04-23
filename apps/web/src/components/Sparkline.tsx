type Props = {
  values: number[];
  stroke?: string;
  fill?: string;
  className?: string;
};

export default function Sparkline({
  values,
  stroke = '#0f172a',
  fill = 'rgba(15, 23, 42, 0.08)',
  className = '',
}: Props) {
  if (values.length < 2) {
    return null;
  }

  const width = 140;
  const height = 44;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  });

  const areaPoints = [`0,${height}`, ...points, `${width},${height}`].join(' ');

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="trend sparkline"
      preserveAspectRatio="none"
    >
      <polygon points={areaPoints} fill={fill} />
      <polyline
        fill="none"
        points={points.join(' ')}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}
