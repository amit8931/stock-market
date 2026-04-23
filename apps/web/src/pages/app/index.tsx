import Head from 'next/head';
import { useEffect, useState } from 'react';
import AppShell from '@/components/AppShell';
import ProgressBar from '@/components/ProgressBar';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import Sparkline from '@/components/Sparkline';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { healthCheck } from '@/lib/api';
import {
  USER_PANEL_NAV,
  alertItems,
  average,
  formatCompact,
  formatCurrency,
  formatPercent,
  getPortfolioDayPnl,
  getPortfolioValue,
  marketBrief,
  marketMovers,
  scoreTone,
  signalTone,
  watchlistItems,
} from '@/lib/panel-data';

const filters = ['All', 'Bullish', 'Bearish'] as const;

export default function UserDashboard() {
  const [apiStatus, setApiStatus] = useState<'unknown' | 'ok' | 'down'>('unknown');
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');

  useEffect(() => {
    (async () => {
      try {
        await healthCheck();
        setApiStatus('ok');
      } catch {
        setApiStatus('down');
      }
    })();
  }, []);

  const movers =
    filter === 'All' ? marketMovers : marketMovers.filter((item) => item.status === filter);
  const activeAlerts = alertItems.filter((item) => item.status === 'Active').length;
  const averageScore = Math.round(average(watchlistItems, (item) => item.signalScore));
  const portfolioValue = getPortfolioValue();
  const portfolioDayPnl = getPortfolioDayPnl();

  return (
    <RequireAuth roles={['user', 'admin']}>
      <>
        <Head>
          <title>User Dashboard - Pivot Stocks</title>
        </Head>

        <AppShell
          kind="user"
          title="Investor Dashboard"
          subtitle="A cleaner command center for what matters now: conviction, catalyst strength, and risk that needs attention."
          nav={[...USER_PANEL_NAV]}
          headerContent={
            <div className="flex flex-wrap gap-2">
              <StatusBadge
                label={apiStatus === 'ok' ? 'Gateway online' : apiStatus === 'down' ? 'Gateway offline' : 'Checking gateway'}
                tone={apiStatus === 'ok' ? 'good' : apiStatus === 'down' ? 'bad' : 'warn'}
              />
              <StatusBadge label={`${activeAlerts} live alerts`} tone="warn" />
              <StatusBadge label={`${averageScore}/100 average watch score`} tone="info" />
            </div>
          }
          railContent={
            <div className="space-y-4">
              <SectionCard title="Focus list" description="What deserves attention before the next refresh.">
                <div className="space-y-4">
                  {watchlistItems.slice(0, 3).map((item) => (
                    <div key={item.symbol} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{item.symbol}</div>
                          <div className="text-sm text-slate-500">{item.thesis}</div>
                        </div>
                        <StatusBadge label={item.status} tone={signalTone(item.status)} />
                      </div>
                      <ProgressBar className="mt-4" value={item.signalScore} tone={scoreTone(item.signalScore)} />
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Portfolio value"
              value={formatCurrency(portfolioValue)}
              delta={formatPercent((portfolioDayPnl / portfolioValue) * 100)}
              helper="Marked to latest panel snapshot"
              tone="neutral"
            />
            <StatCard
              label="Day P and L"
              value={formatCurrency(portfolioDayPnl)}
              helper="Strongest lift is coming from semis"
              tone={portfolioDayPnl >= 0 ? 'good' : 'bad'}
            />
            <StatCard
              label="Watchlist average"
              value={`${averageScore}/100`}
              helper="Healthy enough to stay selective"
              tone={scoreTone(averageScore) === 'info' ? 'good' : scoreTone(averageScore)}
            />
            <StatCard
              label="Open alerts"
              value={String(activeAlerts)}
              helper="Two need immediate review"
              tone={activeAlerts >= 3 ? 'warn' : 'neutral'}
            />
          </div>

          <SectionCard title="AI market brief" description={marketBrief.summary}>
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/60">Market stance</div>
                    <div className="mt-2 text-2xl font-semibold">{marketBrief.sentiment}</div>
                  </div>
                  <StatusBadge label="Human-readable, signal-backed" tone="info" />
                </div>
                <div className="mt-5 grid gap-3">
                  {marketBrief.drivers.map((driver) => (
                    <div key={driver} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                      {driver}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-semibold text-slate-900">Risk to watch</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{marketBrief.riskNote}</p>
                <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Decision rule</div>
                  <div className="mt-2 text-sm text-slate-700">
                    Stay aggressive only in names where score, price action, and catalyst quality are aligned.
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="What moved today"
            description="Filter the biggest movers by directional bias instead of scanning a noisy feed."
            action={
              <div className="flex flex-wrap gap-2">
                {filters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                      filter === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          >
            <div className="grid gap-4 xl:grid-cols-2">
              {movers.map((item) => (
                <div key={item.symbol} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold text-slate-950">{item.symbol}</div>
                        <StatusBadge label={item.status} tone={signalTone(item.status)} />
                      </div>
                      <div className="text-sm text-slate-500">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-semibold ${item.changePct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {formatPercent(item.changePct)}
                      </div>
                      <div className="text-sm text-slate-500">{formatCurrency(item.price)}</div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{item.reason}</p>

                  <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Catalyst</div>
                        <div className="mt-1 text-sm font-medium text-slate-900">{item.catalyst}</div>
                      </div>
                      <div className="w-28">
                        <Sparkline
                          values={item.sparkline}
                          className="h-10 w-full"
                          stroke={item.changePct >= 0 ? '#059669' : '#e11d48'}
                          fill={item.changePct >= 0 ? 'rgba(5, 150, 105, 0.12)' : 'rgba(225, 29, 72, 0.12)'}
                        />
                      </div>
                    </div>
                    <ProgressBar className="mt-4" value={item.signalScore} tone={scoreTone(item.signalScore)} label="Signal strength" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionCard title="Watchlist pulse" description="Your fastest read on names that still deserve screen time.">
              <div className="space-y-4">
                {watchlistItems.slice(0, 4).map((item) => (
                  <div key={item.symbol} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-950">{item.symbol}</div>
                          <StatusBadge label={`${item.alertCount} alerts`} tone={item.alertCount > 1 ? 'warn' : 'info'} />
                        </div>
                        <div className="text-sm text-slate-500">{item.thesis}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${item.changePct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatPercent(item.changePct)}
                        </div>
                        <div className="text-sm text-slate-500">{formatCurrency(item.price)}</div>
                      </div>
                    </div>
                    <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_120px]">
                      <ProgressBar value={item.signalScore} tone={scoreTone(item.signalScore)} label="Composite score" />
                      <Sparkline
                        values={item.sparkline}
                        className="h-10 w-full"
                        stroke={item.changePct >= 0 ? '#0284c7' : '#e11d48'}
                        fill={item.changePct >= 0 ? 'rgba(2, 132, 199, 0.1)' : 'rgba(225, 29, 72, 0.1)'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Signal mix" description="A quick dashboard-level balance of risk and opportunity.">
              <div className="space-y-4">
                {[
                  { label: 'Bullish setups', value: 63, tone: 'good' as const },
                  { label: 'Neutral watch names', value: 22, tone: 'info' as const },
                  { label: 'Bearish risk bucket', value: 15, tone: 'bad' as const },
                ].map((item) => (
                  <ProgressBar key={item.label} value={item.value} tone={item.tone} label={item.label} />
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">Why this matters</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The panel is strongest when you can quickly separate ideas worth adding from names that only look busy.
                </p>
                <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                  {formatCompact(watchlistItems.length)} names under active review
                </div>
              </div>
            </SectionCard>
          </div>
        </AppShell>
      </>
    </RequireAuth>
  );
}
