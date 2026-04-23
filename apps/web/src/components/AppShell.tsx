import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import StatusBadge from '@/components/StatusBadge';
import { clearSession, getSession, Session } from '@/lib/auth';

export type NavItem = {
  href: string;
  label: string;
};

type Props = {
  kind: 'user' | 'admin';
  title: string;
  subtitle?: string;
  nav: NavItem[];
  children: ReactNode;
  headerContent?: ReactNode;
  railContent?: ReactNode;
};

const panelStyles = {
  user: {
    surface: 'from-sky-600 via-cyan-500 to-emerald-400',
    badgeTone: 'info' as const,
    label: 'Decision workspace',
  },
  admin: {
    surface: 'from-slate-900 via-indigo-700 to-fuchsia-600',
    badgeTone: 'warn' as const,
    label: 'Operations cockpit',
  },
};

export default function AppShell({
  kind,
  title,
  subtitle,
  nav,
  children,
  headerContent,
  railContent,
}: Props) {
  const router = useRouter();
  const [session, setSessionState] = useState<Session | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setSessionState(getSession());
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const activeHref = useMemo(() => router.asPath.split('?')[0], [router.asPath]);

  const handleLogout = async () => {
    clearSession();
    await router.push('/');
  };

  const styles = panelStyles[kind];
  const lastUpdated = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(now);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_38%),linear-gradient(180deg,_#f8fafc,_#eef2ff_55%,_#f8fafc)]">
      <header className="border-b border-white/50 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-slate-950">
              Pivot Stocks
            </Link>
            <StatusBadge label={styles.label} tone={styles.badgeTone} />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-500">
              Live snapshot at {lastUpdated}
            </span>
            {session?.email ? (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-700">
                {session.email}
              </span>
            ) : (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-500">
                Not signed in
              </span>
            )}
            <button
              onClick={handleLogout}
              className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className={`overflow-hidden rounded-[2rem] bg-gradient-to-r ${styles.surface} p-[1px] shadow-xl shadow-slate-300/30`}>
          <div className="rounded-[calc(2rem-1px)] bg-slate-950/80 px-6 py-7 text-white backdrop-blur-sm">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-3xl">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  {kind === 'admin' ? 'Admin panel' : 'User panel'}
                </div>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
                {subtitle ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">{subtitle}</p> : null}
              </div>

              <div className="min-w-[220px] rounded-3xl border border-white/15 bg-white/10 p-4 text-sm text-white/85">
                <div className="font-semibold">Current role</div>
                <div className="mt-2 flex items-center justify-between">
                  <span>{kind === 'admin' ? 'Administrator' : 'Investor'}</span>
                  <span className="text-white/70">
                    {session?.issuedAt
                      ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(session.issuedAt))
                      : 'Demo'}
                  </span>
                </div>
                <div className="mt-3 text-xs text-white/65">
                  Keep the interface focused on clarity first, noise second.
                </div>
              </div>
            </div>

            {headerContent ? <div className="mt-6">{headerContent}</div> : null}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-3">
            <nav className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-3 shadow-sm shadow-slate-200/60">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Navigation
              </div>
              <div className="flex flex-col gap-1.5">
                {nav.map((item) => {
                  const active = activeHref === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-2xl px-4 py-3 text-sm transition ${
                        active ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/20' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-4 shadow-sm shadow-slate-200/60">
              <div className="text-sm font-semibold text-slate-900">Quick links</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <Link className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200" href="/markets">
                  Markets
                </Link>
                <Link className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200" href="/screener">
                  Screener
                </Link>
                <Link className="rounded-2xl bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200" href="/portfolio">
                  Public portfolio view
                </Link>
              </div>
            </div>

            {railContent ? railContent : null}
          </aside>

          <main className="space-y-6 lg:col-span-9">{children}</main>
        </div>
      </div>
    </div>
  );
}
