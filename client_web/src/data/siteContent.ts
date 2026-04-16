/**
 * Editable website content for Lanart platform.
 * Used by dashboard editors and public pages (About, etc.).
 */

export interface AboutHero {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface AboutStory {
  label: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  ctaText: string;
  storyImageUrl: string;
}

export interface AboutValue {
  title: string;
  description: string;
  image: string;
}

export interface AboutTeamMember {
  name: string;
  role: string;
  focus: string;
  /** Optional image URL for team member photo */
  imageUrl?: string;
}

export interface AboutTeamSection {
  label: string;
  heading: string;
  intro: string;
  ctaText: string;
  teamImageUrl: string;
  members: AboutTeamMember[];
}

export interface AboutContent {
  hero: AboutHero;
  story: AboutStory;
  values: AboutValue[];
  teamSection: AboutTeamSection;
}

const defaultAboutContent: AboutContent = {
  hero: {
    eyebrow: 'Who We Are',
    title: 'About Lanart21',
    subtitle:
      'A visual storytelling studio turning ideas into clear, powerful narratives through illustration, comics, animation, and creative direction.',
  },
  story: {
    label: 'Our Story',
    heading: 'Visual storytelling at the heart of everything we do',
    paragraph1:
      'Lanart21 Creative Studio is a visual storytelling studio specializing in illustration, comics, animation, and creative direction. We work with brands, organizations, and creators to turn ideas into clear, powerful visual narratives.',
    paragraph2:
      "Whether it's a comic book, an animated explainer, a brand identity, or custom illustrations, we combine craft with strategy so your message reaches the right people and leaves a lasting impression.",
    ctaText: 'Explore our services',
    storyImageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=900&q=85',
  },
  values: [
    {
      title: 'Story First',
      description:
        'Every project starts with the narrative. We craft visuals that serve the story and connect with audiences.',
      image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&q=80',
    },
    {
      title: 'Creative Excellence',
      description:
        'From concept to final deliverable, we aim for quality that stands out and stands the test of time.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
    },
    {
      title: 'Collaborative',
      description:
        'We work alongside brands, authors, and organizations as partners to bring their vision to life.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    },
    {
      title: 'Impact Driven',
      description:
        'Our work is designed to inform, inspire, and move people—whether in print, digital, or motion.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    },
  ],
  teamSection: {
    label: 'Our Team',
    heading: 'Expert creatives who love what they do',
    intro:
      'From founders to colorists and typographers, our team brings together diverse skills to deliver illustration, comics, animation, and branding that tell your story with clarity and impact.',
    ctaText: 'Meet the team below',
    teamImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&q=85',
    members: [
      { name: 'Lan Gabriel', role: 'Founder & Creative Director', focus: 'Branding, Animation & Motion', imageUrl: '' },
      { name: 'Sauveur', role: 'Associate Creative Director & Lead Inker / Sketch Artist', focus: '', imageUrl: '' },
      { name: 'Jospine', role: 'Colorist', focus: '', imageUrl: '' },
      { name: 'Ciella', role: 'Typography Designer & Editor', focus: '', imageUrl: '' },
    ],
  },
};

export interface PlatformSettings {
  siteName: string;
  logoUrl: string;
  logoLandscapeUrl: string;
  logoIconUrl: string;
  contactEmail: string;
  contactPhone: string;
  footerTagline: string;
  clientLogos: string[];
}

const defaultSettings: PlatformSettings = {
  siteName: 'Lanart21 Creative Studio',
  logoUrl: '/logo-landscape.svg',
  logoLandscapeUrl: '/logo-landscape.svg',
  logoIconUrl: '/favicon.svg',
  contactEmail: 'hello@lanart21.com',
  contactPhone: '+250 782 030 814',
  footerTagline: 'Visual storytelling at its best.',
  clientLogos: [
    '/client-logo-1.svg',
    '/client-logo-2.svg',
    '/client-logo-3.svg',
    '/client-logo-4.svg',
  ],
};

/** Home page – hero + section teasers */
export interface HomeHero {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  /** Optional: link for primary CTA (e.g. /books). Defaults to /contact. */
  ctaPrimaryTo?: string;
  bgImageUrl: string;
}

export interface HomeAboutTeaser {
  eyebrow: string;
  title: string;
  body: string;
  ctaText: string;
  imageUrl: string;
}

export interface HomeServicesTeaser {
  eyebrow: string;
  title: string;
  body: string;
  ctaText: string;
  serviceTitles: string[];
}

export interface HomeBooksTeaser {
  title: string;
  body: string;
  ctaText: string;
}

export interface HomePortfolioTeaser {
  eyebrow: string;
  title: string;
  body: string;
  ctaText: string;
}

export interface HomeContent {
  hero: HomeHero;
  aboutTeaser: HomeAboutTeaser;
  servicesTeaser: HomeServicesTeaser;
  booksTeaser: HomeBooksTeaser;
  portfolioTeaser: HomePortfolioTeaser;
}

/** Services page */
export interface ServiceSection {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: string;
}

export interface ServicesContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  sections: ServiceSection[];
}

/** Portfolio page */
export interface PortfolioCategory {
  title: string;
  count: string;
  image: string;
}

export interface PortfolioWork {
  title: string;
  category: string;
  summary: string;
  image: string;
}

export interface PortfolioContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  browseHeading: string;
  browseSubtitle: string;
  categories: PortfolioCategory[];
  featuredWorks: PortfolioWork[];
}

/** Contact page */
export interface ContactContent {
  hero: { eyebrow: string; title: string; subtitle: string };
  formHeading: string;
}

const defaultHomeContent: HomeContent = {
  hero: {
    eyebrow: 'Books & Comics',
    title: 'Stories that move. Books that last.',
    subtitle: 'Graphic novels, comics, and illustrated books—we bring your stories to life.',
    ctaPrimary: 'Explore books',
    ctaSecondary: 'About us',
    ctaPrimaryTo: '/books',
    bgImageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1920&q=85',
  },
  aboutTeaser: {
    eyebrow: 'Who we are',
    title: 'About Us',
    body: 'We specialize in illustration, comics, animation, and creative direction—turning your ideas into clear, powerful visual narratives for brands, organizations, and creators.',
    ctaText: 'Learn more',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=85',
  },
  servicesTeaser: {
    eyebrow: 'What we create',
    title: 'Our Services',
    body: 'From comics and graphic novels to illustration and animation—we bring your vision to life.',
    ctaText: 'View our services',
    serviceTitles: ['Illustration & Visual Art', 'Comic & Graphic Novels', 'Animation & Motion', 'Branding & Identity'],
  },
  booksTeaser: {
    title: 'Books & Publications',
    body: 'Comics & graphic novels, illustrated books, and original visual storytelling projects.',
    ctaText: 'View all books',
  },
  portfolioTeaser: {
    eyebrow: 'Our Work',
    title: 'Portfolio',
    body: 'A selection of our comics, illustration, animation, and branding projects.',
    ctaText: 'View portfolio',
  },
};

const defaultServicesContent: ServicesContent = {
  hero: {
    eyebrow: 'What We Do',
    title: 'Our Services',
    subtitle: 'Illustration & Visual Art, Comic & Graphic Novel Production, Animation & Motion Design, and Branding & Visual Identity.',
  },
  sections: [
    { id: 'illustration', title: 'Illustration & Visual Art', tag: 'Visual Art', description: 'Custom illustrations that capture your brand and story. From character design to editorial art, we create visuals that communicate clearly and leave a lasting impression.', image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&q=80' },
    { id: 'comics', title: 'Comic & Graphic Novel Production', tag: 'Comics', description: 'Full production from script to finished pages. We handle storyboarding, penciling, inking, coloring, and lettering for comics and graphic novels that readers love.', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&q=80' },
    { id: 'animation', title: 'Animation & Motion Design', tag: 'Motion', description: 'Motion that brings ideas to life on screen. From explainer videos and social content to title sequences and character animation, we add movement that engages audiences.', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' },
    { id: 'branding', title: 'Branding & Visual Identity', tag: 'Branding', description: 'Cohesive visual identity and creative direction. We help brands and projects look consistent and memorable across print, digital, and motion.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80' },
  ],
};

const defaultPortfolioContent: PortfolioContent = {
  hero: { eyebrow: 'Our Work', title: 'Portfolio', subtitle: 'A selection of our illustration, comics, animation, and branding projects.' },
  browseHeading: 'Browse by category',
  browseSubtitle: 'From visual art to motion design—explore what we create for brands and creators.',
  categories: [
    { title: 'Illustration & Visual Art', count: 'Selected works', image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=600&q=80' },
    { title: 'Comics & Graphic Novels', count: 'Projects', image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=600&q=80' },
    { title: 'Animation & Motion', count: 'Reels', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80' },
    { title: 'Branding & Identity', count: 'Case studies', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80' },
  ],
  featuredWorks: [
    {
      title: 'Editorial Illustration Series',
      category: 'Illustration & Visual Art',
      summary: 'A colorful illustration set designed for campaign storytelling across print and social channels.',
      image: 'https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=900&q=80',
    },
    {
      title: 'Original Comic Production',
      category: 'Comics & Graphic Novels',
      summary: 'From storyboards to finished pages, this project combined character design, inking, and lettering.',
      image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=900&q=80',
    },
    {
      title: 'Animated Brand Story',
      category: 'Animation & Motion',
      summary: 'A motion-led explainer that transformed a complex message into a clear and memorable short video.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80',
    },
  ],
};

const defaultContactContent: ContactContent = {
  hero: { eyebrow: 'Get in Touch', title: 'Contact Us', subtitle: "Ready to turn your ideas into visual narratives? Send us a message and we'll get back to you." },
  formHeading: 'Send a message',
};

const STORAGE_KEYS = {
  about: 'lanart_site_about',
  settings: 'lanart_site_settings',
  home: 'lanart_site_home',
  services: 'lanart_site_services',
  portfolio: 'lanart_site_portfolio',
  contact: 'lanart_site_contact',
} as const;

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) } as T;
  } catch {
    return fallback;
  }
}

function saveJson<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadAboutContent(): AboutContent {
  return loadJson(STORAGE_KEYS.about, defaultAboutContent);
}

export function saveAboutContent(content: AboutContent): void {
  saveJson(STORAGE_KEYS.about, content);
}

export function loadPlatformSettings(): PlatformSettings {
  return loadJson(STORAGE_KEYS.settings, defaultSettings);
}

export function savePlatformSettings(settings: PlatformSettings): void {
  saveJson(STORAGE_KEYS.settings, settings);
}

export function loadHomeContent(): HomeContent {
  return loadJson(STORAGE_KEYS.home, defaultHomeContent);
}
export function saveHomeContent(content: HomeContent): void {
  saveJson(STORAGE_KEYS.home, content);
}
export function loadServicesContent(): ServicesContent {
  return loadJson(STORAGE_KEYS.services, defaultServicesContent);
}
export function saveServicesContent(content: ServicesContent): void {
  saveJson(STORAGE_KEYS.services, content);
}
export function loadPortfolioContent(): PortfolioContent {
  return loadJson(STORAGE_KEYS.portfolio, defaultPortfolioContent);
}
export function savePortfolioContent(content: PortfolioContent): void {
  saveJson(STORAGE_KEYS.portfolio, content);
}
export function loadContactContent(): ContactContent {
  return loadJson(STORAGE_KEYS.contact, defaultContactContent);
}
export function saveContactContent(content: ContactContent): void {
  saveJson(STORAGE_KEYS.contact, content);
}

/** Remove all saved page content from localStorage (About, Home, Services, Portfolio, Contact). Next load will use defaults. */
export function resetAllPagesContent(): void {
  localStorage.removeItem(STORAGE_KEYS.about);
  localStorage.removeItem(STORAGE_KEYS.home);
  localStorage.removeItem(STORAGE_KEYS.services);
  localStorage.removeItem(STORAGE_KEYS.portfolio);
  localStorage.removeItem(STORAGE_KEYS.contact);
}

export { defaultAboutContent, defaultSettings, defaultHomeContent, defaultServicesContent, defaultPortfolioContent, defaultContactContent };
