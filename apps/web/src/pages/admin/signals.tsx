import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import ProgressBar from '@/components/ProgressBar';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { ADMIN_PANEL_NAV, adminSignals, average, scoreTone, signalTone } from '@/lib/panel-data';

const directionFilters = ['All', 'Bullish', 'Neutral', 'Bearish'] as const;
const typeFilters = ['All', 'Momentum', 'Sentiment', 'Volume', 'Macro'] as const;

export default function SignalsAdminPage() {
  const [direction, setDirection] = useState<(typeof directionFilters)[number]>('All');
  const [type, setType] = useState<(typeof typeFilters)[number]>('All');

  const filteredSignals = adminSignals.filter((signal) => {
    const matchesDirection = direction === 'All' || signal.direction === direction;
    const matchesType = type === 'All' || signal.type === type;
    return matchesDirection && matchesType;
  });

  const averageConfidence = Math.round(average(filteredSignals, (signal) => signal.confidence));

  return (
    <RequireAuth roles={['admin']}>
      <>
        <Head>
          <title>Admin - Signals</title>
        </Head>

        <AppShell
          kind="admin"
          title="Signal Inspector"
          subtitle="Drill into score direction, confidence, and source mix before anything questionable reaches the customer."
          nav={[...ADMIN_PANEL_NAV]}
          headerContent={<StatusBadge label={`${filteredSignals.length} signals visible`} tone="info" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Visible signals" value={String(filteredSignals.length)} helper="Current filtered set" />
            <StatCard label="Average confidence" value={filteredSignals.length ? `${averageConfidence}%` : '0%'} helper="How trustworthy the set looks" tone={filteredSignals.length ? scoreTone(averageConfidence) : 'neutral'} />
            <StatCard label="Bearish share" value={String(filteredSignals.filter((signal) => signal.direction === 'Bearish').length)} helper="Risk-heavy outputs in view" tone="warn" />
          </div>

          <SectionCard title="Signal filters" description="Inspect by direction or by engine source.">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-slate-700">Direction</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {directionFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setDirection(item)}
                      className={`rounded-full px-3 py-2 text-sm ${
                        direction === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-700">Signal type</div>
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
            </div>
          </SectionCard>

          <SectionCard title="Recent outputs" description="Use this to spot drift, overscoring, or suspicious confidence.">
            <div className="space-y-4">
              {filteredSignals.map((signal) => (
                <div key={`${signal.symbol}-${signal.createdAt}`} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-slate-950">{signal.symbol}</div>
                        <StatusBadge label={signal.type} tone="neutral" />
                        <StatusBadge label={signal.direction} tone={signalTone(signal.direction)} />
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        Source: {signal.source} | generated {signal.createdAt}
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                      <div className="font-semibold text-slate-900">{signal.score}/100</div>
                      <div>{signal.confidence}% confidence</div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <ProgressBar value={signal.score} tone={scoreTone(signal.score)} label="Score" />
                    <ProgressBar value={signal.confidence} tone={scoreTone(signal.confidence)} label="Confidence" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </AppShell>
      </>
    </RequireAuth>
  );
}
