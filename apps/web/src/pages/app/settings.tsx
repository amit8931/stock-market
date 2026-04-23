import Head from 'next/head';
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import RequireAuth from '@/components/RequireAuth';
import SectionCard from '@/components/SectionCard';
import StatCard from '@/components/StatCard';
import StatusBadge from '@/components/StatusBadge';
import { USER_PANEL_NAV, settingsProfile } from '@/lib/panel-data';

const allRegions = ['US', 'India', 'Europe', 'Crypto'];

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState(settingsProfile.displayName);
  const [plan] = useState(settingsProfile.plan);
  const [riskProfile, setRiskProfile] = useState(settingsProfile.riskProfile);
  const [digest, setDigest] = useState(settingsProfile.digest);
  const [assistantMode, setAssistantMode] = useState(settingsProfile.assistantMode);
  const [regions, setRegions] = useState<string[]>(settingsProfile.regions);
  const [notifications, setNotifications] = useState({
    price: true,
    volume: true,
    news: true,
    ai: false,
  });
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const toggleRegion = (region: string) => {
    setRegions((current) =>
      current.includes(region) ? current.filter((item) => item !== region) : [...current, region]
    );
  };

  const handleSave = () => {
    setSavedAt(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date()));
  };

  return (
    <RequireAuth roles={['user', 'admin']}>
      <>
        <Head>
          <title>Settings - Pivot Stocks</title>
        </Head>

        <AppShell
          kind="user"
          title="Settings"
          subtitle="Tune the panel around your own workflow, not the other way around."
          nav={[...USER_PANEL_NAV]}
          headerContent={
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={`${plan} plan`} tone="info" />
              {savedAt ? <StatusBadge label={`Saved at ${savedAt}`} tone="good" /> : <StatusBadge label="Unsaved edits" tone="warn" />}
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatCard label="Plan" value={plan} helper="Current access tier" tone="info" />
            <StatCard label="Risk profile" value={riskProfile} helper="Used for future alert tuning" tone="warn" />
            <StatCard label="Digest window" value={digest} helper="When summaries should arrive" />
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <SectionCard title="Profile and workflow" description="These controls are local for now, ready to wire into user-service later.">
              <div className="grid gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Display name</span>
                  <input
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Digest timing</span>
                  <select
                    value={digest}
                    onChange={(event) => setDigest(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  >
                    <option>Market open</option>
                    <option>Mid-session</option>
                    <option>Market close</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Risk profile</span>
                  <select
                    value={riskProfile}
                    onChange={(event) => setRiskProfile(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  >
                    <option>Conservative</option>
                    <option>Balanced</option>
                    <option>Aggressive</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Assistant mode</span>
                  <select
                    value={assistantMode}
                    onChange={(event) => setAssistantMode(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                  >
                    <option>Decision-focused</option>
                    <option>Research-heavy</option>
                    <option>Risk-first</option>
                  </select>
                </label>
              </div>
            </SectionCard>

            <SectionCard title="Coverage and notifications" description="Choose where alerts should concentrate your attention.">
              <div>
                <div className="text-sm font-medium text-slate-700">Regions</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {allRegions.map((region) => (
                    <button
                      key={region}
                      type="button"
                      onClick={() => toggleRegion(region)}
                      className={`rounded-full px-3 py-2 text-sm ${
                        regions.includes(region) ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { key: 'price', label: 'Price alerts' },
                  { key: 'volume', label: 'Volume anomalies' },
                  { key: 'news', label: 'News sentiment shifts' },
                  { key: 'ai', label: 'AI brief nudges' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-700">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={notifications[item.key as keyof typeof notifications]}
                      onChange={(event) =>
                        setNotifications((current) => ({
                          ...current,
                          [item.key]: event.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300"
                    />
                  </label>
                ))}
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Save preferences" description="This is still local state, but the UX is ready for a real API call.">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-slate-600">
                Current profile: {displayName}, {riskProfile}, {assistantMode}.
              </div>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Save settings
              </button>
            </div>
          </SectionCard>
        </AppShell>
      </>
    </RequireAuth>
  );
}
