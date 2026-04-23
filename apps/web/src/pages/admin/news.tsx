import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { ADMIN_PANEL_NAV, adminNews, signalTone } from '@/lib/panel-data';

const impactFilters = ['All', 'High', 'Medium', 'Low'] as const;

export default function NewsAdminPage() {
  const [impact, setImpact] = useState<(typeof impactFilters)[number]>('All');

  const filteredNews = adminNews.filter((story) => impact === 'All' || story.impact === impact);

  return (
    <RequireAuth roles={['admin']}>
      <>
        <Head>
          <title>Admin - News</title>
        </Head>

        <AppShell
          kind="admin"
          title="News Pipeline"
          subtitle="Monitor impact ranking, sentiment labels, and how quickly stories become usable inside the product."
          nav={[...ADMIN_PANEL_NAV]}
          headerContent={<StatusBadge label={`${filteredNews.length} stories visible`} tone="info" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Visible stories" value={String(filteredNews.length)} helper="Current impact slice" />
            <StatCard label="High impact" value={String(filteredNews.filter((story) => story.impact === 'High').length)} helper="Most important queue" tone="warn" />
            <StatCard label="Negative sentiment" value={String(filteredNews.filter((story) => story.sentiment === 'Negative').length)} helper="Potential risk feed" tone="bad" />
          </div>

          <SectionCard
            title="Impact filter"
            description="High-impact stories should be easy to isolate."
            action={
              <div className="flex flex-wrap gap-2">
                {impactFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setImpact(item)}
                    className={`rounded-full px-3 py-1.5 text-sm ${impact === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-4">
              {filteredNews.map((story) => (
                <div key={story.headline} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-950">{story.headline}</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <StatusBadge label={story.impact} tone={story.impact === 'High' ? 'warn' : story.impact === 'Medium' ? 'info' : 'neutral'} />
                        <StatusBadge label={story.sentiment} tone={signalTone(story.sentiment)} />
                        <StatusBadge label={story.source} tone="neutral" />
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                      <div>{story.latencyMin} min latency</div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.symbols.map((symbol) => (
                      <span key={symbol} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                        {symbol}
                      </span>
                    ))}
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
