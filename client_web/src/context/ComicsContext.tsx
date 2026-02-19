import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Comic } from '../data/comics';
import { getStoredComics, saveStoredComics } from '../data/comicsStore';

interface ComicsContextValue {
  comics: Comic[];
  setComics: (comics: Comic[]) => void;
  refresh: () => void;
  persist: () => void;
}

const ComicsContext = createContext<ComicsContextValue | null>(null);

export function ComicsProvider({ children }: { children: React.ReactNode }) {
  const [comics, setComicsState] = useState<Comic[]>(getStoredComics);

  const refresh = useCallback(() => {
    setComicsState(getStoredComics());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const setComics = useCallback((newComics: Comic[]) => {
    setComicsState(newComics);
  }, []);

  const persist = useCallback(() => {
    setComicsState((prev) => {
      saveStoredComics(prev);
      return prev;
    });
  }, []);

  const value = useMemo(
    () => ({ comics, setComics, refresh, persist }),
    [comics, setComics, refresh, persist]
  );

  return <ComicsContext.Provider value={value}>{children}</ComicsContext.Provider>;
}

export function useComics() {
  const ctx = useContext(ComicsContext);
  if (!ctx) throw new Error('useComics must be used within ComicsProvider');
  return ctx;
}
