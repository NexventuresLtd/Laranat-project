import React, { useState } from 'react';
import { useComics } from '../../context/ComicsContext';
import type { Comic, ComicStatus, ComicType } from '../../data/comics';
import { sampleComics } from '../../data/comics';
import { Save, Plus, Pencil, Trash2, X, Upload } from 'lucide-react';
import { uploadImage } from '../../lib/auth';

const emptyComic = (): Comic => ({
  id: '',
  title: '',
  description: '',
  author: '',
  genre: '',
  language: 'English',
  status: 'ongoing',
  coverImage: '',
  type: 'series',
  ageRating: '12+',
  chapterOrEpisode: undefined,
});

const ComicsManager: React.FC = () => {
  const { comics, setComics, persist } = useComics();
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState<Comic | null>(null);
  const [form, setForm] = useState<Comic>(emptyComic);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const url = await uploadImage(file);
      return url;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    persist();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const startAdd = () => {
    setForm(emptyComic());
    setEditing({ ...emptyComic(), id: `new-${Date.now()}` });
  };

  const startEdit = (c: Comic) => {
    setForm({ ...c });
    setEditing(c);
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm(emptyComic());
  };

  const saveEdit = () => {
    if (!editing) return;
    const isNew = editing.id.startsWith('new-');
    const nextId = isNew ? String(Math.max(0, ...comics.map((c) => parseInt(c.id, 10) || 0)) + 1) : editing.id;
    const updated: Comic = { ...form, id: nextId };
    if (isNew) {
      setComics([...comics, updated]);
    } else {
      setComics(comics.map((c) => (c.id === editing.id ? updated : c)));
    }
    cancelEdit();
  };

  const deleteComic = (id: string) => {
    if (window.confirm('Remove this comic from the list?')) {
      setComics(comics.filter((c) => c.id !== id));
      if (editing?.id === id) cancelEdit();
    }
  };

  const resetToSample = () => {
    if (window.confirm('Replace all comics with the default sample list? This cannot be undone.')) {
      setComics([...sampleComics]);
      cancelEdit();
    }
  };

  const inputClass =
    'w-full rounded-xl border-2 px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)]/40';
  const labelClass = 'block text-sm font-semibold mb-1.5 text-[var(--navbar-text)]';

  return (
    <div className="max-w-5xl">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--color-deep-blue)' }}>
            Comics
          </h1>
          <p className="mt-1 text-[var(--navbar-text)]/90">
            Add, edit, or remove comics shown on the Books page. Stored in browser (frontend-only).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={resetToSample}
            className="rounded-xl border-2 px-4 py-2 text-sm font-medium text-[var(--navbar-text)] transition-colors hover:bg-[var(--navbar-border)]"
            style={{ borderColor: 'var(--navbar-border)' }}
          >
            Reset to sample
          </button>
          <button
            type="button"
            onClick={startAdd}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white font-semibold text-sm shadow-md transition-all hover:opacity-95"
            style={{ backgroundColor: 'var(--color-secondary-purple)' }}
          >
            <Plus size={18} /> Add comic
          </button>
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
      </div>

      {editing && (
        <div
          className="mb-8 rounded-2xl border-2 bg-white/90 p-6 shadow-lg backdrop-blur-sm"
          style={{ borderColor: 'var(--color-primary-blue)' }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-deep-blue)' }}>
              {editing.id.startsWith('new-') ? 'New comic' : 'Edit comic'}
            </h2>
            <button type="button" onClick={cancelEdit} className="p-2 text-[var(--navbar-text)] hover:bg-[var(--navbar-border)] rounded-lg">
              <X size={20} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Title</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Author</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Genre</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                placeholder="e.g. Adventure, Fantasy"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Language</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={form.language}
                onChange={(e) => setForm({ ...form, language: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ComicStatus })}
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Type</label>
              <select
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as ComicType })}
              >
                <option value="series">Series</option>
                <option value="one-shot">One-shot</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Age rating</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                placeholder="e.g. 12+, All Ages"
                value={form.ageRating}
                onChange={(e) => setForm({ ...form, ageRating: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Chapters / Episodes (optional)</label>
              <input
                className={inputClass}
                style={{ borderColor: 'var(--navbar-border)' }}
                type="number"
                min={0}
                value={form.chapterOrEpisode ?? ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    chapterOrEpisode: e.target.value ? parseInt(e.target.value, 10) : undefined,
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Cover image URL (book/comic cover)</label>
              <div className="flex gap-4 items-start">
                <div className="w-24 h-36 shrink-0 rounded-lg overflow-hidden border-2 bg-[var(--navbar-border)]" style={{ borderColor: 'var(--navbar-border)' }}>
                  {form.coverImage ? (
                    <img src={form.coverImage} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[var(--navbar-text)]/70 text-center px-1">No image</div>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex gap-2">
                  <input
                    className={inputClass}
                    style={{ borderColor: 'var(--navbar-border)' }}
                    placeholder="Paste image URL for book cover"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  />
                  <label className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-white font-semibold text-sm cursor-pointer transition-all hover:opacity-95 shrink-0" style={{ backgroundColor: 'var(--color-primary-blue)' }}>
                    <Upload size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const url = await handleFileUpload(file);
                            setForm({ ...form, coverImage: url });
                          } catch (error) {
                            // Error already handled in handleFileUpload
                          }
                        }
                      }}
                      className="hidden"
                      disabled={uploading}
                    />
                    {uploading ? 'Uploading...' : 'Upload'}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border px-4 py-2 text-sm font-medium"
              style={{ borderColor: 'var(--navbar-border)' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveEdit}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
            >
              {editing.id.startsWith('new-') ? 'Add comic' : 'Update'}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border-2 bg-white/90 overflow-hidden shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--navbar-border)' }}>
        <table className="w-full text-left">
          <thead>
            <tr style={{ backgroundColor: 'var(--navbar-border)' }}>
              <th className="px-4 py-3 text-sm font-bold text-[var(--navbar-text)]">Cover</th>
              <th className="px-4 py-3 text-sm font-bold text-[var(--navbar-text)]">Title</th>
              <th className="px-4 py-3 text-sm font-bold text-[var(--navbar-text)]">Author</th>
              <th className="px-4 py-3 text-sm font-bold text-[var(--navbar-text)]">Status</th>
              <th className="px-4 py-3 text-sm font-bold text-[var(--navbar-text)]">Type</th>
              <th className="px-4 py-3 text-sm font-bold text-[var(--navbar-text)] w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comics.map((c) => (
              <tr
                key={c.id}
                className="border-t"
                style={{ borderColor: 'var(--navbar-border)' }}
              >
                <td className="px-4 py-3">
                  <div className="h-14 w-10 rounded overflow-hidden bg-[var(--navbar-border)]">
                    {c.coverImage ? (
                      <img src={c.coverImage} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-xs text-[var(--navbar-text)]">No image</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{c.title}</td>
                <td className="px-4 py-3 text-sm">{c.author}</td>
                <td className="px-4 py-3 text-sm">{c.status}</td>
                <td className="px-4 py-3 text-sm">{c.type}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(c)}
                      className="p-2 rounded-lg text-[var(--color-primary-blue)] hover:bg-[var(--navbar-border)]"
                      aria-label="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteComic(c.id)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                      aria-label="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {comics.length === 0 && (
          <div className="px-4 py-12 text-center text-[var(--navbar-text)]">
            No comics yet. Add one or reset to sample.
          </div>
        )}
      </div>
    </div>
  );
};

export default ComicsManager;
