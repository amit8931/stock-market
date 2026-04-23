type Tone = 'neutral' | 'good' | 'warn' | 'bad' | 'info';

type Props = {
  value: number;
  tone?: Tone;
  label?: string;
  className?: string;
};

const toneStyles: Record<Tone, string> = {
  neutral: 'bg-slate-900',
  good: 'bg-emerald-500',
  warn: 'bg-amber-500',
  bad: 'bg-rose-500',
  info: 'bg-sky-500',
};

export default function ProgressBar({ value, tone = 'neutral', label, className = '' }: Props) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={className}>
      {label ? (
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${toneStyles[tone]}`} style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
