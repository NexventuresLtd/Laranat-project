import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Portfolio', to: '/portfolio' },
  { name: 'Our Services', to: '/services' },
  { name: 'Books', to: '/books' },
  { name: 'About Us', to: '/about' },
  { name: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings, home } = useSiteContent();
  const isHome = location.pathname === '/';
  const primaryCtaTo = isHome ? '/contact' : (home.hero.ctaPrimaryTo || '/contact');
  const primaryCtaLabel = isHome ? 'Start a Project' : home.hero.ctaPrimary;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;
  // On home (transparent header), links sit on a light "pill" surface — keep dark text for contrast.
  const navTextColor = isTransparent ? 'var(--color-deep-blue)' : 'var(--navbar-text)';
  const isActiveLink = (to: string) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  const logoSrc = settings.logoLandscapeUrl || settings.logoUrl || '/Image/lanarnt.jpg';
  const navPillSurface = {
    backgroundColor: isTransparent ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.96)',
    border: '1px solid var(--navbar-border)',
  } as const;

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        fontFamily: 'var(--font-body)',
        backgroundColor: isTransparent ? 'transparent' : scrolled && isHome ? 'rgba(255,255,255,0.85)' : 'var(--navbar-bg)',
        backdropFilter: isTransparent ? 'none' : (scrolled && isHome) ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isTransparent ? 'none' : (scrolled && isHome) ? 'blur(12px)' : 'none',
        boxShadow: !isTransparent && (scrolled || !isHome) ? 'var(--navbar-shadow)' : 'none',
        borderBottom: isTransparent ? '1px solid transparent' : '1px solid var(--navbar-border)',
      }}
    >
      <div className="w-[91.666667%] mx-auto">
        <div className="flex justify-between items-center gap-3 min-h-[5rem] lg:min-h-[6rem] py-2">
          {/* Logo – landscape, no border/background */}
          <Link
            to="/"
            className="flex items-center shrink-0 no-underline z-[60]"
            aria-label="Lanart21 Creative Studio – Home"
          >
            <img
              src={logoSrc}
              alt={settings.siteName || 'Lanart21'}
              className="h-10 md:h-12 w-auto object-contain"
              style={isTransparent ? { filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.35))' } : undefined}
            />
          </Link>

          {/* Center: pill nav (desktop) */}
          <div className="hidden lg:flex flex-1 justify-center min-w-0 px-2">
            <div
              className="inline-flex items-center gap-0.5 xl:gap-1 rounded-full px-2 py-1.5 max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={navPillSurface}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="nav-link shrink-0 px-3 xl:px-4 py-2 rounded-full text-sm xl:text-[15px] font-semibold transition-all duration-300"
                  style={{
                    color: isActiveLink(link.to)
                      ? 'white'
                      : navTextColor,
                    backgroundColor: isActiveLink(link.to) ? 'var(--color-primary-blue)' : 'transparent',
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: primary CTA + mobile menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-[60]">
            <Link
              to={primaryCtaTo}
              className="hidden sm:inline-flex items-center gap-2 pl-5 pr-1.5 py-1.5 rounded-full text-sm font-bold text-white uppercase tracking-wide transition-opacity hover:opacity-95"
              style={{ backgroundColor: 'var(--color-accent-pink)' }}
            >
              <span>{primaryCtaLabel}</span>
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15"
                aria-hidden
              >
                <ArrowRight className="w-4 h-4 text-white" strokeWidth={2.5} />
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-blue)] transition-colors"
              style={{ color: navTextColor }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="lg:hidden border-t overflow-hidden"
          style={{
            borderColor: 'var(--navbar-border)',
            backgroundColor: isTransparent ? 'rgba(255,255,255,0.96)' : 'var(--navbar-bg)',
            boxShadow: 'inset 0 4px 6px -2px rgba(0,0,0,0.05)',
          }}
        >
          <div className="w-[91.666667%] mx-auto py-4 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="block py-3.5 px-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:pl-6"
                style={{
                  color: isActiveLink(link.to) ? 'white' : navTextColor,
                  backgroundColor: isActiveLink(link.to) ? 'var(--color-primary-blue)' : 'transparent',
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 px-2">
              <Link
                to={primaryCtaTo}
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-base font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: 'var(--color-deep-blue)' }}
              >
                {primaryCtaLabel}
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
