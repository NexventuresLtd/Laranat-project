import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import type { AboutValue, AboutTeamMember } from '../../data/siteContent';
import { Save, Plus, Trash2 } from 'lucide-react';

const TABS = ['home', 'services', 'portfolio', 'about', 'contact'] as const;
type Tab = (typeof TABS)[number];

const PagesEditor: React.FC = () => {
  const site = useSiteContent();
  const {
    about,
    home,
    services,
    portfolio,
    contact,
    updateHome,
    updateServices,
    updatePortfolio,
    updateContact,
    persistAll,
    resetAllPages,
  } = site;
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    persistAll();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateValue = (index: number, patch: Partial<AboutValue>) => {
    const values = [...about.values];
    values[index] = { ...values[index], ...patch };
    site.updateAbout({ values });
  };

  const addValue = () => {
    site.updateAbout({
      values: [...about.values, { title: '', description: '', image: '' }],
    });
  };

  const removeValue = (index: number) => {
    site.updateAbout({ values: about.values.filter((_, i) => i !== index) });
  };

  const updateMember = (index: number, patch: Partial<AboutTeamMember>) => {
    const members = [...about.teamSection.members];
    members[index] = { ...members[index], ...patch };
    site.updateAbout({ teamSection: { ...about.teamSection, members } });
  };

  const addMember = () => {
    site.updateAbout((prev) => ({
      teamSection: {
        ...prev.teamSection,
        members: [...prev.teamSection.members, { name: '', role: '', focus: '', imageUrl: '' }],
      },
    }));
  };

  const removeMember = (index: number) => {
    site.updateAbout((prev) => ({
      teamSection: {
        ...prev.teamSection,
        members: prev.teamSection.members.filter((_, i) => i !== index),
      },
    }));
  };

  const inputClass =
    'w-full rounded-xl border-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]/40';
  const labelClass = 'block text-sm font-semibold mb-1.5 text-[var(--navbar-text)]';

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-deep-blue)' }}>
            Website Pages
          </h1>
          <p className="mt-1 text-[var(--navbar-text)]/90">
            Edit all website pages: Home, Services, Portfolio, About, Contact.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-white font-semibold text-sm shadow-md transition-all hover:opacity-95 hover:shadow-lg"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            <Save size={18} />
            {saved ? 'Saved!' : 'Update all'}
          </button>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all page content to default? Home, Services, Portfolio, About, Contact will be restored to original content. This cannot be undone.')) resetAllPages();
            }}
            className="inline-flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition-all hover:bg-red-50"
            style={{ borderColor: 'var(--navbar-border)', color: 'var(--navbar-text)' }}
          >
            <Trash2 size={18} />
            Reset all pages
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 rounded-xl border-2 p-1.5" style={{ borderColor: 'var(--navbar-border)', backgroundColor: 'rgba(255,255,255,0.8)' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all capitalize ${
              activeTab === tab ? 'text-white shadow' : 'text-[var(--navbar-text)] hover:bg-[var(--navbar-border)]'
            }`}
            style={activeTab === tab ? { backgroundColor: 'var(--color-primary-blue)' } : undefined}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'home' && (
        <div className="space-y-8">
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Home – Hero</h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.hero.eyebrow} onChange={(e) => updateHome({ hero: { ...home.hero, eyebrow: e.target.value } })} />
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.hero.title} onChange={(e) => updateHome({ hero: { ...home.hero, title: e.target.value } })} />
              <label className={labelClass}>Subtitle</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.hero.subtitle} onChange={(e) => updateHome({ hero: { ...home.hero, subtitle: e.target.value } })} />
              <label className={labelClass}>Primary CTA (e.g. Get in touch)</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.hero.ctaPrimary} onChange={(e) => updateHome({ hero: { ...home.hero, ctaPrimary: e.target.value } })} />
              <label className={labelClass}>Secondary CTA (e.g. About us)</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.hero.ctaSecondary} onChange={(e) => updateHome({ hero: { ...home.hero, ctaSecondary: e.target.value } })} />
              <label className={labelClass}>Background image URL</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.hero.bgImageUrl} onChange={(e) => updateHome({ hero: { ...home.hero, bgImageUrl: e.target.value } })} />
            </div>
          </section>
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Home – About teaser</h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.aboutTeaser.eyebrow} onChange={(e) => updateHome({ aboutTeaser: { ...home.aboutTeaser, eyebrow: e.target.value } })} />
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.aboutTeaser.title} onChange={(e) => updateHome({ aboutTeaser: { ...home.aboutTeaser, title: e.target.value } })} />
              <label className={labelClass}>Body</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={3} value={home.aboutTeaser.body} onChange={(e) => updateHome({ aboutTeaser: { ...home.aboutTeaser, body: e.target.value } })} />
              <label className={labelClass}>CTA text</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.aboutTeaser.ctaText} onChange={(e) => updateHome({ aboutTeaser: { ...home.aboutTeaser, ctaText: e.target.value } })} />
              <label className={labelClass}>Image URL</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.aboutTeaser.imageUrl} onChange={(e) => updateHome({ aboutTeaser: { ...home.aboutTeaser, imageUrl: e.target.value } })} />
            </div>
          </section>
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Home – Services teaser</h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.servicesTeaser.eyebrow} onChange={(e) => updateHome({ servicesTeaser: { ...home.servicesTeaser, eyebrow: e.target.value } })} />
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.servicesTeaser.title} onChange={(e) => updateHome({ servicesTeaser: { ...home.servicesTeaser, title: e.target.value } })} />
              <label className={labelClass}>Body</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={2} value={home.servicesTeaser.body} onChange={(e) => updateHome({ servicesTeaser: { ...home.servicesTeaser, body: e.target.value } })} />
              <label className={labelClass}>CTA text</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.servicesTeaser.ctaText} onChange={(e) => updateHome({ servicesTeaser: { ...home.servicesTeaser, ctaText: e.target.value } })} />
            </div>
          </section>
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Home – Books teaser</h2>
            <div className="space-y-4">
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.booksTeaser.title} onChange={(e) => updateHome({ booksTeaser: { ...home.booksTeaser, title: e.target.value } })} />
              <label className={labelClass}>Body</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={2} value={home.booksTeaser.body} onChange={(e) => updateHome({ booksTeaser: { ...home.booksTeaser, body: e.target.value } })} />
              <label className={labelClass}>CTA text</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.booksTeaser.ctaText} onChange={(e) => updateHome({ booksTeaser: { ...home.booksTeaser, ctaText: e.target.value } })} />
            </div>
          </section>
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Home – Portfolio teaser</h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.portfolioTeaser.eyebrow} onChange={(e) => updateHome({ portfolioTeaser: { ...home.portfolioTeaser, eyebrow: e.target.value } })} />
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.portfolioTeaser.title} onChange={(e) => updateHome({ portfolioTeaser: { ...home.portfolioTeaser, title: e.target.value } })} />
              <label className={labelClass}>Body</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={2} value={home.portfolioTeaser.body} onChange={(e) => updateHome({ portfolioTeaser: { ...home.portfolioTeaser, body: e.target.value } })} />
              <label className={labelClass}>CTA text</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={home.portfolioTeaser.ctaText} onChange={(e) => updateHome({ portfolioTeaser: { ...home.portfolioTeaser, ctaText: e.target.value } })} />
            </div>
          </section>
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-8">
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Services – Hero</h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={services.hero.eyebrow} onChange={(e) => updateServices({ hero: { ...services.hero, eyebrow: e.target.value } })} />
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={services.hero.title} onChange={(e) => updateServices({ hero: { ...services.hero, title: e.target.value } })} />
              <label className={labelClass}>Subtitle</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={2} value={services.hero.subtitle} onChange={(e) => updateServices({ hero: { ...services.hero, subtitle: e.target.value } })} />
            </div>
          </section>
          {services.sections.map((sec, i) => (
            <section key={sec.id} className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Service {i + 1}: {sec.title || 'Untitled'}</h2>
              <div className="space-y-4">
                <label className={labelClass}>Title</label>
                <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={sec.title} onChange={(e) => updateServices({ sections: services.sections.map((s, j) => j === i ? { ...s, title: e.target.value } : s) })} />
                <label className={labelClass}>Tag</label>
                <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={sec.tag} onChange={(e) => updateServices({ sections: services.sections.map((s, j) => j === i ? { ...s, tag: e.target.value } : s) })} />
                <label className={labelClass}>Description</label>
                <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={3} value={sec.description} onChange={(e) => updateServices({ sections: services.sections.map((s, j) => j === i ? { ...s, description: e.target.value } : s) })} />
                <label className={labelClass}>Image URL</label>
                <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={sec.image} onChange={(e) => updateServices({ sections: services.sections.map((s, j) => j === i ? { ...s, image: e.target.value } : s) })} />
              </div>
            </section>
          ))}
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="space-y-8">
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Portfolio – Hero</h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={portfolio.hero.eyebrow} onChange={(e) => updatePortfolio({ hero: { ...portfolio.hero, eyebrow: e.target.value } })} />
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={portfolio.hero.title} onChange={(e) => updatePortfolio({ hero: { ...portfolio.hero, title: e.target.value } })} />
              <label className={labelClass}>Subtitle</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={2} value={portfolio.hero.subtitle} onChange={(e) => updatePortfolio({ hero: { ...portfolio.hero, subtitle: e.target.value } })} />
            </div>
          </section>
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Browse section</h2>
            <div className="space-y-4">
              <label className={labelClass}>Heading</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={portfolio.browseHeading} onChange={(e) => updatePortfolio({ browseHeading: e.target.value })} />
              <label className={labelClass}>Subtitle</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={2} value={portfolio.browseSubtitle} onChange={(e) => updatePortfolio({ browseSubtitle: e.target.value })} />
            </div>
          </section>
          {portfolio.categories.map((cat, i) => (
            <section key={i} className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Category {i + 1}</h2>
              <div className="space-y-4">
                <label className={labelClass}>Title</label>
                <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={cat.title} onChange={(e) => updatePortfolio({ categories: portfolio.categories.map((c, j) => j === i ? { ...c, title: e.target.value } : c) })} />
                <label className={labelClass}>Count label (e.g. Selected works)</label>
                <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={cat.count} onChange={(e) => updatePortfolio({ categories: portfolio.categories.map((c, j) => j === i ? { ...c, count: e.target.value } : c) })} />
                <label className={labelClass}>Image URL</label>
                <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={cat.image} onChange={(e) => updatePortfolio({ categories: portfolio.categories.map((c, j) => j === i ? { ...c, image: e.target.value } : c) })} />
              </div>
            </section>
          ))}
        </div>
      )}

      {activeTab === 'about' && (
        <div className="space-y-8">
          <p className="text-[var(--navbar-text)] rounded-xl border-2 border-[var(--color-primary-blue)]/30 bg-[var(--color-primary-blue)]/5 px-4 py-3 text-sm">
            Edit the About page: hero, story, values, and team. You can add or remove team members and set a profile image (URL) for each.
          </p>
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>
              Hero (top section)
            </h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow text</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.hero.eyebrow}
                onChange={(e) => site.updateAbout({ hero: { ...about.hero, eyebrow: e.target.value } })}
              />
              <label className={labelClass}>Title</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.hero.title}
                onChange={(e) => site.updateAbout({ hero: { ...about.hero, title: e.target.value } })}
              />
              <label className={labelClass}>Subtitle</label>
              <textarea
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                rows={3}
                value={about.hero.subtitle}
                onChange={(e) => site.updateAbout({ hero: { ...about.hero, subtitle: e.target.value } })}
              />
            </div>
          </section>

          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>
              Our Story
            </h2>
            <div className="space-y-4">
              <label className={labelClass}>Label</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.story.label}
                onChange={(e) => site.updateAbout({ story: { ...about.story, label: e.target.value } })}
              />
              <label className={labelClass}>Heading</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.story.heading}
                onChange={(e) => site.updateAbout({ story: { ...about.story, heading: e.target.value } })}
              />
              <label className={labelClass}>Paragraph 1</label>
              <textarea
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                rows={2}
                value={about.story.paragraph1}
                onChange={(e) => site.updateAbout({ story: { ...about.story, paragraph1: e.target.value } })}
              />
              <label className={labelClass}>Paragraph 2</label>
              <textarea
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                rows={2}
                value={about.story.paragraph2}
                onChange={(e) => site.updateAbout({ story: { ...about.story, paragraph2: e.target.value } })}
              />
              <label className={labelClass}>CTA button text</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.story.ctaText}
                onChange={(e) => site.updateAbout({ story: { ...about.story, ctaText: e.target.value } })}
              />
              <label className={labelClass}>Story image URL</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.story.storyImageUrl}
                onChange={(e) => site.updateAbout({ story: { ...about.story, storyImageUrl: e.target.value } })}
              />
            </div>
          </section>

          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: 'var(--color-deep-blue)' }}>
                Our Values
              </h2>
              <button
                type="button"
                onClick={addValue}
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-white"
                style={{ backgroundColor: 'var(--color-secondary-purple)' }}
              >
                <Plus size={16} /> Add value
              </button>
            </div>
            <div className="space-y-6">
              {about.values.map((value, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-4"
                  style={{ borderColor: 'var(--navbar-border)' }}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold">Value {i + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeValue(i)}
                      className="text-red-600 hover:text-red-700 p-1"
                      aria-label="Remove"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      className={inputClass}
                      style={{ borderColor: 'var(--navbar-border)' }}
                      placeholder="Title"
                      value={value.title}
                      onChange={(e) => updateValue(i, { title: e.target.value })}
                    />
                    <textarea
                      className={inputClass}
                      style={{ borderColor: 'var(--navbar-border)' }}
                      rows={2}
                      placeholder="Description"
                      value={value.description}
                      onChange={(e) => updateValue(i, { description: e.target.value })}
                    />
                    <input
                      className={inputClass}
                      style={{ borderColor: 'var(--navbar-border)' }}
                      placeholder="Image URL"
                      value={value.image}
                      onChange={(e) => updateValue(i, { image: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--color-deep-blue)' }}>
              Team section
            </h2>
            <p className="text-sm text-[var(--navbar-text)]/80 mb-4">
              Edit the team block title and intro. Below, add or remove members and set each member’s name, role, and profile image (paste an image URL).
            </p>
            <div className="space-y-4 mb-6">
              <label className={labelClass}>Label</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.teamSection.label}
                onChange={(e) =>
                  site.updateAbout({
                    teamSection: { ...about.teamSection, label: e.target.value },
                  })
                }
              />
              <label className={labelClass}>Heading</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.teamSection.heading}
                onChange={(e) =>
                  site.updateAbout({
                    teamSection: { ...about.teamSection, heading: e.target.value },
                  })
                }
              />
              <label className={labelClass}>Intro paragraph</label>
              <textarea
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                rows={2}
                value={about.teamSection.intro}
                onChange={(e) =>
                  site.updateAbout({
                    teamSection: { ...about.teamSection, intro: e.target.value },
                  })
                }
              />
              <label className={labelClass}>Team image URL</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={about.teamSection.teamImageUrl}
                onChange={(e) =>
                  site.updateAbout({
                    teamSection: { ...about.teamSection, teamImageUrl: e.target.value },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--color-deep-blue)' }}>
                Team members – add, edit, or remove. Set profile image URL for each.
              </h3>
              <button
                type="button"
                onClick={addMember}
                className="inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--color-secondary-purple)' }}
              >
                <Plus size={16} /> Add member
              </button>
            </div>
            <div className="space-y-4">
              {about.teamSection.members.map((member, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                  style={{ borderColor: 'var(--navbar-border)' }}
                >
                  <div className="md:col-span-2 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 bg-[var(--navbar-border)] shrink-0" style={{ borderColor: 'var(--navbar-border)' }}>
                      {member.imageUrl ? (
                        <img src={member.imageUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-[var(--navbar-text)]/60">?</div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-[var(--navbar-text)]">Photo</span>
                  </div>
                  <div className="md:col-span-10 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        className={inputClass}
                        style={{ borderColor: 'var(--navbar-border)' }}
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => updateMember(i, { name: e.target.value })}
                      />
                      <input
                        className={inputClass}
                        style={{ borderColor: 'var(--navbar-border)' }}
                        placeholder="Role"
                        value={member.role}
                        onChange={(e) => updateMember(i, { role: e.target.value })}
                      />
                      <div className="flex gap-2">
                        <input
                          className={inputClass}
                          style={{ borderColor: 'var(--navbar-border)' }}
                          placeholder="Focus (optional)"
                          value={member.focus}
                          onChange={(e) => updateMember(i, { focus: e.target.value })}
                        />
                        <button
                          type="button"
                          onClick={() => removeMember(i)}
                          className="text-red-600 hover:text-red-700 p-2 shrink-0"
                          aria-label="Remove member"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Profile image URL</label>
                      <input
                        className={inputClass}
                        style={{ borderColor: 'var(--navbar-border)' }}
                        placeholder="Paste image URL for this member’s photo"
                        value={member.imageUrl ?? ''}
                        onChange={(e) => updateMember(i, { imageUrl: e.target.value })}
                      />
                      <p className="text-xs text-[var(--navbar-text)]/70 mt-1">Photo appears on the About page. Use any direct image link.</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === 'contact' && (
        <div className="space-y-8">
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm max-w-2xl" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Contact – Hero</h2>
            <div className="space-y-4">
              <label className={labelClass}>Eyebrow</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={contact.hero.eyebrow} onChange={(e) => updateContact({ hero: { ...contact.hero, eyebrow: e.target.value } })} />
              <label className={labelClass}>Title</label>
              <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={contact.hero.title} onChange={(e) => updateContact({ hero: { ...contact.hero, title: e.target.value } })} />
              <label className={labelClass}>Subtitle</label>
              <textarea className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} rows={2} value={contact.hero.subtitle} onChange={(e) => updateContact({ hero: { ...contact.hero, subtitle: e.target.value } })} />
            </div>
          </section>
          <section className="rounded-2xl border-2 bg-white/90 p-6 shadow-sm backdrop-blur-sm max-w-2xl" style={{ borderColor: 'var(--navbar-border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-deep-blue)' }}>Contact form</h2>
            <label className={labelClass}>Form heading</label>
            <input className={inputClass} style={{ borderColor: 'var(--navbar-border)' }} value={contact.formHeading} onChange={(e) => updateContact({ formHeading: e.target.value })} />
            <p className="mt-2 text-sm text-[var(--navbar-text)]">Email & phone are in <strong>Settings</strong>.</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default PagesEditor;
