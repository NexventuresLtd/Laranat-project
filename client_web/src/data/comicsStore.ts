import type { Comic } from './comics';
import { sampleComics } from './comics';

const STORAGE_KEY = 'lanart_comics';

function loadFromStorage(): Comic[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...sampleComics];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...sampleComics];
  } catch {
    return [...sampleComics];
  }
}

function saveToStorage(comics: Comic[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comics));
}

export function getStoredComics(): Comic[] {
  return loadFromStorage();
}

export function saveStoredComics(comics: Comic[]): void {
  saveToStorage(comics);
}
