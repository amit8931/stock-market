import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import ProgressBar from '@/components/ProgressBar';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import Sparkline from '@/components/Sparkline';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import {
  USER_PANEL_NAV,
  average,
  formatCurrency,
  formatPercent,
  scoreTone,
  signalTone,
  watchlistItems,
} from '@/lib/panel-data';

const statusFilters = ['All', 'Bullish', 'Neutral', 'Bearish'] as const;
const regionFilters = ['All', 'US', 'India'] as const;

export default function WatchlistPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('All');
  const [region, setRegion] = useState<(typeof regionFilters)[number]>('All');

  const filteredItems = watchlistItems.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === 'All' || item.status === status;
    const matchesRegion = region === 'All' || item.region === region;

    return matchesQuery && matchesStatus && matchesRegion;
  });

  const avgScore = Math.round(average(filteredItems, (item) => item.signalScore));
  const alertCoverage = filteredItems.reduce((sum, item) => sum + item.alertCount, 0);

  return (
    <RequireAuth roles={['user', 'admin']}>
      <>
        <Head>
          <title>Watchlist - Pivot Stocks</title>
        </Head>

        <AppShell
          kind="user"
          title="Watchlist"
          subtitle="Search, filter, and rank the names you care about without losing the thesis behind each one."
          nav={[...USER_PANEL_NAV]}
          headerContent={
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={`${filteredItems.length} names visible`} tone="info" />
              <StatusBadge label={`${alertCoverage} linked alerts`} tone="warn" />
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Visible names" value={String(filteredItems.length)} helper="After current filters" />
            <StatCard
              label="Average score"
              value={filteredItems.length ? `${avgScore}/100` : '0/100'}
              helper="Composite conviction across visible rows"
              tone={filteredItems.length ? scoreTone(avgScore) : 'neutral'}
            />
            <StatCard label="Alert coverage" value={String(alertCoverage)} helper="Active alert links across visible names" tone="warn" />
          </div>

          <SectionCard title="Filter rail" description="Shape the watchlist by conviction, region, or a quick symbol lookup.">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search symbol or company"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                />
              </label>

              <div>
                <div className="text-sm font-medium text-slate-700">Status</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {statusFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStatus(item)}
                      className={`rounded-full px-3 py-2 text-sm ${
                        status === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-700">Region</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {regionFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setRegion(item)}
                      className={`rounded-full px-3 py-2 text-sm ${
                        region === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <SectionCard title="Dynamic watchlist" description="The table updates instantly as you filter.">
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div key={item.symbol} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-950">{item.symbol}</div>
                          <StatusBadge label={item.status} tone={signalTone(item.status)} />
                          <StatusBadge label={item.region} tone="neutral" />
                        </div>
                        <div className="text-sm text-slate-500">{item.name}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${item.changePct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {formatPercent(item.changePct)}
                        </div>
                        <div className="text-sm text-slate-500">{formatCurrency(item.price)}</div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_140px]">
                      <div>
                        <p className="text-sm leading-6 text-slate-600">{item.thesis}</p>
                        <ProgressBar className="mt-4" value={item.signalScore} tone={scoreTone(item.signalScore)} label="Signal score" />
                      </div>
                      <Sparkline
                        values={item.sparkline}
                        className="h-12 w-full self-end"
                        stroke={item.changePct >= 0 ? '#0891b2' : '#e11d48'}
                        fill={item.changePct >= 0 ? 'rgba(8,145,178,0.12)' : 'rgba(225,29,72,0.12)'}
                      />
                    </div>

                    <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                      {item.alertCount} linked alerts
                    </div>
                  </div>
                ))}

                {filteredItems.length === 0 ? (
                  <div className="rounded-[1.75rem] border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                    No names matched the current filters.
                  </div>
                ) : null}
              </div>
            </SectionCard>

            <SectionCard title="Priority queue" description="Names with the strongest case for immediate follow-up.">
              <div className="space-y-4">
                {[...filteredItems]
                  .sort((left, right) => right.signalScore - left.signalScore)
                  .slice(0, 3)
                  .map((item) => (
                    <div key={item.symbol} className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-slate-900">{item.symbol}</div>
                        <StatusBadge label={`${item.signalScore}/100`} tone={scoreTone(item.signalScore)} />
                      </div>
                      <div className="mt-2 text-sm text-slate-600">{item.thesis}</div>
                      <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                        {item.alertCount} active signals connected
                      </div>
                    </div>
                  ))}
              </div>
            </SectionCard>
          </div>
        </AppShell>
      </>
    </RequireAuth>
  );
}
