import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { ADMIN_PANEL_NAV, adminUsers, signalTone } from '@/lib/panel-data';

const planFilters = ['All', 'Free', 'Pro', 'Premium'] as const;
const statusFilters = ['All', 'Healthy', 'At risk', 'Churn risk'] as const;

export default function UsersAdminPage() {
  const [query, setQuery] = useState('');
  const [plan, setPlan] = useState<(typeof planFilters)[number]>('All');
  const [status, setStatus] = useState<(typeof statusFilters)[number]>('All');

  const filteredUsers = adminUsers.filter((user) => {
    const matchesQuery = user.email.toLowerCase().includes(query.toLowerCase());
    const matchesPlan = plan === 'All' || user.plan === plan;
    const matchesStatus = status === 'All' || user.status === status;
    return matchesQuery && matchesPlan && matchesStatus;
  });

  return (
    <RequireAuth roles={['admin']}>
      <>
        <Head>
          <title>Admin - Users</title>
        </Head>

        <AppShell
          kind="admin"
          title="Users and Plans"
          subtitle="A compact view of who is active, who is drifting, and which users are actually getting value from the product."
          nav={[...ADMIN_PANEL_NAV]}
          headerContent={<StatusBadge label={`${filteredUsers.length} accounts visible`} tone="info" />}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Visible accounts" value={String(filteredUsers.length)} helper="Filtered admin view" />
            <StatCard label="Healthy" value={String(filteredUsers.filter((user) => user.status === 'Healthy').length)} helper="Users with recent activity" tone="good" />
            <StatCard label="Needs retention" value={String(filteredUsers.filter((user) => user.status !== 'Healthy').length)} helper="At-risk or churn-risk users" tone="warn" />
          </div>

          <SectionCard title="User filters" description="Find accounts by plan or risk state.">
            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search email"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                />
              </label>

              <div>
                <div className="text-sm font-medium text-slate-700">Plan</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {planFilters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPlan(item)}
                      className={`rounded-full px-3 py-2 text-sm ${plan === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

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
            </div>
          </SectionCard>

          <SectionCard title="Account list" description="This structure is ready for live admin endpoints when auth is wired.">
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.email} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-slate-950">{user.email}</div>
                        <StatusBadge label={user.role} tone={user.role === 'Admin' ? 'warn' : 'neutral'} />
                        <StatusBadge label={user.status} tone={signalTone(user.status)} />
                      </div>
                      <div className="mt-2 text-sm text-slate-500">
                        {user.watchlists} watchlists | {user.alerts} alerts | last active {user.lastActive}
                      </div>
                    </div>
                    <StatusBadge label={user.plan} tone={user.plan === 'Premium' ? 'good' : user.plan === 'Pro' ? 'info' : 'neutral'} />
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
