import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, BookOpen, Settings, ArrowRight, Save, RotateCcw } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

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

const DashboardHome: React.FC = () => {
  const { persistAll, resetAllPages } = useSiteContent();
  const [saved, setSaved] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handleUpdateAll = () => {
    persistAll();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetAllPages = () => {
    if (!window.confirm('Reset all page content (Home, Services, Portfolio, About, Contact) to default? Your current edits will be lost. Settings and Comics are not affected.')) return;
    resetAllPages();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2500);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--color-deep-blue)' }}>
            Welcome to the dashboard
          </h1>
          <p className="mt-2 text-lg text-[var(--navbar-text)]/90">
            Manage your Lanart platform content. All changes are saved in the browser.
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
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--navbar-text)] flex-1 opacity-90">
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
  );
};

export default DashboardHome;
