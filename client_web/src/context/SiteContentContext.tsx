import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type {
  AboutContent,
  PlatformSettings,
  HomeContent,
  ServicesContent,
  PortfolioContent,
  ContactContent,
} from '../data/siteContent';
import {
  loadAboutContent,
  saveAboutContent,
  loadPlatformSettings,
  savePlatformSettings,
  loadHomeContent,
  saveHomeContent,
  loadServicesContent,
  saveServicesContent,
  loadPortfolioContent,
  savePortfolioContent,
  loadContactContent,
  saveContactContent,
  resetAllPagesContent,
} from '../data/siteContent';

interface SiteContentContextValue {
  about: AboutContent;
  settings: PlatformSettings;
  home: HomeContent;
  services: ServicesContent;
  portfolio: PortfolioContent;
  contact: ContactContent;
  setAbout: (content: AboutContent) => void;
  updateAbout: (patch: Partial<AboutContent> | ((prev: AboutContent) => Partial<AboutContent>)) => void;
  persistAbout: () => void;
  setHome: (content: HomeContent) => void;
  updateHome: (patch: Partial<HomeContent>) => void;
  persistHome: () => void;
  setServices: (content: ServicesContent) => void;
  updateServices: (patch: Partial<ServicesContent>) => void;
  persistServices: () => void;
  setPortfolio: (content: PortfolioContent) => void;
  updatePortfolio: (patch: Partial<PortfolioContent>) => void;
  persistPortfolio: () => void;
  setContact: (content: ContactContent) => void;
  updateContact: (patch: Partial<ContactContent>) => void;
  persistContact: () => void;
  setSettings: (s: PlatformSettings) => void;
  updateSettings: (patch: Partial<PlatformSettings>) => void;
  persistSettings: () => void;
  persistAll: () => void;
  resetAllPages: () => void;
  refresh: () => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [about, setAboutState] = useState<AboutContent>(loadAboutContent);
  const [settings, setSettingsState] = useState<PlatformSettings>(loadPlatformSettings);
  const [home, setHomeState] = useState<HomeContent>(loadHomeContent);
  const [services, setServicesState] = useState<ServicesContent>(loadServicesContent);
  const [portfolio, setPortfolioState] = useState<PortfolioContent>(loadPortfolioContent);
  const [contact, setContactState] = useState<ContactContent>(loadContactContent);

  const refresh = useCallback(() => {
    setAboutState(loadAboutContent());
    setSettingsState(loadPlatformSettings());
    setHomeState(loadHomeContent());
    setServicesState(loadServicesContent());
    setPortfolioState(loadPortfolioContent());
    setContactState(loadContactContent());
  }, []);

  const setAbout = useCallback((content: AboutContent) => setAboutState(content), []);
  const updateAbout = useCallback(
    (patch: Partial<AboutContent> | ((prev: AboutContent) => Partial<AboutContent>)) =>
      setAboutState((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) })),
    []
  );
  const persistAbout = useCallback(() => setAboutState((prev) => { saveAboutContent(prev); return prev; }), []);

  const setHome = useCallback((content: HomeContent) => setHomeState(content), []);
  const updateHome = useCallback((patch: Partial<HomeContent>) => setHomeState((prev) => ({ ...prev, ...patch })), []);
  const persistHome = useCallback(() => setHomeState((prev) => { saveHomeContent(prev); return prev; }), []);

  const setServices = useCallback((content: ServicesContent) => setServicesState(content), []);
  const updateServices = useCallback((patch: Partial<ServicesContent>) => setServicesState((prev) => ({ ...prev, ...patch })), []);
  const persistServices = useCallback(() => setServicesState((prev) => { saveServicesContent(prev); return prev; }), []);

  const setPortfolio = useCallback((content: PortfolioContent) => setPortfolioState(content), []);
  const updatePortfolio = useCallback((patch: Partial<PortfolioContent>) => setPortfolioState((prev) => ({ ...prev, ...patch })), []);
  const persistPortfolio = useCallback(() => setPortfolioState((prev) => { savePortfolioContent(prev); return prev; }), []);

  const setContact = useCallback((content: ContactContent) => setContactState(content), []);
  const updateContact = useCallback((patch: Partial<ContactContent>) => setContactState((prev) => ({ ...prev, ...patch })), []);
  const persistContact = useCallback(() => setContactState((prev) => { saveContactContent(prev); return prev; }), []);

  const setSettings = useCallback((s: PlatformSettings) => setSettingsState(s), []);
  const updateSettings = useCallback((patch: Partial<PlatformSettings>) => setSettingsState((prev) => ({ ...prev, ...patch })), []);
  const persistSettings = useCallback(() => setSettingsState((prev) => { savePlatformSettings(prev); return prev; }), []);

  const persistAll = useCallback(() => {
    setAboutState((p) => { saveAboutContent(p); return p; });
    setSettingsState((p) => { savePlatformSettings(p); return p; });
    setHomeState((p) => { saveHomeContent(p); return p; });
    setServicesState((p) => { saveServicesContent(p); return p; });
    setPortfolioState((p) => { savePortfolioContent(p); return p; });
    setContactState((p) => { saveContactContent(p); return p; });
  }, []);

  const resetAllPages = useCallback(() => {
    resetAllPagesContent();
    setAboutState(loadAboutContent());
    setHomeState(loadHomeContent());
    setServicesState(loadServicesContent());
    setPortfolioState(loadPortfolioContent());
    setContactState(loadContactContent());
  }, []);

  const value = useMemo<SiteContentContextValue>(
    () => ({
      about,
      settings,
      home,
      services,
      portfolio,
      contact,
      setAbout,
      updateAbout,
      persistAbout,
      setHome,
      updateHome,
      persistHome,
      setServices,
      updateServices,
      persistServices,
      setPortfolio,
      updatePortfolio,
      persistPortfolio,
      setContact,
      updateContact,
      persistContact,
      setSettings,
      updateSettings,
      persistSettings,
      persistAll,
      resetAllPages,
      refresh,
    }),
    [
      about,
      settings,
      home,
      services,
      portfolio,
      contact,
      setAbout,
      updateAbout,
      persistAbout,
      setHome,
      updateHome,
      persistHome,
      setServices,
      updateServices,
      persistServices,
      setPortfolio,
      updatePortfolio,
      persistPortfolio,
      setContact,
      updateContact,
      persistContact,
      setSettings,
      updateSettings,
      persistSettings,
      persistAll,
      resetAllPages,
      refresh,
    ]
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used within SiteContentProvider');
  return ctx;
}
