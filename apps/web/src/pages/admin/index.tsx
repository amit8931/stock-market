import Head from 'next/head';
import AppShell from '@/components/AppShell';
import ProgressBar from '@/components/ProgressBar';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import {
  ADMIN_PANEL_NAV,
  adminChecklist,
  adminIncidents,
  adminJobs,
  adminNews,
  adminSignals,
  adminUsers,
  formatCompact,
  instrumentRows,
  signalTone,
} from '@/lib/panel-data';

export default function AdminDashboard() {
  const healthyJobs = adminJobs.filter((job) => job.status === 'Healthy').length;
  const attentionJobs = adminJobs.filter((job) => job.status !== 'Healthy').length;
  const highImpactStories = adminNews.filter((story) => story.impact === 'High').length;

  return (
    <RequireAuth roles={['admin']}>
      <>
        <Head>
          <title>Admin Dashboard - Pivot Stocks</title>
        </Head>

        <AppShell
          kind="admin"
          title="Admin Operations"
          subtitle="A tighter control room for the asset universe, the signal engine, and every workflow that can quietly drift out of spec."
          nav={[...ADMIN_PANEL_NAV]}
          headerContent={
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={`${healthyJobs}/${adminJobs.length} jobs healthy`} tone="good" />
              <StatusBadge label={`${attentionJobs} need follow-up`} tone="warn" />
              <StatusBadge label={`${highImpactStories} high-impact stories today`} tone="info" />
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Instrument coverage" value={formatCompact(instrumentRows.length)} helper="Assets currently in admin view" tone="info" />
            <StatCard label="Users tracked" value={formatCompact(adminUsers.length)} helper="Across visible plans" />
            <StatCard label="Signals today" value={formatCompact(adminSignals.length)} helper="Recent scored samples" tone="good" />
            <StatCard label="Operational flags" value={String(adminIncidents.length)} helper="Items that still need a human call" tone="warn" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <SectionCard title="Pipeline board" description="Healthy jobs should be boring. Any drama belongs here, not in the user panel.">
              <div className="space-y-4">
                {adminJobs.map((job) => (
                  <div key={job.job} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-slate-950">{job.job}</div>
                          <StatusBadge label={job.status} tone={signalTone(job.status)} />
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          {job.schedule} | last run {job.lastRun} | next {job.nextRun}
                        </div>
                      </div>
                      <div className="text-right text-sm text-slate-500">
                        <div>{job.avgDurationSec}s avg</div>
                        <div>{job.queueDepth} queued</div>
                      </div>
                    </div>
                    <ProgressBar className="mt-4" value={job.successRate} tone={job.successRate >= 95 ? 'good' : 'warn'} label="Success rate" />
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Quality checks" description="The fastest way to catch silent degradation before it reaches customers.">
              <div className="space-y-4">
                {adminChecklist.map((item) => (
                  <ProgressBar key={item.label} value={item.value} tone={item.value >= 85 ? 'good' : item.value >= 75 ? 'warn' : 'bad'} label={item.label} />
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {adminIncidents.map((incident) => (
                  <div key={incident} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {incident}
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
