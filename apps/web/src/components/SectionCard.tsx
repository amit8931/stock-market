import { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function SectionCard({ title, description, action, children, className = '' }: Props) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-sm shadow-slate-200/60 ${className}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
