type Tone = 'neutral' | 'good' | 'warn' | 'bad' | 'info';

type Props = {
  label: string;
  tone?: Tone;
};

const toneStyles: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  good: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  warn: 'bg-amber-100 text-amber-800 border-amber-200',
  bad: 'bg-rose-100 text-rose-800 border-rose-200',
  info: 'bg-sky-100 text-sky-800 border-sky-200',
};

export default function StatusBadge({ label, tone = 'neutral' }: Props) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${toneStyles[tone]}`}>
      {label}
    </span>
  );
}
