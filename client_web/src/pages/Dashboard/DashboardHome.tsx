import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  BookOpen,
  Settings,
  ArrowRight,
  Save,
  RotateCcw,
  LayoutGrid,
  BookMarked,
  Users,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useSiteContent } from '../../context/SiteContentContext';
import { useComics } from '../../context/ComicsContext';

const cards = [
  {
    title: 'Website Pages',
    description: 'Edit About, Contact, and other public page content. Hero, story, values, and team.',
    to: '/dashboard/pages',
    icon: FileText,
    color: 'var(--color-primary-blue)',
    accent: 'rgba(3, 169, 244, 0.12)',
  },
  {
    title: 'Comics',
    description: 'Add, edit, or remove comics from the Books section. Covers, metadata, and status.',
    to: '/dashboard/comics',
    icon: BookOpen,
    color: 'var(--color-secondary-purple)',
    accent: 'rgba(103, 51, 176, 0.12)',
  },
  {
    title: 'Settings',
    description: 'Site name, logo, contact email and phone, footer tagline.',
    to: '/dashboard/settings',
    icon: Settings,
    color: 'var(--color-accent-pink)',
    accent: 'rgba(238, 64, 168, 0.12)',
  },
];

const CHART_COLORS = ['#03A9F4', '#6733B0', '#EE40A8', '#0D47A1'];

const DashboardHome: React.FC = () => {
  const { persistAll, resetAllPages, about, settings } = useSiteContent();
  const { comics } = useComics();
  const [saved, setSaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const stats = useMemo(() => {
    const byStatus = comics.reduce(
      (acc, c) => {
        acc[c.status] = (acc[c.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    const byType = comics.reduce(
      (acc, c) => {
        acc[c.type] = (acc[c.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    return {
      totalComics: comics.length,
      totalTeamMembers: about.teamSection.members.length,
      barData: [
        { name: 'Ongoing', count: byStatus.ongoing ?? 0, fill: CHART_COLORS[0] },
        { name: 'Completed', count: byStatus.completed ?? 0, fill: CHART_COLORS[1] },
      ],
      pieData: [
        { name: 'Series', value: byType.series ?? 0, fill: CHART_COLORS[0] },
        { name: 'One-shot', value: byType['one-shot'] ?? 0, fill: CHART_COLORS[2] },
      ].filter((d) => d.value > 0),
    };
  }, [comics, about.teamSection.members.length]);

  const handleUpdateAll = () => {
    persistAll();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetAllPages = () => {
    if (
      !window.confirm(
        'Reset all page content (Home, Services, Portfolio, About, Contact) to default? Your current edits will be lost. Settings and Comics are not affected.'
      )
    )
      return;
    resetAllPages();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-deep-blue)' }}>
            Dashboard
          </h1>
          <p className="mt-2 text-lg text-[var(--navbar-text)]/90">
            Manage your Lanart platform. All changes are saved in the browser.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleUpdateAll}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:opacity-95"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            <Save size={18} />
            {saved ? 'Saved!' : 'Update all pages'}
          </button>
          <button
            type="button"
            onClick={handleResetAllPages}
            className="inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all hover:bg-red-50"
            style={{ borderColor: 'var(--navbar-border)', color: 'var(--navbar-text)' }}
          >
            <RotateCcw size={18} />
            {resetDone ? 'Reset done' : 'Reset all pages'}
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div
          className="flex items-center gap-4 rounded-2xl border-2 bg-white p-5 shadow-sm"
          style={{ borderColor: 'var(--navbar-border)' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            <BookMarked size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
              {stats.totalComics}
            </p>
            <p className="text-sm font-medium text-[var(--navbar-text)]/80">Total comics</p>
          </div>
        </div>
        <div
          className="flex items-center gap-4 rounded-2xl border-2 bg-white p-5 shadow-sm"
          style={{ borderColor: 'var(--navbar-border)' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: 'var(--color-secondary-purple)' }}
          >
            <LayoutGrid size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
              5
            </p>
            <p className="text-sm font-medium text-[var(--navbar-text)]/80">Website pages</p>
          </div>
        </div>
        <div
          className="flex items-center gap-4 rounded-2xl border-2 bg-white p-5 shadow-sm"
          style={{ borderColor: 'var(--navbar-border)' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: 'var(--color-accent-pink)' }}
          >
            <Users size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
              {stats.totalTeamMembers}
            </p>
            <p className="text-sm font-medium text-[var(--navbar-text)]/80">Team members</p>
          </div>
        </div>
        <div
          className="flex items-center gap-4 rounded-2xl border-2 bg-white p-5 shadow-sm"
          style={{ borderColor: 'var(--navbar-border)' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ backgroundColor: 'var(--color-deep-blue)' }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
              {settings.siteName ? 'Live' : '—'}
            </p>
            <p className="text-sm font-medium text-[var(--navbar-text)]/80">Site status</p>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        <div
          className="rounded-2xl border-2 bg-white p-6 shadow-sm"
          style={{ borderColor: 'var(--navbar-border)' }}
        >
          <h3 className="mb-4 text-lg font-bold" style={{ color: 'var(--color-deep-blue)' }}>
            Comics by status
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primary-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div
          className="rounded-2xl border-2 bg-white p-6 shadow-sm"
          style={{ borderColor: 'var(--navbar-border)' }}
        >
          <h3 className="mb-4 text-lg font-bold" style={{ color: 'var(--color-deep-blue)' }}>
            Comics by type
          </h3>
          <div className="h-64">
            {stats.pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }: { name: string; value: number }) => `${name}: ${value}`}
                  >
                    {stats.pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-[var(--navbar-text)]/70">
                No comics yet. Add comics to see the chart.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="mb-4 text-xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
          Quick actions
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ title, description, to, icon: Icon, color, accent }) => (
            <Link
              key={to}
              to={to}
              className="group flex flex-col rounded-2xl border-2 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              style={{ borderColor: 'var(--navbar-border)' }}
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundColor: color }}
              >
                <Icon size={26} strokeWidth={2} />
              </div>
              <h2 className="mb-2 text-xl font-bold" style={{ color: 'var(--color-deep-blue)' }}>
                {title}
              </h2>
              <p className="flex-1 text-sm leading-relaxed text-[var(--navbar-text)] opacity-90">
                {description}
              </p>
              <span
                className="mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                style={{ color, backgroundColor: accent }}
              >
                Open <ArrowRight size={18} strokeWidth={2.5} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
