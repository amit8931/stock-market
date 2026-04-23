import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import ProgressBar from '@/components/ProgressBar';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { ADMIN_PANEL_NAV, adminJobs, signalTone } from '@/lib/panel-data';

const statusFilters = ['All', 'Healthy', 'Delayed', 'Attention'] as const;

export default function JobsAdminPage() {
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('All');

  const filteredJobs = adminJobs.filter((job) => status === 'All' || job.status === status);

  return (
    <RequireAuth roles={['admin']}>
      <>
        <Head>
          <title>Admin - Jobs</title>
        </Head>

        <AppShell
          kind="admin"
          title="Jobs and Pipelines"
          subtitle="Keep ingestion, enrichment, and briefing workflows observable before they fail quietly."
          nav={[...ADMIN_PANEL_NAV]}
          headerContent={<StatusBadge label={`${filteredJobs.length} jobs visible`} tone="info" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Healthy jobs" value={String(filteredJobs.filter((job) => job.status === 'Healthy').length)} helper="Running inside SLA" tone="good" />
            <StatCard label="Delayed jobs" value={String(filteredJobs.filter((job) => job.status === 'Delayed').length)} helper="Watch queue pressure" tone="warn" />
            <StatCard label="Attention needed" value={String(filteredJobs.filter((job) => job.status === 'Attention').length)} helper="Needs human follow-up" tone="bad" />
          </div>

          <SectionCard
            title="Job status filter"
            description="Slice the board by operational state."
            action={
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setStatus(item)}
                    className={`rounded-full px-3 py-1.5 text-sm ${status === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            }
          >
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.job} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-slate-950">{job.job}</div>
                        <StatusBadge label={job.status} tone={signalTone(job.status)} />
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {job.schedule} | next run {job.nextRun} | last run {job.lastRun}
                      </div>
                    </div>
                    <div className="text-right text-sm text-slate-500">
                      <div>{job.avgDurationSec}s avg duration</div>
                      <div>{job.queueDepth} items in queue</div>
                    </div>
                  </div>

                  <ProgressBar className="mt-4" value={job.successRate} tone={job.successRate >= 95 ? 'good' : job.successRate >= 90 ? 'warn' : 'bad'} label="Success rate" />
                </div>
              ))}
            </div>
          </SectionCard>
        </AppShell>
      </>
    </RequireAuth>
  );
}
