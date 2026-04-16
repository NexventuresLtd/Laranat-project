import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Save, Plus, Trash2, Upload } from 'lucide-react';
import { uploadImage } from '../../lib/auth';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings, persistSettings } = useSiteContent();
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  const handleSave = () => {
    persistSettings();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleFileUpload = async (file: File, field: keyof typeof settings): Promise<string> => {
    if (!file) throw new Error('No file provided');
    
    setUploading(field);
    try {
      const url = await uploadImage(file);
      return url;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      throw error;
    } finally {
      setUploading(null);
    }
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
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  style={{ borderColor: 'var(--navbar-border)' }}
                  value={settings.logoUrl}
                  onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                  placeholder="/Image/lanart.jpg"
                />
                <label className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-white font-semibold text-sm cursor-pointer transition-all hover:opacity-95" style={{ backgroundColor: 'var(--color-primary-blue)' }}>
                  <Upload size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const url = await handleFileUpload(file, 'logoUrl');
                          updateSettings({ logoUrl: url });
                        } catch (error) {
                          // Error already handled in handleFileUpload
                        }
                      }
                    }}
                    className="hidden"
                    disabled={uploading === 'logoUrl'}
                  />
                  {uploading === 'logoUrl' ? 'Uploading...' : 'Upload'}
                </label>
              </div>
              <p className="text-xs text-[var(--navbar-text)] mt-1">
                Path to logo image (e.g. /Image/lanart.jpg or full URL). You can also upload a new image.
              </p>
            </div>
            <div>
              <label className={labelClass}>Landscape logo URL</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  style={{ borderColor: 'var(--navbar-border)' }}
                  value={settings.logoLandscapeUrl}
                  onChange={(e) => updateSettings({ logoLandscapeUrl: e.target.value })}
                  placeholder="/logo-landscape.svg"
                />
                <label className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-white font-semibold text-sm cursor-pointer transition-all hover:opacity-95" style={{ backgroundColor: 'var(--color-primary-blue)' }}>
                  <Upload size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const url = await handleFileUpload(file, 'logoLandscapeUrl');
                          updateSettings({ logoLandscapeUrl: url });
                        } catch (error) {
                          // Error already handled in handleFileUpload
                        }
                      }
                    }}
                    className="hidden"
                    disabled={uploading === 'logoLandscapeUrl'}
                  />
                  {uploading === 'logoLandscapeUrl' ? 'Uploading...' : 'Upload'}
                </label>
              </div>
            </div>
            <div>
              <label className={labelClass}>Favicon / icon logo URL</label>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  style={{ borderColor: 'var(--navbar-border)' }}
                  value={settings.logoIconUrl}
                  onChange={(e) => updateSettings({ logoIconUrl: e.target.value })}
                  placeholder="/favicon.svg"
                />
                <label className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-white font-semibold text-sm cursor-pointer transition-all hover:opacity-95" style={{ backgroundColor: 'var(--color-primary-blue)' }}>
                  <Upload size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        try {
                          const url = await handleFileUpload(file, 'logoIconUrl');
                          updateSettings({ logoIconUrl: url });
                        } catch (error) {
                          // Error already handled in handleFileUpload
                        }
                      }
                    }}
                    className="hidden"
                    disabled={uploading === 'logoIconUrl'}
                  />
                  {uploading === 'logoIconUrl' ? 'Uploading...' : 'Upload'}
                </label>
              </div>
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

        <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold" style={{ color: 'var(--color-deep-blue)' }}>
                Client logos
              </h2>
              <p className="text-sm text-[var(--navbar-text)]/80 mt-1">
                These logos are shown on the landing page trusted clients section.
              </p>
            </div>
            <button
              type="button"
              onClick={() => updateSettings({ clientLogos: [...settings.clientLogos, ''] })}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-white"
              style={{ backgroundColor: 'var(--color-secondary-purple)' }}
            >
              <Plus size={16} /> Add logo
            </button>
          </div>
          <div className="space-y-4">
            {settings.clientLogos.map((logo, index) => (
              <div key={`${logo}-${index}`} className="flex gap-3 items-start">
                <div className="flex-1 flex gap-2">
                  <input
                    className={inputClass}
                    style={{ borderColor: 'var(--navbar-border)' }}
                    value={logo}
                    onChange={(e) =>
                      updateSettings({
                        clientLogos: settings.clientLogos.map((item, i) => (i === index ? e.target.value : item)),
                      })
                    }
                    placeholder="https://example.com/client-logo.svg"
                  />
                  <label className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-white font-semibold text-sm cursor-pointer transition-all hover:opacity-95 shrink-0" style={{ backgroundColor: 'var(--color-primary-blue)' }}>
                    <Upload size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, 'clientLogos').then((url) => {
                            updateSettings({
                              clientLogos: settings.clientLogos.map((item, i) => (i === index ? url : item)),
                            });
                          });
                        }
                      }}
                      className="hidden"
                      disabled={uploading === 'clientLogos'}
                    />
                    {uploading === 'clientLogos' ? 'Uploading...' : 'Upload'}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateSettings({
                      clientLogos: settings.clientLogos.filter((_, i) => i !== index),
                    })
                  }
                  className="mt-1 text-red-600 hover:text-red-700 p-2 shrink-0"
                  aria-label="Remove client logo"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
