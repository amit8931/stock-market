import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { USER_PANEL_NAV, alertItems, severityTone, signalTone } from '@/lib/panel-data';

const statusFilters = ['All', 'Active', 'Watching', 'Resolved'] as const;
const severityFilters = ['All', 'High', 'Medium', 'Low'] as const;

export default function AlertsPage() {
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('All');
  const [severity, setSeverity] = useState<(typeof severityFilters)[number]>('All');

  const filteredAlerts = alertItems.filter((item) => {
    const matchesStatus = status === 'All' || item.status === status;
    const matchesSeverity = severity === 'All' || item.severity === severity;
    return matchesStatus && matchesSeverity;
  });

  const activeCount = alertItems.filter((item) => item.status === 'Active').length;
  const resolvedCount = alertItems.filter((item) => item.status === 'Resolved').length;

  return (
    <RequireAuth roles={['user', 'admin']}>
      <>
        <Head>
          <title>Alerts - Pivot Stocks</title>
        </Head>

        <AppShell
          kind="user"
          title="Alerts"
          subtitle="A practical queue for price, volume, news, and AI signals that need a decision."
          nav={[...USER_PANEL_NAV]}
          headerContent={
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={`${activeCount} active alerts`} tone="warn" />
              <StatusBadge label={`${resolvedCount} resolved today`} tone="info" />
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Visible alerts" value={String(filteredAlerts.length)} helper="Based on current filters" />
            <StatCard label="Active" value={String(activeCount)} helper="Needs review" tone="warn" />
            <StatCard label="Resolved" value={String(resolvedCount)} helper="Already handled" tone="good" />
          </div>

          <SectionCard title="Alert filters" description="Cut noise before it reaches your decision queue.">
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-slate-700">Status</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {statusFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setStatus(item)}
                      className={`rounded-full px-3 py-2 text-sm ${status === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-slate-700">Severity</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {severityFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSeverity(item)}
                      className={`rounded-full px-3 py-2 text-sm ${
                        severity === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <SectionCard title="Alert queue" description="The list updates immediately as you change filters.">
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div key={alert.id} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-950">{alert.title}</div>
                          <StatusBadge label={alert.severity} tone={severityTone(alert.severity)} />
                          <StatusBadge label={alert.status} tone={signalTone(alert.status)} />
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-600">{alert.body}</div>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <div>{alert.symbol}</div>
                        <div className="mt-1">{alert.createdAt}</div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
                      {alert.category} alert
                    </div>
                  </div>
                ))}

                {filteredAlerts.length === 0 ? (
                  <div className="rounded-[1.75rem] border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                    No alerts matched the current filter set.
                  </div>
                ) : null}
              </div>
            </SectionCard>

            <SectionCard title="Workflow guidance" description="Keep the response sequence disciplined.">
              <div className="space-y-4">
                {[
                  'Review high-severity items before scanning any fresh movers.',
                  'Resolved alerts should roll off only after the thesis actually changed.',
                  'If three or more alerts cluster around one symbol, shift to deep-dive mode.',
                ].map((item) => (
                  <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                    {item}
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
