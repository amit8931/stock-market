import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import ProgressBar from '@/components/ProgressBar';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import {
  ADMIN_PANEL_NAV,
  average,
  instrumentRows,
  scoreTone,
  signalTone,
} from '@/lib/panel-data';

const typeFilters = ['All', 'Equity', 'ETF', 'Index', 'Crypto'] as const;
const coverageFilters = ['All', 'Realtime', 'Delayed'] as const;

export default function InstrumentsAdminPage() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<(typeof typeFilters)[number]>('All');
  const [coverage, setCoverage] = useState<(typeof coverageFilters)[number]>('All');

  const filteredRows = instrumentRows.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = type === 'All' || item.type === type;
    const matchesCoverage = coverage === 'All' || item.coverage === coverage;

    return matchesQuery && matchesType && matchesCoverage;
  });

  const avgQuality = Math.round(average(filteredRows, (item) => item.qualityScore));
  const pausedCount = filteredRows.filter((item) => item.status === 'Paused').length;

  return (
    <RequireAuth roles={['admin']}>
      <>
        <Head>
          <title>Admin - Instruments</title>
        </Head>

        <AppShell
          kind="admin"
          title="Instrument Universe"
          subtitle="Search, filter, and inspect coverage quality before an asset makes it into user-facing workflows."
          nav={[...ADMIN_PANEL_NAV]}
          headerContent={
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={`${filteredRows.length} rows visible`} tone="info" />
              <StatusBadge label={`${pausedCount} paused`} tone={pausedCount ? 'warn' : 'good'} />
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Visible instruments" value={String(filteredRows.length)} helper="After current filters" />
            <StatCard label="Average quality" value={filteredRows.length ? `${avgQuality}/100` : '0/100'} helper="Coverage health score" tone={filteredRows.length ? scoreTone(avgQuality) : 'neutral'} />
            <StatCard label="Paused coverage" value={String(pausedCount)} helper="Requires admin review" tone={pausedCount ? 'warn' : 'good'} />
          </div>

          <SectionCard title="Universe filters" description="Find problems fast instead of scrolling forever.">
            <div className="grid gap-4 lg:grid-cols-[1.3fr_0.85fr_0.85fr]">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search symbol or asset"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                />
              </label>

              <div>
                <div className="text-sm font-medium text-slate-700">Type</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {typeFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setType(item)}
                      className={`rounded-full px-3 py-2 text-sm ${type === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-700">Coverage</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {coverageFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCoverage(item)}
                      className={`rounded-full px-3 py-2 text-sm ${
                        coverage === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Coverage table" description="Every row shows enough health context to decide whether it should stay in rotation.">
            <div className="space-y-4">
              {filteredRows.map((item) => (
                <div key={item.symbol} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-slate-950">{item.symbol}</div>
                        <StatusBadge label={item.type} tone="neutral" />
                        <StatusBadge label={item.status} tone={signalTone(item.status)} />
                      </div>
                      <div className="text-sm text-slate-500">
                        {item.name} | {item.exchange} | {item.country}
                      </div>
                    </div>
                    <StatusBadge label={item.coverage} tone={item.coverage === 'Realtime' ? 'good' : 'warn'} />
                  </div>

                  <ProgressBar className="mt-4" value={item.qualityScore} tone={scoreTone(item.qualityScore)} label="Quality score" />
                </div>
              ))}
            </div>
          </SectionCard>
        </AppShell>
      </>
    </RequireAuth>
  );
}
