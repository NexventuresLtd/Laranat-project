import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings, persistSettings } = useSiteContent();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    persistSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    'w-full max-w-md rounded-xl border-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]/40';
  const labelClass = 'block text-sm font-semibold mb-1.5 text-[var(--navbar-text)]';

  return (
    <div className="max-w-2xl">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-deep-blue)' }}>
            Settings
          </h1>
          <p className="mt-1 text-[var(--navbar-text)]/90">
            Site name, logo, contact info, and platform options. Frontend-only: saved in browser.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-white font-semibold text-sm shadow-md transition-all hover:opacity-95 hover:shadow-lg"
          style={{ backgroundColor: 'var(--color-primary-blue)' }}
        >
          <Save size={18} />
          {saved ? 'Saved!' : 'Save changes'}
        </button>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>
            Branding
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Site name</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={settings.siteName}
                onChange={(e) => updateSettings({ siteName: e.target.value })}
                placeholder="Lanart21 Creative Studio"
              />
            </div>
            <div>
              <label className={labelClass}>Logo URL</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={settings.logoUrl}
                onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                placeholder="/Image/lanart.jpg"
              />
              <p className="text-xs text-[var(--navbar-text)] mt-1">
                Path to logo image (e.g. /Image/lanart.jpg or full URL).
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>
            Contact
          </h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Contact email</label>
              <input
                className={inputClass}
                type="email"
                style={{ borderColor: 'var(--navbar-border)' }}
                value={settings.contactEmail}
                onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                placeholder="hello@lanart21.com"
              />
            </div>
            <div>
              <label className={labelClass}>Contact phone</label>
              <input
                className={inputClass}
                type="tel"
                style={{ borderColor: 'var(--navbar-border)' }}
                value={settings.contactPhone}
                onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                placeholder="+250 782 030 814"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>
            Footer
          </h2>
          <div>
            <label className={labelClass}>Footer tagline</label>
            <input
              className={inputClass}
              style={{ borderColor: 'var(--navbar-border)' }}
              value={settings.footerTagline}
              onChange={(e) => updateSettings({ footerTagline: e.target.value })}
              placeholder="Visual storytelling at its best."
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
