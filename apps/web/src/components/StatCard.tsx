type Props = {
  label: string;
  value: string;
  tone?: 'neutral' | 'good' | 'warn' | 'bad' | 'info';
  helper?: string;
  delta?: string;
  footnote?: string;
};

const toneStyles: Record<NonNullable<Props['tone']>, string> = {
  neutral: 'bg-slate-50 border-slate-200 text-slate-900',
  good: 'bg-emerald-50 border-emerald-200 text-emerald-950',
  warn: 'bg-amber-50 border-amber-200 text-amber-950',
  bad: 'bg-rose-50 border-rose-200 text-rose-950',
  info: 'bg-sky-50 border-sky-200 text-sky-950',
};

export default function StatCard({ label, value, tone = 'neutral', helper, delta, footnote }: Props) {
  return (
    <div className={`rounded-3xl border p-4 shadow-sm shadow-slate-200/60 ${toneStyles[tone]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{label}</div>
        {delta ? <div className="text-xs font-semibold opacity-70">{delta}</div> : null}
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      {helper ? <div className="mt-2 text-sm opacity-80">{helper}</div> : null}
      {footnote ? <div className="mt-3 text-xs opacity-70">{footnote}</div> : null}
    </div>
  );
}
