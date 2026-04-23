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
  formatCurrency,
  formatPercent,
  getPortfolioCostBasis,
  getPortfolioDayPnl,
  getPortfolioValue,
  getSectorExposure,
  holdings,
  signalTone,
} from '@/lib/panel-data';

const sectorFilters = ['All', 'Technology', 'Financials', 'Energy'] as const;

export default function PortfolioPage() {
  const [sector, setSector] = useState<(typeof sectorFilters)[number]>('All');
  const filteredHoldings = holdings.filter((holding) => sector === 'All' || holding.sector === sector);
  const portfolioValue = getPortfolioValue();
  const costBasis = getPortfolioCostBasis();
  const dayPnl = getPortfolioDayPnl();
  const totalGain = portfolioValue - costBasis;
  const exposures = getSectorExposure();

  return (
    <RequireAuth roles={['user', 'admin']}>
      <>
        <Head>
          <title>Portfolio - Pivot Stocks</title>
        </Head>

        <AppShell
          kind="user"
          title="Portfolio"
          subtitle="Track concentration, risk, and contribution without opening five different tools."
          nav={[...USER_PANEL_NAV]}
          headerContent={
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={`${filteredHoldings.length} holdings visible`} tone="info" />
              <StatusBadge label={`${exposures[0]?.sector || 'No sector'} leads exposure`} tone="warn" />
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Portfolio value" value={formatCurrency(portfolioValue)} helper="Latest marked value" />
            <StatCard label="Day P and L" value={formatCurrency(dayPnl)} tone={dayPnl >= 0 ? 'good' : 'bad'} helper={formatPercent((dayPnl / portfolioValue) * 100)} />
            <StatCard label="Unrealized gain" value={formatCurrency(totalGain)} tone={totalGain >= 0 ? 'good' : 'bad'} helper="Versus blended cost basis" />
            <StatCard label="Cost basis" value={formatCurrency(costBasis)} helper="Across all positions" tone="neutral" />
          </div>

          <SectionCard
            title="Position view"
            description="Filter holdings by sector and inspect both conviction and risk."
            action={
              <div className="flex flex-wrap gap-2">
                {sectorFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSector(item)}
                    className={`rounded-full px-3 py-1.5 text-sm ${sector === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-4">
              {filteredHoldings.map((holding) => {
                const positionValue = holding.shares * holding.price;
                const gain = positionValue - holding.shares * holding.avgCost;

                return (
                  <div key={holding.symbol} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-950">{holding.symbol}</div>
                          <StatusBadge label={holding.risk} tone={signalTone(holding.risk === 'High' ? 'Bearish' : holding.risk === 'Medium' ? 'Neutral' : 'Bullish')} />
                          <StatusBadge label={holding.sector} tone="neutral" />
                        </div>
                        <div className="text-sm text-slate-500">{holding.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">{formatCurrency(positionValue)}</div>
                        <div className={`text-sm ${gain >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatCurrency(gain)}</div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_140px]">
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-3 shadow-sm">
                          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Shares</div>
                          <div className="mt-1 font-semibold text-slate-900">{holding.shares}</div>
                        </div>
                        <div className="rounded-2xl bg-white p-3 shadow-sm">
                          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Avg cost</div>
                          <div className="mt-1 font-semibold text-slate-900">{formatCurrency(holding.avgCost)}</div>
                        </div>
                        <div className="rounded-2xl bg-white p-3 shadow-sm">
                          <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Day move</div>
                          <div className={`mt-1 font-semibold ${holding.dayChangePct >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {formatPercent(holding.dayChangePct)}
                          </div>
                        </div>
                      </div>

                      <Sparkline
                        values={holding.sparkline}
                        className="h-12 w-full self-end"
                        stroke={holding.dayChangePct >= 0 ? '#0284c7' : '#e11d48'}
                        fill={holding.dayChangePct >= 0 ? 'rgba(2,132,199,0.12)' : 'rgba(225,29,72,0.12)'}
                      />
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">{holding.thesis}</p>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <SectionCard title="Sector exposure" description="Your portfolio is still heavily tilted toward tech leadership.">
              <div className="space-y-4">
                {exposures.map((sectorRow) => (
                  <div key={sectorRow.sector}>
                    <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                      <span>{sectorRow.sector}</span>
                      <span>{sectorRow.weight}%</span>
                    </div>
                    <ProgressBar value={sectorRow.weight} tone={sectorRow.weight >= 45 ? 'warn' : 'info'} />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Manager notes" description="A compact risk read for the current portfolio shape.">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Strength</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Winners are concentrated in quality names with strong narrative support, which helps the dashboard stay decisive.
                  </p>
                </div>
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Risk</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Technology exposure is doing the heavy lifting. A sharp rotation would hit both performance and confidence at the same time.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>
        </AppShell>
      </>
    </RequireAuth>
  );
}
